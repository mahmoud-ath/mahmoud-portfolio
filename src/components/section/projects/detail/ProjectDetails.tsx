import React from 'react';
import { Project } from '../../../../lib/types/Project_Section';
import { PROJECT_CATEGORIES, PROJECT_TIERS, PROJECT_TYPES } from '../../../../lib/data/projects/projectConfig';
import { Code2, Tag, Package, Award, Users } from 'lucide-react';

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  const category = PROJECT_CATEGORIES[project.category as keyof typeof PROJECT_CATEGORIES];
  const tier = PROJECT_TIERS[project.tier as keyof typeof PROJECT_TIERS];
  const projectType = PROJECT_TYPES[project.projectType as keyof typeof PROJECT_TYPES];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-8">
        {/* About Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2 transition-colors duration-300">
            <Code2 className="w-6 h-6 text-themeRed" />
            About This Project
          </h2>
          <p className="text-gray-700 dark:text-gray-400 leading-relaxed text-lg transition-colors duration-300">
            {project.description}
          </p>
        </section>

        {/* Technologies Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2 transition-colors duration-300">
            <Tag className="w-6 h-6 text-themeRed" />
            Technologies Used
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 font-medium rounded-2xl hover:border-themeRed dark:hover:border-themeRed transition-colors duration-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* Key Features Section */}
        {project.category === 'web-dev' && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2 transition-colors duration-300">
              <Package className="w-6 h-6 text-themeRed" />
              Key Features
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-themeRed mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 dark:text-gray-400 transition-colors duration-300">Professional dashboard interface with responsive design</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-themeRed mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 dark:text-gray-400 transition-colors duration-300">Comprehensive data management and analysis capabilities</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-themeRed mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 dark:text-gray-400 transition-colors duration-300">Secure authentication with role-based access control</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-themeRed mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 dark:text-gray-400 transition-colors duration-300">Real-time data synchronization and reporting</span>
              </li>
            </ul>
          </section>
        )}
      </div>

      {/* Sidebar Info */}
      <aside className="space-y-4">
        {/* Project Type Card */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-themeRed/20 transition-all duration-500">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-themeRed" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300">Project Type</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-400 font-medium transition-colors duration-300">{projectType.label}</p>
        </div>

        {/* Category Card */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-themeRed/20 transition-all duration-500">
          <div className="flex items-center gap-2 mb-3">
            <Code2 className="w-5 h-5 text-themeRed" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300">Category</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
            <p className="text-gray-700 dark:text-gray-400 font-medium transition-colors duration-300">{category.label}</p>
          </div>
        </div>

        {/* Tier Card */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-themeRed/20 transition-all duration-500">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-themeRed" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300">Project Tier</h3>
          </div>
          <div className="inline-block">
            <span className={`px-4 py-2 ${tier.color} text-white font-semibold text-sm rounded-full`}>
              {tier.label}
            </span>
          </div>
        </div>

        {/* Share Section */}
        <div className="bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl p-6 transition-all duration-300">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 transition-colors duration-300">Share This Project</h3>
          <div className="flex gap-2">
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2.5 bg-gray-900 dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700 text-white text-sm font-semibold rounded-2xl transition-all duration-500 hover:shadow-md text-center"
              >
                GitHub
              </a>
            )}
            {project.links?.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2.5 bg-themeRed hover:bg-red-700 dark:hover:bg-red-600 text-white text-sm font-semibold rounded-2xl transition-all duration-500 hover:shadow-lg hover:shadow-themeRed/30 text-center"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ProjectDetails;
