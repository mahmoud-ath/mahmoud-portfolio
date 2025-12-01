import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../../../../../lib/types/Project_Section';
import { Zap, Clock, Target, ExternalLink, Github } from 'lucide-react';
import { getProjectDuration, getReadingTime } from '../../../../../lib/utils/projectUtils';

interface OverviewTabProps {
  project: Project;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ project }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const readingTime = getReadingTime(project.description);
  const duration = getProjectDuration(project.createdAt, project.completedAt);

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Metrics & Stack */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Metrics Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-themeRed/20 transition-all duration-500"
          >
            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
              Project Metrics
            </h3>
            <div className="space-y-4">
              {/* Impact Score */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2 transition-colors duration-300">
                    <Target className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                    Impact Score
                  </span>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{project.impactScore}/20</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 transition-colors duration-300">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(project.impactScore / 20) * 100}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="bg-blue-500 dark:bg-blue-400 h-full rounded-full"
                  />
                </div>
              </div>

              {/* Difficulty */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2 transition-colors duration-300">
                    <Zap className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                    Difficulty
                  </span>
                  <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">{project.difficulty}/5</span>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-2 rounded-full transition-colors duration-300 ${
                        i < project.difficulty ? 'bg-orange-500 dark:bg-orange-400' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2 mb-1 transition-colors duration-300">
                  <Clock className="w-4 h-4 text-green-500 dark:text-green-400" />
                  <span className="font-semibold">{duration}</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 transition-colors duration-300">
                  {project.createdAt} → {project.completedAt || 'Ongoing'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Tech Stack Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-themeRed/20 transition-all duration-500"
          >
            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg text-xs font-semibold text-blue-900 dark:text-blue-300 hover:shadow-sm dark:hover:shadow-blue-500/20 transition-all cursor-default duration-300"
                >
                  {tag}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Description & Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Description Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-themeRed/20 transition-all duration-500"
          >
            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-600 dark:text-gray-300 mb-3 transition-colors duration-300">
              Overview
            </h3>
            <p className="text-gray-700 dark:text-gray-400 leading-relaxed mb-3 transition-colors duration-300">
              {project.description}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 transition-colors duration-300">{readingTime} min read</p>
          </motion.div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Category */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-themeRed/20 transition-all duration-500"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1 transition-colors duration-300">
                Category
              </p>
              <p className="text-base font-bold text-gray-900 dark:text-gray-100 capitalize transition-colors duration-300">
                {project.category.replace('-', ' ')}
              </p>
            </motion.div>

            {/* Status */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-themeRed/20 transition-all duration-500"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1 transition-colors duration-300">
                Status
              </p>
              <p className="text-base font-bold text-green-600 dark:text-green-400 transition-colors duration-300">
                {project.completedAt ? 'Completed' : 'In Progress'}
              </p>
            </motion.div>

            {/* Tier */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-themeRed/20 transition-all duration-500"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1 transition-colors duration-300">
                Tier
              </p>
              <p className="text-base font-bold text-themeRed dark:text-themeRed capitalize transition-colors duration-300">
                {project.tier}
              </p>
            </motion.div>

            {/* Type */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-themeRed/20 transition-all duration-500"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1 transition-colors duration-300">
                Type
              </p>
              <p className="text-base font-bold text-gray-900 dark:text-gray-100 capitalize transition-colors duration-300">
                {project.projectType}
              </p>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-3 pt-2"
          >
            {project.links?.demo && (
              <motion.a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-themeRed dark:from-themeRed to-red-600 dark:to-red-700 text-white font-semibold rounded-lg hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-themeRed/40 transition-all duration-500"
              >
                <ExternalLink size={18} />
                Live Demo
              </motion.a>
            )}
            {project.links?.github && (
              <motion.a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white font-semibold rounded-lg shadow-sm hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-gray-900/40 transition-all duration-500"
              >
                <Github size={18} />
                View Code
              </motion.a>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default OverviewTab;
