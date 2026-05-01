// MOCK DATA — replace with backend API later
export const portfolioData = {
  profile: {
    name: "Bethapudi Rupesh",
    firstName: "Rupesh",
    lastName: "Bethapudi",
    role: "AI / ML Engineer",
    tagline: "Crafting intelligent systems & secure full-stack platforms",
    location: "Hyderabad, Telangana, India",
    email: "rupeshbethapudi@gmail.com",
    phone: "+91 94937 60536",
    image: "https://customer-assets.emergentagent.com/job_ab6330e7-3f65-468c-87df-cd7b329d4188/artifacts/si6axndj_WhatsApp%20Image%202026-04-11%20at%2022.26.06.jpeg",
    summary:
      "AI/ML-focused Computer Science engineer building data-driven applications, predictive models and secure full-stack systems. I improve model performance by up to 30% through iterative experimentation, system design and a deep love for clean architecture.",
    socials: {
      linkedin: "https://linkedin.com/in/rupesh-bethapudi",
      github: "https://github.com/RupeshO7a",
      email: "mailto:rupeshbethapudi@gmail.com"
    }
  },
  stats: [
    { label: "Model Accuracy Lift", value: 28, suffix: "%" },
    { label: "Data Cleaning Reduced", value: 30, suffix: "%" },
    { label: "On-chain Cost Saved", value: 90, suffix: "%" },
    { label: "Production Projects", value: 6, suffix: "+" }
  ],
  about: {
    headline: "From raw data to deployed intelligence.",
    paragraphs: [
      "I am a Computer Science engineer at Kalasalingam Academy of Research and Education with a minor in UAV systems. My work sits at the intersection of machine learning, secure system design and pragmatic engineering.",
      "I have shipped predictive pipelines on seismic datasets at Infosys Springboard, architected a blockchain healthcare exchange with Merkle-tree optimization, and engineered a role-based military resource platform — every project an exercise in turning ambiguity into something measurable."
    ],
    highlights: [
      "Python, TensorFlow, Scikit-Learn power user",
      "Blockchain & cryptography enthusiast (Solidity / SHA-256 / BLAKE2b)",
      "Full-stack systems with RBAC, audit trails & real-time dashboards",
      "Vice President & Research Lead — leading cross-functional teams"
    ]
  },
  experience: [
    {
      id: "exp-1",
      role: "Student Intern — AI / ML",
      company: "Infosys Springboard",
      location: "Bengaluru, India",
      period: "Aug 2025 — Oct 2025",
      bullets: [
        "Improved ML model accuracy by 12–28% through optimization and iterative experimentation on seismic datasets.",
        "Pre-processed and analysed large-scale earthquake data using Python and MATLAB, enhancing prediction precision by ~28%.",
        "Built data-visualization pipelines with Matplotlib & Seaborn to surface patterns and lift forecasting performance by 15%.",
        "Engineered an optimized preprocessing pipeline (NumPy + Pandas) that cut data-cleaning time by 30%."
      ],
      stack: ["Python", "MATLAB", "Pandas", "NumPy", "Matplotlib", "Seaborn"]
    }
  ],
  projects: [
    {
      id: "medchain",
      name: "MedChain",
      subtitle: "Blockchain Healthcare Exchange",
      period: "Jan 2026 — Apr 2026",
      description:
        "A blockchain-based healthcare data exchange built on Ethereum & Solidity — enabling secure, tamper-proof sharing of patient records across multiple institutions with patient-controlled consent.",
      bullets: [
        "Hybrid MongoDB + blockchain architecture with multi-layer hashing (SHA-256 + BLAKE2b).",
        "Reduced on-chain storage cost by 70–90% via Merkle-tree optimization.",
        "AI-driven anomaly detection (Isolation Forest) + smart-contract consent control."
      ],
      tags: ["Ethereum", "Solidity", "MongoDB", "AI", "Cryptography"],
      link: "https://github.com/RupeshO7a/Medchain",
      accent: "cyan"
    },
    {
      id: "prism",
      name: "PRISM",
      subtitle: "Personnel, Resource, Inventory & Soldier Management",
      period: "Aug 2025 — Nov 2025",
      description:
        "A full-stack role-based platform for managing military personnel, armory inventory and operational readiness — with real-time monitoring dashboards and a hardened security model.",
      bullets: [
        "Engineered RBAC and audit trails for accountability across roles.",
        "Real-time dashboards for armory inventory & readiness tracking.",
        "Centralized control with secure multi-tier access flows."
      ],
      tags: ["Full-Stack", "RBAC", "Dashboards", "Security"],
      link: "https://github.com/RupeshO7a/PRISM",
      accent: "amber"
    }
  ],
  skills: {
    Languages: ["Python", "SQL", "R", "C", "Rust", "MATLAB", "MySQL"],
    "ML & Data": ["TensorFlow", "Scikit-Learn", "Pandas", "NumPy", "SciPy", "Predictive Modeling"],
    "Visualization & BI": ["Matplotlib", "Seaborn", "PowerBI", "Tableau"],
    "Tools & IDEs": ["Jupyter", "PyCharm", "MATLAB 2025b", "Arduino IDE", "AutoCAD", "Autodesk"]
  },
  certifications: [
    {
      id: "c1",
      title: "OpenAI GPT-3 for Developers",
      issuer: "Infosys Springboard",
      year: "2025",
      summary: "GPT-3 architecture, prompt engineering & building LLM-powered applications."
    },
    {
      id: "c2",
      title: "Generative AI Unleashed",
      issuer: "Infosys Springboard",
      year: "2025",
      summary: "Core fundamentals of Generative AI, LLM concepts & responsible AI practices."
    }
  ],
  education: {
    degree: "B.Tech, Computer Science & Engineering",
    minor: "Minor in UAV / Unmanned Aerial Vehicles",
    institution: "Kalasalingam Academy of Research and Education",
    location: "Srivilliputhur, India",
    period: "Graduating 2027"
  },
  involvement: [
    "Vice President — Student Body / Tech Council",
    "Member, Research & Competition Analysis"
  ],
  navLinks: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" }
  ]
};
