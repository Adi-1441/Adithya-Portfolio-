// ==============================================================================
// EDITORIAL HERO SECTION
// Classic engineering layout, large typography, 3D mechanical specimen
// ==============================================================================

import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { MechanicalArtifact } from '../3d/MechanicalArtifact';
import { ArrowDownRight, Compass, FileText, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { settings } = usePortfolio();

  return (
    <section
      id="hero"
      className="drafting-surface"
      style={{
        minHeight: 'calc(100vh - var(--header-height))',
        paddingTop: 'calc(var(--header-height) + 2.5rem)',
        paddingBottom: '4.5rem',
        borderBottom: '1px solid var(--hairline)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="container">
        {/* Top Identification Badge Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--hairline)',
            paddingBottom: '0.85rem',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Compass size={16} color="var(--accent-brass)" />
            <span className="tech-label">VOLUME I // MONOGRAPH ARCHIVE</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span className="tech-tag">BENGALURU, INDIA</span>
            <span className="tech-tag">MECHANICAL ENGINEERING</span>
          </div>
        </div>

        {/* Hero Main Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.85fr',
            gap: '3.5rem',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Left Column: Typography & Statements */}
          <div>
            <div
              className="tech-dim"
              style={{
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text-secondary)',
              }}
            >
              PORTFOLIO & TECHNICAL DISPATCHES OF
            </div>

            <h1 className="display-hero" style={{ marginBottom: '1.25rem' }}>
              {settings.name || 'Adithya G'}
            </h1>

            <div
              style={{
                display: 'inline-block',
                padding: '0.4rem 0.9rem',
                background: 'var(--bg-surface-subtle)',
                borderLeft: '3px solid var(--accent-brass)',
                marginBottom: '1.75rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: 'var(--text-primary)',
                  textTransform: 'uppercase',
                }}
              >
                {settings.role || 'Mechanical Engineering Student'}
              </span>
            </div>

            <p
              className="editorial-lead"
              style={{
                marginBottom: '2rem',
                maxWidth: '620px',
              }}
            >
              "{settings.heroStatement ||
                'Undergraduate Mechanical Engineering researcher focusing on mechanical design, finite element analysis (FEA), computational fluid dynamics (CFD), precision manufacturing, and the integration of machine learning into engineering systems.'}"
            </p>

            {/* Discipline Annotation Tags */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.85rem',
                marginBottom: '2.5rem',
              }}
              className="discipline-grid"
            >
              <div
                style={{
                  padding: '0.75rem 1rem',
                  border: '1px solid var(--hairline)',
                  background: 'var(--bg-surface)',
                }}
              >
                <div className="tech-index" style={{ fontSize: '0.72rem', marginBottom: '0.2rem' }}>
                  01 // KINEMATICS & CAD
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Multi-body mechanisms, gears, and GD&T tolerance stacks
                </div>
              </div>

              <div
                style={{
                  padding: '0.75rem 1rem',
                  border: '1px solid var(--hairline)',
                  background: 'var(--bg-surface)',
                }}
              >
                <div className="tech-index" style={{ fontSize: '0.72rem', marginBottom: '0.2rem' }}>
                  02 // COMPUTATIONAL CAE
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Non-linear FEA, explicit crash impact, and conjugate CFD
                </div>
              </div>

              <div
                style={{
                  padding: '0.75rem 1rem',
                  border: '1px solid var(--hairline)',
                  background: 'var(--bg-surface)',
                }}
              >
                <div className="tech-index" style={{ fontSize: '0.72rem', marginBottom: '0.2rem' }}>
                  03 // ADVANCED FABRICATION
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  CNC VMC machining, LPBF metal additive, and metrology
                </div>
              </div>

              <div
                style={{
                  padding: '0.75rem 1rem',
                  border: '1px solid var(--hairline)',
                  background: 'var(--bg-surface)',
                }}
              >
                <div className="tech-index" style={{ fontSize: '0.72rem', marginBottom: '0.2rem' }}>
                  04 // AI × ENGINEERING
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Physics-Informed Neural Networks & predictive diagnostics
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#projects" className="btn btn-primary btn-lg">
                <span>INSPECT PROJECTS</span>
                <ArrowDownRight size={16} />
              </a>

              <a href="#resume" className="btn btn-outline btn-lg">
                <FileText size={16} />
                <span>VIEW RESUME</span>
              </a>
            </div>
          </div>

          {/* Right Column: 3D Machined Mechanical Specimen */}
          <div style={{ position: 'relative' }}>
            <div
              className="monograph-card"
              style={{
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden',
                border: '1px solid var(--hairline-strong)',
                boxShadow: 'var(--shadow-elevated)',
              }}
            >
              <MechanicalArtifact />
            </div>

            {/* Specimen Annotation Plate */}
            <div
              style={{
                marginTop: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.5rem 0.85rem',
                background: 'var(--bg-surface)',
                border: '1px solid var(--hairline)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--text-secondary)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={13} color="var(--accent-brass)" />
                <span>SPECIMEN: 2-STAGE PLANETARY TRANSMISSION</span>
              </div>
              <span>INTERACTIVE 3D</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
        @media (max-width: 640px) {
          .discipline-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
