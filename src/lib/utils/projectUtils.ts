/**
 * Project Utility Functions
 * Helper functions for project management, formatting, and data manipulation
 */

import { Project } from '../types/Project_Section';

/**
 * Generate slug from title
 * Converts title to URL-friendly slug
 */
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Get project by slug
 * Searches projects array for matching slug
 */
export const getProjectBySlug = (projects: Project[], slug: string): Project | undefined => {
  return projects.find(p => p.slug === slug);
};

/**
 * Format date to readable string
 * Converts ISO date to human-readable format
 */
export const formatDate = (dateString: string | undefined | null): string => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Get project duration
 * Calculates time between created and completed dates
 */
export const getProjectDuration = (createdAt: string | undefined, completedAt: string | undefined | null): string => {
  if (!createdAt || !completedAt) return 'In Progress';

  const start = new Date(createdAt);
  const end = new Date(completedAt);
  const months = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));

  if (months < 1) return 'Duration';
  if (months === 1) return '1 month';
  return `${months} months`;
};

/**
 * Format project status
 * Returns human-readable project status
 */
export const getProjectStatus = (completedAt: string | undefined | null): 'Completed' | 'In Progress' => {
  return completedAt ? 'Completed' : 'In Progress';
};

/**
 * Get dominant color for category
 * Returns Tailwind color class for category
 */
export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'web-dev': 'bg-blue-500',
    'machine-learning': 'bg-purple-500',
    'data-analyst': 'bg-green-500',
    'mobile': 'bg-orange-500'
  };
  return colors[category] || 'bg-gray-500';
};

/**
 * Get category icon name
 * Returns icon name for Lucide React
 */
export const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    'web-dev': 'Globe',
    'machine-learning': 'Brain',
    'data-analyst': 'BarChart2',
    'mobile': 'Smartphone'
  };
  return icons[category] || 'Code2';
};

/**
 * Group projects by category
 * Organizes projects into category groups
 */
export const groupProjectsByCategory = (projects: Project[]): Record<string, Project[]> => {
  return projects.reduce((acc, project) => {
    const category = project.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(project);
    return acc;
  }, {} as Record<string, Project[]>);
};

/**
 * Get trending projects
 * Returns projects marked as trending
 */
export const getTrendingProjects = (projects: Project[], limit: number = 3): Project[] => {
  return projects
    .filter(p => p.isTrending)
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
    .slice(0, limit);
};

/**
 * Get featured projects
 * Returns featured projects sorted by impact
 */
export const getFeaturedProjects = (projects: Project[]): Project[] => {
  return projects
    .filter(p => p.featured)
    .sort((a, b) => b.impactScore - a.impactScore);
};

/**
 * Get new projects
 * Returns projects marked as new
 */
export const getNewProjects = (projects: Project[], limit: number = 3): Project[] => {
  return projects
    .filter(p => p.isNew)
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
    .slice(0, limit);
};

/**
 * Calculate reading time for description
 * Estimates reading time in minutes
 */
export const getReadingTime = (text: string): number => {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.max(1, Math.round(wordCount / wordsPerMinute));
};

/**
 * Get similar projects
 * Returns projects similar to the given one
 */
export const getSimilarProjects = (project: Project, allProjects: Project[], limit: number = 3): Project[] => {
  return allProjects
    .filter(p => p.id !== project.id && p.category === project.category)
    .sort((a, b) => b.impactScore - a.impactScore)
    .slice(0, limit);
};

/**
 * Search projects
 * Performs full-text search across projects
 */
export const searchProjects = (projects: Project[], query: string): Project[] => {
  if (!query.trim()) return projects;

  const searchTerm = query.toLowerCase();
  return projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm) ||
    project.description.toLowerCase().includes(searchTerm) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    project.category.toLowerCase().includes(searchTerm)
  );
};

/**
 * Get projects by tier
 * Returns projects filtered by tier level
 */
export const getProjectsByTier = (projects: Project[], tier: string): Project[] => {
  return projects.filter(p => p.tier === tier);
};

/**
 * Get projects by difficulty
 * Returns projects within difficulty range
 */
export const getProjectsByDifficulty = (projects: Project[], minDifficulty: number, maxDifficulty: number): Project[] => {
  return projects.filter(p => p.difficulty >= minDifficulty && p.difficulty <= maxDifficulty);
};
