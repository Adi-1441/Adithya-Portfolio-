// ==============================================================================
// EDITORIAL SECTION HEADER BLOCK
// Timeless technical plate formatting with section roman indices
// ==============================================================================

import React from 'react';

interface SectionHeaderProps {
  index: string; // e.g., '01', '02', 'IV'
  category: string; // e.g., 'KINEMATICS & CAD'
  title: string;
  subtitle?: string;
  isDark?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  index,
  category,
  title,
  subtitle,
  isDark = false,
}) => {
  return (
    <div style={{ marginBottom: '3.5rem', position: 'relative' }}>
      {/* Top Technical Metadata Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: isDark ? '1px solid var(--hairline-dark)' : '1px solid var(--hairline)',
          paddingBottom: '0.6rem',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span
            className="tech-index"
            style={{
              color: isDark ? 'var(--accent-brass-light)' : 'var(--accent-brass)',
            }}
          >
            [ SECTION {index} ]
          </span>
          <span
            style={{
              color: isDark ? 'var(--hairline-dark-strong)' : 'var(--hairline-strong)',
              fontSize: '0.75rem',
            }}
          >
            //
          </span>
          <span
            className="tech-label"
            style={{
              color: isDark ? 'var(--text-inverse-muted)' : 'var(--text-secondary)',
            }}
          >
            {category}
          </span>
        </div>

        <span
          className="tech-dim"
          style={{
            color: isDark ? 'var(--text-inverse-muted)' : 'var(--text-muted)',
            display: 'none',
          }}
        >
          ISO-9001 ARCHIVE
        </span>
      </div>

      {/* Main Title */}
      <h2
        className="display-section"
        style={{
          color: isDark ? 'var(--text-inverse)' : 'var(--text-primary)',
          maxWidth: '850px',
        }}
      >
        {title}
      </h2>

      {/* Subtitle / Lead Statement */}
      {subtitle && (
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.05rem',
            lineHeight: 1.6,
            color: isDark ? 'var(--text-inverse-muted)' : 'var(--text-secondary)',
            marginTop: '0.85rem',
            maxWidth: '780px',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
