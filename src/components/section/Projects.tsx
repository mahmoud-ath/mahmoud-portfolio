import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../../lib/data/projects/projects';
import { getFeaturedProjects } from '../../lib/utils/projectUtils';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';
import SectionHeader from '../layout/SectionHeader';

interface ProjectsProps {
  onViewAllClick?: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ onViewAllClick }) => {
  const featuredProjects = getFeaturedProjects(projectsData).slice(0, 3);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleViewAll = () => {
    if (onViewAllClick) {
      onViewAllClick();
    } else {
      window.location.hash = '#/projects';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
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
        {/* Section Header */}
        <SectionHeader title="Featured Projects" />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-gray-600 text-lg max-w-2xl mx-auto mb-16"
        >
          Carefully crafted projects demonstrating web development, machine learning, and data science expertise
        </motion.p>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group h-full"
            >
              {/* Card */}
              <div className="h-full flex flex-col bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50 rounded-2xl overflow-hidden hover:border-gray-300 dark:hover:border-slate-600/70 hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-themeRed/5 transition-all duration-300 group/card backdrop-blur-sm dark:backdrop-blur-sm">
  
  {/* Image Container */}
  <div className="relative w-full h-48 bg-gray-100 dark:bg-slate-700/30 overflow-hidden">
    <img
      src={project.image}
      alt={project.title}
      className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
      loading="lazy"
    />
    
    {/* Light mode overlay */}
    <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/5 transition-colors duration-300 dark:hidden" />
    
    {/* Dark mode gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-60 group-hover/card:opacity-30 transition-opacity duration-500 hidden dark:block" />
    
    {/* Dark mode shine effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000 hidden dark:block" />
  </div>

  {/* Content */}
  <div className="p-6 flex flex-col flex-grow">
    {/* Title */}
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 dark:mb-3 line-clamp-2 group-hover/card:text-themeRed transition-colors duration-300">
      {project.title}
    </h3>

    {/* Description */}
    <p className="text-sm text-gray-600 dark:text-slate-300 mb-4 dark:mb-5 line-clamp-2 flex-grow dark:leading-relaxed">
      {project.description}
    </p>

    {/* Tags */}
    <div className="flex flex-wrap gap-2 mb-5 dark:mb-6">
      {project.tags.slice(0, 3).map((tag) => (
        <span
          key={tag}
          className="px-2.5 dark:px-3 py-1 dark:py-1.5 text-xs font-medium text-gray-700 dark:text-slate-300 bg-gray-100 dark:bg-slate-700/50 rounded-full border border-gray-200 dark:border-slate-600/50 group-hover/card:bg-gray-200 dark:group-hover/card:bg-slate-700/80 group-hover/card:border-gray-300 dark:group-hover/card:border-slate-500/50 transition-all duration-300 hover:scale-105"
        >
          {tag}
        </span>
      ))}
      {project.tags.length > 3 && (
        <span className="px-2.5 dark:px-3 py-1 dark:py-1.5 text-xs font-medium text-gray-500 dark:text-slate-400 bg-gray-50 dark:bg-slate-800/30 rounded-full border border-gray-100 dark:border-slate-700/30">
          +{project.tags.length - 3}
        </span>
      )}
    </div>

    {/* Action Buttons - Bottom */}
    <div 
      className="flex gap-2 dark:gap-3 pt-4 dark:pt-5 border-t border-gray-100 dark:border-slate-700/50 mt-auto" 
      onClick={scrollToTop}
    >
      {/* Details Button - Primary */}
      <motion.button
        onClick={() => {
          window.location.hash = `#/projects/${project.slug}`;
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex-1 px-4 py-2.5 dark:py-3 bg-themeRed dark:bg-gradient-to-r dark:from-themeRed dark:to-red-600 text-white font-semibold rounded-lg dark:rounded-xl hover:bg-red-700 dark:hover:from-red-600 dark:hover:to-red-700 active:bg-red-800 dark:active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group/btn dark:shadow-lg dark:shadow-themeRed/20 dark:hover:shadow-themeRed/30"
      >
        <span>Details</span>
        <ArrowRight className="w-3.5 h-3.5 dark:w-4 dark:h-4 group-hover/btn:translate-x-0.5 dark:group-hover/btn:translate-x-1 transition-transform duration-300" />
      </motion.button>

      {/* Secondary Actions */}
      <div className="flex gap-2">
        {project.links?.demo && (
          <motion.a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 dark:p-3 bg-gray-100 dark:bg-slate-700/50 hover:bg-gray-200 dark:hover:bg-slate-600/70 border border-gray-200 dark:border-slate-600/50 hover:border-gray-300 dark:hover:border-slate-500/70 text-gray-700 dark:text-slate-300 hover:text-themeRed dark:hover:text-white rounded-lg dark:rounded-xl transition-all duration-300 flex items-center justify-center dark:shadow-sm dark:hover:shadow-md"
            title="View Live Demo"
          >
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        )}

        {project.links?.github && (
          <motion.a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 dark:p-3 bg-gray-100 dark:bg-slate-700/50 hover:bg-gray-200 dark:hover:bg-slate-600/70 border border-gray-200 dark:border-slate-600/50 hover:border-gray-300 dark:hover:border-slate-500/70 text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white rounded-lg dark:rounded-xl transition-all duration-300 flex items-center justify-center dark:shadow-sm dark:hover:shadow-md"
            title="View Source Code"
          >
            <Github className="w-4 h-4" />
          </motion.a>
        )}
      </div>
    </div>
  </div>

  {/* Dark mode glow effect */}
  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-themeRed/5 via-transparent to-blue-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 -z-10 hidden dark:block" />
</div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center "
          onClick={scrollToTop}
        >
          <motion.button
            onClick={handleViewAll}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 border border-gray-300 text-gray-900 font-semibold rounded-lg hover:border-themeRed hover:text-themeRed hover:bg-themeRed/5 transition-all duration-300 flex items-center gap-2 dark:text-white"
          >
            <span>View All {projectsData.length} Projects</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
