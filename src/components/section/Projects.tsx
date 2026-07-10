import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAllProjects } from '../../lib/api/projectsAPI';
import { getFeaturedProjects } from '../../lib/utils/projectUtils';
import { Project } from '../../lib/types/Project_Section';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '../layout/SectionHeader';
import ProjectGrid from './projects/dashboard/ProjectGrid';

interface ProjectsProps {
  onViewAllClick?: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ onViewAllClick }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const projectsData = await getAllProjects();
        setProjects(projectsData);
        setError(null);
      } catch (err) {
        console.error('Failed to load projects:', err);
        setError('Failed to load projects.');
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const featuredProjects = getFeaturedProjects(projects)
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
    .slice(0, 6);

  const handleViewAll = () => {
    if (onViewAllClick) {
      onViewAllClick();
    } else {
      window.location.hash = '#/projects';
    }
  };

  const handleProjectSelect = (slug: string) => {
    window.location.hash = `#/projects/${slug}`;
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
    <section id="projects" className="py-24 px-6 md:px-24 bg-white dark:bg-slate-950">
      <div className="container max-w-6xl mx-auto">
        <SectionHeader title="Featured Projects" />

        {loading && (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-themeRed mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading featured projects...</p>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-themeRed text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center text-gray-600 text-lg max-w-2xl mx-auto mb-16"
            >
              Carefully crafted projects demonstrating web development, machine learning, and data science expertise
            </motion.p>

            <div className="mb-16">
              <ProjectGrid
                projects={featuredProjects}
                onProjectSelect={handleProjectSelect}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex justify-center"
              onClick={scrollToTop}
            >
              <motion.button
                onClick={handleViewAll}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 border border-gray-300 text-gray-900 font-semibold hover:border-themeRed hover:text-themeRed hover:bg-themeRed/5 transition-all duration-300 flex items-center gap-2 dark:text-white"
              >
                <span>View All {projects.length} Projects</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
                                                                                </>
        )}
      </div>
    </section>
  );
};

export default Projects;
