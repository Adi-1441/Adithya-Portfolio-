// ==============================================================================
// ADMIN SKILLS & DISCIPLINES MANAGEMENT (/admin/skills)
// ==============================================================================

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Skill } from '../../types/portfolio';
import { ConfirmModal } from '../../components/admin/ConfirmModal';
import { Plus, Edit2, Trash2, CheckCircle, Save, X } from 'lucide-react';

export const AdminSkillsPage: React.FC = () => {
  const { skills, saveSkill, deleteSkill } = usePortfolio();

  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateNew = () => {
    const newSkill: Skill = {
      id: `skill-${Date.now()}`,
      discipline: 'CAD & Mechanical Design',
      skillName: '',
      description: '',
      tags: [],
      displayOrder: skills.length + 1,
    };
    setEditingSkill(newSkill);
    setIsNew(true);
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(JSON.parse(JSON.stringify(skill)));
    setIsNew(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;

    if (!editingSkill.skillName.trim()) {
      alert('Please provide skill name.');
      return;
    }

    await saveSkill(editingSkill);
    setEditingSkill(null);
    setIsNew(false);
    showNotification('Skill saved to database!');
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmId) return;
    await deleteSkill(deleteConfirmId);
    setDeleteConfirmId(null);
    showNotification('Skill removed.');
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
          <div className="tech-label">DATABASE // SKILLS & TOOLS</div>
          <h1 style={{ fontSize: '1.8rem' }}>Discipline Competencies & Standards</h1>
        </div>

        {!editingSkill && (
          <button onClick={handleCreateNew} className="btn btn-primary btn-sm">
            <Plus size={16} />
            <span>ADD NEW SKILL</span>
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

      {editingSkill ? (
        <div
          className="monograph-card"
          style={{
            padding: '2.5rem',
            borderTop: '4px solid var(--accent-brass)',
            marginBottom: '3rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem' }}>{isNew ? 'Add Technical Skill' : `Edit: ${editingSkill.skillName}`}</h2>
            <button onClick={() => setEditingSkill(null)} className="btn btn-ghost btn-sm">
              <X size={16} /> Cancel
            </button>
          </div>

          <form onSubmit={handleSave}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group">
                <label className="form-label">DISCIPLINE</label>
                <select
                  className="form-select"
                  value={editingSkill.discipline}
                  onChange={(e) => setEditingSkill({ ...editingSkill, discipline: e.target.value })}
                >
                  <option value="CAD & Mechanical Design">CAD & Mechanical Design</option>
                  <option value="CAE & Simulation">CAE & Simulation</option>
                  <option value="Manufacturing & Prototyping">Manufacturing & Prototyping</option>
                  <option value="Programming & Engineering Tools">Programming & Engineering Tools</option>
                  <option value="AI & Data Analytics">AI & Data Analytics</option>
                  <option value="Testing & Metrology">Testing & Metrology</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">SKILL / TOOL NAME *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. SolidWorks (CSWP Certified)"
                  value={editingSkill.skillName}
                  onChange={(e) => setEditingSkill({ ...editingSkill, skillName: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">TECHNICAL DESCRIPTION</label>
              <textarea
                rows={2}
                className="form-textarea"
                placeholder="Scope of work, standard applications, specific toolboxes..."
                value={editingSkill.description || ''}
                onChange={(e) => setEditingSkill({ ...editingSkill, description: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">TAGS (COMMA SEPARATED)</label>
              <input
                type="text"
                className="form-input"
                placeholder="Parametric CAD, ASME Y14.5, Large Assemblies"
                value={(editingSkill.tags || []).join(', ')}
                onChange={(e) =>
                  setEditingSkill({
                    ...editingSkill,
                    tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                  })
                }
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="submit" className="btn btn-primary btn-lg">
                <Save size={16} />
                <span>SAVE SKILL ENTRY</span>
              </button>
              <button type="button" onClick={() => setEditingSkill(null)} className="btn btn-outline btn-lg">
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
                <th>DISCIPLINE</th>
                <th>SKILL NAME</th>
                <th>DESCRIPTION</th>
                <th>TAGS</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((s) => (
                <tr key={s.id}>
                  <td>
                    <span className="tech-tag">{s.discipline}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{s.skillName}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', maxWidth: '340px' }}>
                      {s.description || '—'}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                      {s.tags?.map((t, idx) => (
                        <span key={idx} className="tech-dim" style={{ fontSize: '0.7rem' }}>
                          #{t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem' }}>
                      <button onClick={() => handleEdit(s)} className="btn btn-outline btn-sm">
                        <Edit2 size={13} />
                      </button>
                      <button onClick={() => setDeleteConfirmId(s.id)} className="btn btn-danger btn-sm">
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
        title="Delete Technical Skill"
        message="Are you sure you want to remove this skill from the portfolio database?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
