// ==============================================================================
// ADMIN PROJECTS MANAGEMENT PAGE (/admin/projects)
// Full CRUD with Image AND Video Upload & Reordering
// ==============================================================================

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project, ProjectMedia, MediaType } from '../../types/portfolio';
import { MediaUploader } from '../../components/admin/MediaUploader';
import { ConfirmModal } from '../../components/admin/ConfirmModal';
import { VideoPlayer } from '../../components/common/VideoPlayer';
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Eye,
  Film,
  Image as ImageIcon,
  ArrowUp,
  ArrowDown,
  Save,
  X,
} from 'lucide-react';

export const AdminProjectsPage: React.FC = () => {
  const { projects, saveProject, deleteProject } = usePortfolio();

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateNew = () => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      slug: `project-${Date.now()}`,
      title: '',
      category: 'Mechanical Design',
      year: new Date().getFullYear().toString(),
      role: 'Lead Mechanical Designer',
      summary: '',
      problem: '',
      objective: '',
      methodology: '',
      tools: ['SolidWorks', 'ANSYS Mechanical'],
      engineeringWork: '',
      results: '',
      outcome: '',
      coverMediaUrl: '',
      coverMediaType: 'image',
      displayOrder: projects.length + 1,
      isPublished: true,
      isFeatured: false,
      media: [],
    };
    setEditingProject(newProject);
    setIsNew(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(JSON.parse(JSON.stringify(project))); // Deep clone for editing
    setIsNew(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (!editingProject.title.trim() || !editingProject.summary.trim()) {
      alert('Please fill out both the project title and summary.');
      return;
    }

    // Auto-generate slug if blank
    if (!editingProject.slug.trim()) {
      editingProject.slug = editingProject.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    await saveProject(editingProject);
    setEditingProject(null);
    setIsNew(false);
    showNotification('Project monograph saved and updated in database!');
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmId) return;
    await deleteProject(deleteConfirmId);
    setDeleteConfirmId(null);
    showNotification('Project deleted from database.');
  };

  const handleTogglePublish = async (project: Project) => {
    await saveProject({ ...project, isPublished: !project.isPublished });
    showNotification(`Project "${project.title}" ${project.isPublished ? 'unpublished' : 'published'}.`);
  };

  // Add media to currently edited project
  const handleAddMedia = (uploaded: { url: string; mediaType: 'image' | 'video' | 'pdf'; name: string }) => {
    if (!editingProject) return;
    const newMediaItem: ProjectMedia = {
      id: `m-${Date.now()}`,
      projectId: editingProject.id,
      mediaType: uploaded.mediaType === 'video' ? 'video' : 'image',
      fileUrl: uploaded.url,
      caption: uploaded.name,
      displayOrder: (editingProject.media?.length || 0) + 1,
      isCover: editingProject.media?.length === 0,
    };

    const updatedMedia = [...(editingProject.media || []), newMediaItem];
    setEditingProject({
      ...editingProject,
      media: updatedMedia,
      coverMediaUrl: editingProject.coverMediaUrl || uploaded.url,
      coverMediaType: editingProject.coverMediaType || (uploaded.mediaType === 'video' ? 'video' : 'image'),
    });
  };

  const handleRemoveMedia = (mediaId: string) => {
    if (!editingProject) return;
    const filtered = (editingProject.media || []).filter((m) => m.id !== mediaId);
    setEditingProject({ ...editingProject, media: filtered });
  };

  const handleSetCoverMedia = (m: ProjectMedia) => {
    if (!editingProject) return;
    const updated = (editingProject.media || []).map((item) => ({
      ...item,
      isCover: item.id === m.id,
    }));
    setEditingProject({
      ...editingProject,
      media: updated,
      coverMediaUrl: m.fileUrl,
      coverMediaType: m.mediaType,
    });
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Top Action Header */}
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
          <div className="tech-label">DATABASE // PROJECTS</div>
          <h1 style={{ fontSize: '1.8rem' }}>Mechanical Engineering Projects</h1>
        </div>

        {!editingProject && (
          <button onClick={handleCreateNew} className="btn btn-primary btn-sm">
            <Plus size={16} />
            <span>CREATE NEW PROJECT</span>
          </button>
        )}
      </div>

      {/* Success Notification */}
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

      {/* Editing / Create Form Modal Card */}
      {editingProject ? (
        <div
          className="monograph-card"
          style={{
            padding: '2.5rem',
            borderTop: '4px solid var(--accent-brass)',
            marginBottom: '3rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem' }}>
              {isNew ? 'Create New Engineering Project Plate' : `Edit: ${editingProject.title}`}
            </h2>
            <button onClick={() => setEditingProject(null)} className="btn btn-ghost btn-sm">
              <X size={16} /> Cancel
            </button>
          </div>

          <form onSubmit={handleSave}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }} className="form-grid-2">
              <div className="form-group">
                <label className="form-label">PROJECT TITLE *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Planetary Gearbox: Kinematic Synthesis & Contact FEA"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">CATEGORY</label>
                <select
                  className="form-select"
                  value={editingProject.category}
                  onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                >
                  <option value="Mechanical Design">Mechanical Design</option>
                  <option value="Thermal & Fluids">Thermal & Fluids</option>
                  <option value="Robotics & Automation">Robotics & Automation</option>
                  <option value="CAE & Simulation">CAE & Simulation</option>
                  <option value="Manufacturing">Manufacturing</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }} className="form-grid-3">
              <div className="form-group">
                <label className="form-label">URL SLUG</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. planetary-gearbox-design"
                  value={editingProject.slug}
                  onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">YEAR</label>
                <input
                  type="text"
                  className="form-input"
                  value={editingProject.year}
                  onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">ROLE</label>
                <input
                  type="text"
                  className="form-input"
                  value={editingProject.role}
                  onChange={(e) => setEditingProject({ ...editingProject, role: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">EXECUTIVE SUMMARY *</label>
              <textarea
                required
                rows={3}
                className="form-textarea"
                placeholder="High-level engineering summary of the project..."
                value={editingProject.summary}
                onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
              />
            </div>

            {/* Structured Engineering Workflow Fields */}
            <div
              style={{
                background: 'var(--bg-surface-subtle)',
                padding: '1.5rem',
                border: '1px solid var(--hairline)',
                marginBottom: '1.5rem',
                borderRadius: 'var(--radius-xs)',
              }}
            >
              <div className="tech-label" style={{ marginBottom: '1rem' }}>
                ENGINEERING WORKFLOW SPECIFICATIONS
              </div>

              <div className="form-group">
                <label className="form-label">01. PROBLEM STATEMENT</label>
                <textarea
                  rows={2}
                  className="form-textarea"
                  placeholder="Deficiencies of existing systems, thermal bottlenecks, or backlash constraints..."
                  value={editingProject.problem || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, problem: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">02. ENGINEERING OBJECTIVE</label>
                <textarea
                  rows={2}
                  className="form-textarea"
                  placeholder="Quantitative targets (e.g. reduce backlash < 4 arcmin, 20% mass reduction)..."
                  value={editingProject.objective || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, objective: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">03. METHODOLOGY & ANALYSIS</label>
                <textarea
                  rows={2}
                  className="form-textarea"
                  placeholder="Analytical mechanics equations, ISO standards applied, numerical solver settings..."
                  value={editingProject.methodology || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, methodology: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">04. DETAILED ENGINEERING WORK & FABRICATION</label>
                <textarea
                  rows={2}
                  className="form-textarea"
                  placeholder="CAD modeling choices, machining operations, GD&T tolerances..."
                  value={editingProject.engineeringWork || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, engineeringWork: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">05. RESULTS & MEASURED DATA</label>
                <textarea
                  rows={2}
                  className="form-textarea"
                  placeholder="FEA stress values (Von Mises), CFD temperatures, safety factor..."
                  value={editingProject.results || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, results: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">06. FINAL OUTCOME & VALIDATION</label>
                <textarea
                  rows={2}
                  className="form-textarea"
                  placeholder="Physical prototype testing outcome, dynamometer measurements..."
                  value={editingProject.outcome || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, outcome: e.target.value })}
                />
              </div>
            </div>

            {/* Tools Array */}
            <div className="form-group">
              <label className="form-label">TOOLCHAIN (COMMA SEPARATED)</label>
              <input
                type="text"
                className="form-input"
                placeholder="SolidWorks, ANSYS Mechanical, MATLAB, CNC VMC, GD&T"
                value={editingProject.tools.join(', ')}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    tools: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                  })
                }
              />
            </div>

            {/* Media Upload & Gallery Section */}
            <div
              style={{
                border: '1px solid var(--hairline-strong)',
                background: 'var(--bg-surface)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-xs)',
                marginBottom: '2rem',
              }}
            >
              <div className="tech-label" style={{ marginBottom: '0.75rem' }}>
                PROJECT MEDIA (IMAGES & VIDEOS)
              </div>

              <MediaUploader
                onUploadSuccess={handleAddMedia}
                label="UPLOAD NEW PROJECT MEDIA (IMAGE OR VIDEO)"
              />

              {/* Media List */}
              {editingProject.media && editingProject.media.length > 0 && (
                <div style={{ marginTop: '1.5rem' }}>
                  <div className="tech-dim" style={{ marginBottom: '0.75rem' }}>
                    ATTACHED MEDIA SPECIMENS ({editingProject.media.length}):
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {editingProject.media.map((m, midx) => (
                      <div
                        key={m.id || midx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.75rem 1rem',
                          background: 'var(--bg-surface-subtle)',
                          border: '1px solid var(--hairline)',
                          borderRadius: 'var(--radius-xs)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          {m.mediaType === 'video' ? <Film size={18} color="var(--accent-steel)" /> : <ImageIcon size={18} color="var(--accent-brass)" />}
                          <div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                              {m.caption || `Media Specimen 0${midx + 1}`}
                            </div>
                            <span className="tech-tag" style={{ fontSize: '0.68rem' }}>
                              {m.mediaType.toUpperCase()}
                            </span>
                            {m.isCover && (
                              <span className="tech-tag" style={{ background: 'var(--accent-brass-subtle)', color: 'var(--accent-brass)', marginLeft: '0.4rem' }}>
                                COVER MEDIA
                              </span>
                            )}
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          {!m.isCover && (
                            <button
                              type="button"
                              onClick={() => handleSetCoverMedia(m)}
                              className="btn btn-outline btn-sm"
                              style={{ fontSize: '0.7rem' }}
                            >
                              SET AS COVER
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveMedia(m.id)}
                            className="btn btn-danger btn-sm"
                            title="Delete media"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Visibility Settings */}
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                <input
                  type="checkbox"
                  checked={editingProject.isPublished}
                  onChange={(e) => setEditingProject({ ...editingProject, isPublished: e.target.checked })}
                />
                <span>PUBLISH ON PUBLIC PORTFOLIO</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                <input
                  type="checkbox"
                  checked={editingProject.isFeatured}
                  onChange={(e) => setEditingProject({ ...editingProject, isFeatured: e.target.checked })}
                />
                <span>FEATURED PROJECT</span>
              </label>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn btn-primary btn-lg">
                <Save size={16} />
                <span>SAVE PROJECT TO DATABASE</span>
              </button>
              <button type="button" onClick={() => setEditingProject(null)} className="btn btn-outline btn-lg">
                CANCEL
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Projects Table View */
        <div className="monograph-card" style={{ padding: '0', overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>PLATE #</th>
                <th>PROJECT TITLE</th>
                <th>CATEGORY</th>
                <th>YEAR</th>
                <th>MEDIA</th>
                <th>STATUS</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((proj, idx) => (
                <tr key={proj.id}>
                  <td>
                    <span className="tech-index">0{idx + 1}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{proj.title}</div>
                    <div className="tech-dim">{proj.slug}</div>
                  </td>
                  <td>
                    <span className="tech-tag">{proj.category}</span>
                  </td>
                  <td>
                    <span className="tech-dim">{proj.year}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      {proj.coverMediaType === 'video' ? <Film size={14} color="var(--accent-steel)" /> : <ImageIcon size={14} color="var(--accent-brass)" />}
                      <span className="tech-dim">{proj.media?.length || 1} item(s)</span>
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => handleTogglePublish(proj)}
                      className={`status-pill ${proj.isPublished ? 'status-pill-active' : 'status-pill-inactive'}`}
                      style={{ cursor: 'pointer', border: 'none' }}
                      title="Click to toggle publish status"
                    >
                      {proj.isPublished ? 'PUBLISHED' : 'DRAFT'}
                    </button>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem' }}>
                      <button
                        onClick={() => handleEdit(proj)}
                        className="btn btn-outline btn-sm"
                        title="Edit Project"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(proj.id)}
                        className="btn btn-danger btn-sm"
                        title="Delete Project"
                      >
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

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteConfirmId)}
        title="Delete Project Monograph"
        message="Are you sure you want to permanently delete this project record and all associated media from the database? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
