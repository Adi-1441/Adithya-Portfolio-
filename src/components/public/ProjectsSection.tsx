// ==============================================================================
// EDITORIAL PROJECTS MONOGRAPH SECTION
// Image + Video Media Support, Engineering Workflow Breakdown
// ==============================================================================

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project, ProjectMedia } from '../../types/portfolio';
import { SectionHeader } from '../common/SectionHeader';
import { VideoPlayer } from '../common/VideoPlayer';
import { MediaLightbox } from '../common/MediaLightbox';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Eye, Film, Image as ImageIcon, ChevronRight } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { projects } = usePortfolio();
  const publishedProjects = projects.filter((p) => p.isPublished);

  // Lightbox state
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    imageUrl: string;
    caption?: string;
  }>({
    isOpen: false,
    imageUrl: '',
    caption: '',
  });

  const openLightbox = (url: string, caption?: string) => {
    setLightboxState({
      isOpen: true,
      imageUrl: url,
      caption,
    });
  };

  const closeLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <section id="projects" className="section-pad border-drafting-b" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        <SectionHeader
          index="03"
          category="ENGINEERING CASEBOOKS & MAJOR PROJECTS"
          title="Kinematic Syntheses, Computational FEA/CFD & Precision Hardware"
          subtitle="Detailed monographs documenting problem formulation, analytical design, computational verification, and empirical testing."
        />

        {/* Projects List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4.5rem' }}>
          {publishedProjects.map((project, pidx) => (
            <ProjectPlate
              key={project.id}
              project={project}
              indexNumber={pidx + 1}
              onOpenLightbox={openLightbox}
            />
          ))}
        </div>

        {/* Global Lightbox for image magnification */}
        <MediaLightbox
          isOpen={lightboxState.isOpen}
          onClose={closeLightbox}
          imageUrl={lightboxState.imageUrl}
          caption={lightboxState.caption}
        />
      </div>
    </section>
  );
};

interface ProjectPlateProps {
  project: Project;
  indexNumber: number;
  onOpenLightbox: (url: string, caption?: string) => void;
}

