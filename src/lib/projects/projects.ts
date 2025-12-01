/**
 * Projects Data Export
 * Centralized export of projects data as TypeScript
 */

import { Project } from '../types/Project_Section';

export const projectsData: Project[] = [
  {
    id: "1",
    slug: "cmh-data-management-system",
    title: "Centralized Data Management System for Cloud Marketing Hub",
    description: "Designed and developed a comprehensive centralized data management system for Cloud Marketing Hub, reducing average task time by 65% and improving cross-team coordination. Automated analysis and reporting of over 500,000 monthly marketing emails, cutting manual data handling by 80%. Implemented secure role-based access control (RBAC) and two-factor authentication (2FA) via Telegram, strengthening data governance for 400+ employees.",
    category: "web-dev",
    tags: ["Python", "Django", "PostgreSQL", "REST API", "Redis", "Next.js", "Security", "RBAC", "2FA"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-adf4e565db57?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop"
    ],
    featured: true,
    links: {
      github: "https://github.com/mahmoud/cmh-data-management",
      demo: "https://cmh-demo.com"
    },
    videos: [
      "https://www.youtube.com/watch?v=UjS72N1pbzM"
    ],
    documentation: "https://example.com/cmh-docs.pdf",
    tier: "flagship",
    impactScore: 20,
    projectType: "client",
    difficulty: 5,
    isNew: false,
    isTrending: true,
    createdAt: "2025-04-01",
    completedAt: "2025-06-15"
  },
  {
    id: "2",
    slug: "smartmaint-predictive-maintenance",
    title: "SmartMaint - Predictive Maintenance System",
    description: "An AI-powered predictive maintenance system that detects machine anomalies using Random Forest algorithms and IoT sensor data. Achieved 92% accuracy in predicting equipment failures with an interactive web interface. Developed a predictive maintenance system with real-time monitoring capabilities to prevent costly equipment downtime.",
    category: "machine-learning",
    tags: ["Python", "scikit-learn", "Random Forest", "Flask", "Streamlit", "IoT", "Machine Learning"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1535599810169-1a30bd58a373?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1531746790731-6c087a29a605?w=800&h=600&fit=crop"
    ],
    featured: true,
    links: {
      github: "https://github.com/mahmoud/smartmaint",
      demo: "https://smartmaint-demo.com"
    },
    videos: [
      "https://www.youtube.com/watch?v=UjS72N1pbzM"
    ],
    documentation: "https://example.com/smartmaint-docs.pdf",
    tier: "major",
    impactScore: 18,
    projectType: "school",
    difficulty: 4,
    isNew: false,
    isTrending: true,
    createdAt: "2025-01-01",
    completedAt: "2025-03-15"
  },
  {
    id: "3",
    slug: "morocco-road-accidents-analysis",
    title: "Statistical Analysis of Road Accidents in Morocco",
    description: "Comprehensive analysis of Morocco's road accident data analyzing over 50,000 accident records. Created interactive dashboards with geospatial visualizations to identify high-risk areas and traffic patterns. Developed visual insights to help reduce road fatalities using advanced data analysis techniques.",
    category: "data-analyst",
    tags: ["Python", "Pandas", "Matplotlib", "Tkinter", "GeoPandas", "Data Analysis", "Visualization"],
    image: "https://images.unsplash.com/photo-1553531088-be3e0873dc68?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1553531088-be3e0873dc68?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-adf4e565db57?w=800&h=600&fit=crop"
    ],
    featured: true,
    links: {
      github: "https://github.com/mahmoud/morocco-accidents-analysis",
      demo: "https://morocco-accidents-demo.com"
    },
    videos: [
      "https://www.youtube.com/watch?v=UjS72N1pbzM"
    ],
    documentation: "https://example.com/morocco-accidents-docs.pdf",
    tier: "major",
    impactScore: 16,
    projectType: "school",
    difficulty: 3,
    isNew: false,
    isTrending: true,
    createdAt: "2024-01-01",
    completedAt: "2024-04-15"
  },
  {
    id: "4",
    slug: "tech-horizon-magazine",
    title: "Tech Horizon - Full-Stack Web Application",
    description: "An interactive online magazine focused on emerging technologies including AI, IoT, cybersecurity, and VR. Features a multi-role system (visitor, subscriber, manager, admin) with comprehensive article management, secure user authentication, and real-time statistics dashboard. Enables content creators to publish, manage, and analyze article performance.",
    category: "web-dev",
    tags: ["Laravel", "MySQL", "JavaScript", "HTML5", "CSS3", "AJAX", "PHP"],
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&h=600&fit=crop"
    ],
    featured: true,
    links: {
      github: "https://github.com/mahmoud/tech-horizon",
      demo: "https://tech-horizon-demo.com"
    },
    videos: [
      "https://www.youtube.com/watch?v=UjS72N1pbzM"
    ],
    documentation: "https://example.com/tech-horizon-docs.pdf",
    tier: "major",
    impactScore: 15,
    projectType: "personal",
    difficulty: 3,
    isNew: false,
    isTrending: false,
    createdAt: "2023-01-01",
    completedAt: "2023-06-15"
  },
  
];
