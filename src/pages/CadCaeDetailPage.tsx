// ==============================================================================
// DETAILED CAD & CAE SIMULATION CASE STUDY VIEW (/cad-cae/:id)
// ==============================================================================

import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { VideoPlayer } from '../components/common/VideoPlayer';
import { ArrowLeft, Cpu } from 'lucide-react';

export const CadCaeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { cadCae } = usePortfolio();
  const navigate = useNavigate();

  const item = cadCae.find((c) => c.id === id);

  if (!item) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div className="container section-pad" style={{ textAlign: 'center', marginTop: '4rem' }}>
          <h2>CAD/CAE Simulation Study Not Found</h2>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
            <ArrowLeft size={16} /> Return to Portfolio
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, paddingTop: 'calc(var(--header-height) + 2rem)', paddingBottom: '5rem' }}>
        <div className="container">
          <div style={{ marginBottom: '2rem' }}>
            <button
              onClick={() => navigate(-1)}
              className="btn btn-ghost btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <ArrowLeft size={14} />
              <span>RETURN TO CAD/CAE CASEBOOK</span>
            </button>
          </div>

          <article className="monograph-card" style={{ border: '1px solid var(--hairline-strong)', padding: '3rem' }}>
            <div className="plate-header" style={{ marginBottom: '2rem' }}>
              <span className="tech-index">SIMULATION STUDY // {item.analysisType.toUpperCase()}</span>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {item.software.map((sw, idx) => (
                  <span key={idx} className="tech-tag">
                    {sw}
                  </span>
                ))}
              </div>
            </div>

            <h1 style={{ fontSize: '2.2rem', marginBottom: '1.5rem', lineHeight: 1.25 }}>
              {item.title}
            </h1>

            {/* Media Presentation */}
            {item.mediaUrl && (
              <div style={{ marginBottom: '2.5rem', border: '1px solid var(--hairline-strong)', overflow: 'hidden' }}>
                {item.mediaType === 'video' ? (
                  <VideoPlayer src={item.mediaUrl} title={item.title} />
                ) : (
                  <img
                    src={item.mediaUrl}
                    alt={item.title}
                    style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
                  />
                )}
              </div>
            )}

            {/* Metrics */}
            {item.keyMetrics && (
              <div
                style={{
                  background: 'var(--bg-surface-subtle)',
                  padding: '1.25rem',
                  borderLeft: '4px solid var(--accent-brass)',
                  marginBottom: '2.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.86rem',
                }}
              >
                <div style={{ color: 'var(--accent-brass)', fontWeight: 600, marginBottom: '0.3rem' }}>
                  KEY COMPUTATIONAL METRICS & VERIFICATION:
                </div>
                {item.keyMetrics}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h3 className="tech-label" style={{ marginBottom: '0.5rem' }}>
                  01 // PHYSICAL MODEL DEFINITION & BOUNDARY CONDITIONS
                </h3>
                <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {item.modelDescription}
                </p>
              </div>

              {item.simulationResults && (
                <div>
                  <h3 className="tech-label" style={{ color: '#2C3E35', marginBottom: '0.5rem' }}>
                    02 // FINITE ELEMENT / CFD NUMERICAL RESULTS
                  </h3>
                  <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {item.simulationResults}
                  </p>
                </div>
              )}
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};
