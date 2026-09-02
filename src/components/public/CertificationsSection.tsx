// ==============================================================================
// CERTIFICATIONS & PROFESSIONAL CREDENTIALS SECTION
// ==============================================================================

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SectionHeader } from '../common/SectionHeader';
import { Award, ExternalLink, ShieldCheck, FileCheck } from 'lucide-react';
import { MediaLightbox } from '../common/MediaLightbox';

export const CertificationsSection: React.FC = () => {
  const { certifications } = usePortfolio();
  const publishedCerts = certifications.filter((c) => c.isPublished);

  const [activeCertUrl, setActiveCertUrl] = useState<string | null>(null);
  const [activeCertTitle, setActiveCertTitle] = useState<string>('');

  return (
    <section id="certifications" className="section-pad border-drafting-b" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        <SectionHeader
          index="07"
          category="ACCREDITATIONS & CREDENTIALS"
          title="Verified Professional Certifications & Standards Compliance"
          subtitle="Accredited training in parametric mechanical CAD, FEA numerical methods, and geometric dimensioning standards."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {publishedCerts.map((cert, idx) => (
            <div
              key={cert.id}
              className="monograph-card"
              style={{
                padding: '2rem',
                border: '1px solid var(--hairline-strong)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldCheck size={18} color="var(--accent-brass)" />
                    <span className="tech-index">[CERT 0{idx + 1}]</span>
                  </div>
                  <span className="tech-dim">ISSUED: {cert.issueDate}</span>
                </div>

                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem', lineHeight: 1.35 }}>
                  {cert.title}
                </h3>

                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: 'var(--accent-brass)',
                    marginBottom: '1rem',
                    fontWeight: 500,
                  }}
                >
                  {cert.issuer}
                </div>

                {cert.credentialId && (
                  <div
                    style={{
                      background: 'var(--bg-surface-subtle)',
                      padding: '0.6rem 0.85rem',
                      borderRadius: 'var(--radius-xs)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.74rem',
                      color: 'var(--text-secondary)',
                      marginBottom: '1.5rem',
                    }}
                  >
                    CREDENTIAL ID: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{cert.credentialId}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid var(--hairline)',
                  paddingTop: '1rem',
                  gap: '0.75rem',
                }}
              >
                {cert.certificateFileUrl ? (
                  <button
                    onClick={() => {
                      setActiveCertUrl(cert.certificateFileUrl || '');
                      setActiveCertTitle(cert.title);
                    }}
                    className="btn btn-outline btn-sm"
                  >
                    <FileCheck size={14} />
                    <span>VIEW CERTIFICATE</span>
                  </button>
                ) : (
                  <span className="tech-dim">CERTIFICATE ON FILE</span>
                )}

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost btn-sm"
                    title="Verify Credential"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox for certificate viewing */}
        <MediaLightbox
          isOpen={Boolean(activeCertUrl)}
          onClose={() => setActiveCertUrl(null)}
          imageUrl={activeCertUrl || ''}
          caption={activeCertTitle}
        />
      </div>
    </section>
  );
};
