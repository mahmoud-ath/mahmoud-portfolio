// Experience Module - Barrel Export

// Main Component
export { default as ExperienceTabs } from './ExperienceTabs';

// Section Components
export { default as WorkExperience } from './tabs/WorkExperience';
export { default as Education } from './tabs/Education';
export { default as Certifications } from './tabs/Certifications';

// Types
export {
  type TabType,
  type Experience,
  type Education as EducationType,
  type Certification,
  type TabConfig,
  tabs,
} from '../../../lib/types/Experience_Section';

// Data 
 export {
  
  experienceData,
  educationData,
  certificationsData,
} from '../../../lib/data/Experience';