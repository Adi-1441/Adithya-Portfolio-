// ==============================================================================
// APPLICATION ROUTER CONFIGURATION
// ==============================================================================

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { AdminLayout } from './components/admin/AdminLayout';

// Public Pages
import { PublicPortfolioPage } from './pages/PublicPortfolioPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ResearchDetailPage } from './pages/ResearchDetailPage';
import { CadCaeDetailPage } from './pages/CadCaeDetailPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Pages
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminProjectsPage } from './pages/admin/AdminProjectsPage';
import { AdminMediaPage } from './pages/admin/AdminMediaPage';
import { AdminResearchPage } from './pages/admin/AdminResearchPage';
import { AdminCadCaePage } from './pages/admin/AdminCadCaePage';
import { AdminSkillsPage } from './pages/admin/AdminSkillsPage';
import { AdminCertificationsPage } from './pages/admin/AdminCertificationsPage';
import { AdminArticlesPage } from './pages/admin/AdminArticlesPage';
import { AdminResumePage } from './pages/admin/AdminResumePage';
import { AdminConnectionsPage } from './pages/admin/AdminConnectionsPage';
import { AdminVisibilityPage } from './pages/admin/AdminVisibilityPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

export function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <PortfolioProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<PublicPortfolioPage />} />
              <Route path="/project/:id" element={<ProjectDetailPage />} />
              <Route path="/research/:id" element={<ResearchDetailPage />} />
              <Route path="/cad-cae/:id" element={<CadCaeDetailPage />} />
              <Route path="/article/:id" element={<ArticleDetailPage />} />

              {/* Admin Login */}
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* Protected Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AdminDashboardPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/projects"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AdminProjectsPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/media"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AdminMediaPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/research"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AdminResearchPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/cad-cae"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AdminCadCaePage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/skills"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AdminSkillsPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/certifications"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AdminCertificationsPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/articles"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AdminArticlesPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/resume"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AdminResumePage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/connections"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AdminConnectionsPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/visibility"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AdminVisibilityPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AdminSettingsPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              {/* 404 Catch-All */}
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </BrowserRouter>
        </PortfolioProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
