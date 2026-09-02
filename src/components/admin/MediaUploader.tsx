// ==============================================================================
// UNIVERSAL MEDIA UPLOADER (Images & Videos)
// Real MIME Type Checking, Live Preview, Progress Indicator
// ==============================================================================

import React, { useState, useRef } from 'react';
import { Upload, Film, Image as ImageIcon, CheckCircle, AlertTriangle, X, Play } from 'lucide-react';
import { DataStore } from '../../lib/dataStore';

interface MediaUploaderProps {
  onUploadSuccess: (result: { url: string; mediaType: 'image' | 'video' | 'pdf'; name: string; size: number }) => void;
  allowedTypes?: 'all' | 'image' | 'video' | 'pdf';
  label?: string;
  bucket?: string;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({
  onUploadSuccess,
  allowedTypes = 'all',
  label = 'UPLOAD IMAGE OR VIDEO SPECIMEN',
  bucket,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [detectedType, setDetectedType] = useState<'image' | 'video' | 'pdf' | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const getAcceptString = () => {
    if (allowedTypes === 'image') return 'image/jpeg,image/png,image/webp,image/gif';
    if (allowedTypes === 'video') return 'video/mp4,video/webm,video/quicktime';
    if (allowedTypes === 'pdf') return 'application/pdf';
    return 'image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime,application/pdf';
  };

  const handleFileSelection = (file: File) => {
    setError(null);
    setIsSuccess(false);

    const mime = file.type.toLowerCase();
    let type: 'image' | 'video' | 'pdf' = 'image';

    if (mime.startsWith('video/')) {
      type = 'video';
    } else if (mime === 'application/pdf') {
      type = 'pdf';
    } else if (mime.startsWith('image/')) {
      type = 'image';
    } else {
      setError(`Unsupported format: ${file.type}. Please select an image (JPG, PNG, WEBP), video (MP4, WEBM), or PDF.`);
      return;
    }

    if (allowedTypes !== 'all' && type !== allowedTypes) {
      setError(`Only ${allowedTypes.toUpperCase()} files are permitted in this section.`);
      return;
    }

    const maxLimit = type === 'video' ? 100 * 1024 * 1024 : 15 * 1024 * 1024;
    if (file.size > maxLimit) {
      setError(
        `File size exceeds maximum threshold (${type === 'video' ? '100MB' : '15MB'}). Selected: ${(
          file.size /
          (1024 * 1024)
        ).toFixed(1)}MB.`
      );
      return;
    }

    setSelectedFile(file);
    setDetectedType(type);

    // Create local object URL for instant preview
    const objUrl = URL.createObjectURL(file);
    setPreviewUrl(objUrl);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setProgress(20);
    setError(null);

    try {
      // Simulate stepped progress
      const progressTimer = setInterval(() => {
        setProgress((prev) => (prev < 80 ? prev + 20 : prev));
      }, 150);

      const result = await DataStore.uploadMedia(selectedFile, { bucket });

      clearInterval(progressTimer);
      setProgress(100);
      setIsUploading(false);
      setIsSuccess(true);

      onUploadSuccess(result);
    } catch (err: unknown) {
      setIsUploading(false);
      setProgress(0);
      setError(err instanceof Error ? err.message : 'Media upload failed.');
    }
  };

  const clearSelection = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setDetectedType(null);
    setError(null);
    setIsSuccess(false);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>
        {label}
      </label>

      {/* Dropzone Area */}
      {!selectedFile ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: '2px dashed var(--hairline-strong)',
            background: 'var(--bg-surface-subtle)',
            borderRadius: 'var(--radius-xs)',
            padding: '2.5rem 1.5rem',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'border-color var(--transition-fast), background var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-brass)';
            (e.currentTarget as HTMLElement).style.background = 'rgba(184, 134, 11, 0.04)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--hairline-strong)';
            (e.currentTarget as HTMLElement).style.background = 'var(--bg-surface-subtle)';
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={getAcceptString()}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileSelection(e.target.files[0]);
              }
            }}
            style={{ display: 'none' }}
          />

          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <ImageIcon size={26} color="var(--accent-brass)" />
            <Film size={26} color="var(--accent-steel)" />
          </div>

          <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.35rem' }}>
            Click to Browse or Drag & Drop File Here
          </div>

          <div className="tech-dim" style={{ fontSize: '0.74rem' }}>
            Supports: JPG, PNG, WEBP (≤15MB) | MP4, WEBM, MOV (≤100MB) | PDF (≤15MB)
          </div>
        </div>
      ) : (
        /* Selected File Preview & Upload Card */
        <div
          style={{
            border: '1px solid var(--hairline-strong)',
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-xs)',
            padding: '1.25rem',
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              borderBottom: '1px solid var(--hairline-subtle)',
              paddingBottom: '0.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="tech-tag" style={{ background: 'var(--accent-brass-subtle)', color: 'var(--accent-brass)', fontWeight: 600 }}>
                {detectedType?.toUpperCase()} SPECIMEN
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {selectedFile.name}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className="tech-dim">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</span>
              <button
                onClick={clearSelection}
                className="video-icon-btn"
                style={{ color: 'var(--text-secondary)' }}
                title="Cancel selection"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Live Preview Display */}
          <div
            style={{
              background: '#0B0D0F',
              borderRadius: 'var(--radius-xs)',
              overflow: 'hidden',
              maxHeight: '260px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
            }}
          >
            {detectedType === 'image' && previewUrl && (
              <img
                src={previewUrl}
                alt="Upload Preview"
                style={{ maxWidth: '100%', maxHeight: '260px', objectFit: 'contain' }}
              />
            )}

            {detectedType === 'video' && previewUrl && (
              <video
                src={previewUrl}
                controls
                style={{ maxWidth: '100%', maxHeight: '260px' }}
              />
            )}

            {detectedType === 'pdf' && (
              <div
                style={{
                  padding: '2rem',
                  textAlign: 'center',
                  color: 'var(--text-inverse)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                }}
              >
                [PDF DOCUMENT READY FOR STORAGE UPLOAD]
              </div>
            )}
          </div>

          {/* Progress Bar */}
          {isUploading && (
            <div style={{ marginBottom: '1rem' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  marginBottom: '0.3rem',
                }}
              >
                <span>UPLOADING TO STORAGE...</span>
                <span>{progress}%</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'var(--bg-surface-subtle)', borderRadius: '3px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${progress}%`,
                    height: '100%',
                    background: 'var(--accent-brass)',
                    transition: 'width 0.2s ease',
                  }}
                />
              </div>
            </div>
          )}

          {/* Success / Error alerts */}
          {isSuccess && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: '#2E6B34',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.76rem',
                marginBottom: '0.75rem',
              }}
            >
              <CheckCircle size={15} />
              <span>Media uploaded and validated successfully!</span>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="btn btn-primary btn-sm"
              style={{ flex: 1 }}
            >
              <Upload size={14} />
              <span>{isUploading ? 'SAVING MEDIA...' : 'CONFIRM & UPLOAD MEDIA'}</span>
            </button>
            <button onClick={clearSelection} className="btn btn-outline btn-sm">
              CHANGE
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="form-error" style={{ marginTop: '0.5rem' }}>
          <AlertTriangle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
