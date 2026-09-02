// ==============================================================================
// ADMIN CERTIFICATIONS MANAGEMENT (/admin/certifications)
// ==============================================================================

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Certification } from '../../types/portfolio';
import { MediaUploader } from '../../components/admin/MediaUploader';
import { ConfirmModal } from '../../components/admin/ConfirmModal';
import { Plus, Edit2, Trash2, CheckCircle, Save, X, ExternalLink } from 'lucide-react';

export const AdminCertificationsPage: React.FC = () => {
  const { certifications, saveCertification, deleteCertification } = usePortfolio();

  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateNew = () => {
    const newCert: Certification = {
      id: `cert-${Date.now()}`,
      title: '',
      issuer: '',
      issueDate: new Date().getFullYear().toString(),
      credentialId: '',
      credentialUrl: '',
      certificateFileUrl: '',
      fileType: 'image',
      displayOrder: certifications.length + 1,
      isPublished: true,
    };
    setEditingCert(newCert);
    setIsNew(true);
  };

  const handleEdit = (cert: Certification) => {
    setEditingCert(JSON.parse(JSON.stringify(cert)));
    setIsNew(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert) return;

    if (!editingCert.title.trim() || !editingCert.issuer.trim()) {
      alert('Please provide certification title and issuer.');
      return;
    }

    await saveCertification(editingCert);
    setEditingCert(null);
    setIsNew(false);
    showNotification('Certification saved to database!');
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmId) return;
    await deleteCertification(deleteConfirmId);
    setDeleteConfirmId(null);
    showNotification('Certification record deleted.');
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
          <div className="tech-label">DATABASE // CERTIFICATIONS</div>
          <h1 style={{ fontSize: '1.8rem' }}>Accreditations & Professional Credentials</h1>
        </div>

        {!editingCert && (
          <button onClick={handleCreateNew} className="btn btn-primary btn-sm">
            <Plus size={16} />
            <span>ADD CERTIFICATION</span>
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

      {editingCert ? (
        <div
          className="monograph-card"
          style={{
            padding: '2.5rem',
            borderTop: '4px solid var(--accent-brass)',
            marginBottom: '3rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem' }}>{isNew ? 'Add Certificate' : `Edit: ${editingCert.title}`}</h2>
            <button onClick={() => setEditingCert(null)} className="btn btn-ghost btn-sm">
              <X size={16} /> Cancel
            </button>
          </div>

          <form onSubmit={handleSave}>
            <div className="form-group">
              <label className="form-label">CERTIFICATION TITLE *</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="e.g. Certified SolidWorks Professional (CSWP)"
                value={editingCert.title}
                onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group">
                <label className="form-label">ISSUING BODY / INSTITUTION *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Dassault Systèmes"
                  value={editingCert.issuer}
                  onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">ISSUE DATE / YEAR</label>
                <input
                  type="text"
                  className="form-input"
                  value={editingCert.issueDate}
                  onChange={(e) => setEditingCert({ ...editingCert, issueDate: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group">
                <label className="form-label">CREDENTIAL ID</label>
                <input
                  type="text"
                  className="form-input"
                  value={editingCert.credentialId || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, credentialId: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">VERIFICATION URL</label>
                <input
                  type="url"
                  className="form-input"
                  value={editingCert.credentialUrl || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, credentialUrl: e.target.value })}
                />
              </div>
            </div>

            <MediaUploader
              onUploadSuccess={(res) => {
                setEditingCert({
                  ...editingCert,
                  certificateFileUrl: res.url,
                  fileType: res.mediaType,
                });
              }}
              label="UPLOAD CERTIFICATE DOCUMENT / IMAGE"
            />

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="submit" className="btn btn-primary btn-lg">
                <Save size={16} />
                <span>SAVE CERTIFICATION</span>
              </button>
              <button type="button" onClick={() => setEditingCert(null)} className="btn btn-outline btn-lg">
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
                <th>TITLE</th>
                <th>ISSUER</th>
                <th>ISSUE DATE</th>
                <th>CREDENTIAL ID</th>
                <th>DOCUMENT</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {certifications.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{c.title}</div>
                  </td>
                  <td>
                    <span className="tech-tag">{c.issuer}</span>
                  </td>
                  <td>
                    <span className="tech-dim">{c.issueDate}</span>
                  </td>
                  <td>
                    <span className="tech-dim">{c.credentialId || '—'}</span>
                  </td>
                  <td>
                    {c.certificateFileUrl ? (
                      <span className="status-pill status-pill-active">ATTACHED</span>
                    ) : (
                      <span className="tech-dim">NONE</span>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem' }}>
                      <button onClick={() => handleEdit(c)} className="btn btn-outline btn-sm">
                        <Edit2 size={13} />
                      </button>
                      <button onClick={() => setDeleteConfirmId(c.id)} className="btn btn-danger btn-sm">
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
        title="Delete Certification"
        message="Are you sure you want to delete this certification record from the database?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
