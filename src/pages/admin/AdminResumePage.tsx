// ==============================================================================
// ADMIN RESUME MANAGEMENT (/admin/resume)
// Upload PDF resume, update version label, preview & download
// ==============================================================================

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { MediaUploader } from '../../components/admin/MediaUploader';
import { FileText, Download, ExternalLink, CheckCircle, Save } from 'lucide-react';

export const AdminResumePage: React.FC = () => {
  const { resume, saveResume } = usePortfolio();

  const [versionLabel, setVersionLabel] = useState<string>(resume.versionLabel || 'Mechanical Engineering Resume');
  const [isActive, setIsActive] = useState<boolean>(resume.isActive);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleUploadSuccess = async (res: { url: string; name: string }) => {
    const updated = await saveResume({
      ...resume,
      fileUrl: res.url,
      fileName: res.name,
      versionLabel: versionLabel,
      isActive: isActive,
      updatedAt: new Date().toISOString().split('T')[0],
    });
    showNotification('New resume PDF successfully uploaded and activated!');
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveResume({
      ...resume,
      versionLabel,
      isActive,
      updatedAt: new Date().toISOString().split('T')[0],
    });
    showNotification('Resume metadata updated!');
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div className="tech-label">STORAGE // RESUME ARCHIVE</div>
        <h1 style={{ fontSize: '1.8rem' }}>Curriculum Vitae Management</h1>
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

      {/* Current Resume Info Card */}
      <div className="monograph-card" style={{ padding: '2rem', marginBottom: '2rem', borderLeft: '4px solid var(--accent-brass)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <FileText size={24} color="var(--accent-brass)" />
            <h3 style={{ fontSize: '1.2rem' }}>Active Resume Document</h3>
          </div>
          <span className={`status-pill ${resume.isActive ? 'status-pill-active' : 'status-pill-inactive'}`}>
            {resume.isActive ? 'PUBLICLY VISIBLE' : 'HIDDEN'}
          </span>
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          <div>DOCUMENT NAME: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{resume.fileName || 'No file uploaded'}</span></div>
          <div>VERSION LABEL: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{resume.versionLabel || 'Mechanical Engineering Resume'}</span></div>
          <div>LAST MODIFIED: <span style={{ color: 'var(--text-primary)' }}>{resume.updatedAt || '—'}</span></div>
        </div>

        {resume.fileUrl && (
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a href={resume.fileUrl} download={resume.fileName} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
              <Download size={14} /> Download File
            </a>
            <a href={resume.fileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
              <ExternalLink size={14} /> Preview Document
            </a>
          </div>
        )}
      </div>

      {/* Upload New Resume */}
      <div className="monograph-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Upload Replacement Resume (PDF)</h3>
        <MediaUploader
          onUploadSuccess={handleUploadSuccess}
          allowedTypes="pdf"
          label="SELECT PDF RESUME SPECIMEN (MAX 15MB)"
          bucket="resumes"
        />
      </div>

      {/* Configuration Form */}
      <form onSubmit={handleSaveSettings} className="monograph-card" style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem' }}>Resume Display Settings</h3>

        <div className="form-group">
          <label className="form-label">VERSION LABEL *</label>
          <input
            type="text"
            required
            className="form-input"
            value={versionLabel}
            onChange={(e) => setVersionLabel(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            <span>ENABLE PUBLIC RESUME DOWNLOAD ON PORTFOLIO</span>
          </label>
        </div>

        <button type="submit" className="btn btn-primary btn-sm">
          <Save size={14} />
          <span>SAVE DISPLAY SETTINGS</span>
        </button>
      </form>
    </div>
  );
};
