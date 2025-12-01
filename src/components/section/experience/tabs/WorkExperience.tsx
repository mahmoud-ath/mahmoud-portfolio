'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Experience } from '../../../../lib/types/Experience_Section';

interface WorkExperienceProps {
  data: Experience[];
  activeId: string;
  onItemChange: (id: string) => void;
}

const WorkExperience: React.FC<WorkExperienceProps> = ({ data, activeId, onItemChange }) => {
  const activeExperience = data.find(exp => exp.id === activeId) || data[0];

  return (
    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-sm border border-white/80 dark:border-slate-700/80 transition-colors duration-300">
  <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
    {/* Experience List - Sidebar */}
    <div className="lg:w-1/3">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 pb-3 border-b border-slate-200/60 dark:border-slate-700/60 transition-colors duration-300">
        Work History
      </h3>
      <div className="space-y-2 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
        {data.map((exp, idx) => (
          <motion.button
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => onItemChange(exp.id)}
            className={`w-full text-left p-4 rounded-2xl transition-all duration-300 ${
              activeId === exp.id
                ? 'bg-themeRed/10 border-2 border-themeRed shadow-md dark:bg-themeRed/20 dark:border-themeRed/60'
                : 'bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm dark:hover:shadow-slate-700/20'
            }`}
          >
            <p className={`font-semibold text-sm transition-colors duration-300 ${
              activeId === exp.id 
                ? 'text-themeRed dark:text-themeRed' 
                : 'text-slate-900 dark:text-white'
            }`}>
              {exp.company}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1 transition-colors duration-300">
              {exp.role}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 transition-colors duration-300">
              {exp.date}
            </p>
          </motion.button>
        ))}
      </div>
    </div>

    {/* Experience Details */}
    <div className="lg:w-2/3">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeExperience.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-white/80 dark:border-slate-700/80 h-full transition-colors duration-300"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
            <div>
              <h4 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                {activeExperience.role}
              </h4>
              <p className="text-themeRed font-semibold transition-colors duration-300">
                @{activeExperience.company}
              </p>
            </div>
            <span className="px-4 py-1.5 bg-gray-100 dark:bg-slate-700/50 rounded-full text-sm text-gray-600 dark:text-slate-300 font-medium whitespace-nowrap transition-colors duration-300">
              {activeExperience.date}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 mb-5 transition-colors duration-300">
            <MapPin className="w-4 h-4" />
            <span>{activeExperience.location}</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-slate-300 leading-relaxed mb-6 text-sm md:text-base transition-colors duration-300">
            {activeExperience.description}
          </p>

          {/* Skills */}
          {activeExperience.skills && activeExperience.skills.length > 0 && (
            <div>
              <h5 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm transition-colors duration-300">
                Technologies & Tools
              </h5>
              <div className="flex flex-wrap gap-2">
                {activeExperience.skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="px-3 py-1.5 bg-themeRed/10 dark:bg-themeRed/20 text-themeRed dark:text-themeRed/90 rounded-full text-xs md:text-sm font-medium border border-themeRed/20 dark:border-themeRed/30 transition-colors duration-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
</div>
  );
};

export default WorkExperience;
