import React, { useState } from 'react';
import { FilterState } from '../../../../lib/types/Project_Section';
import { SORT_OPTIONS } from '../../../../lib/data/projects/projectConfig';
import { Search, Grid3X3, List, Sliders, X } from 'lucide-react';

interface ProjectFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  sortBy: FilterState['sortBy'];
  onSortChange: (sort: FilterState['sortBy']) => void;
  showFeaturedOnly: boolean;
  onFeaturedToggle: () => void;
  showNewOnly: boolean;
  onNewToggle: () => void;
  onResetFilters: () => void;
  activeFiltersCount: number;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  showFeaturedOnly,
  onFeaturedToggle,
  showNewOnly,
  onNewToggle,
  onResetFilters,
  activeFiltersCount
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-themeRed/50 focus:border-themeRed transition-colors duration-300"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-2">
        {/* View Mode Toggle */}
        <div className="flex bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-1 transition-colors duration-300">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded-lg transition-all duration-500 ${
              viewMode === 'grid'
                ? 'bg-themeRed dark:bg-themeRed text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
            title="Grid view"
          >
            <Grid3X3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 rounded-lg transition-all duration-500 ${
              viewMode === 'list'
                ? 'bg-themeRed dark:bg-themeRed text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
            title="List view"
          >
            <List className="w-5 h-5" />
          </button>
        </div>

        {/* Advanced Filters Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl border transition-all duration-300 ${
            isOpen || activeFiltersCount > 0
              ? 'bg-themeRed/10 dark:bg-themeRed/20 border-themeRed text-themeRed dark:text-themeRed'
              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          <Sliders className="w-4 h-4" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="ml-2 px-2 py-1 bg-themeRed text-white text-xs font-semibold rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* Reset Filters Button */}
        {activeFiltersCount > 0 && (
          <button
            onClick={onResetFilters}
            className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            Reset
          </button>
        )}
      </div>

      {/* Advanced Filters Panel */}
      {isOpen && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 space-y-4 transition-colors duration-300">
          {/* Sort Options */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 transition-colors duration-300">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as FilterState['sortBy'])}
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-themeRed/50 focus:border-themeRed transition-colors duration-300"
            >
              {Object.entries(SORT_OPTIONS).map(([key, option]) => (
                <option key={key} value={key}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filters */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 transition-colors duration-300">
              Status
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showFeaturedOnly}
                  onChange={onFeaturedToggle}
                  className="w-4 h-4 text-themeRed rounded focus:ring-2 focus:ring-themeRed"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">Featured Only</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showNewOnly}
                  onChange={onNewToggle}
                  className="w-4 h-4 text-themeRed rounded focus:ring-2 focus:ring-themeRed"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">New Projects Only</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectFilters;
