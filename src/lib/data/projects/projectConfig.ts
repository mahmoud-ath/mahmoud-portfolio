/**
 * Project Configuration
 * Defines categories, project types, tiers, and other static configurations
 */

export const PROJECT_CATEGORIES = {
  'web-dev': {
    label: 'Web Development',
    icon: 'globe',
    description: 'Full-stack and frontend web applications',
    color: 'bg-blue-500'
  },
  'machine-learning': {
    label: 'Machine Learning',
    icon: 'brain',
    description: 'AI and machine learning projects',
    color: 'bg-purple-500'
  },
  'data-analyst': {
    label: 'Data Analytics',
    icon: 'bar-chart-2',
    description: 'Data analysis and visualization',
    color: 'bg-green-500'
  },
  'mobile': {
    label: 'Mobile Development',
    icon: 'smartphone',
    description: 'iOS and Android applications',
    color: 'bg-orange-500'
  }
} as const;

export const PROJECT_TIERS = {
  flagship: { label: 'Flagship', color: 'from-red-500 to-orange-500', priority: 4 },
  major: { label: 'Major', color: 'from-blue-500 to-purple-500', priority: 3 },
  standard: { label: 'Standard', color: 'from-green-500 to-blue-500', priority: 2 },
  experimental: { label: 'Experimental', color: 'from-gray-500 to-slate-500', priority: 1 }
} as const;

export const PROJECT_TYPES = {
  'case-study': { label: 'Case Study', icon: 'award' },
  'client': { label: 'Client Work', icon: 'briefcase' },
  'personal': { label: 'Personal Project', icon: 'user' },
  'school': { label: 'School Project', icon: 'book' }
} as const;

export const DIFFICULTY_LEVELS = {
  1: { label: 'Beginner', color: 'text-green-500' },
  2: { label: 'Intermediate', color: 'text-blue-500' },
  3: { label: 'Advanced', color: 'text-orange-500' },
  4: { label: 'Expert', color: 'text-red-500' },
  5: { label: 'Master', color: 'text-purple-500' }
} as const;

export const SORT_OPTIONS = {
  'date-newest': { label: 'Newest First', value: 'date-newest' },
  'date-oldest': { label: 'Oldest First', value: 'date-oldest' },
  'name-asc': { label: 'Name (A-Z)', value: 'name-asc' },
  'name-desc': { label: 'Name (Z-A)', value: 'name-desc' },
  'impact-high': { label: 'Highest Impact', value: 'impact-high' },
  'impact-low': { label: 'Lowest Impact', value: 'impact-low' }
} as const;

export const VIEW_MODES = {
  grid: 'grid',
  list: 'list'
} as const;

// Get all category keys
export const CATEGORY_KEYS = Object.keys(PROJECT_CATEGORIES) as Array<keyof typeof PROJECT_CATEGORIES>;

// Export types
export type ProjectCategory = keyof typeof PROJECT_CATEGORIES;
export type ProjectTier = keyof typeof PROJECT_TIERS;
export type ProjectType = keyof typeof PROJECT_TYPES;
export type DifficultyLevel = keyof typeof DIFFICULTY_LEVELS;
export type SortOption = keyof typeof SORT_OPTIONS;
export type ViewMode = keyof typeof VIEW_MODES;
