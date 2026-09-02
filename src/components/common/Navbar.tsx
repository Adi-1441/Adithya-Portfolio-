// ==============================================================================
// EDITORIAL NAVIGATION BAR
// ==============================================================================

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { Menu, X, Shield } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { settings, visibility } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'about', label: 'About', href: '#about' },
    { key: 'skills', label: 'Skills', href: '#skills' },
    { key: 'projects', label: 'Projects', href: '#projects' },
    { key: 'research', label: 'Research', href: '#research' },
    { key: 'cad-cae', label: 'CAD & CAE', href: '#cad-cae' },
    { key: 'ai-engineering', label: 'AI × Eng', href: '#ai-engineering' },
    { key: 'certifications', label: 'Certs', href: '#certifications' },
    { key: 'articles', label: 'Articles', href: '#articles' },
    { key: 'resume', label: 'Resume', href: '#resume' },
    { key: 'connections', label: 'Connections', href: '#connections' },
    { key: 'contact', label: 'Contact', href: '#contact' },
  ];

  // Filter based on visibility settings if defined
  const activeNavItems = navItems.filter((item) => {
    const setting = visibility.find((v) => v.sectionKey === item.key);
    return setting ? setting.isVisible : true;
  });

  const isHome = location.pathname === '/';

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (!isHome) {
      window.location.href = `/${href}`;
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--header-height)',
        background: isScrolled
          ? 'rgba(247, 245, 240, 0.94)'
          : 'rgba(247, 245, 240, 0.85)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--hairline)',
        zIndex: 50,
        transition: 'background var(--transition-normal), box-shadow var(--transition-normal)',
        boxShadow: isScrolled ? 'var(--shadow-subtle)' : 'none',
      }}
    >
      <div
        className="container"
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand / Name Monogram */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              border: '1.5px solid var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-serif)',
              fontWeight: 600,
              fontSize: '1.1rem',
              color: 'var(--text-primary)',
              background: 'var(--bg-surface)',
            }}
          >
            AG
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.05rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
              }}
            >
              {settings.name || 'Adithya G'}
            </div>
            <div
              className="tech-label"
              style={{
                fontSize: '0.65rem',
                color: 'var(--text-secondary)',
                letterSpacing: '0.06em',
              }}
            >
              MECHANICAL ENGINEERING
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.4rem',
          }}
        >
          {activeNavItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                transition: 'color var(--transition-fast)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--text-secondary)')}
            >
              {item.label}
            </a>
          ))}

          {/* Discrete Admin Link */}
          <Link
            to="/admin"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.35rem 0.65rem',
              border: '1px solid var(--hairline-strong)',
              borderRadius: 'var(--radius-xs)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: 'var(--text-secondary)',
              transition: 'all var(--transition-fast)',
              marginLeft: '0.5rem',
            }}
            title="Admin Management Portal"
          >
            <Shield size={12} color="var(--accent-brass)" />
            <span>PORTAL</span>
          </Link>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          className="mobile-nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '0.5rem',
          }}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'var(--header-height)',
            left: 0,
            right: 0,
            background: 'var(--bg-parchment)',
            borderBottom: '2px solid var(--accent-brass)',
            boxShadow: 'var(--shadow-elevated)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            zIndex: 49,
          }}
        >
          {activeNavItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: 'var(--text-primary)',
                textTransform: 'uppercase',
                padding: '0.4rem 0',
                borderBottom: '1px solid var(--hairline-subtle)',
              }}
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: 'var(--accent-brass)',
              padding: '0.5rem 0',
            }}
          >
            <Shield size={14} />
            <span>ADMIN MANAGEMENT PORTAL</span>
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 1080px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-nav-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
};
