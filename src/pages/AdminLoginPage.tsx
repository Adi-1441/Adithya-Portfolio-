// ==============================================================================
// SECURE ADMIN LOGIN PORTAL (/admin/login)
// Real Credential Authentication — No Arbitrary Password Bypasses
// ==============================================================================

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, Mail, AlertTriangle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { getSupabaseConfigStatus } from '../lib/supabase';

export const AdminLoginPage: React.FC = () => {
  const { signIn, isAuthenticated, isLoading, error: authError, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const configStatus = getSupabaseConfigStatus();

  // If already authenticated, redirect to /admin immediately
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    clearError();

    if (!email.trim() || !password) {
      setFormError('Please provide both administrator email and password.');
      return;
    }

    setIsSubmitting(true);
    const result = await signIn(email, password);
    setIsSubmitting(false);

    if (result.success) {
      const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    } else {
      setFormError(result.error || 'Authentication failed. Invalid administrator credentials.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        backgroundColor: 'var(--bg-parchment)',
      }}
      className="drafting-surface"
    >
      <div style={{ width: '100%', maxWidth: '480px' }}>
        {/* Back Link */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
            }}
          >
            <ArrowLeft size={14} />
            <span>RETURN TO PUBLIC PORTFOLIO</span>
          </Link>
        </div>

        {/* Login Box */}
        <div
          className="monograph-card"
          style={{
            padding: '3rem 2.5rem',
            borderTop: '4px solid var(--accent-brass)',
            boxShadow: 'var(--shadow-modal)',
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div
              style={{
                width: '54px',
                height: '54px',
                margin: '0 auto 1rem auto',
                background: 'var(--bg-surface-subtle)',
                border: '1.5px solid var(--accent-brass)',
                borderRadius: 'var(--radius-xs)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Shield size={28} color="var(--accent-brass)" />
            </div>

            <div className="tech-label" style={{ marginBottom: '0.3rem' }}>
              ADMINISTRATIVE PORTAL
            </div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 500 }}>Secure Management Access</h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
              Authenticated session required to manage portfolio records and media.
            </p>
          </div>

          {/* Error Message Box */}
          {(formError || authError) && (
            <div
              style={{
                background: '#FDF2F2',
                border: '1px solid #F8B4B4',
                padding: '0.9rem 1.1rem',
                borderRadius: 'var(--radius-xs)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.6rem',
              }}
            >
              <AlertTriangle size={18} color="var(--accent-rust)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.84rem', color: '#9B1C1C', lineHeight: 1.45 }}>
                <strong>Access Denied:</strong> {formError || authError}
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="admin-email">
                ADMINISTRATOR EMAIL
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="admin-email"
                  type="email"
                  required
                  autoComplete="email"
                  className="form-input"
                  placeholder="admin@portfolio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Mail
                  size={16}
                  color="var(--text-muted)"
                  style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label className="form-label" htmlFor="admin-password">
                ADMINISTRATOR PASSWORD
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="admin-password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="form-input"
                  placeholder="••••••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Lock
                  size={16}
                  color="var(--text-muted)"
                  style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
            >
              <Lock size={16} />
              <span>{isSubmitting ? 'VERIFYING CREDENTIALS...' : 'AUTHENTICATE SESSION'}</span>
            </button>
          </form>

          {/* Configuration / Environment Status Badge */}
          <div
            style={{
              marginTop: '2rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid var(--hairline)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-secondary)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>AUTH PROVIDER:</span>
              <span style={{ color: configStatus.isConfigured ? '#2E6B34' : 'var(--accent-brass)', fontWeight: 600 }}>
                {configStatus.isConfigured ? 'SUPABASE AUTH (CONNECTED)' : 'LOCAL STANDALONE (STRICT AUTH)'}
              </span>
            </div>

            {!configStatus.isConfigured && (
              <div
                style={{
                  background: 'var(--bg-surface-subtle)',
                  padding: '0.75rem',
                  border: '1px solid var(--hairline)',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.7rem',
                  lineHeight: 1.5,
                }}
              >
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                  DEVELOPMENT CREDENTIALS (LOCAL MODE):
                </div>
                <div>Email: <code>adithyag.eng@gmail.com</code></div>
                <div>Password: <code>AdithyaMech2025!AdminSecure</code></div>
                <div style={{ marginTop: '0.3rem', color: 'var(--text-muted)', fontSize: '0.66rem' }}>
                  * Connect Supabase by configuring VITE_SUPABASE_URL in .env
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
