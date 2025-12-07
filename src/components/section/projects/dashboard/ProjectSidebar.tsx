import React from 'react';
import { Project } from '../../../../lib/types/Project_Section';
import { useProjectStats } from '../../../../lib/hooks';
import { PROJECT_CATEGORIES, PROJECT_TIERS } from '../../../../lib/data/projects/projectConfig';
import { TrendingUp, Award, Zap, Code2, Home } from 'lucide-react';

interface ProjectSidebarProps {
  projects: Project[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
  filteredProjectsCount: number;
  onBackToHome?: () => void;
}

const ProjectSidebar: React.FC<ProjectSidebarProps> = ({
  projects,
  selectedCategory,
  onCategorySelect,
  filteredProjectsCount,
  onBackToHome
}) => {
  const stats = useProjectStats(projects);

  const getCategoryCount = (category: string): number => {
    return projects.filter(p => p.category === category).length;
  };

  // Handle back to home navigation
  const handleBackToHome = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      // Fallback to navigate to home section
      window.location.hash = '#home';
    }
  };

  return (
    <aside
      className="w-full md:w-64 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 py-8 md:sticky md:top-20 md:h-screen md:overflow-y-auto transition-colors duration-500"
      style={{ paddingLeft: '2rem', paddingRight: '1rem' }}
    >
      {/* Navigation Section */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider dark:text-white">
          Navigation
        </h3>

        <button
          onClick={handleBackToHome}
          className="w-full bg-themeRed border-2 border-gray-800 rounded-lg p-4 shadow-[3px_3px_0_0_rgba(0,0,0,1)] transition-all duration-300 hover:shadow-[1px_1px_0_0_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 text-white font-bold group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-white/80 font-bold uppercase tracking-wider">Home</span>
            <Home className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-white">← Back to Portfolio</p>
            <p className="text-xs text-white/70 mt-1">Return to main sections</p>
          </div>
        </button>
      </div>

      {/* Analytics Section - Compact Grid */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider dark:text-white">
          Analytics
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {/* Total Projects */}
          <div className="bg-white border-2 border-gray-800 rounded-lg p-3 shadow-[3px_3px_0_0_rgba(0,0,0,1)] transition-all duration-300 hover:shadow-[1px_1px_0_0_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-700 font-bold">Total</span>
              <Code2 className="w-3 h-3 text-gray-800" />
            </div>
            <p className="text-lg font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-600">
              {filteredProjectsCount === stats.total ? 'All' : `${filteredProjectsCount} shown`}
            </p>
          </div>

          {/* Featured Projects */}
          <div className="bg-white border-2 border-gray-800 rounded-lg p-3 shadow-[3px_3px_0_0_rgba(0,0,0,1)] transition-all duration-300 hover:shadow-[1px_1px_0_0_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-700 font-bold">Featured</span>
              <Award className="w-3 h-3 text-gray-800" />
            </div>
            <p className="text-lg font-bold text-gray-900">{stats.featured}</p>
            <p className="text-xs text-gray-600">
              {Math.round((stats.featured / stats.total) * 100)}%
            </p>
          </div>

          {/* Average Impact Score */}
          <div className="bg-white border-2 border-gray-800 rounded-lg p-3 shadow-[3px_3px_0_0_rgba(0,0,0,1)] transition-all duration-300 hover:shadow-[1px_1px_0_0_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-700 font-bold">Impact</span>
              <TrendingUp className="w-3 h-3 text-gray-800" />
            </div>
            <p className="text-lg font-bold text-gray-900">{stats.averageImpactScore}/20</p>
            <p className="text-xs text-gray-600">Average</p>
          </div>

          {/* Completed Projects */}
          <div className="bg-white border-2 border-gray-800 rounded-lg p-3 shadow-[3px_3px_0_0_rgba(0,0,0,1)] transition-all duration-300 hover:shadow-[1px_1px_0_0_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-700 font-bold">Done</span>
              <Zap className="w-3 h-3 text-gray-800" />
            </div>
            <p className="text-lg font-bold text-gray-900">{stats.byStatus.completed}</p>
            <p className="text-xs text-gray-600">
              {Math.round((stats.byStatus.completed / stats.total) * 100)}%
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter Section */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider dark:text-white">
          Categories
        </h3>

        <div className="space-y-3">
          {/* All Categories Option */}
          <button
            onClick={() => onCategorySelect(null)}
            className={`w-full border-2 border-gray-800 rounded-lg p-3 shadow-[3px_3px_0_0_rgba(0,0,0,1)] transition-all duration-300 hover:shadow-[1px_1px_0_0_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 ${
              selectedCategory === null
                ? 'bg-themeRed text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider">All Projects</span>
              <div className={`w-2 h-2 rounded-full ${selectedCategory === null ? 'bg-white' : 'bg-gray-400'}`}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">All Categories</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                selectedCategory === null ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700'
              }`}>
                {stats.total}
              </span>
            </div>
          </button>

          {/* Category Items */}
          {Object.entries(PROJECT_CATEGORIES).map(([key, category]) => {
            const count = getCategoryCount(key);
            const isSelected = selectedCategory === key;

            return (
              <button
                key={key}
                onClick={() => onCategorySelect(isSelected ? null : key)}
                className={`w-full border-2 border-gray-800 rounded-lg p-3 shadow-[3px_3px_0_0_rgba(0,0,0,1)] transition-all duration-300 hover:shadow-[1px_1px_0_0_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 ${
                  isSelected
                    ? 'bg-themeRed text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider opacity-70">
                    {key.replace('-', ' ')}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : category.color}`}></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">{category.label}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    isSelected ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    {count}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default ProjectSidebar;
