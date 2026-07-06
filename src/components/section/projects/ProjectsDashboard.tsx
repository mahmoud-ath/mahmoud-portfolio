import React, { useState, useEffect } from 'react';
import { getAllProjects } from '../../../lib/api/projectsAPI';
import { Project } from '../../../lib/types/Project_Section';
import { useProjectFilter } from '../../../lib/hooks';
import { PROJECT_CATEGORIES } from '../../../lib/data/projects/projectConfig';
import ProjectFilters from './dashboard/ProjectFilters';
import ProjectGrid from './dashboard/ProjectGrid';
import ProjectList from './dashboard/ProjectList';
import AnalyticsTab from './dashboard/AnalyticsTab';
import { BarChart3, ArrowLeft } from 'lucide-react';

interface ProjectsDashboardProps {
  onProjectSelect: (slug: string) => void;
}

const ProjectsDashboard: React.FC<ProjectsDashboardProps> = ({ onProjectSelect }) => {
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
    setSortBy,
    setViewMode,
  } = useProjectFilter(projects);

  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Collect unique tags with counts (tags appearing in 2+ projects)
  const tagCounts = React.useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach(p =>
      p.tags.forEach(t => counts.set(t, (counts.get(t) || 0) + 1))
    );
    return counts;
  }, [projects]);

  // Filter by selected category and tag
  const categoryFilteredProjects = React.useMemo(() => {
    let result = selectedCategory
      ? filteredProjects.filter(p => p.category === selectedCategory)
      : filteredProjects;

    if (selectedTag) {
      result = result.filter(p => p.tags.includes(selectedTag));
    }

    return result;
  }, [filteredProjects, selectedCategory, selectedTag]);

  const getCategoryCount = (category: string): number => {
    return projects.filter(p => p.category === category).length;
  };



  return (
    <div className="bg-themeLight dark:bg-slate-950 min-h-screen transition-colors duration-500">
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
              className="px-4 sm:px-6 py-2 sm:py-3 bg-themeRed text-white font-semibold rounded-xl sm:rounded-2xl text-sm sm:text-base hover:bg-green-700 transition-colors duration-500"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!loading && !error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8">
          {/* Top Row: Title + Description (left) | Buttons (right) */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
            {/* Title + Description */}
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100">
                {activeTab === 'analytics' ? 'Project Analytics' : 'Project Portfolio'}
              </h1>
              <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mt-2 max-w-2xl">
                {activeTab === 'analytics'
                  ? 'Statistical overview of all projects, metrics, and performance indicators.'
                  : `Explore ${projects.length} projects across various domains and technologies.`
                }
              </p>
            </div>

            {/* Buttons */}
            <div className="flex-shrink-0">
              <button
                onClick={() => setActiveTab(activeTab === 'analytics' ? 'projects' : 'analytics')}
                className={`px-8 py-5 rounded-2xl text-lg font-bold transition-all duration-300 flex items-center gap-3 ${
                  activeTab === 'analytics'
                    ? 'bg-themeRed text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-themeRed dark:hover:text-themeRed hover:border-themeRed dark:hover:border-themeRed'
                }`}
              >
                {activeTab === 'analytics' ? (
                  <><ArrowLeft className="w-5 h-5" /> Projects</>
                ) : (
                  <><BarChart3 className="w-5 h-5" /> Analytics</>
                )}
              </button>
            </div>
          </div>

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <AnalyticsTab projects={projects} />
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              {/* Filter Bar */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4">
                {/* Search & Controls */}
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <ProjectFilters
                      searchQuery={filters.searchQuery}
                      onSearchChange={updateSearchQuery}
                      viewMode={filters.viewMode as 'grid' | 'list'}
                      onViewModeChange={(mode) => setViewMode(mode as any)}
                      sortBy={filters.sortBy}
                      onSortChange={setSortBy}
                    />
                  </div>
                </div>

                {/* Category Chips */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mr-1">
                      Filter:
                    </span>
                    <button
                      onClick={() => { setSelectedCategory(null); setSelectedTag(null); }}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 ${
                        selectedCategory === null && selectedTag === null
                          ? 'bg-themeRed text-white'
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
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 ${
                            isSelected
                              ? 'bg-themeRed text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          {category.label} ({count})
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tag Chips */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mr-1">
                      Tags:
                    </span>
                    {Array.from(tagCounts.entries())
                      .filter(([, count]) => count >= 2)
                      .sort((a, b) => b[1] - a[1])
                      .map(([tag, count]) => {
                        const isSelected = selectedTag === tag;
                        return (
                          <button
                            key={tag}
                            onClick={() => setSelectedTag(isSelected ? null : tag)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 ${
                              isSelected
                                ? 'bg-themeRed text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                          >
                            {tag} ({count})
                          </button>
                        );
                      })}
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing <span className="font-semibold text-gray-900 dark:text-gray-100">{categoryFilteredProjects.length}</span>
                  {selectedCategory && (
                    <span className="ml-2 px-2 py-0.5 bg-themeRed/10 text-themeRed text-xs rounded-lg">
                      {Object.entries(PROJECT_CATEGORIES).find(([k]) => k === selectedCategory)?.[1]?.label || selectedCategory}
                    </span>
                  )}
                  {selectedTag && (
                    <span className="ml-1 px-2 py-0.5 bg-themeRed/10 text-themeRed text-xs rounded-lg">
                      #{selectedTag}
                    </span>
                  )}
                </p>
              </div>

              {/* Projects Grid / List */}
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
                <div className="flex flex-col items-center justify-center py-20">
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">No projects found</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Try adjusting your filters to see more projects</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectsDashboard;
