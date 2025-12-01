
export interface Testimonial {
  id: string;
  name: string;
  source: string;
  text: string;
  theme: 'light' | 'dark';
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