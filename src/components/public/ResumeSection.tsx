// ==============================================================================
// RESUME & CURRICULUM VITAE SECTION
// ==============================================================================

import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SectionHeader } from '../common/SectionHeader';
import { FileText, Download, CheckCircle, ExternalLink, AlertCircle } from 'lucide-react';

export const ResumeSection: React.FC = () => {
  const { resume, settings } = usePortfolio();

  return (
    <section id="resume" className="section-pad border-drafting-b" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        <SectionHeader
          index="09"
          category="OFFICIAL CURRICULUM VITAE"
          title="Mechanical Engineering Resume & Technical Credentials"
          subtitle="Official verified document summarizing academic research, technical toolchains, engineering projects, and leadership."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '3rem',
            alignItems: 'center',
          }}
          className="resume-grid"
        >
          {/* Left Column: CV Overview & Highlights */}
          <div>
            <div
              className="monograph-card"
              style={{
                padding: '2.5rem',
                borderLeft: '4px solid var(--accent-brass)',
              }}
            >
              <div className="tech-label" style={{ marginBottom: '0.75rem' }}>
                EXECUTIVE SUMMARY // {settings.role || 'MECHANICAL ENGINEERING STUDENT'}
              </div>

              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                {settings.name || 'Adithya G'} — Engineering Profile
              </h3>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                Comprehensive curriculum vitae outlining kinematics research, advanced FEA/CFD finite element
                simulations, additive manufacturing process optimization, and computational engineering algorithms.
              </p>

              {/* Highlights */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem' }}>
                  <CheckCircle size={16} color="var(--accent-brass)" />
                  <span>SolidWorks Certified Professional (CSWP) & ANSYS Mechanical Simulation</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem' }}>
                  <CheckCircle size={16} color="var(--accent-brass)" />
                  <span>Published Experimental Research in Graphene Tribology & Wear Mechanics</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem' }}>
                  <CheckCircle size={16} color="var(--accent-brass)" />
                  <span>Multi-axis CNC VMC Machining & GD&T (ASME Y14.5) Blueprint Standards</span>
                </div>
              </div>

              {/* Download / View Button */}
              {resume.fileUrl ? (
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a
                    href={resume.fileUrl}
                    download={resume.fileName || 'Adithya_G_Mechanical_Engineering_Resume.pdf'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-lg"
                  >
                    <Download size={16} />
                    <span>DOWNLOAD OFFICIAL RESUME (PDF)</span>
                  </a>

                  <a
                    href={resume.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-lg"
                  >
                    <ExternalLink size={16} />
                    <span>PREVIEW IN BROWSER</span>
                  </a>
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '1rem',
                    background: 'var(--bg-surface-subtle)',
                    border: '1px solid var(--hairline)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <AlertCircle size={16} color="var(--accent-brass)" />
                  <span>Resume document currently being updated for 2025. Contact directly for immediate dispatch.</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Specimen Document Visual */}
          <div>
            <div
              style={{
                background: 'var(--bg-surface-subtle)',
                border: '1px solid var(--hairline-strong)',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <FileText size={48} color="var(--accent-brass)" style={{ margin: '0 auto 1rem auto' }} />
              <div className="tech-label" style={{ marginBottom: '0.4rem' }}>
                DOCUMENT ARCHIVE
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
                {resume.versionLabel || 'Mechanical Engineering Resume'}
              </div>
              <div className="tech-dim">FORMAT: PDF // LAST UPDATED: {resume.updatedAt || 'FEBRUARY 2025'}</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .resume-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
