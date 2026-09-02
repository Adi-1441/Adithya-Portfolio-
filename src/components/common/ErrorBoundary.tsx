// ==============================================================================
// APPLICATION ERROR BOUNDARY
// ==============================================================================

import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught Application Error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            backgroundColor: 'var(--bg-parchment)',
          }}
        >
          <div
            className="monograph-card"
            style={{
              maxWidth: '560px',
              width: '100%',
              padding: '2.5rem',
              borderTop: '4px solid var(--accent-rust)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <AlertTriangle size={28} color="var(--accent-rust)" />
              <div>
                <span className="tech-label" style={{ color: 'var(--accent-rust)' }}>
                  SYSTEM EXCEPTION // CODE 500
                </span>
                <h2 style={{ fontSize: '1.5rem', marginTop: '0.2rem' }}>Component Rendering Interrupted</h2>
              </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.92rem' }}>
              A client-side runtime error occurred in this view. The application execution was safely halted by the
              engineering error boundary.
            </p>

            {this.state.error && (
              <div
                style={{
                  background: 'var(--bg-surface-subtle)',
                  padding: '1rem',
                  border: '1px solid var(--hairline)',
                  borderRadius: 'var(--radius-xs)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: 'var(--text-secondary)',
                  overflowX: 'auto',
                  marginBottom: '1.5rem',
                }}
              >
                {this.state.error.toString()}
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button onClick={this.handleReload} className="btn btn-primary btn-sm">
                <RefreshCw size={14} /> Reload Workspace
              </button>
              <button onClick={this.handleGoHome} className="btn btn-outline btn-sm">
                <Home size={14} /> Return to Portfolio
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
