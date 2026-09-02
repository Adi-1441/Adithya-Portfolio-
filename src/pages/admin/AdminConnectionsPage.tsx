// ==============================================================================
// ADMIN CONNECTIONS MANAGEMENT (/admin/connections)
// Single Connection System (LinkedIn, GitHub, Verified Portals)
// ==============================================================================

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ConnectionItem } from '../../types/portfolio';
import { ConfirmModal } from '../../components/admin/ConfirmModal';
import { Plus, Edit2, Trash2, CheckCircle, Save, X, ExternalLink } from 'lucide-react';

export const AdminConnectionsPage: React.FC = () => {
  const { connections, saveConnection, deleteConnection } = usePortfolio();

  const [editingConn, setEditingConn] = useState<ConnectionItem | null>(null);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateNew = () => {
    const newConn: ConnectionItem = {
      id: `conn-${Date.now()}`,
      name: 'LinkedIn',
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/',
      icon: 'Linkedin',
      description: 'Connect with me on LinkedIn for professional inquiries.',
      displayOrder: connections.length + 1,
      isEnabled: true,
    };
    setEditingConn(newConn);
    setIsNew(true);
  };

  const handleEdit = (conn: ConnectionItem) => {
    setEditingConn(JSON.parse(JSON.stringify(conn)));
    setIsNew(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingConn) return;

    if (!editingConn.name.trim() || !editingConn.url.trim()) {
      alert('Please fill out connection name and URL.');
      return;
    }

    await saveConnection(editingConn);
    setEditingConn(null);
    setIsNew(false);
    showNotification('Connection portal saved to database!');
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmId) return;
    await deleteConnection(deleteConfirmId);
    setDeleteConfirmId(null);
    showNotification('Connection removed.');
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
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
          <div className="tech-label">DATABASE // CONNECTIONS</div>
          <h1 style={{ fontSize: '1.8rem' }}>Verified Professional Channels</h1>
        </div>

        {!editingConn && (
          <button onClick={handleCreateNew} className="btn btn-primary btn-sm">
            <Plus size={16} />
            <span>ADD CONNECTION</span>
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

      {editingConn ? (
        <div
          className="monograph-card"
          style={{
            padding: '2.5rem',
            borderTop: '4px solid var(--accent-brass)',
            marginBottom: '3rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem' }}>{isNew ? 'Add Connection' : `Edit: ${editingConn.name}`}</h2>
            <button onClick={() => setEditingConn(null)} className="btn btn-ghost btn-sm">
              <X size={16} /> Cancel
            </button>
          </div>

          <form onSubmit={handleSave}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group">
                <label className="form-label">CONNECTION NAME *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. LinkedIn"
                  value={editingConn.name}
                  onChange={(e) => setEditingConn({ ...editingConn, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">PLATFORM</label>
                <select
                  className="form-select"
                  value={editingConn.platform}
                  onChange={(e) => setEditingConn({ ...editingConn, platform: e.target.value, icon: e.target.value })}
                >
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="GitHub">GitHub</option>
                  <option value="Email">Email</option>
                  <option value="ResearchGate">ResearchGate</option>
                  <option value="Portfolio">Portfolio</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">DESTINATION URL *</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="https://www.linkedin.com/in/your-profile"
                value={editingConn.url}
                onChange={(e) => setEditingConn({ ...editingConn, url: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">DESCRIPTION / CAPTION</label>
              <textarea
                rows={2}
                className="form-textarea"
                placeholder="Connect with me on LinkedIn for professional inquiries..."
                value={editingConn.description || ''}
                onChange={(e) => setEditingConn({ ...editingConn, description: e.target.value })}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                <input
                  type="checkbox"
                  checked={editingConn.isEnabled}
                  onChange={(e) => setEditingConn({ ...editingConn, isEnabled: e.target.checked })}
                />
                <span>ENABLE ON PUBLIC PORTFOLIO</span>
              </label>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn btn-primary btn-lg">
                <Save size={16} />
                <span>SAVE CONNECTION</span>
              </button>
              <button type="button" onClick={() => setEditingConn(null)} className="btn btn-outline btn-lg">
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
                <th>PLATFORM</th>
                <th>NAME</th>
                <th>DESTINATION URL</th>
                <th>STATUS</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {connections.map((conn) => (
                <tr key={conn.id}>
                  <td>
                    <span className="tech-tag">{conn.platform}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{conn.name}</div>
                  </td>
                  <td>
                    <a
                      href={conn.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tech-dim"
                      style={{ color: 'var(--accent-brass)', textDecoration: 'underline' }}
                    >
                      {conn.url}
                    </a>
                  </td>
                  <td>
                    <span className={`status-pill ${conn.isEnabled ? 'status-pill-active' : 'status-pill-inactive'}`}>
                      {conn.isEnabled ? 'ACTIVE' : 'DISABLED'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem' }}>
                      <button onClick={() => handleEdit(conn)} className="btn btn-outline btn-sm">
                        <Edit2 size={13} />
                      </button>
                      <button onClick={() => setDeleteConfirmId(conn.id)} className="btn btn-danger btn-sm">
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
        title="Delete Connection"
        message="Are you sure you want to remove this verified connection portal from the portfolio?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
