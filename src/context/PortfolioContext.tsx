// ==============================================================================
// PORTFOLIO CONTEXT & DATA SYNCHRONIZATION PROVIDER
// ==============================================================================

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Project,
  ResearchItem,
  CadCaeItem,
  Skill,
  Certification,
  Article,
  ConnectionItem,
  ResumeDocument,
  SectionVisibility,
  PortfolioSettings,
} from '../types/portfolio';
import { DataStore } from '../lib/dataStore';

interface PortfolioContextType {
  settings: PortfolioSettings;
  visibility: SectionVisibility[];
  projects: Project[];
  research: ResearchItem[];
  cadCae: CadCaeItem[];
  skills: Skill[];
  certifications: Certification[];
  articles: Article[];
  connections: ConnectionItem[];
  resume: ResumeDocument;
  isLoading: boolean;
  refreshAll: () => Promise<void>;
  // Mutation Methods
  updateSettings: (settings: PortfolioSettings) => Promise<PortfolioSettings>;
  updateVisibility: (items: SectionVisibility[]) => Promise<SectionVisibility[]>;
  saveProject: (project: Project) => Promise<Project>;
  deleteProject: (id: string) => Promise<boolean>;
  saveResearch: (item: ResearchItem) => Promise<ResearchItem>;
  deleteResearch: (id: string) => Promise<boolean>;
  saveCadCae: (item: CadCaeItem) => Promise<CadCaeItem>;
  deleteCadCae: (id: string) => Promise<boolean>;
  saveSkill: (item: Skill) => Promise<Skill>;
  deleteSkill: (id: string) => Promise<boolean>;
  saveCertification: (item: Certification) => Promise<Certification>;
  deleteCertification: (id: string) => Promise<boolean>;
  saveArticle: (item: Article) => Promise<Article>;
  deleteArticle: (id: string) => Promise<boolean>;
  saveConnection: (item: ConnectionItem) => Promise<ConnectionItem>;
  deleteConnection: (id: string) => Promise<boolean>;
  saveResume: (resume: ResumeDocument) => Promise<ResumeDocument>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<PortfolioSettings>({
    siteTitle: 'Adithya G — Mechanical Engineering Portfolio',
    name: 'Adithya G',
    role: 'Mechanical Engineering Student',
    headline: 'Kinematic Design, Computational Mechanics & Precision Fabrication',
    heroStatement: '',
    aboutText: '',
    contactEmail: '',
    location: '',
  });
  const [visibility, setVisibility] = useState<SectionVisibility[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [research, setResearch] = useState<ResearchItem[]>([]);
  const [cadCae, setCadCae] = useState<CadCaeItem[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [connections, setConnections] = useState<ConnectionItem[]>([]);
  const [resume, setResume] = useState<ResumeDocument>({
    id: '',
    fileName: '',
    fileUrl: '',
    versionLabel: '',
    isActive: true,
    updatedAt: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshAll = useCallback(async () => {
    setIsLoading(true);
    try {
      const [
        fetchedSettings,
        fetchedVisibility,
        fetchedProjects,
        fetchedResearch,
        fetchedCadCae,
        fetchedSkills,
        fetchedCerts,
        fetchedArticles,
        fetchedConns,
        fetchedResume,
      ] = await Promise.all([
        DataStore.getSettings(),
        DataStore.getVisibility(),
        DataStore.getProjects(),
        DataStore.getResearch(),
        DataStore.getCadCae(),
        DataStore.getSkills(),
        DataStore.getCertifications(),
        DataStore.getArticles(),
        DataStore.getConnections(),
        DataStore.getResume(),
      ]);

      setSettings(fetchedSettings);
      setVisibility(fetchedVisibility);
      setProjects(fetchedProjects);
      setResearch(fetchedResearch);
      setCadCae(fetchedCadCae);
      setSkills(fetchedSkills);
      setCertifications(fetchedCerts);
      setArticles(fetchedArticles);
      setConnections(fetchedConns);
      setResume(fetchedResume);
    } catch (err) {
      console.error('Error fetching portfolio data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  // Mutations
  const updateSettings = async (s: PortfolioSettings) => {
    const res = await DataStore.updateSettings(s);
    setSettings(res);
    return res;
  };

  const updateVisibility = async (v: SectionVisibility[]) => {
    const res = await DataStore.updateVisibility(v);
    setVisibility(res);
    return res;
  };

  const saveProject = async (p: Project) => {
    const res = await DataStore.saveProject(p);
    setProjects(await DataStore.getProjects());
    return res;
  };

  const deleteProject = async (id: string) => {
    const res = await DataStore.deleteProject(id);
    setProjects(await DataStore.getProjects());
    return res;
  };

  const saveResearch = async (r: ResearchItem) => {
    const res = await DataStore.saveResearch(r);
    setResearch(await DataStore.getResearch());
    return res;
  };

  const deleteResearch = async (id: string) => {
    const res = await DataStore.deleteResearch(id);
    setResearch(await DataStore.getResearch());
    return res;
  };

  const saveCadCae = async (c: CadCaeItem) => {
    const res = await DataStore.saveCadCae(c);
    setCadCae(await DataStore.getCadCae());
    return res;
  };

  const deleteCadCae = async (id: string) => {
    const res = await DataStore.deleteCadCae(id);
    setCadCae(await DataStore.getCadCae());
    return res;
  };

  const saveSkill = async (s: Skill) => {
    const res = await DataStore.saveSkill(s);
    setSkills(await DataStore.getSkills());
    return res;
  };

  const deleteSkill = async (id: string) => {
    const res = await DataStore.deleteSkill(id);
    setSkills(await DataStore.getSkills());
    return res;
  };

  const saveCertification = async (c: Certification) => {
    const res = await DataStore.saveCertification(c);
    setCertifications(await DataStore.getCertifications());
    return res;
  };

  const deleteCertification = async (id: string) => {
    const res = await DataStore.deleteCertification(id);
    setCertifications(await DataStore.getCertifications());
    return res;
  };

  const saveArticle = async (a: Article) => {
    const res = await DataStore.saveArticle(a);
    setArticles(await DataStore.getArticles());
    return res;
  };

  const deleteArticle = async (id: string) => {
    const res = await DataStore.deleteArticle(id);
    setArticles(await DataStore.getArticles());
    return res;
  };

  const saveConnection = async (c: ConnectionItem) => {
    const res = await DataStore.saveConnection(c);
    setConnections(await DataStore.getConnections());
    return res;
  };

  const deleteConnection = async (id: string) => {
    const res = await DataStore.deleteConnection(id);
    setConnections(await DataStore.getConnections());
    return res;
  };

  const saveResume = async (r: ResumeDocument) => {
    const res = await DataStore.saveResume(r);
    setResume(res);
    return res;
  };

  const value: PortfolioContextType = {
    settings,
    visibility,
    projects,
    research,
    cadCae,
    skills,
    certifications,
    articles,
    connections,
    resume,
    isLoading,
    refreshAll,
    updateSettings,
    updateVisibility,
    saveProject,
    deleteProject,
    saveResearch,
    deleteResearch,
    saveCadCae,
    deleteCadCae,
    saveSkill,
    deleteSkill,
    saveCertification,
    deleteCertification,
    saveArticle,
    deleteArticle,
    saveConnection,
    deleteConnection,
    saveResume,
  };

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
