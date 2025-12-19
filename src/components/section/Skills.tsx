'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SectionHeader from '../layout/SectionHeader';
import { SKILLS_BY_CATEGORY_WITH_PROFICIENCY } from '../../lib/data/skills';
import { getColoredIcon } from '../../lib/utils/iconify';

const Skills: React.FC = () => {
  const categoryOrder = ['Programming Languages', 'Frontend', 'Backend', 'Databases', 'Data & AI', 'DevOps & Tools','Graphic Design','video Editing'];
  const sortedCategories = categoryOrder.filter(cat => cat in SKILLS_BY_CATEGORY_WITH_PROFICIENCY);
  
  // State for mobile accordion
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.08,
      transition: { duration: 0.2 }
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <section id="skills" className="py-24 px-6 md:px-24 bg-white dark:bg-slate-950">
      <div className="container max-w-6xl mx-auto relative z-10">
        <SectionHeader title="Skills" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-1"
        >
          {/* Desktop Grid Layout */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="hidden lg:block pt-0"
          >
            {/* Grid Layout */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y divide-x divide-slate-200/40 dark:divide-slate-700/40"
            >
              {sortedCategories.map((category, index) => {
                const skills = SKILLS_BY_CATEGORY_WITH_PROFICIENCY[category as keyof typeof SKILLS_BY_CATEGORY_WITH_PROFICIENCY];
                
                return (
                  <motion.div
                    key={category}
                    variants={itemVariants}
                    className={`space-y-4  ${index > 0 ? 'pl-8 pt-4 md:pt-4' : ''}`}
                  >
                    {/* Category Title */}
                    <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-3">
                      {category}
                    </h4>

                    {/* Skills List */}
                    <div className="space-y-2">
                      {skills.map((skill) => {
                        const iconUrl = getColoredIcon(skill.name);

                        return (
                          <motion.div
                            key={`${category}-${skill.name}`}
                            variants={skillVariants}
                            whileHover={{ 
                              y: -2,
                              scale: 1.02
                            }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center justify-between py-2 px-3 rounded-lg transition-all duration-300 
                              bg-white/50 dark:bg-slate-800/50 
                              border border-slate-200/40 dark:border-slate-700/40
                              hover:bg-white/70 dark:hover:bg-slate-800/70
                              hover:border-slate-300/60 dark:hover:border-slate-600/60
                              hover:shadow-md hover:shadow-slate-200/30 dark:hover:shadow-slate-900/20
                              cursor-pointer group"
                          >
                            {/* Left: Icon + Name */}
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              {iconUrl && (
                                <motion.img
                                  src={iconUrl}
                                  alt={skill.name}
                                  className="w-4 h-4 object-contain flex-shrink-0"
                                  loading="lazy"
                                  whileHover={{ scale: 1.2, rotate: 8 }}
                                  transition={{ duration: 0.2 }}
                                />
                              )}
                              <span className="text-sm text-slate-700 dark:text-slate-300 truncate group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-200">
                                {skill.name}
                              </span>
                            </div>

                            {/* Right: Proficiency */}
                            <motion.span 
                              className={`text-xs font-medium flex-shrink-0 ml-2 px-2 py-1 rounded-full transition-all duration-200
                                ${skill.proficiency === 'Advanced' 
                                  ? 'text-green-700 dark:text-green-300 bg-green-100/50 dark:bg-green-900/30 group-hover:bg-green-100 dark:group-hover:bg-green-900/50' 
                                  : skill.proficiency === 'Intermediate' 
                                  ? 'text-blue-700 dark:text-blue-300 bg-blue-100/50 dark:bg-blue-900/30 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50'
                                  : 'text-amber-700 dark:text-amber-300 bg-amber-100/50 dark:bg-amber-900/30 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/50'
                                }`}
                              whileHover={{ scale: 1.08 }}
                              transition={{ duration: 0.2 }}
                            >
                              {skill.proficiency}
                            </motion.span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Mobile Accordion Layout */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="lg:hidden space-y-3"
          >
            {sortedCategories.map((category) => {
              const skills = SKILLS_BY_CATEGORY_WITH_PROFICIENCY[category as keyof typeof SKILLS_BY_CATEGORY_WITH_PROFICIENCY];
              const isExpanded = expandedCategory === category;

              return (
                <motion.div
                  key={category}
                  className="border-2 border-slate-200 dark:border-slate-700/60 rounded-xl overflow-hidden transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-600"
                >
                  {/* Category Header - Accordion Trigger */}
                  <motion.button
                    onClick={() => toggleCategory(category)}
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                    className="w-full px-4 py-4 flex items-center justify-between bg-gradient-to-r from-white to-slate-50 dark:from-slate-800/80 dark:to-slate-800/50 transition-all duration-300 group"
                  >
                    <h4 className="text-base font-semibold text-slate-900 dark:text-white text-left transition-colors duration-300">
                      {category}
                    </h4>

                    {/* Chevron Icon */}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="flex-shrink-0 ml-3"
                    >
                      <ChevronDown
                        size={20}
                        className="text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors duration-300"
                      />
                    </motion.div>
                  </motion.button>

                  {/* Skills Content - Accordion Body */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 py-4 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-700/60 space-y-2 transition-colors duration-300">
                          {skills.map((skill) => {
                            const iconUrl = getColoredIcon(skill.name);

                            return (
                              <motion.div
                                key={`${category}-${skill.name}`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center justify-between py-2.5 px-3 rounded-lg transition-all duration-300 
                                  bg-white/70 dark:bg-slate-700/50
                                  border border-slate-100 dark:border-slate-600/40
                                  hover:bg-white dark:hover:bg-slate-700
                                  hover:shadow-sm hover:shadow-slate-200/50 dark:hover:shadow-slate-900/30"
                              >
                                {/* Left: Icon + Name */}
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                  {iconUrl && (
                                    <motion.img
                                      src={iconUrl}
                                      alt={skill.name}
                                      className="w-4 h-4 object-contain flex-shrink-0"
                                      loading="lazy"
                                    />
                                  )}
                                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate transition-colors duration-200">
                                    {skill.name}
                                  </span>
                                </div>

                                {/* Right: Proficiency Badge */}
                                <motion.span
                                  className={`text-xs font-semibold flex-shrink-0 ml-2 px-2.5 py-1 rounded-full transition-all duration-200
                                    ${skill.proficiency === 'Advanced'
                                      ? 'text-green-700 dark:text-green-300 bg-green-100/70 dark:bg-green-900/40'
                                      : skill.proficiency === 'Intermediate'
                                        ? 'text-blue-700 dark:text-blue-300 bg-blue-100/70 dark:bg-blue-900/40'
                                        : 'text-amber-700 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-900/40'
                                    }`}
                                >
                                  {skill.proficiency}
                                </motion.span>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;