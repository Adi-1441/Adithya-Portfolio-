// ==============================================================================
// STRICT PROTECTED ROUTE GUARD FOR ADMIN PORTAL
// ==============================================================================

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Compass } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--bg-parchment)',
          color: 'var(--text-primary)',
          gap: '1rem',
        }}
      >
        <Compass
          size={36}
          style={{
            animation: 'spin 3s linear infinite',
            color: 'var(--accent-brass)',
          }}
        />
        <div className="tech-label">VERIFYING ADMINISTRATIVE ACCESS...</div>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Strictly redirect unauthenticated requests to /admin/login
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
