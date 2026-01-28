import React from 'react';
import { Project } from '../../../../lib/types/Project_Section';
import { PROJECT_CATEGORIES } from '../../../../lib/data/projects/projectConfig';
import { useProjectStats } from '../../../../lib/hooks';
import { TrendingUp, Award, Code2 } from 'lucide-react';

interface AnalyticsTabProps {
  projects: Project[];
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ projects }) => {
  const stats = useProjectStats(projects);

  const getCategoryCount = (category: string): number => {
    return projects.filter(p => p.category === category).length;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Project Analytics</h2>
        
        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Projects */}
          <div className="bg-white dark:bg-gray-800 border-2 border-gray-800 dark:border-gray-700 rounded-lg p-6 shadow-[3px_3px_0_0_rgba(0,0,0,1)] transition-all duration-300 hover:shadow-[1px_1px_0_0_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Total</span>
              <Code2 className="w-6 h-6 text-gray-800 dark:text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.total}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Projects completed</p>
          </div>

          {/* Featured Projects */}
          <div className="bg-white dark:bg-gray-800 border-2 border-gray-800 dark:border-gray-700 rounded-lg p-6 shadow-[3px_3px_0_0_rgba(0,0,0,1)] transition-all duration-300 hover:shadow-[1px_1px_0_0_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Featured</span>
              <Award className="w-6 h-6 text-gray-800 dark:text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.featured}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {Math.round((stats.featured / stats.total) * 100)}% of total
            </p>
          </div>

          {/* Average Impact Score */}
          <div className="bg-white dark:bg-gray-800 border-2 border-gray-800 dark:border-gray-700 rounded-lg p-6 shadow-[3px_3px_0_0_rgba(0,0,0,1)] transition-all duration-300 hover:shadow-[1px_1px_0_0_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Impact</span>
              <TrendingUp className="w-6 h-6 text-gray-800 dark:text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.averageImpactScore}/20</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Average score</p>
          </div>

          {/* Completed Projects */}
          <div className="bg-white dark:bg-gray-800 border-2 border-gray-800 dark:border-gray-700 rounded-lg p-6 shadow-[3px_3px_0_0_rgba(0,0,0,1)] transition-all duration-300 hover:shadow-[1px_1px_0_0_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Completed</span>
              <Award className="w-6 h-6 text-gray-800 dark:text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.byStatus.completed}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {Math.round((stats.byStatus.completed / stats.total) * 100)}% completion rate
            </p>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white dark:bg-gray-800 border-2 border-gray-800 dark:border-gray-700 rounded-lg p-6 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Category Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(PROJECT_CATEGORIES).map(([key, category]) => {
              const count = getCategoryCount(key);
              const percentage = Math.round((count / stats.total) * 100);
              return (
                <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{category.label}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{count} projects</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-themeRed">{percentage}%</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
