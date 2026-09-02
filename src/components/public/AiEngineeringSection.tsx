// ==============================================================================
// AI × MECHANICAL ENGINEERING SECTION
// Scientific Machine Learning, PINNs, Vibration Analytics & Automation
// ==============================================================================

import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { Brain, Cpu, Database, Network } from 'lucide-react';

export const AiEngineeringSection: React.FC = () => {
  return (
    <section id="ai-engineering" className="section-pad border-drafting-b drafting-surface">
      <div className="container">
        <SectionHeader
          index="06"
          category="AI × COMPUTATIONAL MECHANICS"
          title="Physics-Informed Deep Learning & Engineering Analytics"
          subtitle="Applying neural operators, loss-constrained differential equations, and accelerometer time-series analytics to mechanical systems."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {/* Card 1: PINNs */}
          <div
            className="monograph-card"
            style={{
              padding: '2rem',
              borderTop: '3px solid var(--accent-brass)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <Brain size={22} color="var(--accent-brass)" />
              <div className="tech-index">MODULE 01</div>
            </div>

            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>
              Physics-Informed Neural Networks (PINNs)
            </h3>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Embedding fundamental mechanical conservation laws (Navier-Stokes and Cauchy stress equations) into PyTorch
              loss functions via automatic differentiation to infer unmeasured temperature and velocity fields from sparse
              thermocouple data.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              <span className="tech-tag">PyTorch</span>
              <span className="tech-tag">AutoGrad</span>
              <span className="tech-tag">PDE Solvers</span>
              <span className="tech-tag">Inverse Mechanics</span>
            </div>
          </div>

          {/* Card 2: Predictive Maintenance */}
          <div
            className="monograph-card"
            style={{
              padding: '2rem',
              borderTop: '3px solid var(--accent-steel)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <Network size={22} color="var(--accent-steel)" />
              <div className="tech-index" style={{ color: 'var(--accent-steel)' }}>
                MODULE 02
              </div>
            </div>

            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>
              Vibration Telemetry & Bearing Fault Analytics
            </h3>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Spectral feature extraction from high-frequency triaxial accelerometer feeds (Fast Fourier Transform & Wavelet
              Packet Decomposition) paired with gradient boosted classifiers for early inner/outer race spall identification.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              <span className="tech-tag">FFT Spectral Analysis</span>
              <span className="tech-tag">Scikit-Learn</span>
              <span className="tech-tag">Vibration Telemetry</span>
            </div>
          </div>

          {/* Card 3: Parametric CAD Scripting */}
          <div
            className="monograph-card"
            style={{
              padding: '2rem',
              borderTop: '3px solid #2C3E35',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <Cpu size={22} color="#2C3E35" />
              <div className="tech-index" style={{ color: '#2C3E35' }}>
                MODULE 03
              </div>
            </div>

            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>
              Automated Geometry Generation & Scripting
            </h3>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Python-driven CAD scripting via SolidWorks and Fusion 360 APIs for rapid parametric sweep generation, automated
              meshing batch jobs in ANSYS, and generative design lattice synthesis.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              <span className="tech-tag">Python CAD API</span>
              <span className="tech-tag">Parametric Sweeps</span>
              <span className="tech-tag">ANSYS PyPrime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
