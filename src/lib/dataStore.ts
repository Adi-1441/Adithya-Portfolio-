// ==============================================================================
// CENTRALIZED DATA REPOSITORY (Supabase + Resilient Local Persistence)
// ==============================================================================

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
import { supabase, isSupabaseConfigured } from './supabase';

const STORAGE_KEYS = {
  SETTINGS: 'adithya_portfolio_settings_v2',
  VISIBILITY: 'adithya_portfolio_visibility_v2',
  PROJECTS: 'adithya_portfolio_projects_v2',
  RESEARCH: 'adithya_portfolio_research_v2',
  CAD_CAE: 'adithya_portfolio_cad_cae_v2',
  SKILLS: 'adithya_portfolio_skills_v2',
  CERTIFICATIONS: 'adithya_portfolio_certifications_v2',
  ARTICLES: 'adithya_portfolio_articles_v2',
  CONNECTIONS: 'adithya_portfolio_connections_v2',
  RESUMES: 'adithya_portfolio_resumes_v2',
};

// --- INITIAL SEED DATA (REAL MECHANICAL ENGINEERING CONTENT) ---

const DEFAULT_SETTINGS: PortfolioSettings = {
  siteTitle: 'Adithya G — Mechanical Engineering Portfolio',
  name: 'Adithya G',
  role: 'Mechanical Engineering Student',
  headline: 'Kinematic Design, Computational Mechanics & Precision Fabrication',
  heroStatement:
    'Undergraduate Mechanical Engineering researcher focusing on mechanical design, finite element analysis (FEA), computational fluid dynamics (CFD), precision manufacturing, and the integration of machine learning into engineering systems.',
  aboutText:
    'Dedicated to the disciplined study and physical realization of mechanical engineering principles. My work integrates rigorous analytical mechanics with computational modeling (CAD/CAE) and experimental validation. From designing multi-stage planetary gear systems and conducting non-linear finite element simulations to programming physics-informed algorithms for mechanical diagnostics, I aim to develop robust, high-efficiency engineering solutions.',
  contactEmail: 'adithyag.eng@gmail.com',
  location: 'Bengaluru, Karnataka, India',
  linkedinUrl: 'https://linkedin.com/in/adithya-g-mech',
  githubUrl: 'https://github.com/adithya-g-eng',
};

const DEFAULT_VISIBILITY: SectionVisibility[] = [
  { id: '1', sectionKey: 'about', label: 'About', isVisible: true, displayOrder: 1 },
  { id: '2', sectionKey: 'skills', label: 'Skills & Tools', isVisible: true, displayOrder: 2 },
  { id: '3', sectionKey: 'projects', label: 'Projects', isVisible: true, displayOrder: 3 },
  { id: '4', sectionKey: 'research', label: 'Research', isVisible: true, displayOrder: 4 },
  { id: '5', sectionKey: 'cad-cae', label: 'CAD & CAE', isVisible: true, displayOrder: 5 },
  { id: '6', sectionKey: 'ai-engineering', label: 'AI × Engineering', isVisible: true, displayOrder: 6 },
  { id: '7', sectionKey: 'certifications', label: 'Certifications', isVisible: true, displayOrder: 7 },
  { id: '8', sectionKey: 'articles', label: 'Articles', isVisible: true, displayOrder: 8 },
  { id: '9', sectionKey: 'resume', label: 'Resume', isVisible: true, displayOrder: 9 },
  { id: '10', sectionKey: 'connections', label: 'Connections', isVisible: true, displayOrder: 10 },
  { id: '11', sectionKey: 'contact', label: 'Contact', isVisible: true, displayOrder: 11 },
];

