import React from 'react';
import { Project } from '../../../../lib/types/Project_Section';
import { PROJECT_CATEGORIES, DIFFICULTY_LEVELS } from '../../../../lib/data/projects/projectConfig';
import { formatDate, getProjectStatus } from '../../../../lib/utils/projectUtils';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectListProps {
  projects: Project[];
  onProjectSelect: (slug: string) => void;
}

const ProjectListItem: React.FC<{ project: Project; onSelect: (slug: string) => void }> = ({
  project,
  onSelect
}) => {
  const category = PROJECT_CATEGORIES[project.category as keyof typeof PROJECT_CATEGORIES];
  const difficulty = DIFFICULTY_LEVELS[project.difficulty as keyof typeof DIFFICULTY_LEVELS];

  return (
    <div
      onClick={() => onSelect(project.slug)}
      className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-themeRed dark:hover:border-themeRed hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-themeRed/20 transition-all duration-500 cursor-pointer flex items-center gap-6"
    >
      {/* Image Thumbnail */}
      <div className="flex-shrink-0 w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-2xl overflow-hidden transition-colors duration-300">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Title and Badges */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 group-hover:text-themeRed dark:group-hover:text-themeRed transition-colors line-clamp-1 duration-500">
              {project.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1 mt-1 transition-colors duration-300">
              {project.description}
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            {project.featured && (
              <span className="px-2 py-1 bg-themeYellow/20 dark:bg-themeYellow/20 text-themeYellow dark:text-themeYellow text-xs font-semibold rounded transition-colors duration-300">
                Featured
              </span>
            )}
            {project.isNew && (
              <span className="px-2 py-1 bg-themeRed/10 dark:bg-themeRed/20 text-themeRed dark:text-themeRed text-xs font-semibold rounded transition-colors duration-300">
                New
              </span>
            )}
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          {/* Category */}
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${category.color}`}></span>
            <span className="text-gray-600 dark:text-gray-400 transition-colors duration-300">{category.label}</span>
          </div>

          {/* Status */}
          <span className="text-gray-600 dark:text-gray-400 transition-colors duration-300">{getProjectStatus(project.completedAt)}</span>

          {/* Date */}
          <span className="text-gray-500 dark:text-gray-500 transition-colors duration-300">{formatDate(project.createdAt)}</span>

          {/* Difficulty */}
          <span className={`${difficulty.color} font-medium`}>
            {difficulty.label}
          </span>

          {/* Impact Score */}
          <div className="flex items-center gap-1">
            <span className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Impact:</span>
            <div className="h-1 w-12 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden transition-colors duration-300">
              <div
                className="h-full bg-themeRed dark:bg-themeRed"
                style={{ width: `${(project.impactScore / 20) * 100}%` }}
              ></div>
            </div>
            <span className="font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">{project.impactScore}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-500"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-3 py-1 text-gray-600 dark:text-gray-400 text-xs font-medium transition-colors duration-300">+{project.tags.length - 4} more</span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(project.slug);
          }}
          className="px-4 py-2 bg-themeRed dark:bg-themeRed text-white text-sm font-semibold rounded-2xl hover:bg-red-700 dark:hover:bg-red-700 active:bg-red-800 dark:active:bg-red-800 transition-all duration-500 hover:shadow-lg hover:shadow-themeRed/30 whitespace-nowrap"
        >
          View
        </button>
        {project.links?.demo && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-500 hover:shadow-md"
            title="View Live Demo"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
        {project.links?.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-500 hover:shadow-md"
            title="View on GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
};

const ProjectList: React.FC<ProjectListProps> = ({ projects, onProjectSelect }) => {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300">
          <span className="text-2xl">🔍</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 transition-colors duration-300">No projects found</h3>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-sm transition-colors duration-300">
          Try adjusting your filters or search terms to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <ProjectListItem
          key={project.id}
          project={project}
          onSelect={onProjectSelect}
        />
      ))}
    </div>
  );
};

export default ProjectList;
