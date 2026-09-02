// ==============================================================================
// ADMIN MANAGEMENT PORTAL LAYOUT
// Sidebar navigation, Session status, Public portfolio view button, Logout
// ==============================================================================

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  FolderKanban,
  Film,
  BookOpen,
  Cpu,
  Wrench,
  Award,
  FileText,
  Paperclip,
  Share2,
  Sliders,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
  Menu,
  X,
  Compass,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, signOut, isConfigured } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const navLinks = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Projects & Media', path: '/admin/projects', icon: FolderKanban },
    { label: 'Media Library', path: '/admin/media', icon: Film },
    { label: 'Research Monographs', path: '/admin/research', icon: BookOpen },
    { label: 'CAD & CAE Studies', path: '/admin/cad-cae', icon: Cpu },
    { label: 'Skills & Tools', path: '/admin/skills', icon: Wrench },
    { label: 'Certifications', path: '/admin/certifications', icon: Award },
    { label: 'Technical Articles', path: '/admin/articles', icon: FileText },
    { label: 'Resume Document', path: '/admin/resume', icon: Paperclip },
    { label: 'Connections (LinkedIn)', path: '/admin/connections', icon: Share2 },
    { label: 'Section Visibility', path: '/admin/visibility', icon: Sliders },
    { label: 'General Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg-parchment)' }}>
      {/* Sidebar Navigation */}
      <aside
        className={`admin-sidebar ${mobileOpen ? 'open' : ''}`}
        style={{
          width: '270px',
          background: 'var(--bg-dark-specimen)',
          color: 'var(--text-inverse)',
          borderRight: '1px solid var(--hairline-dark-strong)',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 100,
          transition: 'transform var(--transition-normal)',
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: '1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                background: 'var(--accent-brass)',
                borderRadius: 'var(--radius-xs)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
              }}
            >
              <Shield size={18} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1rem', lineHeight: 1.1 }}>
                ADITHYA G
              </div>
              <div className="tech-label" style={{ fontSize: '0.62rem', color: 'var(--accent-brass-light)' }}>
                ADMIN MANAGEMENT
              </div>
            </div>
          </div>

          <button
            className="mobile-close-btn"
            onClick={() => setMobileOpen(false)}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items List */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '1rem 0.75rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.65rem 0.9rem',
                    borderRadius: 'var(--radius-xs)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    textDecoration: 'none',
                    color: isActive ? '#FFFFFF' : 'var(--text-inverse-muted)',
                    background: isActive ? 'rgba(184, 134, 11, 0.22)' : 'transparent',
                    border: isActive ? '1px solid var(--accent-brass)' : '1px solid transparent',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  <Icon size={15} color={isActive ? 'var(--accent-brass-light)' : 'var(--text-inverse-muted)'} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Session & Logout Footer */}
        <div
          style={{
            padding: '1.25rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'var(--bg-dark-surface)',
          }}
        >
          <div style={{ marginBottom: '0.75rem' }}>
            <div className="tech-label" style={{ fontSize: '0.65rem', color: 'var(--text-inverse-muted)' }}>
              AUTHENTICATED SESSION:
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: '#FFFFFF',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {user?.email || 'admin@portfolio.local'}
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="btn btn-outline-dark btn-sm"
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}
          >
            <LogOut size={13} />
            <span>LOGOUT SESSION</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: '270px', display: 'flex', flexDirection: 'column', minWidth: 0 }} className="admin-main-wrap">
        {/* Top Bar Header */}
        <header
          style={{
            height: '64px',
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--hairline)',
            padding: '0 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 40,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              className="mobile-sidebar-toggle"
              onClick={() => setMobileOpen(true)}
              style={{
                display: 'none',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                padding: '0.4rem',
              }}
            >
              <Menu size={22} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Compass size={16} color="var(--accent-brass)" />
              <span className="tech-label">ADMINISTRATIVE CONSOLE // PRODUCTION</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Direct Link to Public Portfolio */}
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <span>VIEW PUBLIC PORTFOLIO</span>
              <ExternalLink size={13} />
            </Link>
          </div>
        </header>

        {/* View Contents */}
        <main style={{ padding: '2.5rem 2rem 4rem 2rem', flex: 1 }}>{children}</main>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .admin-sidebar {
            transform: translateX(-100%);
          }
          .admin-sidebar.open {
            transform: translateX(0);
          }
          .admin-main-wrap {
            margin-left: 0 !important;
          }
          .mobile-sidebar-toggle {
            display: block !important;
          }
          .mobile-close-btn {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
};
