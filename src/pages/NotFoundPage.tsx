// ==============================================================================
// 404 NOT FOUND PAGE
// ==============================================================================

import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { Compass, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem 1.5rem',
        }}
        className="drafting-surface"
      >
        <div
          className="monograph-card"
          style={{
            maxWidth: '560px',
            width: '100%',
            padding: '3.5rem',
            textAlign: 'center',
            borderTop: '4px solid var(--accent-brass)',
          }}
        >
          <Compass size={40} color="var(--accent-brass)" style={{ margin: '0 auto 1.5rem auto' }} />

          <span className="tech-label" style={{ color: 'var(--accent-brass)', display: 'block', marginBottom: '0.5rem' }}>
            COORDINATE ERROR // 404 NOT FOUND
          </span>

          <h1 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>
            Specimen Not Located
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            The requested archival plate, CAD model, or route is not cataloged in the portfolio repository.
          </p>

          <Link to="/" className="btn btn-primary btn-lg">
            <Home size={16} />
            <span>RETURN TO PORTFOLIO ARCHIVE</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};