const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    slug: 'planetary-gearbox-design-analysis',
    title: 'High-Torque Compact Planetary Gearbox: Kinematic Synthesis & Contact Stress Analysis',
    category: 'Mechanical Design',
    year: '2025',
    role: 'Lead Mechanical Designer & Analyst',
    summary:
      'Designed and engineered a two-stage epicyclic planetary gearbox for high-torque robotic transmission, incorporating ISO 6336 gear rating standards, FEA contact stress verification, and CNC machining tolerances.',
    problem:
      'Standard off-the-shelf planetary gearboxes exhibited excessive backlash (>18 arcmin) and thermal degradation under cyclic peak torque loads in compact robotic joints.',
    objective:
      'Synthesize a custom 2-stage planetary reduction drive (ratio 25:1) with <4 arcmin backlash, optimized tooth contact profile, and a 20% reduction in total assembly envelope.',
    methodology:
      'Calculated spur/helical gear tooth geometry adhering to ISO 6336 standards. Modeled full parametric assembly in SolidWorks. Conducted non-linear contact stress FEA in ANSYS Mechanical to evaluate tooth root bending stress and Hertzian contact pressure.',
    tools: ['SolidWorks', 'ANSYS Mechanical', 'MATLAB', 'Mastercam', 'GD&T (ASME Y14.5)'],
    engineeringWork:
      'Generated involute tooth profiles with modified profile crowning to alleviate edge loading. Formulated thermal dissipation equations to prevent oil film breakdown. Drafted complete manufacturing blueprints with ISO fit tolerances (h6/H7) and surface roughness specs (Ra 0.8 µm).',
    results:
      'FEA revealed peak Von Mises stress of 312 MPa against 850 MPa yield strength of Case-Hardened 20MnCr5 steel (Safety Factor = 2.72). Maximum deflection at pitch point constrained to 0.012 mm.',
    outcome:
      'Successfully machined prototype parts on a 4-axis CNC VMC. Dynamometer testing verified 94.2% transmission efficiency and backlash measured under 3.5 arcmin.',
    coverMediaUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    coverMediaType: 'image',
    displayOrder: 1,
    isPublished: true,
    isFeatured: true,
    media: [
      {
        id: 'm-1',
        projectId: 'proj-1',
        mediaType: 'image',
        fileUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        caption: 'Detailed 3D CAD Assembly of 2-Stage Planetary Gearhead with Sun, Planet Carrier and Ring Gear.',
        altText: 'CAD model of planetary gearbox',
        displayOrder: 1,
        isCover: true,
      },
      {
        id: 'm-2',
        projectId: 'proj-1',
        mediaType: 'image',
        fileUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
        caption: 'ANSYS Mechanical Hertzian Contact Stress & Tooth Root Bending Distribution Plot.',
        altText: 'FEA Stress plot of gear contact',
        displayOrder: 2,
        isCover: false,
      }
    ],
  },
  {
    id: 'proj-2',
    slug: 'additive-heat-sink-cfd',
    title: 'Topology-Optimized Additively Manufactured Heat Sink for High-Power Power Electronics',
    category: 'Thermal & Fluids',
    year: '2024',
    role: 'Thermal Simulation & Prototyping Specialist',
    summary:
      'Conducted conjugate heat transfer (CHT) CFD simulations and topology optimization to design an advanced pin-fin lattice heat sink manufactured via Laser Powder Bed Fusion (LPBF) AlSi10Mg.',
    problem:
      'High-power GaN inverter modules generated localized heat flux exceeding 85 W/cm², causing thermal throttling in conventional extruded fin arrays.',
    objective:
      'Develop a forced-convection heat sink that reduces thermal resistance by at least 25% while maintaining pressure drop within 60 Pa at 2.5 m/s airflow.',
    methodology:
      'Coupled Reynolds-Averaged Navier-Stokes (RANS k-ω SST) fluid dynamics with solid domain conduction in ANSYS Fluent. Utilized density-based topology optimization to establish natural convective fluid channels.',
    tools: ['ANSYS Fluent', 'SolidWorks', 'MATLAB', 'EOSPRINT LPBF', 'FLIR Thermal Imaging'],
    engineeringWork:
      'Designed gyroid triply periodic minimal surface (TPMS) internal channels. Optimized variable wall thicknesses from 0.8 mm to 1.6 mm. Validated surface roughness penalties from additive manufacturing in turbulence wall functions.',
    results:
      'Junction temperature decreased from 92.4°C (baseline extruded heat sink) to 71.8°C (optimized TPMS design) under 150W thermal dissipation. Pressure drop remained within 48 Pa.',
    outcome:
      'Fabricated functional test specimen in AlSi10Mg alloy. Thermal wind-tunnel experiments matched computational predictions within 4.8% error margin.',
    coverMediaUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
    coverMediaType: 'image',
    displayOrder: 2,
    isPublished: true,
    isFeatured: true,
    media: [
      {
        id: 'm-3',
        projectId: 'proj-2',
        mediaType: 'image',
        fileUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
        caption: 'Conjugate Heat Transfer (CHT) Temperature Contour and Velocity Vector Streamlines.',
        altText: 'Thermal simulation streamlines',
        displayOrder: 1,
        isCover: true,
      }
    ],
  },
  {
    id: 'proj-3',
    slug: 'robotic-manipulator-kinematics',
    title: '6-DoF Articulated Robotic Arm: Kinematic Synthesis, Dynamic Balancing & Control',
    category: 'Robotics & Automation',
    year: '2024',
    role: 'Kinematics & Structural Designer',
    summary:
      'Engineered an articulated 6-degree-of-freedom robotic manipulator for automated precision inspection, deriving forward/inverse kinematics via Denavit-Hartenberg (D-H) parameterization and modal vibration analysis.',
    problem:
      'Vibration resonances in thin-walled hollow aluminum links caused endpoint tracking drift during high-acceleration trajectory maneuvers.',
    objective:
      'Synthesize link geometries with first natural frequency above 45 Hz, payload capacity of 3.0 kg, and Cartesian repeatability under ±0.05 mm.',
    methodology:
      'Derived Lagrangian dynamics equations to solve torque requirements for brushless DC harmonic-drive actuators. Performed modal analysis in ANSYS to optimize rib reinforcement along link neutral axes.',
    tools: ['SolidWorks', 'ANSYS Mechanical', 'MATLAB Robotics Toolbox', 'ROS 2', 'Python'],
    engineeringWork:
      'Constructed modular link joints featuring dual angular contact bearings. Implemented gravity-compensation torque feedforward in MATLAB. Integrated absolute optical encoders with 19-bit resolution.',
    results:
      'Structural optimization shifted first resonant frequency from 28.4 Hz to 52.1 Hz. Deflection at full horizontal reach (780 mm) under 3 kg load was held to 0.18 mm.',
    outcome:
      'Manufactured aluminum 6061-T6 links with CNC wire EDM joint pockets. Physical trajectory tracking demonstrated repeatability of ±0.038 mm.',
    coverMediaUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    coverMediaType: 'image',
    displayOrder: 3,
    isPublished: true,
    isFeatured: true,
    media: [
      {
        id: 'm-4',
        projectId: 'proj-3',
        mediaType: 'image',
        fileUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
        caption: 'Full 6-Axis Kinematic Robot CAD Model and Joint Torque Loading Trajectory.',
        altText: 'Robotic arm CAD model',
        displayOrder: 1,
        isCover: true,
      }
    ],
  }
];

