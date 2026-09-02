// ==============================================================================
// ADMIN RESEARCH MANAGEMENT PAGE (/admin/research)
// ==============================================================================

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ResearchItem } from '../../types/portfolio';
import { MediaUploader } from '../../components/admin/MediaUploader';
import { ConfirmModal } from '../../components/admin/ConfirmModal';
import { Plus, Edit2, Trash2, CheckCircle, Save, X } from 'lucide-react';

export const AdminResearchPage: React.FC = () => {
  const { research, saveResearch, deleteResearch } = usePortfolio();

  const [editingItem, setEditingItem] = useState<ResearchItem | null>(null);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateNew = () => {
    const newItem: ResearchItem = {
      id: `res-${Date.now()}`,
      title: '',
      focusArea: 'Materials & Tribology',
      status: 'In Progress',
      objective: '',
      methodology: '',
      materials: '',
      fabricationProcess: '',
      testingAndValidation: '',
      results: '',
      displayOrder: research.length + 1,
      isPublished: true,
    };
    setEditingItem(newItem);
    setIsNew(true);
  };

  const handleEdit = (item: ResearchItem) => {
    setEditingItem(JSON.parse(JSON.stringify(item)));
    setIsNew(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (!editingItem.title.trim() || !editingItem.objective.trim()) {
      alert('Please provide research paper title and objective.');
      return;
    }

    await saveResearch(editingItem);
    setEditingItem(null);
    setIsNew(false);
    showNotification('Research monograph saved to database!');
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmId) return;
    await deleteResearch(deleteConfirmId);
    setDeleteConfirmId(null);
    showNotification('Research entry deleted.');
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
          <div className="tech-label">DATABASE // RESEARCH MONOGRAPHS</div>
          <h1 style={{ fontSize: '1.8rem' }}>Research & Experimental Investigations</h1>
        </div>

        {!editingItem && (
          <button onClick={handleCreateNew} className="btn btn-primary btn-sm">
            <Plus size={16} />
            <span>CREATE RESEARCH ENTRY</span>
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
              {isNew ? 'Create Research Monograph' : `Edit: ${editingItem.title}`}
            </h2>
            <button onClick={() => setEditingItem(null)} className="btn btn-ghost btn-sm">
              <X size={16} /> Cancel
            </button>
          </div>

          <form onSubmit={handleSave}>
            <div className="form-group">
              <label className="form-label">PAPER / RESEARCH TITLE *</label>
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
                <label className="form-label">FOCUS AREA</label>
                <input
                  type="text"
                  className="form-input"
                  value={editingItem.focusArea}
                  onChange={(e) => setEditingItem({ ...editingItem, focusArea: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">INVESTIGATION STATUS</label>
                <select
                  className="form-select"
                  value={editingItem.status}
                  onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}
                >
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Under Review">Under Review</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">RESEARCH OBJECTIVE *</label>
              <textarea
                required
                rows={3}
                className="form-textarea"
                value={editingItem.objective}
                onChange={(e) => setEditingItem({ ...editingItem, objective: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">MATERIALS COMPOSITION & SPECIFICATION</label>
              <textarea
                rows={2}
                className="form-textarea"
                value={editingItem.materials || ''}
                onChange={(e) => setEditingItem({ ...editingItem, materials: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">FABRICATION & PROCESSING</label>
              <textarea
                rows={2}
                className="form-textarea"
                value={editingItem.fabricationProcess || ''}
                onChange={(e) => setEditingItem({ ...editingItem, fabricationProcess: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">EMPIRICAL RESULTS & FINDINGS</label>
              <textarea
                rows={3}
                className="form-textarea"
                value={editingItem.results || ''}
                onChange={(e) => setEditingItem({ ...editingItem, results: e.target.value })}
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
              label="UPLOAD EXPERIMENTAL SPECIMEN MEDIA (OPTIONAL)"
            />

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="submit" className="btn btn-primary btn-lg">
                <Save size={16} />
                <span>SAVE RESEARCH ENTRY</span>
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
                <th>RESEARCH TITLE</th>
                <th>FOCUS AREA</th>
                <th>STATUS</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {research.map((item, idx) => (
                <tr key={item.id}>
                  <td>
                    <span className="tech-index">0{idx + 1}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{item.title}</div>
                  </td>
                  <td>
                    <span className="tech-tag">{item.focusArea}</span>
                  </td>
                  <td>
                    <span className={`status-pill ${item.status === 'Completed' ? 'status-pill-active' : 'status-pill-inactive'}`}>
                      {item.status}
                    </span>
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
        title="Delete Research Paper"
        message="Are you sure you want to delete this research monograph entry from the database?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
