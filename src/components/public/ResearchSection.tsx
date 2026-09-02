// ==============================================================================
// EDITORIAL RESEARCH & EXPERIMENTAL MONOGRAPHS SECTION
// ==============================================================================

import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SectionHeader } from '../common/SectionHeader';
import { BookOpen, FlaskConical, Microscope, FileText, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ResearchSection: React.FC = () => {
  const { research } = usePortfolio();
  const publishedResearch = research.filter((r) => r.isPublished);

  return (
    <section id="research" className="section-pad border-drafting-b drafting-surface">
      <div className="container">
        <SectionHeader
          index="04"
          category="RESEARCH & EXPERIMENTAL INVESTIGATION"
          title="Materials Characterization, Tribology & Thermo-Mechanical Fatigue"
          subtitle="Empirical laboratory investigations, powder metallurgy fabrication, and microstructural analysis."
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {publishedResearch.map((item, idx) => (
            <article
              key={item.id}
              className="monograph-card"
              style={{
                border: '1px solid var(--hairline-strong)',
                padding: '2.5rem',
                position: 'relative',
              }}
            >
              {/* Header Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid var(--hairline)',
                  paddingBottom: '0.75rem',
                  marginBottom: '1.5rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span className="tech-index">[PAPER 0{idx + 1}]</span>
                  <span style={{ textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-brass)' }}>
                    {item.focusArea}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className={`status-pill ${item.status === 'Completed' ? 'status-pill-active' : 'status-pill-inactive'}`}>
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Title & Objective */}
              <h3 style={{ fontSize: '1.45rem', marginBottom: '1rem', lineHeight: 1.3 }}>
                {item.title}
              </h3>

              <div
                style={{
                  background: 'var(--bg-surface-subtle)',
                  padding: '1.25rem',
                  borderLeft: '3px solid var(--accent-brass)',
                  marginBottom: '2rem',
                }}
              >
                <div className="tech-label" style={{ marginBottom: '0.25rem' }}>
                  RESEARCH OBJECTIVE
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {item.objective}
                </p>
              </div>

              {/* Multi-Column Experimental Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '1.75rem',
                  marginBottom: '2rem',
                }}
              >
                {/* 1. Materials */}
                {item.materials && (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                      <FlaskConical size={16} color="var(--accent-brass)" />
                      <span className="tech-label">MATERIALS SPECIFICATION</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {item.materials}
                    </p>
                  </div>
                )}

                {/* 2. Fabrication Process */}
                {item.fabricationProcess && (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                      <Microscope size={16} color="var(--accent-steel)" />
                      <span className="tech-label" style={{ color: 'var(--accent-steel)' }}>
                        FABRICATION & PROCESSING
                      </span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {item.fabricationProcess}
                    </p>
                  </div>
                )}

                {/* 3. Testing & Results */}
                {item.results && (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                      <CheckCircle size={16} color="#2C3E35" />
                      <span className="tech-label" style={{ color: '#2C3E35' }}>
                        EMPIRICAL FINDINGS
                      </span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {item.results}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid var(--hairline-subtle)',
                  paddingTop: '1.25rem',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <BookOpen size={14} />
                  <span>EXPERIMENTAL INVESTIGATION LOG</span>
                </div>

                <Link to={`/research/${item.id}`} className="btn btn-outline btn-sm">
                  <FileText size={14} />
                  <span>VIEW FULL RESEARCH MONOGRAPH</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