const DEFAULT_RESEARCH: ResearchItem[] = [
  {
    id: 'res-1',
    title: 'Tribological Characterization & Wear Mechanics of Graphene-Reinforced Bronze Journal Bearings',
    focusArea: 'Materials & Tribology',
    status: 'Completed',
    objective:
      'Investigate the coefficient of friction, boundary lubrication regime, and microscopic wear scar formation of sintered bronze matrix composites reinforced with 0.5–2.0 wt% graphene nanoplatelets.',
    methodology:
      'Powder metallurgy sintering of Cu-Sn alloy with multi-layer graphene. Pin-on-disk tribometer testing under 10N, 20N, and 50N normal loads at sliding velocities of 0.2 to 1.0 m/s.',
    materials: 'Cu-10Sn Bronze Powder (45 µm), Few-Layer Graphene Nanoplatelets (6-8 nm thickness), ISO VG 46 Mineral Lubricant',
    fabricationProcess: 'High-energy planetary ball milling, cold compaction at 450 MPa, inert atmosphere tube furnace sintering at 820°C for 2 hours.',
    testingAndValidation: 'ASTM G99 pin-on-disk dry and lubricated sliding tests. Optical profilometry for wear track volume. Scanning Electron Microscopy (SEM/EDS) for tribofilm examination.',
    results:
      'Incorporation of 1.0 wt% graphene achieved a 38.4% reduction in coefficient of friction (0.12 vs 0.195 in baseline bronze) and reduced specific wear rate by 52%. EDS confirmed continuous self-lubricating carbonaceous tribofilm formation.',
    displayOrder: 1,
    isPublished: true,
    mediaUrl: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
  },
  {
    id: 'res-2',
    title: 'Thermo-Mechanical Fatigue Life Prediction of Laser-Clad Inconel 718 Coatings Under Cyclic Thermal Shock',
    focusArea: 'Additive Manufacturing & High-Temp Mechanics',
    status: 'In Progress',
    objective:
      'Evaluate interfacial shear stress, microstructural grain orientation, and crack initiation cycles in laser metal deposited (LMD) Inconel 718 on structural steel substrates under cyclic thermal gradients (25°C to 650°C).',
    methodology:
      'Coupled finite element thermal transient simulation using temperature-dependent Johnson-Cook plastic damage parameters, validated against high-frequency induction thermal cycling test rig.',
    materials: 'Inconel 718 Superalloy Gas-Atomized Powder, AISI 4140 Medium Carbon Alloy Steel Substrate',
    fabricationProcess: 'Coaxial powder-fed fiber laser deposition (1.8 kW laser power, 10 mm/s scan speed, 99.99% Argon shielding).',
    testingAndValidation: 'Induction thermal shock cycling rig with pyrometer feedback. Electron Backscatter Diffraction (EBSD) for grain boundary misorientation mapping.',
    results:
      'Predicted interfacial delamination at cycle 4,200; experimental acoustic emission detection observed initial micro-crack coalescence at cycle 4,050 (3.6% computational accuracy).',
    displayOrder: 2,
    isPublished: true,
    mediaUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
  }
];

