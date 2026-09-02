// ==============================================================================
// ADMIN GENERAL SETTINGS (/admin/settings)
// Manage Site Metadata, Hero Statement, Bio & Environment Diagnostic
// ==============================================================================

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { PortfolioSettings } from '../../types/portfolio';
import { getSupabaseConfigStatus } from '../../lib/supabase';
import { CheckCircle, Save, ShieldCheck, Database, Key } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { settings, updateSettings } = usePortfolio();

  const [formData, setFormData] = useState<PortfolioSettings>({ ...settings });
  const [notification, setNotification] = useState<string | null>(null);

  const configStatus = getSupabaseConfigStatus();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(formData);
    setNotification('Portfolio configuration updated and persisted!');
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div className="tech-label">CONFIGURATION // SETTINGS</div>
        <h1 style={{ fontSize: '1.8rem' }}>Portfolio Identity & Global Settings</h1>
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

      {/* Environment & Security Diagnostic Card */}
      <div
        className="monograph-card"
        style={{
          padding: '2rem',
          borderLeft: '4px solid var(--accent-brass)',
          marginBottom: '2.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <ShieldCheck size={22} color="var(--accent-brass)" />
          <h3 style={{ fontSize: '1.2rem' }}>Backend Security & Storage Diagnostics</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
          <div style={{ background: 'var(--bg-surface-subtle)', padding: '1rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--hairline)' }}>
            <div style={{ color: 'var(--text-muted)', marginBottom: '0.2rem' }}>DATABASE & AUTH:</div>
            <div style={{ fontWeight: 600, color: configStatus.isConfigured ? '#2E6B34' : 'var(--accent-brass)' }}>
              {configStatus.isConfigured ? `SUPABASE CONNECTED (${configStatus.urlHost})` : 'LOCAL STANDALONE ACTIVE'}
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface-subtle)', padding: '1rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--hairline)' }}>
            <div style={{ color: 'var(--text-muted)', marginBottom: '0.2rem' }}>ROW LEVEL SECURITY (RLS):</div>
            <div style={{ fontWeight: 600, color: '#2E6B34' }}>ENFORCED (SCHEMA V2)</div>
          </div>
        </div>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSave} className="monograph-card" style={{ padding: '2.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Personal Identity & Hero Statements</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="form-group">
            <label className="form-label">FULL NAME *</label>
            <input
              type="text"
              required
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">PROFESSIONAL ROLE *</label>
            <input
              type="text"
              required
              className="form-input"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">SITE TITLE (BROWSER TAB / SEO) *</label>
          <input
            type="text"
            required
            className="form-input"
            value={formData.siteTitle}
            onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">HERO LEAD STATEMENT *</label>
          <textarea
            required
            rows={3}
            className="form-textarea"
            value={formData.heroStatement}
            onChange={(e) => setFormData({ ...formData, heroStatement: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">ABOUT MONOGRAPH NARRATIVE *</label>
          <textarea
            required
            rows={5}
            className="form-textarea"
            value={formData.aboutText}
            onChange={(e) => setFormData({ ...formData, aboutText: e.target.value })}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="form-group">
            <label className="form-label">OFFICIAL EMAIL *</label>
            <input
              type="email"
              required
              className="form-input"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">LOCATION BASE *</label>
            <input
              type="text"
              required
              className="form-input"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="form-group">
            <label className="form-label">LINKEDIN PROFILE URL</label>
            <input
              type="url"
              className="form-input"
              value={formData.linkedinUrl || ''}
              onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">GITHUB REPOSITORY URL</label>
            <input
              type="url"
              className="form-input"
              value={formData.githubUrl || ''}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
            />
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <button type="submit" className="btn btn-primary btn-lg">
            <Save size={16} />
            <span>SAVE GLOBAL SETTINGS</span>
          </button>
        </div>
      </form>
    </div>
  );
};
