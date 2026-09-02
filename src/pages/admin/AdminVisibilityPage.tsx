// ==============================================================================
// ADMIN SECTION VISIBILITY & ORDERING (/admin/visibility)
// ==============================================================================

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SectionVisibility } from '../../types/portfolio';
import { CheckCircle, Eye, EyeOff, Save } from 'lucide-react';

export const AdminVisibilityPage: React.FC = () => {
  const { visibility, updateVisibility } = usePortfolio();
  const [localVisibility, setLocalVisibility] = useState<SectionVisibility[]>(visibility);
  const [notification, setNotification] = useState<string | null>(null);

  const toggleVisible = (key: string) => {
    setLocalVisibility((prev) =>
      prev.map((item) =>
        item.sectionKey === key ? { ...item, isVisible: !item.isVisible } : item
      )
    );
  };

  const handleSave = async () => {
    await updateVisibility(localVisibility);
    setNotification('Section visibility preferences updated successfully!');
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div className="tech-label">CONFIGURATION // SECTION VISIBILITY</div>
        <h1 style={{ fontSize: '1.8rem' }}>Public Portfolio Section Visibility</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.4rem' }}>
          Enable or disable sections on the public homepage. Disabled sections remain safely stored in the database.
        </p>
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

      <div className="monograph-card" style={{ padding: '0', overflow: 'hidden' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>SECTION KEY</th>
              <th>DISPLAY LABEL</th>
              <th>STATUS</th>
              <th style={{ textAlign: 'right' }}>TOGGLE VISIBILITY</th>
            </tr>
          </thead>
          <tbody>
            {localVisibility.map((sec) => (
              <tr key={sec.id || sec.sectionKey}>
                <td>
                  <span className="tech-tag">{sec.sectionKey}</span>
                </td>
                <td>
                  <div style={{ fontWeight: 600 }}>{sec.label}</div>
                </td>
                <td>
                  <span className={`status-pill ${sec.isVisible ? 'status-pill-active' : 'status-pill-inactive'}`}>
                    {sec.isVisible ? 'VISIBLE' : 'HIDDEN'}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => toggleVisible(sec.sectionKey)}
                    className={`btn btn-sm ${sec.isVisible ? 'btn-outline' : 'btn-primary'}`}
                    style={{ fontSize: '0.72rem' }}
                  >
                    {sec.isVisible ? <EyeOff size={13} /> : <Eye size={13} />}
                    <span>{sec.isVisible ? 'HIDE SECTION' : 'SHOW SECTION'}</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button onClick={handleSave} className="btn btn-primary btn-lg">
          <Save size={16} />
          <span>PERSIST VISIBILITY PREFERENCES</span>
        </button>
      </div>
    </div>
  );
};
