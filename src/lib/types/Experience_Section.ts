// Experience Section Data - Single Source of Truth

export type TabType = 'experience' | 'education' | 'certifications';

export interface Experience {
  id: string;
  company: string;
  role: string;
  date: string;
  location: string;
  description: string;
  skills?: string[];
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  date: string;
  status: 'completed' | 'in-progress';
  description: string;
  focusAreas?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  status: 'active' | 'expired' | 'in-progress';
  description: string;
  credentialUrl?: string | string[];  // Single URL or array of URLs
  credentialId?: string;
  skills?: string[];
  image?: string;
}

export interface TabConfig {
  id: TabType;
  label: string;
  icon: 'Briefcase' | 'GraduationCap' | 'Award';
}

// Tab Configuration
export const tabs: TabConfig[] = [
  { id: 'experience', label: 'Work Experience', icon: 'Briefcase' },
  { id: 'education', label: 'Education', icon: 'GraduationCap' },
  { id: 'certifications', label: 'Certifications', icon: 'Award' },
];

