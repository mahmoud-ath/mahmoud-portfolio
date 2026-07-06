'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SectionHeader from '../layout/SectionHeader';
import { SKILLS_BY_CATEGORY_WITH_PROFICIENCY } from '../../lib/data/skills';
import { getColoredIcon } from '../../lib/utils/iconify';

// ── Proficiency Dots ─────────────────────────────────────────
const ProficiencyDots: React.FC<{ level: string }> = ({ level }) => {
  const count = level === 'Advanced' ? 3 : level === 'Intermediate' ? 2 : 1;
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            i < count
              ? level === 'Advanced'
                ? 'bg-green-500 dark:bg-green-400'
                : level === 'Intermediate'
                ? 'bg-blue-500 dark:bg-blue-400'
                : 'bg-amber-500 dark:bg-amber-400'
              : 'bg-slate-300 dark:bg-slate-600'
          }`}
        />
      ))}
    </div>
  );
};

// ── Merged Categories ────────────────────────────────────────
const MERGED_CATEGORIES: Record<string, string[]> = {
  'Programming Languages': ['Programming Languages'],
  'Frameworks & Technologies': ['Frontend', 'Backend'],
  Databases: ['Databases'],
  'Data & AI': ['Data & AI'],
  'DevOps & Tools': ['DevOps & Tools'],
  Creative: ['Graphic Design', 'video Editing'],
};

function getMergedSkills(originalKeys: string[]) {
  const result: { name: string; skills: { name: string; proficiency: string }[] }[] = [];
  for (const [mergedName, sourceKeys] of Object.entries(MERGED_CATEGORIES)) {
    const skills: { name: string; proficiency: string }[] = [];
    for (const key of sourceKeys) {
      const group = SKILLS_BY_CATEGORY_WITH_PROFICIENCY[key as keyof typeof SKILLS_BY_CATEGORY_WITH_PROFICIENCY];
      if (group) skills.push(...group);
    }
    if (skills.length > 0) result.push({ name: mergedName, skills });
  }
  return result;
}

const Skills: React.FC = () => {
  const mergedCategories = useMemo(() => getMergedSkills(), []);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
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
          {/* ── Desktop Grid ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="hidden lg:block"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {mergedCategories.map(({ name: category, skills }) => (
                <motion.div
                  key={category}
                  variants={itemVariants}
                  className="space-y-4"
                >
                  {/* Category Title + Count */}
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                      {category}
                    </h4>
                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                      {skills.length}
                    </span>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-2">
                    {skills.map((skill) => {
                      const iconUrl = getColoredIcon(skill.name);
                      return (
                        <motion.div
                          key={`${category}-${skill.name}`}
                          variants={skillVariants}
                          whileHover={{ y: -2, scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center justify-between py-2.5 px-3 rounded-lg transition-all duration-300 
                            bg-white/50 dark:bg-slate-800/50 
                            border border-slate-200/40 dark:border-slate-700/40
                            hover:bg-white/70 dark:hover:bg-slate-800/70
                            hover:border-slate-300/60 dark:hover:border-slate-600/60
                            hover:shadow-md hover:shadow-slate-200/30 dark:hover:shadow-slate-900/20
                            group"
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
                          <ProficiencyDots level={skill.proficiency} />
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Mobile Accordion ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="lg:hidden space-y-3"
          >
            {mergedCategories.map(({ name: category, skills }) => {
              const isExpanded = expandedCategory === category;
              return (
                <motion.div
                  key={category}
                  className="border-2 border-slate-200 dark:border-slate-700/60 rounded-xl overflow-hidden transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-600"
                >
                  {/* Category Header */}
                  <motion.button
                    onClick={() => toggleCategory(category)}
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                    className="w-full px-4 py-4 flex items-center justify-between bg-gradient-to-r from-white to-slate-50 dark:from-slate-800/80 dark:to-slate-800/50 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-semibold text-slate-900 dark:text-white text-left transition-colors duration-300">
                        {category}
                      </h4>
                      <span className="text-xs font-medium text-slate-400 dark:text-slate-500 bg-slate-200/60 dark:bg-slate-700/60 px-2 py-0.5 rounded-full">
                        {skills.length}
                      </span>
                    </div>
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

                  {/* Skills Content */}
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
                                <ProficiencyDots level={skill.proficiency} />
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