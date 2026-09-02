// ==============================================================================
// HIGH-RESOLUTION ENGINEERING MEDIA LIGHTBOX
// ==============================================================================

import React, { useEffect } from 'react';
import { X, ZoomIn, ZoomOut, Download } from 'lucide-react';

interface MediaLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  caption?: string;
  altText?: string;
}

export const MediaLightbox: React.FC<MediaLightboxProps> = ({
  isOpen,
  onClose,
  imageUrl,
  caption,
  altText,
}) => {
  const [zoomLevel, setZoomLevel] = React.useState<number>(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel((prev) => Math.min(prev + 0.3, 3.0));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel((prev) => Math.max(prev - 0.3, 0.7));
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = 'engineering-specimen-drawing';
    a.target = '_blank';
    a.click();
  };

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <button
        className="lightbox-close-btn"
        onClick={onClose}
        aria-label="Close Lightbox"
      >
        <X size={20} />
      </button>

      {/* Floating Toolbar */}
      <div
        style={{
          position: 'absolute',
          top: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(20, 22, 26, 0.85)',
          padding: '0.4rem 0.8rem',
          borderRadius: 'var(--radius-xs)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          zIndex: 10000,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleZoomOut}
          className="video-icon-btn"
          title="Zoom Out"
        >
          <ZoomOut size={16} />
        </button>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: '#FFFFFF',
            minWidth: '45px',
            textAlign: 'center',
          }}
        >
          {Math.round(zoomLevel * 100)}%
        </span>
        <button
          onClick={handleZoomIn}
          className="video-icon-btn"
          title="Zoom In"
        >
          <ZoomIn size={16} />
        </button>
        <div style={{ width: '1px', height: '16px', background: 'rgba(255, 255, 255, 0.2)', margin: '0 0.25rem' }} />
        <button
          onClick={handleDownload}
          className="video-icon-btn"
          title="Open / Download Image"
        >
          <Download size={16} />
        </button>
      </div>

      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            overflow: 'auto',
            maxHeight: '75vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={imageUrl}
            alt={altText || caption || 'High resolution engineering drawing'}
            className="lightbox-image"
            style={{
              transform: `scale(${zoomLevel})`,
              transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
            }}
          />
        </div>

        {caption && <div className="lightbox-caption">{caption}</div>}
      </div>
    </div>
  );
};