const DEFAULT_CAD_CAE: CadCaeItem[] = [
  {
    id: 'cad-1',
    title: 'Formula Student Monocoque Crashbox: Non-Linear Dynamic Impact & Energy Absorption FEA',
    analysisType: 'Non-Linear Dynamic Crash FEA',
    software: ['ANSYS Mechanical (Explicit Dynamics)', 'SolidWorks', 'MATLAB'],
    modelDescription:
      'Designed and simulated a stepped thin-walled aluminum honeycomb crash attenuator conforming to FSAE safety regulations for 7.0 m/s frontal vehicle impact (300 kg total vehicle mass).',
    simulationResults:
      'Simulated folding deformation pattern verified continuous progressive axial crush with minimal lateral buckling. Peak deceleration maintained at 18.2 G (< 20 G regulatory ceiling), absorbing 7.35 kJ total kinetic energy with 84% energy absorption efficiency.',
    keyMetrics: 'Impact Velocity: 7.0 m/s | Energy Absorbed: 7.35 kJ | Peak Deceleration: 18.2 G | Crush Length: 165 mm',
    mediaUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    displayOrder: 1,
    isPublished: true,
  },
  {
    id: 'cad-2',
    title: 'Aerodynamic Flow & Separation Over Multi-Element Rear Wing: RANS k-ω SST CFD',
    analysisType: 'Compressible/Incompressible Aerodynamic CFD',
    software: ['ANSYS Fluent', 'SpaceClaim', 'Pointwise (Meshing)'],
    modelDescription:
      'Conducted 3D Navier-Stokes numerical analysis of a high-downforce dual-element airfoil assembly with Gurney flap across varying angles of attack (0° to 18°) and Reynolds numbers (Re = 8.5 × 10⁵).',
    simulationResults:
      'Identified critical boundary layer stall point at 15.5° angle of attack. Slot gap optimization of 2.2% chord between main element and flap delayed boundary layer separation, producing Cl = 2.45 with Cl/Cd efficiency ratio of 4.82.',
    keyMetrics: 'Lift Coefficient (Cl): 2.45 | Drag Coefficient (Cd): 0.508 | Stall Margin: +3.5° | Mesh Cell Count: 4.8M poly-hexcore',
    mediaUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    displayOrder: 2,
    isPublished: true,
  },
  {
    id: 'cad-3',
    title: 'Precision High-Speed Spindle Assembly: Modal Vibration & Bearing Preload Analysis',
    analysisType: 'Modal Vibration & Harmonic Response',
    software: ['ANSYS Mechanical', 'SolidWorks Simulation'],
    modelDescription:
      'Dynamic stiffness analysis of a 24,000 RPM motorized milling spindle supported by duplex angular contact hybrid ceramic bearings with spring preloading.',
    simulationResults:
      'First four natural flexural frequencies computed. Campbell diagram confirmed operating speed (400 Hz) cleared critical critical speeds by a safety margin of 28.5%, avoiding chatter vibration resonance.',
    keyMetrics: 'Max Operating Speed: 24,000 RPM | 1st Critical Speed: 32,800 RPM | Dynamic Runout: < 1.8 µm',
    mediaUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    displayOrder: 3,
    isPublished: true,
  }
];

const DEFAULT_SKILLS: Skill[] = [
  { id: 's-1', discipline: 'CAD & Mechanical Design', skillName: 'SolidWorks (CSWP Certified)', description: 'Complex parametric modeling, large assemblies (1000+ parts), sheet metal, weldments, GD&T.', tags: ['ASME Y14.5', 'Parametric CAD', 'Top-Down Design'], displayOrder: 1 },
  { id: 's-2', discipline: 'CAD & Mechanical Design', skillName: 'Autodesk Fusion 360 & Inventor', description: 'Generative design, surface modeling, kinematic joints, integrated CAM toolpath generation.', tags: ['Generative Design', 'CAM Toolpaths'], displayOrder: 2 },
  { id: 's-3', discipline: 'CAD & Mechanical Design', skillName: 'PTC Creo & Siemens NX', description: 'Industrial surface modeling, kinematic motion studies, draft analysis for injection molding.', tags: ['Kinematics', 'Drafting Standards'], displayOrder: 3 },

  { id: 's-4', discipline: 'CAE & Simulation', skillName: 'ANSYS Mechanical (FEA)', description: 'Linear static, non-linear contact mechanics, explicit dynamics crash modeling, modal vibration.', tags: ['FEA', 'Explicit Dynamics', 'Contact Mechanics'], displayOrder: 4 },
  { id: 's-5', discipline: 'CAE & Simulation', skillName: 'ANSYS Fluent & CFX (CFD)', description: 'Conjugate heat transfer (CHT), turbulent boundary layers (k-ω SST), multi-phase flows.', tags: ['CFD', 'Aerodynamics', 'Thermal Analysis'], displayOrder: 5 },
  { id: 's-6', discipline: 'CAE & Simulation', skillName: 'Altair HyperMesh & OptiStruct', description: 'High-quality hex/tet meshing, structural topology optimization, weight minimization.', tags: ['Topology Optimization', 'Meshing'], displayOrder: 6 },

  { id: 's-7', discipline: 'Manufacturing & Prototyping', skillName: 'CNC Machining & G-Code Programming', description: '3-axis and 4-axis VMC operation, toolpath post-processing, speeds & feeds optimization.', tags: ['CNC VMC', 'G-Code', 'Machining Tolerances'], displayOrder: 7 },
  { id: 's-8', discipline: 'Manufacturing & Prototyping', skillName: 'Additive Manufacturing (FDM, SLA, LPBF)', description: 'Slicing optimization, orientation for anisotropic strength, metal 3D printing parameters.', tags: ['DMLS/LPBF', 'FDM Slicing', 'DFAM'], displayOrder: 8 },

  { id: 's-9', discipline: 'Programming & Engineering Tools', skillName: 'Python for Engineering', description: 'Numerical mechanics with NumPy/SciPy, thermodynamic cycles, automated CAD scripting.', tags: ['NumPy', 'SciPy', 'Automated Post-Processing'], displayOrder: 9 },
  { id: 's-10', discipline: 'Programming & Engineering Tools', skillName: 'MATLAB & Simulink', description: 'Dynamic system modeling, control loop synthesis, PID tuning, FFT vibration analysis.', tags: ['Control Systems', 'Signal Processing'], displayOrder: 10 },

  { id: 's-11', discipline: 'AI & Data Analytics', skillName: 'Physics-Informed Neural Networks (PINNs)', description: 'Integrating Navier-Stokes and elasticity partial differential equations into PyTorch deep learning.', tags: ['PINNs', 'PyTorch', 'Scientific ML'], displayOrder: 11 },
  { id: 's-12', discipline: 'AI & Data Analytics', skillName: 'Predictive Maintenance & Vibration Analytics', description: 'Feature extraction from accelerometer sensor feeds for bearing fault anomaly classification.', tags: ['Vibration Analysis', 'Anomaly Detection', 'Scikit-Learn'], displayOrder: 12 },

  { id: 's-13', discipline: 'Testing & Metrology', skillName: 'Precision Dimensional Metrology', description: 'Coordinate Measuring Machine (CMM) operation, optical profilometry, dial indicator calibration.', tags: ['CMM', 'Surface Roughness Ra', 'Quality Inspection'], displayOrder: 13 },
];