const ProjectPlate: React.FC<ProjectPlateProps> = ({
  project,
  indexNumber,
  onOpenLightbox,
}) => {
  const mediaList: ProjectMedia[] = project.media || [];
  const [activeMediaIndex, setActiveMediaIndex] = useState<number>(0);

  const currentMedia = mediaList[activeMediaIndex] || {
    mediaType: project.coverMediaType || 'image',
    fileUrl: project.coverMediaUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    caption: project.title,
  };

  return (
    <article
      className="monograph-card"
      style={{
        border: '1px solid var(--hairline-strong)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* 1. Top Archival Plate Header */}
      <div className="plate-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span className="tech-index">[PLATE 0{indexNumber}]</span>
          <span style={{ color: 'var(--text-secondary)' }}>//</span>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}>{project.category}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className="tech-dim">YEAR: {project.year}</span>
          <span className="tech-dim">ROLE: {project.role}</span>
        </div>
      </div>

      {/* 2. Main Title & Summary */}
      <div style={{ padding: '2rem 2.5rem 1.5rem 2.5rem' }}>
        <h3
          style={{
            fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)',
            marginBottom: '1rem',
            lineHeight: 1.25,
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontSize: '1.02rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            maxWidth: '920px',
          }}
        >
          {project.summary}
        </p>
      </div>

      {/* 3. Hero Media Presentation (Image OR Video) */}
      <div
        style={{
          padding: '0 2.5rem 1.5rem 2.5rem',
        }}
      >
        <div
          style={{
            position: 'relative',
            background: 'var(--bg-dark-specimen)',
            border: '1px solid var(--hairline-strong)',
            borderRadius: 'var(--radius-xs)',
            overflow: 'hidden',
          }}
        >
          {currentMedia.mediaType === 'video' ? (
            <VideoPlayer
              src={currentMedia.fileUrl}
              poster={currentMedia.posterUrl}
              title={currentMedia.caption || project.title}
            />
          ) : (
            <div
              style={{
                position: 'relative',
                cursor: 'zoom-in',
              }}
              onClick={() => onOpenLightbox(currentMedia.fileUrl, currentMedia.caption)}
            >
              <img
                src={currentMedia.fileUrl}
                alt={currentMedia.altText || project.title}
                style={{
                  width: '100%',
                  maxHeight: '520px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(20, 22, 26, 0.75)',
                  backdropFilter: 'blur(4px)',
                  color: '#FFFFFF',
                  padding: '0.35rem 0.65rem',
                  borderRadius: 'var(--radius-xs)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <Eye size={13} />
                <span>CLICK TO ENLARGE</span>
              </div>
            </div>
          )}

          {/* Media Caption Bar */}
          {currentMedia.caption && (
            <div
              style={{
                padding: '0.6rem 1rem',
                background: 'var(--bg-surface-subtle)',
                borderTop: '1px solid var(--hairline)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.76rem',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span style={{ color: 'var(--accent-brass)', marginRight: '0.5rem' }}>FIGURE {activeMediaIndex + 1}.0:</span>
                {currentMedia.caption}
              </div>
              <span className="tech-tag">{currentMedia.mediaType.toUpperCase()}</span>
            </div>
          )}
        </div>

        {/* Thumbnail Selector if multiple media exist */}
        {mediaList.length > 1 && (
          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              marginTop: '0.75rem',
              overflowX: 'auto',
              paddingBottom: '0.5rem',
            }}
          >
            {mediaList.map((m, midx) => (
              <button
                key={m.id || midx}
                onClick={() => setActiveMediaIndex(midx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.35rem 0.75rem',
                  border:
                    activeMediaIndex === midx
                      ? '1.5px solid var(--accent-brass)'
                      : '1px solid var(--hairline)',
                  background: activeMediaIndex === midx ? 'var(--accent-brass-subtle)' : 'var(--bg-surface)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  cursor: 'pointer',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-xs)',
                  whiteSpace: 'nowrap',
                }}
              >
                {m.mediaType === 'video' ? <Film size={13} /> : <ImageIcon size={13} />}
                <span>SPECIMEN 0{midx + 1} ({m.mediaType.toUpperCase()})</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 4. Structured Engineering Workflow Breakdown */}
      <div
        style={{
          padding: '1.5rem 2.5rem 2.5rem 2.5rem',
          borderTop: '1px solid var(--hairline)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {/* A. Problem Formulation */}
          {project.problem && (
            <div style={{ borderLeft: '2px solid #8B261D', paddingLeft: '1rem' }}>
              <div className="tech-label" style={{ color: '#8B261D', marginBottom: '0.3rem' }}>
                01. PROBLEM STATEMENT
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {project.problem}
              </p>
            </div>
          )}

          {/* B. Engineering Objective */}
          {project.objective && (
            <div style={{ borderLeft: '2px solid var(--accent-brass)', paddingLeft: '1rem' }}>
              <div className="tech-label" style={{ color: 'var(--accent-brass)', marginBottom: '0.3rem' }}>
                02. ENGINEERING OBJECTIVE
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {project.objective}
              </p>
            </div>
          )}

          {/* C. Methodology & Tools */}
          {project.methodology && (
            <div style={{ borderLeft: '2px solid var(--accent-steel)', paddingLeft: '1rem' }}>
              <div className="tech-label" style={{ color: 'var(--accent-steel)', marginBottom: '0.3rem' }}>
                03. METHODOLOGY & ANALYSIS
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {project.methodology}
              </p>
            </div>
          )}

          {/* D. Quantitative Results */}
          {project.results && (
            <div style={{ borderLeft: '2px solid #2C3E35', paddingLeft: '1rem' }}>
              <div className="tech-label" style={{ color: '#2C3E35', marginBottom: '0.3rem' }}>
                04. MEASURED RESULTS & FEA/CFD
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {project.results}
              </p>
            </div>
          )}
        </div>

        {/* Tools & External Action Bar */}
        <div
          style={{
            marginTop: '2rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--hairline-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          {/* Tools Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center' }}>
            <span className="tech-dim" style={{ marginRight: '0.25rem' }}>TOOLCHAIN:</span>
            {project.tools.map((t, idx) => (
              <span key={idx} className="tech-tag">
                {t}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link
              to={`/project/${project.slug || project.id}`}
              className="btn btn-outline btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}
            >
              <span>READ FULL MONOGRAPH</span>
              <ChevronRight size={14} />
            </Link>

            {project.externalUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
                title="External Link"
              >
                <ExternalLink size={14} />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
                title="Source Code / Repository"
              >
                <Github size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
