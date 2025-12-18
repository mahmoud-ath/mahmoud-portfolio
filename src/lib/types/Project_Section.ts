/**
 * Project Type Definitions
 * Complete TypeScript interfaces for project management
 */

export type ProjectTier = 'flagship' | 'major' | 'standard' | 'experimental';
export type ProjectCategory = 'web-dev' | 'machine-learning' | 'data-analyst';
export type ProjectType = 'case-study' | 'client' | 'personal' | 'Academic'| 'Hackathon';
export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;
export type ViewMode = 'grid' | 'list';
export type SortOption = 'date-newest' | 'date-oldest' | 'name-asc' | 'name-desc' | 'impact-high' | 'impact-low';

/**
 * Main Project Interface
 * Represents a complete project with all metadata
 */
export interface Project {
  // Core Fields
  id: string;
  slug: string;
  title: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  image: string;
  images?: string[];
  videos?: string[]; // YouTube or video URLs
  documentation?: string; // PDF documentation URL
  links?: {
    github?: string;
    demo?: string;
    live?: string;
  };
  
  // Hierarchy & Tier
  tier: ProjectTier;
  impactScore: number; // 1-20 scale
  projectType: ProjectType;
  difficulty: DifficultyLevel; // 1-5 scale

  // Status Flags
  featured: boolean;
  isNew: boolean;
  isTrending: boolean;
  selected?: boolean; // User's selected/favorite project

  // Metadata (for sorting & filtering)
  createdAt?: string; // ISO 8601 date string
  completedAt?: string | null; // ISO 8601 date string or null for in-progress
}

/**
 * Filtered Project Stats
 * Statistics about a collection of projects
 */
export interface ProjectStats {
  total: number;
  featured: number;
  byCategory: Record<ProjectCategory, number>;
  byTier: Record<ProjectTier, number>;
  byStatus: {
    completed: number;
    inProgress: number;
    planned: number;
  };
  averageDifficulty: number;
  averageImpactScore: number;
}

/**
 * Filter State
 * Represents current filter state for projects
 */
export interface FilterState {
  searchQuery: string;
  categories: ProjectCategory[];
  tiers: ProjectTier[];
  projectTypes: ProjectType[];
  difficultyRange: [number, number];
  showFeaturedOnly: boolean;
  showNewOnly: boolean;
  sortBy: SortOption;
  viewMode: ViewMode;
}

/**
 * Project Card Props
 * Common props for project card components
 */
export interface ProjectCardProps {
  project: Project;
  onSelect?: (project: Project) => void;
  isSelected?: boolean;
}

/**
 * Paginated Response
 * Generic pagination wrapper for projects
 */
export interface PaginatedProjects {
  projects: Project[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
