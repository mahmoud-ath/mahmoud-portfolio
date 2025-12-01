import React, { useState } from 'react';
import { projectsData } from '../../../lib/data/projects/projects';
import { Project } from '../../../lib/types/Project_Section';
import { useProjectFilter } from '../../../lib/hooks';
import ProjectSidebar from './dashboard/ProjectSidebar';
import ProjectFilters from './dashboard/ProjectFilters';
import ProjectGrid from './dashboard/ProjectGrid';
import ProjectList from './dashboard/ProjectList';

interface ProjectsDashboardProps {
  onProjectSelect: (slug: string) => void;
  onBackToHome?: () => void;
}

const ProjectsDashboard: React.FC<ProjectsDashboardProps> = ({ onProjectSelect, onBackToHome }) => {
  const [projects] = useState<Project[]>(projectsData);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  return (
    <div className="flex flex-col lg:flex-row gap-0 bg-themeLight dark:bg-slate-950 min-h-screen pt-10 transition-colors duration-500" style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
      {/* Sidebar */}
      <div className="hidden lg:block mx-4">
        <ProjectSidebar
          projects={projects}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          filteredProjectsCount={categoryFilteredProjects.length}
          onBackToHome={onBackToHome}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 py-6 md:py-8 lg:py-12 w-full px-4 sm:px-6 lg:px-6 xl:px-14 ">
        {/* Header */}
        <div className="mb-6 sm:mb-8 max-w-7xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3 transition-colors duration-300">
            Project Portfolio
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 transition-colors duration-300">
            Explore a curated collection of {projects.length} projects showcasing expertise across
            various domains and technologies.
          </p>

          {/* Mobile Category Filter */}
          <div className="lg:hidden mt-4 mb-6">
            {/* Back to Home Button - Mobile Only */}
            <div className="mb-4">
              <button
                onClick={() => {
                  if (onBackToHome) {
                    onBackToHome();
                  } else {
                    window.location.hash = '#home';
                  }
                }}
                className="px-4 py-2 bg-themeRed text-white font-semibold rounded-xl text-sm hover:bg-red-700 active:bg-red-800 transition-colors duration-300 flex items-center gap-2"
              >
                <span>←</span>
                <span>Back to Home</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 ${
                  selectedCategory === null
                    ? 'bg-themeRed text-white'
                    : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700'
                }`}
              >
                All ({projects.length})
              </button>
              {['web-dev', 'machine-learning', 'data-analyst', 'mobile'].map((category) => {
                const count = projects.filter(p => p.category === category).length;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-themeRed text-white'
                        : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl">
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

        {/* Results Header */}
        {categoryFilteredProjects.length > 0 && (
          <div className="mt-6 sm:mt-8 flex items-center justify-between max-w-7xl">
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

        {/* Projects View */}
        <div className="mt-6 sm:mt-8 max-w-7xl">
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
      </main>
    </div>
  );
};

export default ProjectsDashboard;
