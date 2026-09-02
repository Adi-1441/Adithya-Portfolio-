-- ==============================================================================
-- ADITHYA G — MECHANICAL ENGINEERING PORTFOLIO DATABASE SCHEMA
-- PostgreSQL + Row Level Security (RLS) for Supabase
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PORTFOLIO SETTINGS
CREATE TABLE IF NOT EXISTS public.portfolio_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_title TEXT NOT NULL DEFAULT 'Adithya G — Mechanical Engineering Portfolio',
    name TEXT NOT NULL DEFAULT 'Adithya G',
    role TEXT NOT NULL DEFAULT 'Mechanical Engineering Student',
    headline TEXT NOT NULL DEFAULT 'Designing, Analyzing & Fabricating Precision Mechanical Systems',
    hero_statement TEXT NOT NULL DEFAULT 'Undergraduate Mechanical Engineering researcher specializing in kinematic design, computational analysis (CAE/FEA/CFD), precision manufacturing, and the integration of machine learning with mechanical systems.',
    about_text TEXT NOT NULL DEFAULT 'Driven by the timeless principles of mechanics and modern computational analysis, I bridge rigorous physics-based engineering with advanced manufacturing and simulation. My work spans mechanical design, dynamic structural simulation, thermal analysis, and automation.',
    contact_email TEXT NOT NULL DEFAULT 'adithyag.eng@gmail.com',
    location TEXT NOT NULL DEFAULT 'Bengaluru, India',
    linkedin_url TEXT DEFAULT '',
    github_url TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. SECTION VISIBILITY & ORDER
CREATE TABLE IF NOT EXISTS public.section_visibility (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_key TEXT UNIQUE NOT NULL,
    label TEXT NOT NULL,
    is_visible BOOLEAN NOT NULL DEFAULT TRUE,
    display_order INT NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. PROJECTS
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL, -- e.g. 'Mechanical Design', 'Thermal & Fluids', 'Robotics & Automation', 'CAE & Simulation'
    year TEXT NOT NULL DEFAULT '2025',
    role TEXT NOT NULL DEFAULT 'Lead Mechanical Designer',
    summary TEXT NOT NULL,
    problem TEXT,
    objective TEXT,
    methodology TEXT,
    tools TEXT[] DEFAULT '{}', -- e.g. ['SolidWorks', 'ANSYS Mechanical', 'MATLAB', 'CNC Machining']
    engineering_work TEXT,
    results TEXT,
    outcome TEXT,
    external_url TEXT,
    github_url TEXT,
    cover_media_url TEXT,
    cover_media_type TEXT NOT NULL DEFAULT 'image', -- 'image' or 'video'
    display_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. PROJECT MEDIA (Image and Video items)
CREATE TABLE IF NOT EXISTS public.project_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
    file_url TEXT NOT NULL,
    poster_url TEXT, -- For video poster thumbnails
    caption TEXT,
    alt_text TEXT,
    display_order INT NOT NULL DEFAULT 0,
    is_cover BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. RESEARCH MONOGRAPHS & EXPERIMENTAL WORK
CREATE TABLE IF NOT EXISTS public.research_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    focus_area TEXT NOT NULL, -- e.g. 'Composite Materials', 'Thermal Dissipation', 'Kinematic Synthesis'
    status TEXT NOT NULL DEFAULT 'Ongoing', -- 'Completed', 'In Progress', 'Under Review'
    objective TEXT NOT NULL,
    methodology TEXT,
    materials TEXT,
    fabrication_process TEXT,
    testing_and_validation TEXT,
    results TEXT,
    publication_name TEXT,
    publication_url TEXT,
    media_url TEXT,
    media_type TEXT NOT NULL DEFAULT 'image',
    display_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. CAD & CAE CASEBOOK
CREATE TABLE IF NOT EXISTS public.cad_cae_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    analysis_type TEXT NOT NULL, -- 'Static Structural FEA', 'Transient Thermal CFD', 'Kinematic Mechanism', 'Topology Optimization'
    software TEXT[] DEFAULT '{}', -- ['ANSYS Mechanical', 'SolidWorks Simulation', 'Autodesk Fusion 360']
    model_description TEXT NOT NULL,
    simulation_results TEXT,
    key_metrics TEXT, -- e.g. 'Safety Factor: 2.85 | Max Stress: 142 MPa | Mass Reduction: 23%'
    media_url TEXT,
    media_type TEXT NOT NULL DEFAULT 'image', -- 'image' or 'video'
    display_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. SKILLS BY DISCIPLINE
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    discipline TEXT NOT NULL, -- 'CAD & Mechanical Design', 'CAE & Simulation', 'Manufacturing & Prototyping', 'Programming & Engineering Tools', 'AI & Data Analytics', 'Testing & Measurement'
    skill_name TEXT NOT NULL,
    description TEXT,
    tags TEXT[] DEFAULT '{}',
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. CERTIFICATIONS & CREDENTIALS
CREATE TABLE IF NOT EXISTS public.certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date TEXT NOT NULL,
    credential_id TEXT,
    credential_url TEXT,
    certificate_file_url TEXT,
    file_type TEXT DEFAULT 'image', -- 'image' or 'pdf'
    display_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. ARTICLES & TECHNICAL PUBLICATIONS
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    cover_image_url TEXT,
    read_time TEXT DEFAULT '5 min read',
    external_url TEXT,
    published_date TEXT NOT NULL DEFAULT '2025',
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. CONNECTIONS (LinkedIn & Verified Professional Portals)
CREATE TABLE IF NOT EXISTS public.connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    platform TEXT NOT NULL, -- 'LinkedIn', 'GitHub', 'ResearchGate', 'Email'
    url TEXT NOT NULL,
    icon TEXT NOT NULL DEFAULT 'Linkedin',
    description TEXT,
    display_order INT NOT NULL DEFAULT 0,
    is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. RESUME MANAGEMENT
CREATE TABLE IF NOT EXISTS public.resumes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    version_label TEXT NOT NULL DEFAULT 'Mechanical Engineering Resume (Latest)',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.portfolio_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.section_visibility ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cad_cae_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- 1. PUBLIC READ POLICIES (Read-Only access for public visitors)
CREATE POLICY "Public Read Settings" ON public.portfolio_settings FOR SELECT USING (true);
CREATE POLICY "Public Read Visibility" ON public.section_visibility FOR SELECT USING (true);
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Project Media" ON public.project_media FOR SELECT USING (true);
CREATE POLICY "Public Read Research" ON public.research_items FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read CAD CAE" ON public.cad_cae_items FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public Read Certifications" ON public.certifications FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Articles" ON public.articles FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Connections" ON public.connections FOR SELECT USING (is_enabled = true);
CREATE POLICY "Public Read Resumes" ON public.resumes FOR SELECT USING (is_active = true);

-- 2. AUTHENTICATED ADMIN POLICIES (Full CRUD access for authenticated admin)
CREATE POLICY "Admin All Settings" ON public.portfolio_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Visibility" ON public.section_visibility FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Project Media" ON public.project_media FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Research" ON public.research_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All CAD CAE" ON public.cad_cae_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Skills" ON public.skills FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Certifications" ON public.certifications FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Articles" ON public.articles FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Connections" ON public.connections FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Resumes" ON public.resumes FOR ALL TO authenticated USING (true) WITH CHECK (true);
