import React from 'react';
import { Project } from '../../../../lib/types/Project_Section';
import { ArrowLeft } from 'lucide-react';

interface ProjectHeaderProps {
  project: Project;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project }) => {
  const handleBackClick = () => {
    window.location.hash = '#/projects';
  };

  return (
    <div className="mb-12">
      {/* Breadcrumb */}
      <div className="mb-6 pt-0">
        <button onClick={handleBackClick} className="text-themeRed dark:text-themeRed hover:text-red-700 dark:hover:text-red-400 font-medium flex items-center gap-2 transition-colors duration-500 cursor-pointer">
          <ArrowLeft size={18} />
          Back to Projects
        </button>
      </div>

      {/* Title Section */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-300">
          {project.title}
        </h1>
       
      </div>

    
    </div>
  );
};

export default ProjectHeader;
