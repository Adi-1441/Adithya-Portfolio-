// ==============================================================================
// EDITORIAL SKILLS & COMPETENCIES SECTION
// Organized by discipline with zero fake percentages
// ==============================================================================

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SectionHeader } from '../common/SectionHeader';

export const SkillsSection: React.FC = () => {
  const { skills } = usePortfolio();
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('ALL');

  // Extract unique disciplines
  const disciplines = ['ALL', ...Array.from(new Set(skills.map((s) => s.discipline)))];

  const filteredSkills =
    selectedDiscipline === 'ALL'
      ? skills
      : skills.filter((s) => s.discipline === selectedDiscipline);

  // Group skills by discipline
  const groupedSkills = filteredSkills.reduce<Record<string, typeof skills>>((acc, skill) => {
    if (!acc[skill.discipline]) acc[skill.discipline] = [];
    acc[skill.discipline].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="section-pad border-drafting-b drafting-surface">
      <div className="container">
        <SectionHeader
          index="02"
          category="TECHNICAL COMPETENCIES"
          title="Engineering Disciplines, Toolchains & Analytical Methods"
          subtitle="Rigorous engineering proficiencies categorized by discipline. Grounded in industry standards and empirical software verification."
        />

        {/* Discipline Filter Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '2.5rem',
            borderBottom: '1px solid var(--hairline)',
            paddingBottom: '1rem',
          }}
        >
          {disciplines.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDiscipline(d)}
              className="btn btn-sm"
              style={{
                background: selectedDiscipline === d ? 'var(--text-primary)' : 'var(--bg-surface)',
                color: selectedDiscipline === d ? 'var(--bg-parchment)' : 'var(--text-secondary)',
                borderColor: selectedDiscipline === d ? 'var(--text-primary)' : 'var(--hairline-strong)',
                fontSize: '0.74rem',
              }}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Disciplines Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {Object.entries(groupedSkills).map(([discName, skillItems], idx) => (
            <div
              key={discName}
              className="monograph-card"
              style={{
                padding: '2rem',
                borderLeft: '4px solid var(--accent-brass)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid var(--hairline)',
                  paddingBottom: '0.75rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span className="tech-index">[DISCIPLINE 0{idx + 1}]</span>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>{discName}</h3>
                </div>
                <span className="tech-dim">{skillItems.length} PROFICIENCIES</span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                {skillItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: 'var(--bg-surface-subtle)',
                      padding: '1.2rem',
                      border: '1px solid var(--hairline)',
                      borderRadius: 'var(--radius-xs)',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 600,
                        fontSize: '0.98rem',
                        color: 'var(--text-primary)',
                        marginBottom: '0.4rem',
                      }}
                    >
                      {item.skillName}
                    </div>

                    {item.description && (
                      <p
                        style={{
                          fontSize: '0.84rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.5,
                          marginBottom: '0.85rem',
                        }}
                      >
                        {item.description}
                      </p>
                    )}

                    {item.tags && item.tags.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                        {item.tags.map((t, tidx) => (
                          <span key={tidx} className="tech-tag">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
