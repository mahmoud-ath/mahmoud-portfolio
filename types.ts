export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  date: string;
  location: string;
  description: string;
  skills?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  source: string;
  text: string;
  theme: 'light' | 'dark';
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  status: 'In Progress' | 'Completed';
}

export interface Leadership {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string;
}

export interface Language {
  language: string;
  proficiency: 'Native' | 'Fluent' | 'Intermediate' | 'Basic';
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email: string;
  };
}