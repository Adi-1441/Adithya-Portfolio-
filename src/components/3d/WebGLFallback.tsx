// ==============================================================================
// 2D ENGINEERING BLUEPRINT FALLBACK FOR NON-WEBGL DEVICES
// ==============================================================================

import React from 'react';

export const WebGLFallback: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: '380px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-dark-specimen)',
        border: '1px solid var(--hairline-dark-strong)',
        position: 'relative',
        padding: '2rem',
        overflow: 'hidden',
      }}
    >
      {/* 2D SVG Planetary Gear Specimen Diagram */}
      <svg
        viewBox="0 0 400 400"
        style={{ width: '100%', maxWidth: '320px', height: 'auto', opacity: 0.85 }}
      >
        <circle cx="200" cy="200" r="160" fill="none" stroke="#3D5A80" strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="200" cy="200" r="150" fill="none" stroke="#B8860B" strokeWidth="3" />
        <circle cx="200" cy="200" r="60" fill="none" stroke="#B8860B" strokeWidth="2.5" />
        <circle cx="200" cy="200" r="25" fill="#1F2328" stroke="#FFFFFF" strokeWidth="1.5" />

        {/* Planet Gears */}
        {[0, 120, 240].map((angle, idx) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 200 + 105 * Math.cos(rad);
          const cy = 200 + 105 * Math.sin(rad);
          return (
            <g key={idx}>
              <circle cx={cx} cy={cy} r="45" fill="#1A1D20" stroke="#C5A059" strokeWidth="2" />
              <circle cx={cx} cy={cy} r="12" fill="none" stroke="#FFFFFF" strokeWidth="1" />
              <line x1={cx - 45} y1={cy} x2={cx + 45} y2={cy} stroke="#3D5A80" strokeWidth="1" strokeDasharray="2 2" />
              <line x1={cx} y1={cy - 45} x2={cx} y2={cy + 45} stroke="#3D5A80" strokeWidth="1" strokeDasharray="2 2" />
            </g>
          );
        })}

        {/* Centerlines & Dimension annotations */}
        <line x1="20" y1="200" x2="380" y2="200" stroke="#525862" strokeWidth="0.8" strokeDasharray="6 3 2 3" />
        <line x1="200" y1="20" x2="200" y2="380" stroke="#525862" strokeWidth="0.8" strokeDasharray="6 3 2 3" />
      </svg>

      <div
        style={{
          marginTop: '1.25rem',
          textAlign: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--text-inverse-muted)',
          letterSpacing: '0.08em',
        }}
      >
        <span style={{ color: 'var(--accent-brass-light)' }}>SPECIMEN ISO-2025</span> // 2D KINEMATICS PROJECTION
      </div>
    </div>
  );
};
