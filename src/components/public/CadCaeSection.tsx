// ==============================================================================
// CAD & CAE SIMULATION CASEBOOK SECTION
// Explicit Dynamics, Thermal CHT CFD, Modal Analysis
// ==============================================================================

import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SectionHeader } from '../common/SectionHeader';
import { VideoPlayer } from '../common/VideoPlayer';
import { Cpu, Activity, Layers, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CadCaeSection: React.FC = () => {
  const { cadCae } = usePortfolio();
  const publishedCadCae = cadCae.filter((c) => c.isPublished);

  return (
    <section id="cad-cae" className="section-pad border-drafting-b" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        <SectionHeader
          index="05"
          category="CAD / CAE SIMULATION CASEBOOK"
          title="Finite Element Stress Analysis, Dynamic Crash & Conjugate CFD"
          subtitle="Physics-based simulations verified against structural standards, turbulence boundary theory, and grid convergence indices."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2.5rem' }}>
          {publishedCadCae.map((item, idx) => (
            <article
              key={item.id}
              className="monograph-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid var(--hairline-strong)',
              }}
            >
              {/* Media Preview */}
              {item.mediaUrl && (
                <div style={{ position: 'relative', background: '#0B0D0F' }}>
                  {item.mediaType === 'video' ? (
                    <VideoPlayer src={item.mediaUrl} title={item.title} />
                  ) : (
                    <img
                      src={item.mediaUrl}
                      alt={item.title}
                      style={{
                        width: '100%',
                        height: '240px',
                        objectFit: 'cover',
                      }}
                    />
                  )}
                  <div
                    style={{
                      position: 'absolute',
                      top: '0.75rem',
                      left: '0.75rem',
                      background: 'rgba(20, 22, 26, 0.85)',
                      color: 'var(--accent-brass-light)',
                      padding: '0.25rem 0.6rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      borderRadius: 'var(--radius-xs)',
                    }}
                  >
                    SIM_0{idx + 1} // {item.analysisType}
                  </div>
                </div>
              )}

              {/* Body Content */}
              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.85rem', lineHeight: 1.35 }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {item.modelDescription}
                </p>

                {/* Key Metrics Callout */}
                {item.keyMetrics && (
                  <div
                    style={{
                      background: 'var(--bg-surface-subtle)',
                      borderLeft: '3px solid var(--accent-brass)',
                      padding: '0.85rem 1rem',
                      marginBottom: '1.5rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.76rem',
                      color: 'var(--text-primary)',
                      lineHeight: 1.5,
                    }}
                  >
                    <div style={{ color: 'var(--accent-brass)', marginBottom: '0.2rem', fontWeight: 600 }}>
                      KEY COMPUTATIONAL METRICS:
                    </div>
                    {item.keyMetrics}
                  </div>
                )}

                {/* Software Stack */}
                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--hairline-subtle)' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                    {item.software.map((sw, sidx) => (
                      <span key={sidx} className="tech-tag">
                        {sw}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/cad-cae/${item.id}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.76rem',
                      color: 'var(--text-primary)',
                      fontWeight: 600,
                    }}
                  >
                    <span>INSPECT SIMULATION STUDY</span>
                    <ChevronRight size={14} color="var(--accent-brass)" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
