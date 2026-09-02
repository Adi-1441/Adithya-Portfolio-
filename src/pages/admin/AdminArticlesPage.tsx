// ==============================================================================
// ADMIN TECHNICAL ARTICLES MANAGEMENT (/admin/articles)
// ==============================================================================

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Article } from '../../types/portfolio';
import { MediaUploader } from '../../components/admin/MediaUploader';
import { ConfirmModal } from '../../components/admin/ConfirmModal';
import { Plus, Edit2, Trash2, CheckCircle, Save, X } from 'lucide-react';

export const AdminArticlesPage: React.FC = () => {
  const { articles, saveArticle, deleteArticle } = usePortfolio();

  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateNew = () => {
    const newArt: Article = {
      id: `art-${Date.now()}`,
      slug: `article-${Date.now()}`,
      title: '',
      category: 'Computational Mechanics',
      summary: '',
      content: '',
      tags: [],
      publishedDate: new Date().getFullYear().toString(),
      readTime: '5 min read',
      isPublished: true,
      displayOrder: articles.length + 1,
    };
    setEditingArticle(newArt);
    setIsNew(true);
  };

  const handleEdit = (art: Article) => {
    setEditingArticle(JSON.parse(JSON.stringify(art)));
    setIsNew(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;

    if (!editingArticle.title.trim() || !editingArticle.content.trim()) {
      alert('Please fill out article title and content.');
      return;
    }

    if (!editingArticle.slug.trim()) {
      editingArticle.slug = editingArticle.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    await saveArticle(editingArticle);
    setEditingArticle(null);
    setIsNew(false);
    showNotification('Article saved to database!');
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmId) return;
    await deleteArticle(deleteConfirmId);
    setDeleteConfirmId(null);
    showNotification('Article deleted.');
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
          <div className="tech-label">DATABASE // ARTICLES</div>
          <h1 style={{ fontSize: '1.8rem' }}>Technical Writing & Journal Notes</h1>
        </div>

        {!editingArticle && (
          <button onClick={handleCreateNew} className="btn btn-primary btn-sm">
            <Plus size={16} />
            <span>WRITE NEW ARTICLE</span>
          </button>
        )}
      </div>

      {notification && (
        <div
          style={{
            padding: '0.85rem 1.25rem',
            background: '#EAF5EA',
            border: '1px solid #C3E3C6',
            borderRadius: 'var(--radius-xs)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: '#2E6B34',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <CheckCircle size={16} />
          <span>{notification}</span>
        </div>
      )}

      {editingArticle ? (
        <div
          className="monograph-card"
          style={{
            padding: '2.5rem',
            borderTop: '4px solid var(--accent-brass)',
            marginBottom: '3rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem' }}>{isNew ? 'New Technical Article' : `Edit: ${editingArticle.title}`}</h2>
            <button onClick={() => setEditingArticle(null)} className="btn btn-ghost btn-sm">
              <X size={16} /> Cancel
            </button>
          </div>

          <form onSubmit={handleSave}>
            <div className="form-group">
              <label className="form-label">ARTICLE TITLE *</label>
              <input
                type="text"
                required
                className="form-input"
                value={editingArticle.title}
                onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group">
                <label className="form-label">CATEGORY</label>
                <input
                  type="text"
                  className="form-input"
                  value={editingArticle.category}
                  onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">READ TIME</label>
                <input
                  type="text"
                  className="form-input"
                  value={editingArticle.readTime || '5 min read'}
                  onChange={(e) => setEditingArticle({ ...editingArticle, readTime: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">PUBLISHED YEAR/DATE</label>
                <input
                  type="text"
                  className="form-input"
                  value={editingArticle.publishedDate}
                  onChange={(e) => setEditingArticle({ ...editingArticle, publishedDate: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">SUMMARY / ABSTRACT *</label>
              <textarea
                required
                rows={2}
                className="form-textarea"
                value={editingArticle.summary}
                onChange={(e) => setEditingArticle({ ...editingArticle, summary: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">FULL ARTICLE CONTENT (TEXT / MARKDOWN) *</label>
              <textarea
                required
                rows={8}
                className="form-textarea"
                value={editingArticle.content}
                onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
              />
            </div>

            <MediaUploader
              onUploadSuccess={(res) => {
                setEditingArticle({ ...editingArticle, coverImageUrl: res.url });
              }}
              label="COVER IMAGE SPECIMEN"
              allowedTypes="image"
            />

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="submit" className="btn btn-primary btn-lg">
                <Save size={16} />
                <span>SAVE ARTICLE</span>
              </button>
              <button type="button" onClick={() => setEditingArticle(null)} className="btn btn-outline btn-lg">
                CANCEL
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="monograph-card" style={{ padding: '0', overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>TITLE</th>
                <th>CATEGORY</th>
                <th>READ TIME</th>
                <th>DATE</th>
                <th>STATUS</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((art) => (
                <tr key={art.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{art.title}</div>
                  </td>
                  <td>
                    <span className="tech-tag">{art.category}</span>
                  </td>
                  <td>
                    <span className="tech-dim">{art.readTime}</span>
                  </td>
                  <td>
                    <span className="tech-dim">{art.publishedDate}</span>
                  </td>
                  <td>
                    <span className={`status-pill ${art.isPublished ? 'status-pill-active' : 'status-pill-inactive'}`}>
                      {art.isPublished ? 'PUBLISHED' : 'DRAFT'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem' }}>
                      <button onClick={() => handleEdit(art)} className="btn btn-outline btn-sm">
                        <Edit2 size={13} />
                      </button>
                      <button onClick={() => setDeleteConfirmId(art.id)} className="btn btn-danger btn-sm">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmModal
        isOpen={Boolean(deleteConfirmId)}
        title="Delete Article"
        message="Are you sure you want to delete this technical article from the database?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
