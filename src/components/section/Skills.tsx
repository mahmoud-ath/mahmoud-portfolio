'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../layout/SectionHeader';
import { SKILLS_BY_CATEGORY_WITH_PROFICIENCY } from '../../lib/data/skills';
import { getColoredIcon } from '../../lib/utils/iconify';

const Skills: React.FC = () => {
  const categoryOrder = ['Programming Languages', 'Frontend', 'Backend', 'Databases', 'Data & AI', 'DevOps & Tools','Graphic Design','video Editing'];
  const sortedCategories = categoryOrder.filter(cat => cat in SKILLS_BY_CATEGORY_WITH_PROFICIENCY);

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
          {/* Ultra Minimalist Skills Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="pt-0"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h3 className="text-2xl font-light text-slate-900 dark:text-white mb-2">
                
              </h3>
            </motion.div>

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
                        const proficiencyColor = 
                          skill.proficiency === 'expert' ? 'text-green-600' :
                          skill.proficiency === 'advanced' ? 'text-blue-600' :
                          'text-orange-600';

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
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;