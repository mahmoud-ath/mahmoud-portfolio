'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, GraduationCap, Library, Building2, MapPin, CheckCircle2, Clock } from 'lucide-react';
import { Education as EducationType } from '../../../../lib/types/Experience_Section';

interface EducationProps {
  data: EducationType[];
  activeId: string;
  onItemChange: (id: string) => void;
}

// Helper functions
const getDegreeShortName = (degree: string): string => {
  const degreeMap: { [key: string]: string } = {
    'Master': 'MSc',
    'Bachelor': 'BSc',
    'DEUST': 'DEUST',
    'High School Diploma': 'HS'
  };
  
  for (const [key, value] of Object.entries(degreeMap)) {
    if (degree.includes(key)) return value;
  }
  return degree.split(' ')[0];
};

const getEducationIcon = (degree: string) => {
  if (degree.includes('Master')) return <GraduationCap className="w-6 h-6" />;
  if (degree.includes('Bachelor')) return <BookOpen className="w-6 h-6" />;
  if (degree.includes('DEUST')) return <Library className="w-6 h-6" />;
  return <Building2 className="w-6 h-6" />;
};

const getStatusColor = (status: string): { bg: string; text: string; border: string } => {
  switch (status) {
    case 'completed':
      return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' };
    case 'in-progress':
      return { bg: 'bg-themeRed/10', text: 'text-themeRed', border: 'border-themeRed/30' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200' };
  }
};

const Education: React.FC<EducationProps> = ({ data, activeId, onItemChange }) => {
  const activeEducation = data.find(edu => edu.id === activeId) || data[0];

  return (
    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm border border-white/80 dark:border-slate-700/80 transition-colors duration-300">
      <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:gap-8">
        {/* Education Timeline - Sidebar */}
        <div className="lg:w-1/3">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-200/60 dark:border-slate-700/60 transition-colors duration-300">
            Academic Timeline
          </h3>
          <div className="space-y-2 max-h-[250px] sm:max-h-[300px] lg:max-h-[350px] overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
            {data.map((edu, idx) => {
              const statusColors = getStatusColor(edu.status);
              return (
                <motion.button
                  key={edu.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => onItemChange(edu.id)}
                  className={`w-full text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                    activeId === edu.id
                      ? 'bg-themeRed/10 dark:bg-themeRed/20 border-2 border-themeRed dark:border-themeRed/60 shadow-md'
                      : 'bg-white/50 dark:bg-slate-800/50 border border-gray-200/50 dark:border-slate-700/50 hover:border-gray-300 dark:hover:border-slate-600 hover:shadow-sm dark:hover:shadow-slate-700/20'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-gray-700 dark:text-slate-300 transition-colors duration-300 shrink-0">
                      {getEducationIcon(edu.degree)}
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium border transition-colors duration-300 shrink-0 ${
                      statusColors.bg
                    } ${statusColors.text} ${statusColors.border}`}>
                      {getDegreeShortName(edu.degree)}
                    </span>
                  </div>
                  <p className={`font-semibold text-sm transition-colors duration-300 line-clamp-2 ${
                    activeId === edu.id ? 'text-themeRed dark:text-themeRed' : 'text-gray-900 dark:text-white'
                  }`}>
                    {edu.institution}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 line-clamp-1 transition-colors duration-300">
                    {edu.field}
                  </p>
                  <div className="flex items-center justify-between mt-2 gap-2">
                    <p className="text-xs text-gray-400 dark:text-slate-500 transition-colors duration-300 truncate">
                      {edu.date}
                    </p>
                    {edu.status === 'in-progress' && (
                      <div className="flex items-center gap-1 text-xs text-themeRed font-medium transition-colors duration-300 shrink-0">
                        <Clock className="w-3 h-3" />
                        <span className="hidden sm:inline">Current</span>
                      </div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Education Details */}
        <div className="lg:w-2/3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeEducation.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-white/80 dark:border-slate-700/80 h-full transition-colors duration-300"
            >
              {/* Header */}
              <div className="flex flex-col gap-3 mb-4 sm:mb-5">
                <div>
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="text-themeRed transition-colors duration-300 shrink-0">
                      {getEducationIcon(activeEducation.degree)}
                    </div>
                    <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300 line-clamp-2">
                      {activeEducation.degree}
                    </h4>
                  </div>
                  <p className="text-themeRed font-semibold text-sm sm:text-base transition-colors duration-300 line-clamp-1">
                    @{activeEducation.institution}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-gray-100 dark:bg-slate-700/50 rounded-full text-xs sm:text-sm text-gray-600 dark:text-slate-300 font-medium whitespace-nowrap transition-colors duration-300 w-fit">
                    {activeEducation.date}
                  </span>
                  {(() => {
                    const statusColors = getStatusColor(activeEducation.status);
                    return (
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 transition-colors duration-300 w-fit ${
                        statusColors.bg
                      } ${statusColors.text} ${statusColors.border}`}>
                        {activeEducation.status === 'completed' ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" /> 
                            <span className="hidden sm:inline">Completed</span>
                            <span className="sm:hidden">Done</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3" /> 
                            <span className="hidden sm:inline">In Progress</span>
                            <span className="sm:hidden">Current</span>
                          </>
                        )}
                      </span>
                    );
                  })()}
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-slate-400 mb-4 sm:mb-5 transition-colors duration-300">
                <MapPin className="w-3 sm:w-4 h-3 sm:h-4 shrink-0" />
                <span className="truncate">{activeEducation.location}</span>
              </div>

              {/* Field of Study */}
              <div className="mb-4 sm:mb-5">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-xs sm:text-sm transition-colors duration-300">
                  Field of Study
                </h5>
                <p className="text-gray-700 dark:text-slate-300 font-medium text-sm sm:text-base transition-colors duration-300">
                  {activeEducation.field}
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-slate-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base transition-colors duration-300">
                {activeEducation.description}
              </p>

              {/* Focus Areas */}
              {activeEducation.focusAreas && activeEducation.focusAreas.length > 0 && (
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 text-xs sm:text-sm transition-colors duration-300">
                    Key Focus Areas
                  </h5>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {activeEducation.focusAreas.map((area, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="px-2 sm:px-3 py-1 sm:py-1.5 bg-themeRed/10 dark:bg-themeRed/20 text-themeRed dark:text-themeRed/90 rounded-full text-xs sm:text-sm font-medium border border-themeRed/20 dark:border-themeRed/30 transition-colors duration-300"
                      >
                        {area}
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

export default Education;
