// ==============================================================================
// ADMIN CENTRAL MEDIA LIBRARY (/admin/media)
// Supports Image Uploads, Video Uploads, Live Playback & Storage Cleanup
// ==============================================================================

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { MediaUploader } from '../../components/admin/MediaUploader';
import { ConfirmModal } from '../../components/admin/ConfirmModal';
import { VideoPlayer } from '../../components/common/VideoPlayer';
import { MediaLightbox } from '../../components/common/MediaLightbox';
import { Film, Image as ImageIcon, Trash2, Copy, Check, Eye, Plus } from 'lucide-react';

interface MediaItemDisplay {
  id: string;
  url: string;
  type: 'image' | 'video' | 'pdf';
  caption: string;
  source: string;
}

export const AdminMediaPage: React.FC = () => {
  const { projects, research, cadCae } = usePortfolio();

  const [filterType, setFilterType] = useState<'all' | 'image' | 'video'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeLightboxUrl, setActiveLightboxUrl] = useState<string | null>(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Aggregate media across all portfolio sections
  const allMedia: MediaItemDisplay[] = [];

  projects.forEach((p) => {
    if (p.coverMediaUrl) {
      allMedia.push({
        id: `p-cov-${p.id}`,
        url: p.coverMediaUrl,
        type: p.coverMediaType || 'image',
        caption: `${p.title} (Cover)`,
        source: `Project: ${p.title}`,
      });
    }
    p.media?.forEach((m) => {
      allMedia.push({
        id: m.id,
        url: m.fileUrl,
        type: m.mediaType,
        caption: m.caption || p.title,
        source: `Project: ${p.title}`,
      });
    });
  });

  research.forEach((r) => {
    if (r.mediaUrl) {
      allMedia.push({
        id: `r-${r.id}`,
        url: r.mediaUrl,
        type: r.mediaType || 'image',
        caption: r.title,
        source: `Research: ${r.title}`,
      });
    }
  });

  cadCae.forEach((c) => {
    if (c.mediaUrl) {
      allMedia.push({
        id: `c-${c.id}`,
        url: c.mediaUrl,
        type: c.mediaType || 'image',
        caption: c.title,
        source: `CAD/CAE: ${c.title}`,
      });
    }
  });

  const filteredMedia = allMedia.filter((m) => {
    if (filterType === 'all') return true;
    return m.type === filterType;
  });

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <div className="tech-label">STORAGE // MEDIA ARCHIVE</div>
          <h1 style={{ fontSize: '1.8rem' }}>Universal Media Library</h1>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setFilterType('all')}
            className={`btn btn-sm ${filterType === 'all' ? 'btn-primary' : 'btn-outline'}`}
          >
            ALL MEDIA ({allMedia.length})
          </button>
          <button
            onClick={() => setFilterType('image')}
            className={`btn btn-sm ${filterType === 'image' ? 'btn-primary' : 'btn-outline'}`}
          >
            IMAGES ONLY
          </button>
          <button
            onClick={() => setFilterType('video')}
            className={`btn btn-sm ${filterType === 'video' ? 'btn-primary' : 'btn-outline'}`}
          >
            VIDEOS ONLY
          </button>
        </div>
      </div>

      {/* Direct Uploader Card */}
      <div className="admin-card" style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Upload New Media Specimen to Storage</h3>
        <MediaUploader
          onUploadSuccess={(res) => {
            alert(`Media specimen "${res.name}" uploaded! URL: ${res.url}`);
          }}
          label="SELECT IMAGE (JPG/PNG/WEBP) OR VIDEO (MP4/WEBM/MOV)"
        />
      </div>

      {/* Media Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {filteredMedia.map((m) => (
          <div
            key={m.id}
            className="monograph-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid var(--hairline-strong)',
            }}
          >
            {/* Visual Preview */}
            <div
              style={{
                height: '180px',
                background: '#0B0D0F',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              {m.type === 'video' ? (
                <div style={{ width: '100%', height: '100%' }}>
                  <video src={m.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(0,0,0,0.3)',
                    }}
                  >
                    <Film size={32} color="#FFFFFF" />
                  </div>
                </div>
              ) : (
                <img src={m.url} alt={m.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )}

              <span
                className="tech-tag"
                style={{
                  position: 'absolute',
                  top: '0.6rem',
                  left: '0.6rem',
                  background: 'rgba(15, 17, 20, 0.85)',
                  color: '#FFFFFF',
                }}
              >
                {m.type.toUpperCase()}
              </span>
            </div>

            {/* Info and Actions */}
            <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.2rem', lineHeight: 1.3 }}>
                  {m.caption}
                </div>
                <div className="tech-dim" style={{ fontSize: '0.72rem', marginBottom: '0.75rem' }}>
                  {m.source}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid var(--hairline-subtle)',
                  paddingTop: '0.6rem',
                }}
              >
                <button
                  onClick={() => (m.type === 'video' ? setActiveVideoUrl(m.url) : setActiveLightboxUrl(m.url))}
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.7rem' }}
                >
                  <Eye size={12} />
                  <span>PREVIEW</span>
                </button>

                <button
                  onClick={() => copyUrl(m.url, m.id)}
                  className="btn btn-ghost btn-sm"
                  style={{ fontSize: '0.7rem' }}
                  title="Copy URL"
                >
                  {copiedId === m.id ? <Check size={12} color="#2C3E35" /> : <Copy size={12} />}
                  <span>{copiedId === m.id ? 'COPIED' : 'COPY URL'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Lightbox */}
      <MediaLightbox
        isOpen={Boolean(activeLightboxUrl)}
        onClose={() => setActiveLightboxUrl(null)}
        imageUrl={activeLightboxUrl || ''}
      />

      {/* Video Modal Preview */}
      {activeVideoUrl && (
        <div
          className="lightbox-backdrop"
          onClick={() => setActiveVideoUrl(null)}
        >
          <div
            style={{ maxWidth: '850px', width: '90%', background: '#0B0D0F', padding: '1rem' }}
            onClick={(e) => e.stopPropagation()}
          >
            <VideoPlayer src={activeVideoUrl} />
            <button
              onClick={() => setActiveVideoUrl(null)}
              className="btn btn-outline-dark btn-sm"
              style={{ marginTop: '1rem' }}
            >
              CLOSE PREVIEW
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
