// ==============================================================================
// DETAILED TECHNICAL ARTICLE VIEW (/article/:id)
// ==============================================================================

import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { ArrowLeft, Clock } from 'lucide-react';

export const ArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { articles } = usePortfolio();
  const navigate = useNavigate();

  const article = articles.find((a) => a.slug === id || a.id === id);

  if (!article) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div className="container section-pad" style={{ textAlign: 'center', marginTop: '4rem' }}>
          <h2>Technical Article Not Found</h2>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
            <ArrowLeft size={16} /> Return to Portfolio
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, paddingTop: 'calc(var(--header-height) + 2rem)', paddingBottom: '5rem' }}>
        <div className="container-narrow">
          <div style={{ marginBottom: '2rem' }}>
            <button
              onClick={() => navigate(-1)}
              className="btn btn-ghost btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <ArrowLeft size={14} />
              <span>RETURN TO ARTICLES</span>
            </button>
          </div>

          <article className="monograph-card" style={{ padding: '3.5rem', border: '1px solid var(--hairline-strong)' }}>
            <div className="plate-header" style={{ marginBottom: '2rem' }}>
              <span className="tech-index">JOURNAL NOTE // {article.category.toUpperCase()}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.74rem' }}>
                <Clock size={12} />
                <span>{article.readTime || '5 min read'} | PUBLISHED: {article.publishedDate}</span>
              </div>
            </div>

            <h1 style={{ fontSize: '2.4rem', marginBottom: '1.5rem', lineHeight: 1.25 }}>
              {article.title}
            </h1>

            {article.coverImageUrl && (
              <div style={{ marginBottom: '2.5rem', border: '1px solid var(--hairline)' }}>
                <img
                  src={article.coverImageUrl}
                  alt={article.title}
                  style={{ width: '100%', maxHeight: '420px', objectFit: 'cover' }}
                />
              </div>
            )}

            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.2rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                fontStyle: 'italic',
                marginBottom: '2rem',
                borderLeft: '3px solid var(--accent-brass)',
                paddingLeft: '1.25rem',
              }}
            >
              {article.summary}
            </div>

            <div
              style={{
                fontSize: '1.02rem',
                lineHeight: 1.8,
                color: 'var(--text-primary)',
                whiteSpace: 'pre-line',
              }}
            >
              {article.content}
            </div>

            {article.tags && (
              <div
                style={{
                  marginTop: '3rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid var(--hairline)',
                  display: 'flex',
                  gap: '0.4rem',
                  flexWrap: 'wrap',
                }}
              >
                {article.tags.map((t, idx) => (
                  <span key={idx} className="tech-tag">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};
