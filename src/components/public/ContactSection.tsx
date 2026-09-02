// ==============================================================================
// DIRECT ENGINEERING INQUIRY & CONTACT SECTION
// ==============================================================================

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SectionHeader } from '../common/SectionHeader';
import { Mail, MapPin, Send, CheckCircle2, Copy, Check } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { settings } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Direct mailto construction
    const mailtoUrl = `mailto:${settings.contactEmail || 'adithyag.eng@gmail.com'}?subject=${encodeURIComponent(
      `[Portfolio Inquiry] ${formData.subject || 'Mechanical Engineering Discussion'}`
    )}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;

    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(settings.contactEmail || 'adithyag.eng@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="section-pad" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        <SectionHeader
          index="11"
          category="DIRECT TECHNICAL CORRESPONDENCE"
          title="Direct Inquiries, Research Collaborations & Engineering Roles"
          subtitle="Direct contact channel for engineering recruitment, technical research inquiries, and industrial design consultation."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '3.5rem',
          }}
          className="contact-grid"
        >
          {/* Left Column: Direct Contact Info */}
          <div>
            <div
              className="monograph-card"
              style={{
                padding: '2.5rem',
                borderLeft: '4px solid var(--accent-brass)',
              }}
            >
              <div className="tech-label" style={{ marginBottom: '1rem' }}>
                COMMUNICATION DISPATCH
              </div>

              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>
                Initiate a Technical Dialogue
              </h3>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Open to mechanical design, finite element simulation, kinematic synthesis, and additive manufacturing
                collaborations.
              </p>

              {/* Email Block */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                  <Mail size={16} color="var(--accent-brass)" />
                  <span className="tech-label">OFFICIAL EMAIL</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.25rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                    {settings.contactEmail || 'adithyag.eng@gmail.com'}
                  </span>
                  <button
                    onClick={copyEmail}
                    className="btn btn-ghost btn-sm"
                    title="Copy Email to Clipboard"
                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}
                  >
                    {copied ? <Check size={14} color="#2C3E35" /> : <Copy size={14} />}
                    <span>{copied ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>
              </div>

              {/* Location Block */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                  <MapPin size={16} color="var(--accent-brass)" />
                  <span className="tech-label">LOCATION BASE</span>
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                  {settings.location || 'Bengaluru, Karnataka, India'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Inquiry Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="monograph-card"
              style={{
                padding: '2.5rem',
                border: '1px solid var(--hairline-strong)',
              }}
            >
              <div className="tech-label" style={{ marginBottom: '1.25rem' }}>
                DISPATCH MESSAGE FORM
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row-2">
                <div className="form-group">
                  <label className="form-label">YOUR FULL NAME *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Dr. Arthur Pendelton"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">YOUR EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    placeholder="e.g. arthur@engineering-corp.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">SUBJECT / TOPIC</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Robotic Kinematics Consultation / Career Inquiry"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">ENGINEERING MESSAGE *</label>
                <textarea
                  required
                  rows={4}
                  className="form-textarea"
                  placeholder="Describe your inquiry, project scope, or technical specifications..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                <Send size={16} />
                <span>DISPATCH CORRESPONDENCE</span>
              </button>

              {submitted && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginTop: '1rem',
                    padding: '0.75rem',
                    background: '#EAF5EA',
                    border: '1px solid #C3E3C6',
                    borderRadius: 'var(--radius-xs)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    color: '#2E6B34',
                  }}
                >
                  <CheckCircle2 size={16} />
                  <span>Your email client was opened with the message payload ready to send.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .form-row-2 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
