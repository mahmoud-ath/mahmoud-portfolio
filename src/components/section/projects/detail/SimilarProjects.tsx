import React from 'react';
import { Project } from '../../../../lib/types/Project_Section';
import { getSimilarProjects } from '../../../../lib/utils/projectUtils';
import { ArrowRight } from 'lucide-react';

interface SimilarProjectsProps {
  currentProject: Project;
  allProjects: Project[];
  onProjectSelect: (slug: string) => void;
}

const SimilarProjects: React.FC<SimilarProjectsProps> = ({
  currentProject,
  allProjects,
  onProjectSelect
}) => {
  const similarProjects = getSimilarProjects(currentProject, allProjects, 3);

  if (similarProjects.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 transition-colors duration-300">Similar Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {similarProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => onProjectSelect(project.slug)}
            className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden hover:border-themeRed dark:hover:border-themeRed hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-themeRed/20 transition-all duration-500 cursor-pointer"
          >
            {/* Image */}
            <div className="h-40 bg-gray-100 dark:bg-gray-700 overflow-hidden transition-colors duration-300">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-themeRed dark:group-hover:text-themeRed transition-colors line-clamp-2 duration-300">
                {project.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 transition-colors duration-300">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onProjectSelect(project.slug);
                }}
                className="w-full px-4 py-2 bg-themeRed hover:bg-red-700 dark:hover:bg-red-600 text-white font-semibold rounded-2xl transition-colors duration-500 flex items-center justify-center gap-2 group"
              >
                View Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SimilarProjects;
