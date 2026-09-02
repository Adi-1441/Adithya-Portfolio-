// ==============================================================================
// ADITHYA G — MECHANICAL ENGINEERING PORTFOLIO DOMAIN TYPES
// ==============================================================================

export type MediaType = 'image' | 'video';

export interface ProjectMedia {
  id: string;
  projectId: string;
  mediaType: MediaType;
  fileUrl: string;
  posterUrl?: string;
  caption?: string;
  altText?: string;
  displayOrder: number;
  isCover: boolean;
  createdAt?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'Mechanical Design' | 'Thermal & Fluids' | 'Robotics & Automation' | 'CAE & Simulation' | 'Manufacturing' | string;
  year: string;
  role: string;
  summary: string;
  problem?: string;
  objective?: string;
  methodology?: string;
  tools: string[];
  engineeringWork?: string;
  results?: string;
  outcome?: string;
  externalUrl?: string;
  githubUrl?: string;
  coverMediaUrl?: string;
  coverMediaType?: MediaType;
  displayOrder: number;
  isPublished: boolean;
  isFeatured: boolean;
  media?: ProjectMedia[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ResearchItem {
  id: string;
  title: string;
  focusArea: string;
  status: 'Completed' | 'In Progress' | 'Under Review' | string;
  objective: string;
  methodology?: string;
  materials?: string;
  fabricationProcess?: string;
  testingAndValidation?: string;
  results?: string;
  publicationName?: string;
  publicationUrl?: string;
  mediaUrl?: string;
  mediaType?: MediaType;
  displayOrder: number;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CadCaeItem {
  id: string;
  title: string;
  analysisType: 'Static Structural FEA' | 'Transient Thermal CFD' | 'Kinematic Mechanism' | 'Topology Optimization' | 'Modal Vibration' | string;
  software: string[];
  modelDescription: string;
  simulationResults?: string;
  keyMetrics?: string;
  mediaUrl?: string;
  mediaType?: MediaType;
  displayOrder: number;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Skill {
  id: string;
  discipline: 'CAD & Mechanical Design' | 'CAE & Simulation' | 'Manufacturing & Prototyping' | 'Programming & Engineering Tools' | 'AI & Data Analytics' | 'Testing & Metrology' | string;
  skillName: string;
  description?: string;
  tags?: string[];
  displayOrder: number;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  certificateFileUrl?: string;
  fileType?: 'image' | 'pdf' | string;
  displayOrder: number;
  isPublished: boolean;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  tags?: string[];
  coverImageUrl?: string;
  readTime?: string;
  externalUrl?: string;
  publishedDate: string;
  isPublished: boolean;
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ConnectionItem {
  id: string;
  name: string;
  platform: 'LinkedIn' | 'GitHub' | 'ResearchGate' | 'Email' | 'Portfolio' | string;
  url: string;
  icon: string;
  description?: string;
  displayOrder: number;
  isEnabled: boolean;
}

export interface ResumeDocument {
  id: string;
  fileName: string;
  fileUrl: string;
  versionLabel: string;
  isActive: boolean;
  updatedAt: string;
}

export interface SectionVisibility {
  id: string;
  sectionKey: string;
  label: string;
  isVisible: boolean;
  displayOrder: number;
}

export interface PortfolioSettings {
  id?: string;
  siteTitle: string;
  name: string;
  role: string;
  headline: string;
  heroStatement: string;
  aboutText: string;
  contactEmail: string;
  location: string;
  linkedinUrl?: string;
  githubUrl?: string;
}
