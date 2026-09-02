// ==============================================================================
// ADMIN CAD & CAE SIMULATION CASEBOOK MANAGEMENT (/admin/cad-cae)
// ==============================================================================

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { CadCaeItem } from '../../types/portfolio';
import { MediaUploader } from '../../components/admin/MediaUploader';
import { ConfirmModal } from '../../components/admin/ConfirmModal';
import { Plus, Edit2, Trash2, CheckCircle, Save, X } from 'lucide-react';

export const AdminCadCaePage: React.FC = () => {
  const { cadCae, saveCadCae, deleteCadCae } = usePortfolio();

  const [editingItem, setEditingItem] = useState<CadCaeItem | null>(null);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateNew = () => {
    const newItem: CadCaeItem = {
      id: `cad-${Date.now()}`,
      title: '',
      analysisType: 'Static Structural FEA',
      software: ['ANSYS Mechanical', 'SolidWorks'],
      modelDescription: '',
      simulationResults: '',
      keyMetrics: '',
      displayOrder: cadCae.length + 1,
      isPublished: true,
    };
    setEditingItem(newItem);
    setIsNew(true);
  };

  const handleEdit = (item: CadCaeItem) => {
    setEditingItem(JSON.parse(JSON.stringify(item)));
    setIsNew(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (!editingItem.title.trim() || !editingItem.modelDescription.trim()) {
      alert('Please fill out CAD/CAE study title and model description.');
      return;
    }

    await saveCadCae(editingItem);
    setEditingItem(null);
    setIsNew(false);
    showNotification('CAD/CAE simulation study saved to database!');
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmId) return;
    await deleteCadCae(deleteConfirmId);
    setDeleteConfirmId(null);
    showNotification('CAD/CAE record deleted.');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <div className="tech-label">DATABASE // CAD & CAE</div>
          <h1 style={{ fontSize: '1.8rem' }}>CAD & CAE Simulation Casebook</h1>
        </div>

        {!editingItem && (
          <button onClick={handleCreateNew} className="btn btn-primary btn-sm">
            <Plus size={16} />
            <span>ADD SIMULATION STUDY</span>
          </button>
        )}
      </div>

      {notification && (
        <div
          style={{
            padding: '0.85rem 1.25rem',
            background: '#EAF5EA',
            border: '1px solid #C3E3C6',
            borderRadius: 'var(--radius-xs)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: '#2E6B34',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <CheckCircle size={16} />
          <span>{notification}</span>
        </div>
      )}

      {editingItem ? (
        <div
          className="monograph-card"
          style={{
            padding: '2.5rem',
            borderTop: '4px solid var(--accent-brass)',
            marginBottom: '3rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem' }}>
              {isNew ? 'Create CAD/CAE Case Study' : `Edit: ${editingItem.title}`}
            </h2>
            <button onClick={() => setEditingItem(null)} className="btn btn-ghost btn-sm">
              <X size={16} /> Cancel
            </button>
          </div>

          <form onSubmit={handleSave}>
            <div className="form-group">
              <label className="form-label">STUDY TITLE *</label>
              <input
                type="text"
                required
                className="form-input"
                value={editingItem.title}
                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group">
                <label className="form-label">ANALYSIS TYPE</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Non-Linear Dynamic Crash FEA"
                  value={editingItem.analysisType}
                  onChange={(e) => setEditingItem({ ...editingItem, analysisType: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">SOFTWARE (COMMA SEPARATED)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="ANSYS Mechanical, SolidWorks, MATLAB"
                  value={editingItem.software.join(', ')}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      software: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">PHYSICAL MODEL DESCRIPTION & BOUNDARY CONDITIONS *</label>
              <textarea
                required
                rows={3}
                className="form-textarea"
                value={editingItem.modelDescription}
                onChange={(e) => setEditingItem({ ...editingItem, modelDescription: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">SIMULATION NUMERICAL RESULTS</label>
              <textarea
                rows={3}
                className="form-textarea"
                value={editingItem.simulationResults || ''}
                onChange={(e) => setEditingItem({ ...editingItem, simulationResults: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">KEY COMPUTATIONAL METRICS CALLOUT</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Safety Factor: 2.85 | Max Stress: 142 MPa | Energy: 7.35 kJ"
                value={editingItem.keyMetrics || ''}
                onChange={(e) => setEditingItem({ ...editingItem, keyMetrics: e.target.value })}
              />
            </div>

            <MediaUploader
              onUploadSuccess={(res) => {
                setEditingItem({
                  ...editingItem,
                  mediaUrl: res.url,
                  mediaType: res.mediaType === 'video' ? 'video' : 'image',
                });
              }}
              label="SIMULATION VISUALIZATION MEDIA (IMAGE OR VIDEO)"
            />

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="submit" className="btn btn-primary btn-lg">
                <Save size={16} />
                <span>SAVE SIMULATION STUDY</span>
              </button>
              <button type="button" onClick={() => setEditingItem(null)} className="btn btn-outline btn-lg">
                CANCEL
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="monograph-card" style={{ padding: '0', overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>INDEX</th>
                <th>STUDY TITLE</th>
                <th>ANALYSIS TYPE</th>
                <th>SOFTWARE</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {cadCae.map((item, idx) => (
                <tr key={item.id}>
                  <td>
                    <span className="tech-index">0{idx + 1}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{item.title}</div>
                  </td>
                  <td>
                    <span className="tech-tag">{item.analysisType}</span>
                  </td>
                  <td>
                    <span className="tech-dim">{item.software.join(', ')}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem' }}>
                      <button onClick={() => handleEdit(item)} className="btn btn-outline btn-sm">
                        <Edit2 size={13} />
                      </button>
                      <button onClick={() => setDeleteConfirmId(item.id)} className="btn btn-danger btn-sm">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmModal
        isOpen={Boolean(deleteConfirmId)}
        title="Delete CAD/CAE Case Study"
        message="Are you sure you want to delete this simulation case study from the database?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
