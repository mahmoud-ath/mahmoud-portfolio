/**
 * Projects Data Export
 * Centralized export of projects data as TypeScript
 */

import { Project } from '../../types/Project_Section';

export const projectsData: Project[] = [

  // cmh-data-management-system
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
      github: "https://github.com/Farouk-elouassif/email-management-system-wmn",
      demo: "https://cmh-demo.com"
    },
    videos: [
      "https://www.youtube.com/"
    ],
    documentation: "/Projects/1.cmh-data-management-system/docs/cmh-docs.pdf",
    tier: "flagship",
    impactScore: 20,
    projectType: "client",
    difficulty: 5,
    isNew: false,
    isTrending: true,
    createdAt: "2025-04-01",
    completedAt: "2025-06-15"
  },

  // smartmaint-predictive-maintenance
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
      github: "https://github.com/Anas-Ty/Predictive-maintenance",
      demo: "https://smartmaint-demo.com"
    },
    videos: [
      "https://www.youtube.com/watch"
    ],
    documentation: "/Projects/2.smartmaint-predictive-maintenance/smartmaint-docs.pdf",
    tier: "major",
    impactScore: 18,
    projectType: "school",
    difficulty: 4,
    isNew: false,
    isTrending: true,
    createdAt: "2025-01-01",
    completedAt: "2025-03-15"
  },

  // morocco-road-accidents-analysis
  {
    id: "3",
    slug: "morocco-road-accidents-analysis",
    title: "Statistical Analysis of Road Accidents in Morocco",
    description: "Comprehensive analysis of Morocco's road accident data analyzing over 50,000 accident records. Created interactive dashboards with geospatial visualizations to identify high-risk areas and traffic patterns. Developed visual insights to help reduce road fatalities using advanced data analysis techniques.",
    category: "data-analyst",
    tags: ["Python", "Pandas", "Matplotlib", "Tkinter", "GeoPandas", "Data Analysis", "Visualization"],
    image: "/Projects/3.morocco-road-accidents-analysis/images/morocco-road.png",
    images: [
      "/Projects/3.morocco-road-accidents-analysis/images/morocco-road.png",
      "/Projects/3.morocco-road-accidents-analysis/images/morocco-road-1.png",
      "/Projects/3.morocco-road-accidents-analysis/images/morocco-road-2.png",
      "/Projects/3.morocco-road-accidents-analysis/images/morocco-road-3.png",
      "/Projects/3.morocco-road-accidents-analysis/images/morocco-road-4.png",
      "/Projects/3.morocco-road-accidents-analysis/images/morocco-road-5.png",
      
      

    ],
    featured: true,
    links: {
      github: "https://github.com/mahmoud-ath/Accident-Visualization-Morocco",
      demo: "https://morocco-accidents-demo.com"
    },
    videos: [
      "https://www.youtube.com/watch?v=Xr4WSfYdM20"
    ],
    documentation: "/Projects/3.morocco-road-accidents-analysis/docs/morocco-accidents-docs.pdf",
    tier: "major",
    impactScore: 16,
    projectType: "school",
    difficulty: 3,
    isNew: false,
    isTrending: true,
    createdAt: "2025-01-01",
    completedAt: "2025-04-15"
  },

  //tech-horizon-magazine
  {
    id: "4",
    slug: "tech-horizon-magazine",
    title: "Tech Horizon - Full-Stack Web Application",
    description: "An interactive online magazine focused on emerging technologies including AI, IoT, cybersecurity, and VR. Features a multi-role system (visitor, subscriber, manager, admin) with comprehensive article management, secure user authentication, and real-time statistics dashboard. Enables content creators to publish, manage, and analyze article performance.",
    category: "web-dev",
    tags: ["Laravel", "MySQL", "JavaScript", "HTML5", "CSS3", "AJAX", "PHP"],
    image: "/Projects/4.tech-horizon-magazine/images/tech-horizon.png",
    images: [
      "/Projects/4.tech-horizon-magazine/images/tech-horizon.png",
      "/Projects/4.tech-horizon-magazine/images/tech-horizon-1.png",
      "/Projects/4.tech-horizon-magazine/images/tech-horizon-2.png",
      "/Projects/4.tech-horizon-magazine/images/tech-horizon-3.png",
      "/Projects/4.tech-horizon-magazine/images/tech-horizon-4.png",
      "/Projects/4.tech-horizon-magazine/images/tech-horizon-5.png",
      "/Projects/4.tech-horizon-magazine/images/tech-horizon-6.png",
      "/Projects/4.tech-horizon-magazine/images/tech-horizon-7.png",
      "/Projects/4.tech-horizon-magazine/images/tech-horizon-8.png",
      "/Projects/4.tech-horizon-magazine/images/tech-horizon-9.png",
      "/Projects/4.tech-horizon-magazine/images/tech-horizon-10.png",
      "/Projects/4.tech-horizon-magazine/images/tech-horizon-11.png",
    ],
    featured: true,
    links: {
      github: "https://github.com/mahmoud-ath/Horizon-tech-v1",
      demo: "https://tech-horizon-demo.com"
    },
    videos: [
      "https://www.youtube.com/watch?v=32DZywbZPOY"
    ],
    documentation: "/Projects/4.tech-horizon-magazine/docs/tech-horizon-docs.pdf",
    tier: "major",
    impactScore: 15,
    projectType: "school",
    difficulty: 3,
    isNew: false,
    isTrending: false,
    createdAt: "2024-11-01",
    completedAt: "2025-01-15"
  },

  //energy-consumption-prediction-cart
  {
    id: "5",
    slug: "energy-consumption-prediction-cart",
    title: "CART - Prédiction de Consommation Énergétique",
    description: "A comprehensive machine learning project implementing CART (Classification And Regression Tree) to predict energy consumption in smart buildings. Includes EDA, data preprocessing, feature engineering, model training, and detailed performance analysis with business insights.",
    category: "machine-learning",
    tags: ["machine-learning", "cart", "decision-trees", "energy-prediction", "python", "scikit-learn", "data-analysis", "iot", "regression", "feature-engineering"],
    image: "/Projects/5.energy-consumption-prediction-cart/images/dashboard_synthese.png",
    images: [
      "/Projects/5.energy-consumption-prediction-cart/images/analyse_erreurs.png",
      "/Projects/5.energy-consumption-prediction-cart/images/arbre_decision.png",
      "/Projects/5.energy-consumption-prediction-cart/images/comparaison_train_test.png",
      "/Projects/5.energy-consumption-prediction-cart/images/dashboard_synthese.png",
      "/Projects/5.energy-consumption-prediction-cart/images/patterns_temporels.png",
      "/Projects/5.energy-consumption-prediction-cart/images/distribution_avant_apres.png",
      "/Projects/5.energy-consumption-prediction-cart/images/importance_variables.png",
      "/Projects/5.energy-consumption-prediction-cart/images/matrice_correlation.png",
      "/Projects/5.energy-consumption-prediction-cart/images/predictions_vs_realite.png",
      "/Projects/5.energy-consumption-prediction-cart/images/top_correlations.png",
      
    ],
    featured: true,
    links: {
      github: "https://github.com/mahmoud-ath/Appliances-Energy-Prediction", // Update with actual repo link
      demo: ""
    },
    videos: [],
    documentation: "/Projects/5.energy-consumption-prediction-cart/docs/RAPPORT_CART_Prediction_de_Consommation_energetique.pdf",  // LaTeX report mentioned
    tier: "standard",
    impactScore: 22,
    projectType: "school", // Master AISD project
    difficulty: 5,
    isNew: true, // 2025 project
    isTrending: true,
    createdAt: "2025-01-15",
    completedAt: "2025-02-28"
  },
  
  // markus-pub-website-officiel
  {
    id: "6",
    slug: "markus-pub-website-officiel",
    title: "Markus Pub Website",
    description: "Official website for Markus Pub, a project management platform. A modern React-based website featuring team profiles, mission statements, creative showcases, and interactive UI components. Built with Next.js, AOS animations, and responsive design.",
    category: "web-dev",
    tags: ["react", "nextjs", "typescript", "website", "ui-design", "aos-animations", "responsive-design", "business-website"],
    image: "/Projects/6.markus-pub-website-officiel/images/markus.png", // From your component: backgroundImage: "url('/images/hero_about.jpg')"
    images: [
      "/Projects/6.markus-pub-website-officiel/images/1.png",
      "/Projects/6.markus-pub-website-officiel/images/2.png",
      "/Projects/6.markus-pub-website-officiel/images/3.png",
      "/Projects//6.markus-pub-website-officiel/images/markus.png" // You might want to add actual screenshots
    ],
    featured: true,
    links: {
      github: "https://github.com/mahmoud-ath/markus-pub-website-officiel",
      demo: "https://markus-pub-website-officiel-1hxo.vercel.app/" // Assuming it's deployed on Vercel
    },
    videos: [],
    documentation: "",
    tier: "flagship", // Business website could be flagship
    impactScore: 25,
    projectType: "client", // Or "business" if it's for a real company
    difficulty: 4,
    isNew: true,
    isTrending: true,
    createdAt: "2025-04-01",
    completedAt: "2025-04-20"
  },
  
  // whatsapp-chat-analyzer
   {
    id: "7",
    slug: "whatsapp-chat-analyzer",
    title: "WhatsApp Chat Analyzer",
    description: "A fun and interactive Streamlit app that visualizes and analyzes exported WhatsApp group chats. Quickly get insights like top message senders, word usage, emoji stats, message activity trends, and more.",
    category: "data-analyst", // Or "data-viz" if you have that category
    tags: ["streamlit", "python", "data-visualization", "chat-analysis", "pandas", "altair", "data-analytics", "whatsapp"],
    image:"/Projects/7.whatsapp-chat-analyzer/images/overview.jpg", // You'll need to add this
    images: [
      "/Projects/7.whatsapp-chat-analyzer/images/overview.jpg",
      "/Projects/7.whatsapp-chat-analyzer/images/overview.jpg"
    ],
    featured: true,
    links: {
      github: "https://github.com/mahmoud-ath/whatsapp-chat-analyzer",
      demo: "http://localhost:8501" // Local demo - consider deploying to Streamlit Cloud for a live URL
    },
    videos: [],
    documentation: "",
    tier: "standard",
    impactScore: 18,
    projectType: "personal",
    difficulty: 3,
    isNew: true, // Set to true if recently created
    isTrending: true,
    createdAt: "2025-03-01", // Update with actual date
    completedAt: "2025-03-15" // Update with actual date
  },

  // titanic-survivor-prediction
  {
    id: "8",
    slug: "titanic-survivor-prediction",
    title: "Titanic Survivor Prediction",
    description: "This project aims to predict the survival of Titanic passengers based on their characteristics (e.g., age, gender, class). The dataset is preprocessed, and two machine learning models—K-Nearest Neighbors (KNN) and Random Forest—are implemented from scratch and using Scikit-Learn to compare their performance.",
    category: "machine-learning", // Changed from "web-dev" based on project type
    tags: ["machine-learning", "python", "data-science", "knn", "random-forest", "scikit-learn", "titanic", "classification"],
    image: "/Projects/8.titanic-survivor-prediction/images/🚢 Titanic Survivor.png", // You'll need to add this image
    images: [
      "/Projects/8.titanic-survivor-prediction/images/🚢 Titanic Survivor.png",
      "/Projects/8.titanic-survivor-prediction/images/Report Titanic Survivor Prediction_page-0001.jpg",
      "/Projects/8.titanic-survivor-prediction/images/Report Titanic Survivor Prediction_page-0002.jpg",
      "/Projects/8.titanic-survivor-prediction/images/Report Titanic Survivor Prediction_page-0003.jpg",
      "/Projects/8.titanic-survivor-prediction/images/Report Titanic Survivor Prediction_page-0004.jpg",
      "/Projects/8.titanic-survivor-prediction/images/Report Titanic Survivor Prediction_page-0005.jpg",
      "/Projects/8.titanic-survivor-prediction/images/Report Titanic Survivor Prediction_page-0006.jpg",
      "/Projects/8.titanic-survivor-prediction/images/Report Titanic Survivor Prediction_page-0007.jpg",
      "/Projects/8.titanic-survivor-prediction/images/Report Titanic Survivor Prediction_page-0008.jpg",
      "/Projects/8.titanic-survivor-prediction/images/Report Titanic Survivor Prediction_page-0009.jpg",
      "/Projects/8.titanic-survivor-prediction/images/Report Titanic Survivor Prediction_page-0010.jpg",
      "/Projects/8.titanic-survivor-prediction/images/Report Titanic Survivor Prediction_page-0011.jpg",
      "/Projects/8.titanic-survivor-prediction/images/Report Titanic Survivor Prediction_page-0012.jpg",
      


    ],
    featured: true,
    links: {
      github: "https://github.com/mahmoud-ath/Titanic-Survivor-Prediction",
      demo: "" // No live demo mentioned in README
    },
    videos: [],
    documentation: "", // Optional: could be a link to detailed documentation
    tier: "standard",
    impactScore: 15,
    projectType: "personal",
    difficulty: 4,
    isNew: false,
    isTrending: false,
    createdAt: "2024-01-01", // Estimated - update with actual date
    completedAt: "2024-02-15" // Estimated - update with actual date
  },

  // watchly-ai
   {
    id: "9",
    slug: "watchly-ai",
    title: "Watchly AI",
    description: "Watchly: Discover, Track, Share. Your all-in-one hub for movies & TV. Search millions of titles, save your watchlist, and share recommendations—all powered by TMDB's live database",
    category: "web-dev",
    tags: [
      "react",
      "typescript",
      "tailwind-css",
      "movie-discovery",
      "tmdb-api",
      "responsive-design",
      "seo-friendly",
      "local-storage"
    ],
    image: "/Projects/9.watchly-ai/images/overview-1.png",
    images: [
      "/Projects/9.watchly-ai/images/1.png",
      "/Projects/9.watchly-ai/images/2.png",
      "/Projects/9.watchly-ai/images/3.png",
      "/Projects/9.watchly-ai/images/4.png",
      "/Projects/9.watchly-ai/images/5.png",
      "/Projects/9.watchly-ai/images/6.png",
      "/Projects/9.watchly-ai/images/9.png",
      "/Projects/9.watchly-ai/images/7.png",
    

      
    ],
    featured: true,
    links: {
      github: "https://github.com/mahmoud-ath/WATCHLY-v2",
      demo: "https://watchly-v2.vercel.app/"
    },
    videos: [],
    documentation: "",
    tier: "flagship",
    impactScore: 16,
    projectType: "personal",
    difficulty: 4,
    isNew: true,
    isTrending: true,
    createdAt: "2025-12-15",
    completedAt: "2025-09-01"
  },
];
