// ==============================================================================
// TECHNICAL ARTICLES & ENGINEERING JOURNAL NOTES SECTION
// ==============================================================================

import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SectionHeader } from '../common/SectionHeader';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ArticlesSection: React.FC = () => {
  const { articles } = usePortfolio();
  const publishedArticles = articles.filter((a) => a.isPublished);

  return (
    <section id="articles" className="section-pad border-drafting-b drafting-surface">
      <div className="container">
        <SectionHeader
          index="08"
          category="TECHNICAL WRITING & MONOGRAPHS"
          title="Engineering Journal Notes & Analytical Dispatches"
          subtitle="In-depth technical notes covering numerical verification, mesh convergence, and machine learning architectures in physics."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2.5rem' }}>
          {publishedArticles.map((art, idx) => (
            <article
              key={art.id}
              className="monograph-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid var(--hairline-strong)',
              }}
            >
              {art.coverImageUrl && (
                <div style={{ height: '200px', overflow: 'hidden', borderBottom: '1px solid var(--hairline)' }}>
                  <img
                    src={art.coverImageUrl}
                    alt={art.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}

              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.75rem',
                  }}
                >
                  <span className="tech-index">[DISPATCH 0{idx + 1}]</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    <Clock size={12} />
                    <span>{art.readTime || '5 min read'}</span>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', lineHeight: 1.35 }}>
                  {art.title}
                </h3>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {art.summary}
                </p>

                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                    {art.tags?.map((tag, tidx) => (
                      <span key={tidx} className="tech-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/article/${art.slug || art.id}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                    }}
                  >
                    <span>READ NOTE</span>
                    <ArrowRight size={13} color="var(--accent-brass)" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
