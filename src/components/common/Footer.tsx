// ==============================================================================
// HERITAGE ENGINEERING FOOTER
// Technical ISO annotations, contact references, and copyright
// ==============================================================================

import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Compass, Shield, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const { settings } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: 'var(--bg-dark-specimen)',
        color: 'var(--text-inverse)',
        borderTop: '1px solid var(--hairline-dark-strong)',
        paddingTop: '4.5rem',
        paddingBottom: '3rem',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Top Technical Identification Plate */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            paddingBottom: '3rem',
            marginBottom: '2.5rem',
          }}
        >
          {/* Column 1: Monograph Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <Compass size={20} color="var(--accent-brass-light)" />
              <span className="tech-label" style={{ color: 'var(--accent-brass-light)' }}>
                PORTFOLIO SPECIFICATION // ARCHIVE 2025
              </span>
            </div>
            <h3 style={{ color: '#FFFFFF', fontSize: '1.4rem', marginBottom: '0.5rem' }}>
              {settings.name || 'Adithya G'}
            </h3>
            <p style={{ color: 'var(--text-inverse-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
              {settings.role || 'Mechanical Engineering Student'} specializing in kinematic design, computational
              analysis (FEA/CFD), and advanced manufacturing.
            </p>
          </div>

          {/* Column 2: Engineering Dispatches */}
          <div>
            <div className="tech-label" style={{ color: 'var(--text-inverse-muted)', marginBottom: '0.75rem' }}>
              COMMUNICATION CHANNELS
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.86rem' }}>
              <li>
                <span style={{ color: 'var(--text-inverse-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                  EMAIL:
                </span>{' '}
                <a
                  href={`mailto:${settings.contactEmail || 'adithyag.eng@gmail.com'}`}
                  style={{ color: '#FFFFFF', textDecoration: 'underline' }}
                >
                  {settings.contactEmail || 'adithyag.eng@gmail.com'}
                </a>
              </li>
              <li>
                <span style={{ color: 'var(--text-inverse-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                  LOCATION:
                </span>{' '}
                <span style={{ color: '#D6DADE' }}>{settings.location || 'Bengaluru, India'}</span>
              </li>
              {settings.linkedinUrl && (
                <li>
                  <span style={{ color: 'var(--text-inverse-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                    LINKEDIN:
                  </span>{' '}
                  <a
                    href={settings.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--accent-brass-light)' }}
                  >
                    Verified Profile ↗
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Standards & Administration */}
          <div>
            <div className="tech-label" style={{ color: 'var(--text-inverse-muted)', marginBottom: '0.75rem' }}>
              SYSTEM SPECIFICATIONS
            </div>
            <p style={{ color: 'var(--text-inverse-muted)', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', lineHeight: 1.6 }}>
              ASME Y14.5 GD&T Standards
              <br />
              ISO 6336 Gear Fatigue Ratings
              <br />
              ANSYS Simulation V&V Standards
            </p>
            <div style={{ marginTop: '1rem' }}>
              <Link
                to="/admin"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-inverse-muted)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '0.35rem 0.65rem',
                  borderRadius: 'var(--radius-xs)',
                }}
              >
                <Shield size={12} color="var(--accent-brass-light)" />
                <span>ADMIN MANAGEMENT PORTAL</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Baseline Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-inverse-muted)',
          }}
        >
          <div>
            © {new Date().getFullYear()} {settings.name || 'Adithya G'}. All Engineering Rights Reserved.
          </div>

          <button
            onClick={scrollToTop}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-xs)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: 'pointer',
            }}
          >
            <span>RETURN TO TOP</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
};