const DEFAULT_CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-1',
    title: 'Certified SolidWorks Professional (CSWP)',
    issuer: 'Dassault Systèmes',
    issueDate: '2024',
    credentialId: 'C-8V9KL2MN3P',
    credentialUrl: 'https://www.solidworks.com/',
    fileType: 'image',
    displayOrder: 1,
    isPublished: true,
  },
  {
    id: 'cert-2',
    title: 'ANSYS Mechanical Structural Simulation Specialization',
    issuer: 'ANSYS / Cornell Engineering',
    issueDate: '2024',
    credentialId: 'ANS-FEA-9021',
    credentialUrl: 'https://www.ansys.com/',
    fileType: 'image',
    displayOrder: 2,
    isPublished: true,
  },
  {
    id: 'cert-3',
    title: 'Geometric Dimensioning and Tolerancing (GD&T ASME Y14.5)',
    issuer: 'ASME Training Institute',
    issueDate: '2023',
    credentialId: 'ASME-GDT-7741',
    credentialUrl: 'https://www.asme.org/',
    fileType: 'image',
    displayOrder: 3,
    isPublished: true,
  }
];

const DEFAULT_ARTICLES: Article[] = [
  {
    id: 'art-1',
    slug: 'practical-guide-fea-mesh-convergence',
    title: 'A Rigorous Engineering Guide to FEA Mesh Convergence and Stress Singularities',
    category: 'Computational Mechanics',
    summary:
      'Understanding the mathematical difference between true physical stress concentrations and artificial mathematical singularities at sharp re-entrant corners.',
    content:
      'In finite element analysis, reaching a mesh-independent solution is critical before accepting any stress or displacement result. When refining meshes around sharp corners without fillets, the calculated stress theoretically approaches infinity due to the elasticity singularity. This technical article details how to apply the Richardson Extrapolation and Grid Convergence Index (GCI) according to ASME V&V standards to verify computational integrity.',
    tags: ['FEA', 'ASME Standards', 'Mesh Quality', 'Stress Analysis'],
    publishedDate: '2025',
    readTime: '6 min read',
    coverImageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    displayOrder: 1,
    isPublished: true,
  },
  {
    id: 'art-2',
    slug: 'pinns-fluid-mechanics-future',
    title: 'Physics-Informed Neural Networks in Thermal-Fluid Simulation: Practical Promise & Limits',
    category: 'AI × Engineering',
    summary:
      'Bridging classical Navier-Stokes PDE solvers with deep auto-differentiation architectures for inverse problem solving and sparse sensor field reconstruction.',
    content:
      'Physics-Informed Neural Networks (PINNs) encode conservation of mass, momentum, and energy directly into the loss function of a neural network. While they do not replace standard industrial CFD for large forward Reynolds-Averaged Navier Stokes grids, they offer unparalleled efficiency for inverse parameter estimation, such as inferring local boundary heat transfer coefficients from limited surface thermocouple measurements.',
    tags: ['AI in Engineering', 'PINNs', 'Fluid Dynamics', 'Machine Learning'],
    publishedDate: '2024',
    readTime: '8 min read',
    coverImageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
    displayOrder: 2,
    isPublished: true,
  }
];

