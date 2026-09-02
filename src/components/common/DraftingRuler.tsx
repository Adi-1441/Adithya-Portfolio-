// ==============================================================================
// DRAFTING DIMENSION RULER & SCROLL TRACKER
// ==============================================================================

import React, { useState, useEffect } from 'react';

export const DraftingRuler: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        left: '0',
        top: 'var(--header-height)',
        bottom: '0',
        width: '28px',
        borderRight: '1px solid var(--hairline-subtle)',
        background: 'rgba(247, 245, 240, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1rem 0',
        pointerEvents: 'none',
      }}
      className="drafting-ruler-bar"
    >
      {/* Top scale marker */}
      <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-muted)' }}>
        00
      </div>

      {/* Center tick marks */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '8px',
          paddingRight: '2px',
        }}
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: i % 4 === 0 ? '10px' : '5px',
              height: '1px',
              background: i % 4 === 0 ? 'var(--accent-brass)' : 'var(--hairline-strong)',
            }}
          />
        ))}
      </div>

      {/* Dynamic Indicator */}
      <div
        style={{
          position: 'absolute',
          top: `calc(${scrollProgress}% - 4px)`,
          left: '0',
          right: '0',
          height: '2px',
          background: 'var(--accent-brass)',
          transition: 'top 0.1s linear',
        }}
      />

      {/* Bottom scale marker */}
      <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--accent-brass)', fontWeight: 600 }}>
        {Math.round(scrollProgress)}%
      </div>

      <style>{`
        @media (max-width: 900px) {
          .drafting-ruler-bar {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
