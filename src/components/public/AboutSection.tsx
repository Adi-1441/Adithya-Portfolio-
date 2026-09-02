// ==============================================================================
// EDITORIAL ABOUT SECTION
// ==============================================================================

import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SectionHeader } from '../common/SectionHeader';
import { Compass, CheckCircle2, Award, Cpu } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { settings } = usePortfolio();

  return (
    <section id="about" className="section-pad border-drafting-b" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        <SectionHeader
          index="01"
          category="BACKGROUND & PHILOSOPHY"
          title="Engineering Principles, Computational Rigor & Physical Prototyping"
          subtitle="A dedicated approach to mechanical systems: uniting theoretical mechanics, numerical simulation, and precision manufacturing."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '3.5rem',
            alignItems: 'start',
          }}
          className="about-grid"
        >
          {/* Narrative / Biography */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                lineHeight: 1.7,
                color: 'var(--text-primary)',
                marginBottom: '1.5rem',
              }}
            >
              {settings.aboutText ||
                'Dedicated to the disciplined study and physical realization of mechanical engineering principles. My work integrates rigorous analytical mechanics with computational modeling (CAD/CAE) and experimental validation.'}
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              My engineering foundation emphasizes first-principles calculation before initiating finite element
              discretization. Whether deriving equilibrium differential equations for stress concentrations, synthesizing
              involute gear profiles according to ISO standards, or conducting conjugate heat transfer CFD, each project
              demands precision and validation.
            </p>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Beyond digital simulation, I value the workshop floor: programming CNC vertical machining centers, optimizing
              tooling paths, and verifying critical dimensions using Coordinate Measuring Machines (CMM) with strict GD&T
              compliance.
            </p>

            {/* Core Values Checklist */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1rem',
                background: 'var(--bg-surface-subtle)',
                padding: '1.5rem',
                border: '1px solid var(--hairline)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="var(--accent-brass)" />
                <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>First-Principles Physics</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="var(--accent-brass)" />
                <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>Mesh Convergence & V&V</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="var(--accent-brass)" />
                <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>Design for Manufacturing (DFM)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="var(--accent-brass)" />
                <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>Experimental Metrology</span>
              </div>
            </div>
          </div>

          {/* Right Column: Engineering Monograph Sidebar */}
          <div>
            <div
              className="monograph-card"
              style={{
                padding: '2rem',
                borderTop: '3px solid var(--accent-brass)',
              }}
            >
              <div className="tech-label" style={{ marginBottom: '1rem' }}>
                CURRICULAR FOCUS & DOMAINS
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                    <Compass size={16} color="var(--accent-brass)" />
                    <h4 style={{ fontSize: '1rem' }}>Mechanisms & Kinematic Synthesis</h4>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Epicyclic planetary drives, 4-bar linkages, harmonic reducers, and multi-DoF robotic manipulators.
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                    <Cpu size={16} color="var(--accent-brass)" />
                    <h4 style={{ fontSize: '1rem' }}>Computational Mechanics (FEA / CFD)</h4>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Non-linear contact analysis, explicit dynamics crash simulation, conjugate heat transfer, and turbulence modeling.
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                    <Award size={16} color="var(--accent-brass)" />
                    <h4 style={{ fontSize: '1rem' }}>Precision Prototyping & Inspection</h4>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Multi-axis CNC milling, metal additive manufacturing (LPBF), optical profilometry, and strain gauge telemetry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
};
