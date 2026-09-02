// ==============================================================================
// PUBLIC PORTFOLIO HOMEPAGE ROUTE (/)
// ==============================================================================

import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { DraftingRuler } from '../components/common/DraftingRuler';

import { HeroSection } from '../components/public/HeroSection';
import { AboutSection } from '../components/public/AboutSection';
import { SkillsSection } from '../components/public/SkillsSection';
import { ProjectsSection } from '../components/public/ProjectsSection';
import { ResearchSection } from '../components/public/ResearchSection';
import { CadCaeSection } from '../components/public/CadCaeSection';
import { AiEngineeringSection } from '../components/public/AiEngineeringSection';
import { CertificationsSection } from '../components/public/CertificationsSection';
import { ArticlesSection } from '../components/public/ArticlesSection';
import { ResumeSection } from '../components/public/ResumeSection';
import { ConnectionsSection } from '../components/public/ConnectionsSection';
import { ContactSection } from '../components/public/ContactSection';

export const PublicPortfolioPage: React.FC = () => {
  const { visibility } = usePortfolio();

  const isVisible = (key: string): boolean => {
    const item = visibility.find((v) => v.sectionKey === key);
    return item ? item.isVisible : true;
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <DraftingRuler />

      <main style={{ flex: 1 }}>
        <HeroSection />
        {isVisible('about') && <AboutSection />}
        {isVisible('skills') && <SkillsSection />}
        {isVisible('projects') && <ProjectsSection />}
        {isVisible('research') && <ResearchSection />}
        {isVisible('cad-cae') && <CadCaeSection />}
        {isVisible('ai-engineering') && <AiEngineeringSection />}
        {isVisible('certifications') && <CertificationsSection />}
        {isVisible('articles') && <ArticlesSection />}
        {isVisible('resume') && <ResumeSection />}
        {isVisible('connections') && <ConnectionsSection />}
        {isVisible('contact') && <ContactSection />}
      </main>

      <Footer />
    </div>
  );
};