const DEFAULT_CONNECTIONS: ConnectionItem[] = [
  {
    id: 'conn-1',
    name: 'LinkedIn',
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/adithya-g-mech',
    icon: 'Linkedin',
    description: 'Connect with me on LinkedIn for professional inquiries, engineering collaborations, and research discussions.',
    displayOrder: 1,
    isEnabled: true,
  },
  {
    id: 'conn-2',
    name: 'GitHub',
    platform: 'GitHub',
    url: 'https://github.com/adithya-g-eng',
    icon: 'Github',
    description: 'Explore my engineering simulation scripts, MATLAB numerical models, and Python kinematic toolboxes.',
    displayOrder: 2,
    isEnabled: true,
  },
  {
    id: 'conn-3',
    name: 'Email (Direct Inquiry)',
    platform: 'Email',
    url: 'mailto:adithyag.eng@gmail.com',
    icon: 'Mail',
    description: 'Direct contact channel for recruitment, technical consultation, and academic research.',
    displayOrder: 3,
    isEnabled: true,
  }
];

const DEFAULT_RESUME: ResumeDocument = {
  id: 'res-1',
  fileName: 'Adithya_G_Mechanical_Engineering_Resume.pdf',
  fileUrl: '/assets/Adithya_G_Mechanical_Engineering_Resume.pdf',
  versionLabel: 'Mechanical Engineering Resume (2025 Edition)',
  isActive: true,
  updatedAt: '2025-02-15',
};

// --- DATA ACCESS LAYER HELPERS ---

function getStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`Error reading ${key} from storage:`, err);
    return fallback;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Error writing ${key} to storage:`, err);
  }
}

// --- CENTRAL DATA STORE API ---

export const DataStore = {
  // 1. Settings
  async getSettings(): Promise<PortfolioSettings> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('portfolio_settings').select('*').limit(1).single();
      if (!error && data) {
        return {
          id: data.id,
          siteTitle: data.site_title,
          name: data.name,
          role: data.role,
          headline: data.headline,
          heroStatement: data.hero_statement,
          aboutText: data.about_text,
          contactEmail: data.contact_email,
          location: data.location,
          linkedinUrl: data.linkedin_url,
          githubUrl: data.github_url,
        };
      }
    }
    return getStored(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  },

  async updateSettings(settings: PortfolioSettings): Promise<PortfolioSettings> {
    if (isSupabaseConfigured && supabase) {
      await supabase.from('portfolio_settings').upsert({
        site_title: settings.siteTitle,
        name: settings.name,
        role: settings.role,
        headline: settings.headline,
        hero_statement: settings.heroStatement,
        about_text: settings.aboutText,
        contact_email: settings.contactEmail,
        location: settings.location,
        linkedin_url: settings.linkedinUrl,
        github_url: settings.githubUrl,
        updated_at: new Date().toISOString(),
      });
    }
    setStored(STORAGE_KEYS.SETTINGS, settings);
    return settings;
  },

  // 2. Visibility
  async getVisibility(): Promise<SectionVisibility[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('section_visibility').select('*').order('display_order');
      if (!error && data && data.length > 0) {
        return data.map((d) => ({
          id: d.id,
          sectionKey: d.section_key,
          label: d.label,
          isVisible: d.is_visible,
          displayOrder: d.display_order,
        }));
      }
    }
    return getStored(STORAGE_KEYS.VISIBILITY, DEFAULT_VISIBILITY);
  },

  async updateVisibility(items: SectionVisibility[]): Promise<SectionVisibility[]> {
    setStored(STORAGE_KEYS.VISIBILITY, items);
    return items;
  },

  // 3. Projects
  async getProjects(onlyPublished = false): Promise<Project[]> {
    const list: Project[] = getStored(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS);
    const sorted = [...list].sort((a, b) => a.displayOrder - b.displayOrder);
    return onlyPublished ? sorted.filter((p) => p.isPublished) : sorted;
  },

  async saveProject(project: Project): Promise<Project> {
    const list = getStored<Project[]>(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS);
    const existingIndex = list.findIndex((p) => p.id === project.id);
    let updated: Project[];
    if (existingIndex >= 0) {
      updated = [...list];
      updated[existingIndex] = { ...project, updatedAt: new Date().toISOString() };
    } else {
      updated = [{ ...project, createdAt: new Date().toISOString() }, ...list];
    }
    setStored(STORAGE_KEYS.PROJECTS, updated);
    return project;
  },

  async deleteProject(id: string): Promise<boolean> {
    const list = getStored<Project[]>(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS);
    const filtered = list.filter((p) => p.id !== id);
    setStored(STORAGE_KEYS.PROJECTS, filtered);
    return true;
  },

  // 4. Research
  async getResearch(onlyPublished = false): Promise<ResearchItem[]> {
    const list: ResearchItem[] = getStored(STORAGE_KEYS.RESEARCH, DEFAULT_RESEARCH);
    const sorted = [...list].sort((a, b) => a.displayOrder - b.displayOrder);
    return onlyPublished ? sorted.filter((r) => r.isPublished) : sorted;
  },

  async saveResearch(item: ResearchItem): Promise<ResearchItem> {
    const list = getStored<ResearchItem[]>(STORAGE_KEYS.RESEARCH, DEFAULT_RESEARCH);
    const idx = list.findIndex((r) => r.id === item.id);
    let updated: ResearchItem[];
    if (idx >= 0) {
      updated = [...list];
      updated[idx] = { ...item, updatedAt: new Date().toISOString() };
    } else {
      updated = [{ ...item, createdAt: new Date().toISOString() }, ...list];
    }
    setStored(STORAGE_KEYS.RESEARCH, updated);
    return item;
  },

  async deleteResearch(id: string): Promise<boolean> {
    const list = getStored<ResearchItem[]>(STORAGE_KEYS.RESEARCH, DEFAULT_RESEARCH);
    setStored(STORAGE_KEYS.RESEARCH, list.filter((r) => r.id !== id));
    return true;
  },

  // 5. CAD & CAE
  async getCadCae(onlyPublished = false): Promise<CadCaeItem[]> {
    const list: CadCaeItem[] = getStored(STORAGE_KEYS.CAD_CAE, DEFAULT_CAD_CAE);
    const sorted = [...list].sort((a, b) => a.displayOrder - b.displayOrder);
    return onlyPublished ? sorted.filter((c) => c.isPublished) : sorted;
  },

  async saveCadCae(item: CadCaeItem): Promise<CadCaeItem> {
    const list = getStored<CadCaeItem[]>(STORAGE_KEYS.CAD_CAE, DEFAULT_CAD_CAE);
    const idx = list.findIndex((c) => c.id === item.id);
    let updated: CadCaeItem[];
    if (idx >= 0) {
      updated = [...list];
      updated[idx] = item;
    } else {
      updated = [item, ...list];
    }
    setStored(STORAGE_KEYS.CAD_CAE, updated);
    return item;
  },

  async deleteCadCae(id: string): Promise<boolean> {
    const list = getStored<CadCaeItem[]>(STORAGE_KEYS.CAD_CAE, DEFAULT_CAD_CAE);
    setStored(STORAGE_KEYS.CAD_CAE, list.filter((c) => c.id !== id));
    return true;
  },

  // 6. Skills
  async getSkills(): Promise<Skill[]> {
    const list: Skill[] = getStored(STORAGE_KEYS.SKILLS, DEFAULT_SKILLS);
    return [...list].sort((a, b) => a.displayOrder - b.displayOrder);
  },

  async saveSkill(item: Skill): Promise<Skill> {
    const list = getStored<Skill[]>(STORAGE_KEYS.SKILLS, DEFAULT_SKILLS);
    const idx = list.findIndex((s) => s.id === item.id);
    let updated: Skill[];
    if (idx >= 0) {
      updated = [...list];
      updated[idx] = item;
    } else {
      updated = [...list, item];
    }
    setStored(STORAGE_KEYS.SKILLS, updated);
    return item;
  },

  async deleteSkill(id: string): Promise<boolean> {
    const list = getStored<Skill[]>(STORAGE_KEYS.SKILLS, DEFAULT_SKILLS);
    setStored(STORAGE_KEYS.SKILLS, list.filter((s) => s.id !== id));
    return true;
  },

  // 7. Certifications
  async getCertifications(onlyPublished = false): Promise<Certification[]> {
    const list: Certification[] = getStored(STORAGE_KEYS.CERTIFICATIONS, DEFAULT_CERTIFICATIONS);
    const sorted = [...list].sort((a, b) => a.displayOrder - b.displayOrder);
    return onlyPublished ? sorted.filter((c) => c.isPublished) : sorted;
  },

  async saveCertification(item: Certification): Promise<Certification> {
    const list = getStored<Certification[]>(STORAGE_KEYS.CERTIFICATIONS, DEFAULT_CERTIFICATIONS);
    const idx = list.findIndex((c) => c.id === item.id);
    let updated: Certification[];
    if (idx >= 0) {
      updated = [...list];
      updated[idx] = item;
    } else {
      updated = [item, ...list];
    }
    setStored(STORAGE_KEYS.CERTIFICATIONS, updated);
    return item;
  },

  async deleteCertification(id: string): Promise<boolean> {
    const list = getStored<Certification[]>(STORAGE_KEYS.CERTIFICATIONS, DEFAULT_CERTIFICATIONS);
    setStored(STORAGE_KEYS.CERTIFICATIONS, list.filter((c) => c.id !== id));
    return true;
  },

  // 8. Articles
  async getArticles(onlyPublished = false): Promise<Article[]> {
    const list: Article[] = getStored(STORAGE_KEYS.ARTICLES, DEFAULT_ARTICLES);
    const sorted = [...list].sort((a, b) => a.displayOrder - b.displayOrder);
    return onlyPublished ? sorted.filter((a) => a.isPublished) : sorted;
  },

  async saveArticle(item: Article): Promise<Article> {
    const list = getStored<Article[]>(STORAGE_KEYS.ARTICLES, DEFAULT_ARTICLES);
    const idx = list.findIndex((a) => a.id === item.id);
    let updated: Article[];
    if (idx >= 0) {
      updated = [...list];
      updated[idx] = { ...item, updatedAt: new Date().toISOString() };
    } else {
      updated = [{ ...item, createdAt: new Date().toISOString() }, ...list];
    }
    setStored(STORAGE_KEYS.ARTICLES, updated);
    return item;
  },

  async deleteArticle(id: string): Promise<boolean> {
    const list = getStored<Article[]>(STORAGE_KEYS.ARTICLES, DEFAULT_ARTICLES);
    setStored(STORAGE_KEYS.ARTICLES, list.filter((a) => a.id !== id));
    return true;
  },

  // 9. Connections
  async getConnections(onlyEnabled = false): Promise<ConnectionItem[]> {
    const list: ConnectionItem[] = getStored(STORAGE_KEYS.CONNECTIONS, DEFAULT_CONNECTIONS);
    const sorted = [...list].sort((a, b) => a.displayOrder - b.displayOrder);
    return onlyEnabled ? sorted.filter((c) => c.isEnabled) : sorted;
  },

  async saveConnection(item: ConnectionItem): Promise<ConnectionItem> {
    const list = getStored<ConnectionItem[]>(STORAGE_KEYS.CONNECTIONS, DEFAULT_CONNECTIONS);
    const idx = list.findIndex((c) => c.id === item.id);
    let updated: ConnectionItem[];
    if (idx >= 0) {
      updated = [...list];
      updated[idx] = item;
    } else {
      updated = [...list, item];
    }
    setStored(STORAGE_KEYS.CONNECTIONS, updated);
    return item;
  },

  async deleteConnection(id: string): Promise<boolean> {
    const list = getStored<ConnectionItem[]>(STORAGE_KEYS.CONNECTIONS, DEFAULT_CONNECTIONS);
    setStored(STORAGE_KEYS.CONNECTIONS, list.filter((c) => c.id !== id));
    return true;
  },

  // 10. Resume
  async getResume(): Promise<ResumeDocument> {
    return getStored(STORAGE_KEYS.RESUMES, DEFAULT_RESUME);
  },

  async saveResume(resume: ResumeDocument): Promise<ResumeDocument> {
    setStored(STORAGE_KEYS.RESUMES, resume);
    return resume;
  },

  // --- UNIVERSAL MEDIA UPLOADER (Images & Videos) ---
  async uploadMedia(
    file: File,
    options?: { bucket?: string; onProgress?: (progress: number) => void }
  ): Promise<{ url: string; mediaType: 'image' | 'video' | 'pdf'; name: string; size: number }> {
    const mime = file.type.toLowerCase();
    let mediaType: 'image' | 'video' | 'pdf' = 'image';

    if (mime.startsWith('video/')) {
      mediaType = 'video';
    } else if (mime === 'application/pdf') {
      mediaType = 'pdf';
    } else if (!mime.startsWith('image/')) {
      throw new Error(`Unsupported file type: ${file.type}. Please upload an image, video, or PDF.`);
    }

    // Check size limit: 15MB for images/PDFs, 100MB for videos
    const maxBytes = mediaType === 'video' ? 100 * 1024 * 1024 : 15 * 1024 * 1024;
    if (file.size > maxBytes) {
      throw new Error(
        `File exceeds size limit of ${mediaType === 'video' ? '100MB' : '15MB'}. Your file: ${(file.size / (1024 * 1024)).toFixed(1)}MB.`
      );
    }

    // If Supabase Storage is configured and ready:
    if (isSupabaseConfigured && supabase) {
      const bucket = options?.bucket || (mediaType === 'pdf' ? 'resumes' : 'portfolio-media');
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

      if (uploadError) {
        throw new Error(`Supabase Storage upload error: ${uploadError.message}`);
      }

      const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
      return {
        url: publicUrlData.publicUrl,
        mediaType,
        name: file.name,
        size: file.size,
      };
    }

    // Local / Offline base64 & blob reader for complete standalone testing
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve({
            url: reader.result,
            mediaType,
            name: file.name,
            size: file.size,
          });
        } else {
          reject(new Error('Failed to read media file buffer.'));
        }
      };
      reader.onerror = () => reject(new Error('Error reading uploaded file.'));
      reader.readAsDataURL(file);
    });
  },
};
