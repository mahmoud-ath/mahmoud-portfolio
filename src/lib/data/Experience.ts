import { Experience, Education, Certification } from '../types/Experience_Section';

// Professional Experience Data
export const experienceData: Experience[] = [
  {
    id: 'exp-1',
    company: 'Cloud Marketing Hub',
    role: 'Internship - Centralized System for Managing and Analyzing Data',
    date: 'April 2025 - June 2025',
    location: 'Tangier, Morocco',
    description: 'Designed and developed a centralized data management system, reducing average task time by 65% and improving cross-team coordination. Automated analysis and reporting of over 500,000 monthly marketing emails, cutting manual data handling by 80%. Implemented secure role-based access control (RBAC) and two-factor authentication (2FA) via Telegram, strengthening data governance for 400+ employees.',
    skills: ['Python', 'Django', 'PostgreSQL', 'REST API', 'Redis', 'Next.js']
  }
  
];

// Education Data
export const educationData: Education[] = [
  {
    id: 'edu-1',
    degree: 'Master',
    field: 'Artificial Intelligence and Data Sciences (AI2SD)',
    institution: 'Faculty of Science and Technology Tangier',
    location: 'Tangier, Morocco',
    date: '2025 – 2027',
    status: 'in-progress',
    description: 'Pursuing advanced studies in Artificial Intelligence and Data Science, focusing on cutting-edge machine learning techniques, deep learning architectures, and big data analytics for real-world applications.',
    focusAreas: ['Machine Learning', 'Deep Learning', 'Data Mining', 'NLP', 'Computer Vision', 'Big Data', 'Statistical Modeling']
  },
  {
    id: 'edu-2',
    degree: 'Bachelor',
    field: 'Data Analytics (AD)',
    institution: 'Faculty of Science and Technology Tangier',
    location: 'Tangier, Morocco',
    date: '2024 – 2025',
    status: 'completed',
    description: 'Specialized training in data analytics methodologies, statistical analysis, and business intelligence tools to extract meaningful insights from complex datasets.',
    focusAreas: ['Data Analysis', 'Statistics', 'Visualization', 'Databases', 'Python', 'BI Tools', 'Predictive Modeling']
  },
  {
    id: 'edu-3',
    degree: 'DEUST',
    field: 'Mathematics, Computer Science, Physics, Chemistry (MIPC)',
    institution: 'Faculty of Science and Technology Tangier',
    location: 'Tangier, Morocco',
    date: '2021 – 2024',
    status: 'completed',
    description: 'Foundational degree covering core scientific disciplines with emphasis on mathematical reasoning, programming fundamentals, and scientific research methodologies.',
    focusAreas: ['Advanced Math', 'Algorithms', 'Physics', 'Chemistry', 'Programming', 'Scientific Computing', 'Research Methods']
  },
  {
    id: 'edu-4',
    degree: 'High School Diploma',
    field: 'Physical and Chemical Sciences',
    institution: 'Dhar Ben Ayad High School',
    location: 'Chefchaouen, Morocco',
    date: '2021',
    status: 'completed',
    description: 'High school education with specialization in physical and chemical sciences, building strong foundations in scientific reasoning and analytical thinking.',
    focusAreas: ['Physics', 'Chemistry', 'Mathematics', 'Science Research', 'Analytical Skills', 'Lab Work', 'Problem Solving']
  }
];

// Certifications Data
export const certificationsData: Certification[] = [
  {
    id: 'cert-1',
    name: 'AI Career Essentials Programme',
    issuer: 'ALX Africa',
    date: '2025',
    status: 'active',
    image: 'Experience/certifications/alx.jpg',
    description: 'Comprehensive program covering essential AI concepts, practical applications, and career development in the field of artificial intelligence. Developed hands-on skills in AI tools and methodologies.',
    skills: ['AI Fundamentals', 'Machine Learning Basics', 'Data Analysis', 'AI Ethics', 'Career Development'],
    credentialUrl: [
      'Experience/certifications/alx-certificats.jpg',
    ],
  }
];
