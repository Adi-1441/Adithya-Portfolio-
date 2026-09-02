// ==============================================================================
// CUSTOM ENGINEERING VIDEO PLAYER
// Responsive, lazy-loaded, custom controls, poster support
// ==============================================================================

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  RotateCcw,
} from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  autoPlay?: boolean;
  loop?: boolean;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  title,
  autoPlay = false,
  loop = false,
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(true); // Default muted for safe web autoplay
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // Lazy loading observer
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded) {
            setIsLoaded(true);
          } else if (!entry.isIntersecting && isPlaying && videoRef.current) {
            // Auto pause if scrolled far out of view to save GPU / bandwidth
            videoRef.current.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isLoaded, isPlaying]);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn('Video playback prevented:', err));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 0);
      setHasError(false);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const seekTime = Math.max(0, Math.min(pos * duration, duration));
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch((err) => console.warn('Fullscreen error:', err));
    } else {
      document.exitFullscreen?.().catch((err) => console.warn('Exit fullscreen error:', err));
    }
  };

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className={`video-container ${!isPlaying ? 'is-paused' : ''} ${className}`}
      style={{
        border: '1px solid var(--hairline-strong)',
        background: '#0B0D0F',
      }}
    >
      {isLoaded ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          muted={isMuted}
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onError={() => setHasError(true)}
          onClick={togglePlay}
          className="video-element"
        />
      ) : (
        <div
          style={{
            width: '100%',
            aspectRatio: '16/9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-dark-specimen)',
            color: 'var(--text-inverse-muted)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
          }}
        >
          [VIDEO BUFFER INITIALIZING...]
        </div>
      )}

      {/* Center Play Button Overlay */}
      {!isPlaying && isLoaded && !hasError && (
        <button
          onClick={togglePlay}
          className="video-play-center-btn"
          aria-label="Play Video"
        >
          <Play size={28} style={{ marginLeft: '4px' }} fill="#FFFFFF" />
        </button>
      )}

      {hasError && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(20, 22, 25, 0.95)',
            color: 'var(--text-inverse)',
            padding: '1.5rem',
            textAlign: 'center',
          }}
        >
          <p className="tech-label" style={{ color: 'var(--accent-rust)', marginBottom: '0.5rem' }}>
            PLAYBACK NOTICE // FORMAT RESTRICTION
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-inverse-muted)', maxWidth: '400px' }}>
            Video stream source format could not be decoded directly by the browser. Supported web video formats: MP4 (H.264), WebM, MOV.
          </p>
        </div>
      )}

      {/* Custom Minimalist Controls Overlay */}
      {isLoaded && !hasError && (
        <div className="video-overlay-controls">
          {/* Timeline Scrubber */}
          <div className="video-timeline" onClick={handleSeek}>
            <div
              className="video-progress"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="video-control-row">
            <div className="video-control-left">
              <button
                onClick={togglePlay}
                className="video-icon-btn"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} fill="#FFFFFF" />}
              </button>

              <button
                onClick={restartVideo}
                className="video-icon-btn"
                aria-label="Restart"
                title="Restart"
              >
                <RotateCcw size={15} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginLeft: '0.5rem' }}>
                <button
                  onClick={toggleMute}
                  className="video-icon-btn"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? <VolumeX size={17} /> : <Volume2 size={17} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  style={{
                    width: '60px',
                    accentColor: 'var(--accent-brass-light)',
                    height: '3px',
                    cursor: 'pointer',
                  }}
                  aria-label="Volume slider"
                />
              </div>

              <span style={{ fontSize: '0.75rem', opacity: 0.85, marginLeft: '0.5rem' }}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="video-control-right">
              {title && (
                <span
                  style={{
                    fontSize: '0.72rem',
                    opacity: 0.75,
                    maxWidth: '220px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {title}
                </span>
              )}
              <button
                onClick={toggleFullscreen}
                className="video-icon-btn"
                aria-label="Fullscreen"
                title="Fullscreen"
              >
                <Maximize2 size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
