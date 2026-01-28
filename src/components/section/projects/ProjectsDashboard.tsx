import React, { useState, useEffect } from 'react';
import { getAllProjects } from '../../../lib/api/projectsAPI';
import { Project } from '../../../lib/types/Project_Section';
import { useProjectFilter } from '../../../lib/hooks';
import { PROJECT_CATEGORIES } from '../../../lib/data/projects/projectConfig';
import ProjectFilters from './dashboard/ProjectFilters';
import ProjectGrid from './dashboard/ProjectGrid';
import ProjectList from './dashboard/ProjectList';
import AnalyticsTab from './dashboard/AnalyticsTab';
import { Home } from 'lucide-react';

interface ProjectsDashboardProps {
  onProjectSelect: (slug: string) => void;
  onBackToHome?: () => void;
}

const ProjectsDashboard: React.FC<ProjectsDashboardProps> = ({ onProjectSelect, onBackToHome }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load projects on component mount
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const projectsData = await getAllProjects();
        setProjects(projectsData);
        setError(null);
      } catch (err) {
        console.error('Failed to load projects:', err);
        setError('Failed to load projects. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'analytics'>('projects');

  const {
    filters,
    filteredProjects,
    updateSearchQuery,
    toggleFeaturedOnly,
    toggleNewOnly,
    setSortBy,
    setViewMode,
    resetFilters
  } = useProjectFilter(projects);

  // Filter by selected category
  const categoryFilteredProjects = selectedCategory
    ? filteredProjects.filter(p => p.category === selectedCategory)
    : filteredProjects;

  // Calculate active filters count
  const activeFiltersCount = [
    filters.searchQuery ? 1 : 0,
    filters.showFeaturedOnly ? 1 : 0,
    filters.showNewOnly ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  const getCategoryCount = (category: string): number => {
    return projects.filter(p => p.category === category).length;
  };

  // Handle back to home navigation
  const handleBackToHome = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      window.location.hash = '#home';
    }
  };

  return (
    <div className="bg-themeLight dark:bg-slate-950 min-h-screen pt-10 transition-colors duration-500" style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
      {/* Loading State */}
      {loading && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center px-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-themeRed mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Loading Projects...</h2>
            <p className="text-gray-600 dark:text-gray-400">Please wait while we fetch your projects.</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Error Loading Projects</h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-themeRed text-white font-semibold rounded-xl sm:rounded-2xl text-sm sm:text-base hover:bg-red-700 transition-colors duration-500"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Main Content - Only show when not loading and no error */}
      {!loading && !error && (
        <>
          {/* Main Content */}
          <main className="py-8 md:py-10 lg:py-14 w-full px-4 sm:px-6 lg:px-6 xl:px-14">
        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-6 sm:mb-8">
          {/* Navigation Section - Left Side */}
          <div className="lg:w-64 flex-shrink-0">
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
          </div>

          {/* Main Header Content - Right Side */}
          <div className="flex-1 max-w-7xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3 transition-colors duration-300">
              Project Portfolio
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 transition-colors duration-300 mb-6">
              Explore a curated collection of {projects.length} projects showcasing expertise across
              various domains and technologies.
            </p>
            
            {/* Tab Navigation Buttons */}
            <div className="flex bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-1 transition-colors duration-300 w-fit">
              <button
                onClick={() => setActiveTab('projects')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'projects'
                    ? 'bg-themeRed text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'analytics'
                    ? 'bg-themeRed text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                Analytics
              </button>
            </div>
          </div>
        </div>

        {/* Projects Tab Content */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {/* Enhanced Filter Bar - Categories + Search + Controls */}
            <div className="max-w-7xl">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm transition-colors duration-300">
                {/* Top Row - Search and View Controls */}
                <div className="flex flex-col lg:flex-row gap-4 mb-4">
                  <div className="flex-1">
                    <ProjectFilters
                      searchQuery={filters.searchQuery}
                      onSearchChange={updateSearchQuery}
                      viewMode={filters.viewMode as 'grid' | 'list'}
                      onViewModeChange={(mode) => setViewMode(mode as any)}
                      sortBy={filters.sortBy}
                      onSortChange={setSortBy}
                      showFeaturedOnly={filters.showFeaturedOnly}
                      onFeaturedToggle={toggleFeaturedOnly}
                      showNewOnly={filters.showNewOnly}
                      onNewToggle={toggleNewOnly}
                      onResetFilters={resetFilters}
                      activeFiltersCount={activeFiltersCount}
                    />
                  </div>
                </div>

                {/* Bottom Row - Category Filter Tabs */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      Categories:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                          selectedCategory === null
                            ? 'bg-themeRed text-white shadow-sm'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        All ({projects.length})
                      </button>
                      {Object.entries(PROJECT_CATEGORIES).map(([key, category]) => {
                        const count = getCategoryCount(key);
                        const isSelected = selectedCategory === key;
                        return (
                          <button
                            key={key}
                            onClick={() => setSelectedCategory(isSelected ? null : key)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                              isSelected
                                ? 'bg-themeRed text-white shadow-sm'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                          >
                            {category.label} ({count})
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Header */}
            <div className="max-w-7xl">
              {categoryFilteredProjects.length > 0 && (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                      Showing <span className="font-semibold text-gray-900 dark:text-gray-100">{categoryFilteredProjects.length}</span> of{' '}
                      <span className="font-semibold text-gray-900 dark:text-gray-100">{projects.length}</span> projects
                      {selectedCategory && (
                        <span className="ml-2 px-2 py-0.5 bg-themeRed/10 text-themeRed text-xs rounded-full">
                          {selectedCategory.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Projects View */}
            <div className="max-w-7xl">
              {filters.viewMode === 'grid' ? (
                <ProjectGrid
                  projects={categoryFilteredProjects}
                  onProjectSelect={onProjectSelect}
                />
              ) : (
                <ProjectList
                  projects={categoryFilteredProjects}
                  onProjectSelect={onProjectSelect}
                />
              )}

              {categoryFilteredProjects.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 sm:py-20">
                  <div className="text-center px-4">
                    <p className="mb-2 text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300">No projects found</p>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 transition-colors duration-300">Try adjusting your filters to see more projects</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Analytics Tab Content */}
        {activeTab === 'analytics' && (
          <div className="max-w-7xl">
            <AnalyticsTab projects={projects} />
          </div>
        )}
          </main>
        </>
      )}
    </div>
  );
};

export default ProjectsDashboard;
