// ==============================================================================
// DETAILED RESEARCH MONOGRAPH VIEW (/research/:id)
// ==============================================================================

import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { ArrowLeft, BookOpen, FlaskConical, Microscope, CheckCircle } from 'lucide-react';

export const ResearchDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { research } = usePortfolio();
  const navigate = useNavigate();

  const item = research.find((r) => r.id === id);

  if (!item) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div className="container section-pad" style={{ textAlign: 'center', marginTop: '4rem' }}>
          <h2>Research Monograph Not Found</h2>
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
              <span>RETURN TO RESEARCH LOGS</span>
            </button>
          </div>

          <article className="monograph-card" style={{ border: '1px solid var(--hairline-strong)', padding: '3rem' }}>
            <div className="plate-header" style={{ marginBottom: '2rem' }}>
              <span className="tech-index">RESEARCH MONOGRAPH // {item.focusArea.toUpperCase()}</span>
              <span className={`status-pill ${item.status === 'Completed' ? 'status-pill-active' : 'status-pill-inactive'}`}>
                {item.status}
              </span>
            </div>

            <h1 style={{ fontSize: '2.2rem', marginBottom: '1.5rem', lineHeight: 1.25 }}>
              {item.title}
            </h1>

            {/* Research Objective Box */}
            <div
              style={{
                background: 'var(--bg-surface-subtle)',
                padding: '1.5rem',
                borderLeft: '4px solid var(--accent-brass)',
                marginBottom: '2.5rem',
              }}
            >
              <div className="tech-label" style={{ marginBottom: '0.4rem' }}>
                RESEARCH HYPOTHESIS & OBJECTIVE
              </div>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                {item.objective}
              </p>
            </div>

            {/* Detailed Investigation Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {item.materials && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <FlaskConical size={18} color="var(--accent-brass)" />
                    <h3 className="tech-label">01 // MATERIAL COMPOSITION & PREPARATION</h3>
                  </div>
                  <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {item.materials}
                  </p>
                </div>
              )}

              {item.fabricationProcess && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Microscope size={18} color="var(--accent-steel)" />
                    <h3 className="tech-label" style={{ color: 'var(--accent-steel)' }}>
                      02 // FABRICATION & THERMAL PROCESSING
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {item.fabricationProcess}
                  </p>
                </div>
              )}

              {item.testingAndValidation && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <BookOpen size={18} color="#2C3E35" />
                    <h3 className="tech-label" style={{ color: '#2C3E35' }}>
                      03 // TESTING PROTOCOL & METROLOGY (ASTM)
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {item.testingAndValidation}
                  </p>
                </div>
              )}

              {item.results && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <CheckCircle size={18} color="#2C3E35" />
                    <h3 className="tech-label" style={{ color: '#2C3E35' }}>
                      04 // EMPIRICAL FINDINGS & MICROSCOPY
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {item.results}
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
