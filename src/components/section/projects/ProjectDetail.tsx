import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAllProjects } from '../../../lib/api/projectsAPI';
import { getProjectBySlug } from '../../../lib/utils/projectUtils';
import { Project } from '../../../lib/types/Project_Section';
import ProjectHeader from './detail/ProjectHeader';
import SimilarProjects from './detail/SimilarProjects';
import TabNavigation from './detail/tabs/TabNavigation';
import OverviewTab from './detail/tabs/OverviewTab';
import GalleryTab from './detail/tabs/GalleryTab';
import VideosTab from './detail/tabs/VideosTab';
import DocumentationTab from './detail/tabs/DocumentationTab';

type TabType = 'overview' | 'gallery' | 'videos' | 'docs';

interface ProjectDetailProps {
  slug: string;
  onBack: () => void;
  onProjectSelect: (slug: string) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ slug, onBack, onProjectSelect }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load projects and find the specific one
  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        const projectsData = await getAllProjects();
        setAllProjects(projectsData);
        const foundProject = getProjectBySlug(projectsData, slug);
        setProject(foundProject);
        setError(null);
      } catch (err) {
        console.error('Failed to load project:', err);
        setError('Failed to load project. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [slug]);
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Loading state
  if (loading) {
    return (
      <div className="bg-themeLight dark:bg-themeDark min-h-screen flex items-center justify-center p-4 transition-colors duration-500">
        <div className="text-center px-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-themeRed mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Loading Project...</h2>
          <p className="text-gray-600 dark:text-gray-400">Please wait while we fetch the project details.</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-themeLight dark:bg-themeDark min-h-screen flex items-center justify-center p-4 transition-colors duration-500">
        <div className="text-center px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-300">Error Loading Project</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 transition-colors duration-300">{error}</p>
          <button
            onClick={onBack}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-themeRed dark:bg-themeRed text-white font-semibold rounded-xl sm:rounded-2xl text-sm sm:text-base hover:bg-red-700 dark:hover:bg-red-700 active:bg-red-800 dark:active:bg-red-800 transition-colors duration-500"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  // Project not found state
  if (!project) {
    return (
      <div className="bg-themeLight dark:bg-themeDark min-h-screen flex items-center justify-center p-4 transition-colors duration-500">
        <div className="text-center px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-300">Project Not Found</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 transition-colors duration-300">The project you're looking for doesn't exist.</p>
          <button
            onClick={onBack}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-themeRed dark:bg-themeRed text-white font-semibold rounded-xl sm:rounded-2xl text-sm sm:text-base hover:bg-red-700 dark:hover:bg-red-700 active:bg-red-800 dark:active:bg-red-800 transition-colors duration-500"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const tabContentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };
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
  return (
    <div className="bg-themeLight dark:bg-slate-950 min-h-screen pb-8 sm:pb-12 transition-colors duration-500">
      <div className="pt-16 sm:pt-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto pt-12">
          {/* Header with Breadcrumb */}
          <ProjectHeader project={project} />
        </div>
      </div>

      {/* Tab Navigation */}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            key={activeTab}
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {activeTab === 'overview' && <OverviewTab project={project} />}
            {activeTab === 'gallery' && (
              <GalleryTab
                images={project.images || [project.image]}
                title={project.title}
              />
            )}
            {activeTab === 'videos' && (
              <VideosTab videos={project.videos} title={project.title} />
            )}
            {activeTab === 'docs' && (
              <DocumentationTab
                documentation={project.documentation}
                title={project.title}
              />
            )}
          </motion.div>
        </div>
      </div>

    {/* Similar Projects Section */}
<div 
  className="px-6 py-12 border-t border-gray-200  transition-colors cursor-pointer"
  onClick={scrollToTop}
>
  <div className="max-w-6xl mx-auto">
    <SimilarProjects
      currentProject={project}
      allProjects={allProjects}
      onProjectSelect={onProjectSelect}
    />
  </div>
</div>

      {/* Back Button */}
      <div className="px-6">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white border-2 border-themeRed text-themeRed font-semibold rounded-2xl hover:bg-themeRed/5 transition-colors duration-500 dark:bg-gray-800 "
          >
            ← Back to Projects
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
