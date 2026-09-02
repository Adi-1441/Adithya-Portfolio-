// ==============================================================================
// ADMIN DASHBOARD OVERVIEW PAGE (/admin)
// Displays statistics, quick action cards, and real working portfolio URLs
// ==============================================================================

import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  FolderKanban,
  Film,
  BookOpen,
  Cpu,
  Wrench,
  Award,
  FileText,
  Paperclip,
  Share2,
  ExternalLink,
  ShieldCheck,
  Plus,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { projects, research, cadCae, skills, certifications, articles, connections, resume, settings } = usePortfolio();
  const { user, isConfigured } = useAuth();

  // Compute stats
  const totalProjects = projects.length;
  const totalMedia = projects.reduce((acc, p) => acc + (p.media?.length || 0), 0);
  const totalResearch = research.length;
  const totalCadCae = cadCae.length;
  const totalSkills = skills.length;
  const totalCerts = certifications.length;
  const totalArticles = articles.length;

  const currentOrigin = window.location.origin;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Welcome Banner Plate */}
      <div
        className="monograph-card"
        style={{
          padding: '2.5rem',
          borderLeft: '4px solid var(--accent-brass)',
          marginBottom: '2.5rem',
        }}
      >
        <div className="tech-label" style={{ marginBottom: '0.4rem' }}>
          CONTROL STATION // {settings.name || 'ADITHYA G'}
        </div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>Portfolio Administration Overview</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', maxWidth: '800px', lineHeight: 1.6 }}>
          Central management console for mechanical engineering projects, research monographs, CAD/CAE simulations,
          skills by discipline, image & video media uploads, and portfolio settings.
        </p>

        {/* Real Clickable Working URLs */}
        <div
          style={{
            marginTop: '1.5rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--hairline)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
          }}
        >
          <div>
            <span style={{ color: 'var(--text-muted)' }}>PUBLIC PORTFOLIO: </span>
            <a
              href={`${currentOrigin}/`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent-brass)', textDecoration: 'underline', fontWeight: 600 }}
            >
              {currentOrigin}/ ↗
            </a>
          </div>

          <div>
            <span style={{ color: 'var(--text-muted)' }}>ADMIN PORTAL: </span>
            <a
              href={`${currentOrigin}/admin`}
              style={{ color: 'var(--text-primary)', textDecoration: 'underline', fontWeight: 600 }}
            >
              {currentOrigin}/admin ↗
            </a>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem',
        }}
      >
        <div className="admin-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span className="tech-label">PROJECTS</span>
            <FolderKanban size={18} color="var(--accent-brass)" />
          </div>
          <div style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', fontWeight: 600 }}>{totalProjects}</div>
          <div className="tech-dim">{projects.filter((p) => p.isPublished).length} Published Publicly</div>
        </div>

        <div className="admin-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span className="tech-label">MEDIA SPECIMENS</span>
            <Film size={18} color="var(--accent-steel)" />
          </div>
          <div style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', fontWeight: 600 }}>{totalMedia}</div>
          <div className="tech-dim">Images & Videos in Library</div>
        </div>

        <div className="admin-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span className="tech-label">RESEARCH MONOGRAPHS</span>
            <BookOpen size={18} color="#2C3E35" />
          </div>
          <div style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', fontWeight: 600 }}>{totalResearch}</div>
          <div className="tech-dim">Experimental Papers</div>
        </div>

        <div className="admin-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span className="tech-label">CAD / CAE STUDIES</span>
            <Cpu size={18} color="var(--accent-brass)" />
          </div>
          <div style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', fontWeight: 600 }}>{totalCadCae}</div>
          <div className="tech-dim">FEA & CFD Case Studies</div>
        </div>
      </div>

      {/* Quick Action Navigation Panels */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}
      >
        <div className="admin-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.15rem' }}>Engineering Projects</h3>
            <Link to="/admin/projects" className="btn btn-outline btn-sm">
              <Plus size={14} /> Add Project
            </Link>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Create and edit engineering projects, upload images and CAD animation videos, set cover media, and order plates.
          </p>
          <Link to="/admin/projects" className="btn btn-primary btn-sm">
            MANAGE PROJECTS ({totalProjects})
          </Link>
        </div>

        <div className="admin-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.15rem' }}>Media Management</h3>
            <Link to="/admin/media" className="btn btn-outline btn-sm">
              <Film size={14} /> Upload Media
            </Link>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Central media library supporting image uploads (JPG, PNG, WEBP) and video uploads (MP4, WEBM, MOV).
          </p>
          <Link to="/admin/media" className="btn btn-primary btn-sm">
            OPEN MEDIA LIBRARY
          </Link>
        </div>

        <div className="admin-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.15rem' }}>Research & CAD/CAE</h3>
            <Link to="/admin/research" className="btn btn-outline btn-sm">
              Manage
            </Link>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Maintain experimental research records, material specifications, and FEA/CFD simulation verification data.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to="/admin/research" className="btn btn-primary btn-sm">
              RESEARCH ({totalResearch})
            </Link>
            <Link to="/admin/cad-cae" className="btn btn-outline btn-sm">
              CAD & CAE ({totalCadCae})
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
