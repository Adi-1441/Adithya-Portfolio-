// ==============================================================================
// DETAILED ENGINEERING PROJECT MONOGRAPH VIEW (/project/:id)
// ==============================================================================

import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { VideoPlayer } from '../components/common/VideoPlayer';
import { MediaLightbox } from '../components/common/MediaLightbox';
import { ArrowLeft, ExternalLink, Github, Eye, Film, Image as ImageIcon } from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects } = usePortfolio();
  const navigate = useNavigate();

  const project = projects.find((p) => p.slug === id || p.id === id);

  const [activeMediaIndex, setActiveMediaIndex] = useState<number>(0);
  const [lightboxState, setLightboxState] = useState<{ isOpen: boolean; imageUrl: string; caption?: string }>({
    isOpen: false,
    imageUrl: '',
    caption: '',
  });

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div className="container section-pad" style={{ textAlign: 'center', marginTop: '4rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>Project Monograph Not Found</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            The requested engineering case study could not be located in the archive.
          </p>
          <Link to="/" className="btn btn-primary">
            <ArrowLeft size={16} /> Return to Portfolio
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const mediaList = project.media || [];
  const currentMedia = mediaList[activeMediaIndex] || {
    mediaType: project.coverMediaType || 'image',
    fileUrl: project.coverMediaUrl || '',
    caption: project.title,
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, paddingTop: 'calc(var(--header-height) + 2rem)', paddingBottom: '5rem' }}>
        <div className="container">
          {/* Back Navigation Bar */}
          <div style={{ marginBottom: '2rem' }}>
            <button
              onClick={() => navigate(-1)}
              className="btn btn-ghost btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <ArrowLeft size={14} />
              <span>RETURN TO PORTFOLIO ARCHIVE</span>
            </button>
          </div>

          {/* Project Article Container */}
          <article className="monograph-card" style={{ padding: '0', border: '1px solid var(--hairline-strong)' }}>
            {/* Top Plate Info */}
            <div className="plate-header">
              <span className="tech-index">MONOGRAPH ARCHIVE // {project.category.toUpperCase()}</span>
              <span className="tech-dim">YEAR: {project.year} | ROLE: {project.role}</span>
            </div>

            {/* Header Title */}
            <div style={{ padding: '2.5rem 3rem 1.5rem 3rem' }}>
              <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', marginBottom: '1.25rem', lineHeight: 1.2 }}>
                {project.title}
              </h1>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.65, maxWidth: '900px' }}>
                {project.summary}
              </p>
            </div>

            {/* Large Media Player / Gallery */}
            <div style={{ padding: '0 3rem 2rem 3rem' }}>
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
                    style={{ position: 'relative', cursor: 'zoom-in' }}
                    onClick={() =>
                      setLightboxState({
                        isOpen: true,
                        imageUrl: currentMedia.fileUrl,
                        caption: currentMedia.caption,
                      })
                    }
                  >
                    <img
                      src={currentMedia.fileUrl}
                      alt={project.title}
                      style={{ width: '100%', maxHeight: '600px', objectFit: 'cover' }}
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
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      <Eye size={13} />
                      <span>INSPECT SPECIMEN</span>
                    </div>
                  </div>
                )}

                {currentMedia.caption && (
                  <div
                    style={{
                      padding: '0.75rem 1.2rem',
                      background: 'var(--bg-surface-subtle)',
                      borderTop: '1px solid var(--hairline)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <span style={{ color: 'var(--accent-brass)', marginRight: '0.5rem' }}>
                        FIGURE 0{activeMediaIndex + 1}:
                      </span>
                      {currentMedia.caption}
                    </div>
                    <span className="tech-tag">{currentMedia.mediaType.toUpperCase()}</span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {mediaList.length > 1 && (
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                  {mediaList.map((m, midx) => (
                    <button
                      key={midx}
                      onClick={() => setActiveMediaIndex(midx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.4rem 0.85rem',
                        border:
                          activeMediaIndex === midx
                            ? '1.5px solid var(--accent-brass)'
                            : '1px solid var(--hairline)',
                        background: activeMediaIndex === midx ? 'var(--accent-brass-subtle)' : 'var(--bg-surface)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.74rem',
                        cursor: 'pointer',
                      }}
                    >
                      {m.mediaType === 'video' ? <Film size={13} /> : <ImageIcon size={13} />}
                      <span>MEDIA SPECIMEN 0{midx + 1}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* In-Depth Workflow Sections */}
            <div style={{ padding: '2rem 3rem 3rem 3rem', borderTop: '1px solid var(--hairline)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                {project.problem && (
                  <div>
                    <h3 className="tech-label" style={{ color: '#8B261D', marginBottom: '0.5rem' }}>
                      01 // PROBLEM FORMULATION & DEFICIENCIES
                    </h3>
                    <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                      {project.problem}
                    </p>
                  </div>
                )}

                {project.objective && (
                  <div>
                    <h3 className="tech-label" style={{ color: 'var(--accent-brass)', marginBottom: '0.5rem' }}>
                      02 // TECHNICAL SPECIFICATIONS & OBJECTIVES
                    </h3>
                    <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                      {project.objective}
                    </p>
                  </div>
                )}

                {project.methodology && (
                  <div>
                    <h3 className="tech-label" style={{ color: 'var(--accent-steel)', marginBottom: '0.5rem' }}>
                      03 // ANALYTICAL KINEMATICS & METHODOLOGY
                    </h3>
                    <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                      {project.methodology}
                    </p>
                  </div>
                )}

                {project.engineeringWork && (
                  <div>
                    <h3 className="tech-label" style={{ marginBottom: '0.5rem' }}>
                      04 // DETAILED ENGINEERING WORK & FABRICATION
                    </h3>
                    <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                      {project.engineeringWork}
                    </p>
                  </div>
                )}

                {project.results && (
                  <div>
                    <h3 className="tech-label" style={{ color: '#2C3E35', marginBottom: '0.5rem' }}>
                      05 // QUANTITATIVE FEA/CFD RESULTS & VERIFICATION
                    </h3>
                    <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                      {project.results}
                    </p>
                  </div>
                )}

                {project.outcome && (
                  <div>
                    <h3 className="tech-label" style={{ marginBottom: '0.5rem' }}>
                      06 // FINAL HARDWARE OUTCOME & PROTOTYPE VALIDATION
                    </h3>
                    <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                      {project.outcome}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div
                style={{
                  marginTop: '3rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid var(--hairline)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {project.tools.map((t, idx) => (
                    <span key={idx} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {project.externalUrl && (
                    <a
                      href={project.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                    >
                      <ExternalLink size={14} />
                      <span>EXTERNAL DOCUMENT</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                    >
                      <Github size={14} />
                      <span>CODE REPOSITORY</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>

      <MediaLightbox
        isOpen={lightboxState.isOpen}
        onClose={() => setLightboxState((prev) => ({ ...prev, isOpen: false }))}
        imageUrl={lightboxState.imageUrl}
        caption={lightboxState.caption}
      />

      <Footer />
    </div>
  );
};
