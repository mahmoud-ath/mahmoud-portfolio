/**
 * Project Stats Hook
 * Calculates statistics about filtered projects
 */

import { useMemo } from 'react';
import { Project, ProjectStats, ProjectCategory, ProjectTier } from '../types/Project_Section';
import { CATEGORY_KEYS } from '../data/projects/projectConfig';

export const useProjectStats = (projects: Project[]): ProjectStats => {
  return useMemo(() => {
    const stats: ProjectStats = {
      total: projects.length,
      featured: projects.filter(p => p.featured).length,
      byCategory: {} as Record<ProjectCategory, number>,
      byTier: {} as Record<ProjectTier, number>,
      byStatus: {
        completed: projects.filter(p => p.completedAt).length,
        inProgress: projects.filter(p => !p.completedAt).length,
        planned: 0 // Can be updated based on status field if added
      },
      averageDifficulty: 0,
      averageImpactScore: 0
    };

    // Count by category
    CATEGORY_KEYS.forEach(category => {
      stats.byCategory[category] = projects.filter(p => p.category === category).length;
    });

    // Count by tier
    (['flagship', 'major', 'standard', 'experimental'] as ProjectTier[]).forEach(tier => {
      stats.byTier[tier] = projects.filter(p => p.tier === tier).length;
    });

    // Calculate averages
    if (projects.length > 0) {
      const totalDifficulty = projects.reduce((sum, p) => sum + p.difficulty, 0);
      const totalImpact = projects.reduce((sum, p) => sum + p.impactScore, 0);
      stats.averageDifficulty = Math.round((totalDifficulty / projects.length) * 10) / 10;
      stats.averageImpactScore = Math.round((totalImpact / projects.length) * 10) / 10;
    }

    return stats;
  }, [projects]);
};
