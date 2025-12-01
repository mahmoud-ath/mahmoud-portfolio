/**
 * Project Filter Hook
 * Handles filtering, searching, and sorting of projects
 */

import { useState, useMemo } from 'react';
import { Project, FilterState, ProjectCategory, ProjectTier, ProjectType } from '../types/Project_Section';

export const useProjectFilter = (projects: Project[]) => {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    categories: [],
    tiers: [],
    projectTypes: [],
    difficultyRange: [1, 5],
    showFeaturedOnly: false,
    showNewOnly: false,
    sortBy: 'date-newest',
    viewMode: 'grid'
  });

  // Filtered and sorted projects
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Search filter
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category));
    }

    // Tier filter
    if (filters.tiers.length > 0) {
      result = result.filter(p => filters.tiers.includes(p.tier));
    }

    // Project type filter
    if (filters.projectTypes.length > 0) {
      result = result.filter(p => filters.projectTypes.includes(p.projectType));
    }

    // Difficulty range filter
    result = result.filter(p =>
      p.difficulty >= filters.difficultyRange[0] &&
      p.difficulty <= filters.difficultyRange[1]
    );

    // Featured only filter
    if (filters.showFeaturedOnly) {
      result = result.filter(p => p.featured);
    }

    // New only filter
    if (filters.showNewOnly) {
      result = result.filter(p => p.isNew);
    }

    // Sorting
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'date-newest':
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        case 'date-oldest':
          return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'impact-high':
          return b.impactScore - a.impactScore;
        case 'impact-low':
          return a.impactScore - b.impactScore;
        default:
          return 0;
      }
    });

    return result;
  }, [projects, filters]);

  // Update filter functions
  const updateSearchQuery = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  };

  const toggleCategory = (category: ProjectCategory) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const toggleTier = (tier: ProjectTier) => {
    setFilters(prev => ({
      ...prev,
      tiers: prev.tiers.includes(tier)
        ? prev.tiers.filter(t => t !== tier)
        : [...prev.tiers, tier]
    }));
  };

  const toggleProjectType = (type: ProjectType) => {
    setFilters(prev => ({
      ...prev,
      projectTypes: prev.projectTypes.includes(type)
        ? prev.projectTypes.filter(t => t !== type)
        : [...prev.projectTypes, type]
    }));
  };

  const setDifficultyRange = (range: [number, number]) => {
    setFilters(prev => ({ ...prev, difficultyRange: range }));
  };

  const toggleFeaturedOnly = () => {
    setFilters(prev => ({ ...prev, showFeaturedOnly: !prev.showFeaturedOnly }));
  };

  const toggleNewOnly = () => {
    setFilters(prev => ({ ...prev, showNewOnly: !prev.showNewOnly }));
  };

  const setSortBy = (sortBy: FilterState['sortBy']) => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  const setViewMode = (viewMode: FilterState['viewMode']) => {
    setFilters(prev => ({ ...prev, viewMode }));
  };

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      categories: [],
      tiers: [],
      projectTypes: [],
      difficultyRange: [1, 5],
      showFeaturedOnly: false,
      showNewOnly: false,
      sortBy: 'date-newest',
      viewMode: 'grid'
    });
  };

  return {
    filters,
    filteredProjects,
    updateSearchQuery,
    toggleCategory,
    toggleTier,
    toggleProjectType,
    setDifficultyRange,
    toggleFeaturedOnly,
    toggleNewOnly,
    setSortBy,
    setViewMode,
    resetFilters
  };
};
