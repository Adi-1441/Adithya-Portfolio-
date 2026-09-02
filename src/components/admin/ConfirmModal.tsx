// ==============================================================================
// CONFIRMATION MODAL FOR DESTRUCTIVE CRUD OPERATIONS
// ==============================================================================

import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'CONFIRM DELETION',
  onConfirm,
  onCancel,
  isDestructive = true,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 17, 20, 0.75)',
        backdropFilter: 'blur(4px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onCancel}
    >
      <div
        className="monograph-card"
        style={{
          maxWidth: '480px',
          width: '100%',
          padding: '2rem',
          borderTop: isDestructive ? '4px solid var(--accent-rust)' : '4px solid var(--accent-brass)',
          boxShadow: 'var(--shadow-modal)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <AlertTriangle size={24} color={isDestructive ? 'var(--accent-rust)' : 'var(--accent-brass)'} />
          <h3 style={{ fontSize: '1.25rem' }}>{title}</h3>
        </div>

        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.75rem' }}>
          {message}
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button onClick={onCancel} className="btn btn-outline btn-sm">
            CANCEL
          </button>
          <button
            onClick={onConfirm}
            className={`btn btn-sm ${isDestructive ? 'btn-danger' : 'btn-primary'}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
