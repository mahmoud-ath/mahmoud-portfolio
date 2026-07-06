import React from 'react';
import { Project } from '../../../../lib/types/Project_Section';
import { PROJECT_CATEGORIES } from '../../../../lib/data/projects/projectConfig';
import { Zap } from 'lucide-react';

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
      className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-themeRed dark:hover:border-themeRed hover:shadow-2xl dark:hover:shadow-lg dark:hover:shadow-themeRed/20 transition-all duration-500 cursor-pointer h-full flex flex-col rounded-2xl overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative h-36 bg-gray-100 dark:bg-gray-700 overflow-hidden">
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
          <span className={`px-4 py-1.5 text-white text-xs font-semibold rounded-full  bg-slate-950 transition-all duration-300`}>
            {category.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col">
        {/* Title */}
        <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 mb-1 line-clamp-2 group-hover:text-themeRed dark:group-hover:text-themeRed transition-colors duration-500">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 transition-colors duration-300">
          {project.description.length > 100 ? project.description.slice(0, 100) + '...' : project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
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
