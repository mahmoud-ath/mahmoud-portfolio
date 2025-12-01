import React from 'react';
import { Project } from '../../../../lib/types/Project_Section';
import { PROJECT_CATEGORIES } from '../../../../lib/data/projects/projectConfig';
import { formatDate, getProjectStatus,  } from '../../../../lib/utils/projectUtils';
import { ExternalLink, Github, Zap,Sparkles } from 'lucide-react';

interface ProjectGridProps {
  projects: Project[];
  onProjectSelect: (slug: string) => void;
}

const ProjectCard: React.FC<{ project: Project; onSelect: (slug: string) => void }> = ({
  project,
  onSelect
}) => {
  const category = PROJECT_CATEGORIES[project.category as keyof typeof PROJECT_CATEGORIES];
  
  const scrollToTop = () => {
    const scrollStep = -window.scrollY / 15;
    
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };

  // Combined click handler
  const handleCardClick = () => {
    onSelect(project.slug);
    scrollToTop();
  };
      
  return (
    <div
      onClick={handleCardClick}
      className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden hover:border-themeRed dark:hover:border-themeRed hover:shadow-2xl dark:hover:shadow-lg dark:hover:shadow-themeRed/20 transition-all duration-500 cursor-pointer h-full flex flex-col"
    >
      {/* Image Container */}
      <div className="relative h-56 bg-gray-100 dark:bg-gray-700 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>

    {/* Status Badges - Creative Paper Cutout */}
<div className="absolute top-4 left-4 flex  gap-2">
  {project.featured && (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-white text-gray-800 rounded-lg text-xs font-bold border-2 border-gray-800 shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all duration-300 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1">
      <Zap className="w-3 h-3" />
      Featured
    </div>
  )}
  {project.isNew && (
    <div className="px-3 py-1.5 bg-white text-gray-800 rounded-lg text-xs font-bold border-2 border-gray-800 shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all duration-300 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1">
      New
    </div>
  )}
  {project.isTrending && (
    <div className="px-3 py-1.5 bg-white text-gray-800 rounded-lg text-xs font-bold border-2 border-gray-800 shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all duration-300 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1">
      Trending
    </div>
  )}
</div>

        {/* Category Badge */}
        <div className="absolute bottom-4 left-4">
          <span className={`px-4 py-1.5 text-white text-xs font-semibold rounded-full backdrop-blur-sm transition-all duration-300`}>
            {category.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col">
        {/* Title */}
        <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 group-hover:text-themeRed dark:group-hover:text-themeRed transition-colors duration-500">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 flex-1 transition-colors duration-300">
          {project.description}
        </p>

        {/* Meta Info */}
        <div className="space-y-4 mb-6 pt-6 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
          {/* Date */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
              {getProjectStatus(project.completedAt)}
            </span>
            <span className="text-gray-500 dark:text-gray-500 transition-colors duration-300">{formatDate(project.createdAt)}</span>
          </div>

          {/* Impact Score */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Impact Score</span>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-20 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden transition-colors duration-300">
                <div
                  className="h-full bg-themeRed dark:bg-themeRed transition-all duration-500"
                  style={{ width: `${(project.impactScore / 20) * 100}%` }}
                ></div>
              </div>
              <span className="font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">{project.impactScore}/20</span>
            </div>
          </div>

          {/* Difficulty */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Difficulty</span>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${
                    i < project.difficulty ? 'bg-themeRed dark:bg-themeRed' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-3 py-1 text-gray-600 dark:text-gray-400 text-xs font-medium transition-colors duration-300">+{project.tags.length - 3}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto"  >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(project.slug);
            }}
            className="flex-1 px-4 py-2.5 bg-themeRed dark:bg-themeRed text-white text-sm font-semibold rounded-2xl hover:bg-red-700 dark:hover:bg-red-700 active:bg-red-800 dark:active:bg-red-800 transition-all duration-500 hover:shadow-lg hover:shadow-themeRed/30"
          >
            View Details
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
    </div>
  );
};

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, onProjectSelect }) => {
  if (projects.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-20 px-4">
        
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onSelect={onProjectSelect}
          
        />
      ))}
    </div>
  );
};

export default ProjectGrid;
