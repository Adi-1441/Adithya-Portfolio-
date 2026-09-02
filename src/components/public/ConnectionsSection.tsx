// ==============================================================================
// VERIFIED PROFESSIONAL CONNECTIONS SECTION
// LinkedIn & Verified Engineering Channels (Single Connection System)
// ==============================================================================

import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SectionHeader } from '../common/SectionHeader';
import { Linkedin, Github, Mail, Globe, ExternalLink } from 'lucide-react';

export const ConnectionsSection: React.FC = () => {
  const { connections } = usePortfolio();
  const enabledConnections = connections.filter((c) => c.isEnabled);

  const getIconComponent = (iconName: string, platform: string) => {
    const key = (iconName || platform).toLowerCase();
    if (key.includes('linkedin')) return <Linkedin size={22} color="#0A66C2" />;
    if (key.includes('github')) return <Github size={22} color="var(--text-primary)" />;
    if (key.includes('mail') || key.includes('email')) return <Mail size={22} color="var(--accent-brass)" />;
    return <Globe size={22} color="var(--text-primary)" />;
  };

  return (
    <section id="connections" className="section-pad border-drafting-b drafting-surface">
      <div className="container">
        <SectionHeader
          index="10"
          category="VERIFIED PROFESSIONAL PORTALS"
          title="Connections & Professional Network"
          subtitle="Direct verified communication channels for professional inquiries, engineering collaborations, and research dialogues."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {enabledConnections.map((conn, idx) => (
            <a
              key={conn.id}
              href={conn.url}
              target="_blank"
              rel="noopener noreferrer"
              className="monograph-card"
              style={{
                padding: '2.2rem',
                border: '1px solid var(--hairline-strong)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.25rem',
                  }}
                >
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      background: 'var(--bg-surface-subtle)',
                      border: '1px solid var(--hairline)',
                      borderRadius: 'var(--radius-xs)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {getIconComponent(conn.icon, conn.platform)}
                  </div>

                  <span className="tech-index">[PORTAL 0{idx + 1}]</span>
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}>{conn.name}</h3>

                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '1.5rem' }}>
                  {conn.description || `Connect with me on ${conn.name} for official engineering correspondence.`}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid var(--hairline)',
                  paddingTop: '1rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.76rem',
                  color: 'var(--accent-brass)',
                  fontWeight: 600,
                }}
              >
                <span>OPEN {conn.platform.toUpperCase()} PORTAL</span>
                <ExternalLink size={14} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
