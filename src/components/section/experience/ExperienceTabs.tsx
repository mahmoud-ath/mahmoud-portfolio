'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, Award } from 'lucide-react';
import SectionHeader from '../../layout/SectionHeader';
import WorkExperience from './tabs/WorkExperience';
import Education from './tabs/Education';
import Certifications from './tabs/Certifications';
import { TabType, tabs,} from '../../../lib/types/Experience_Section';
import {experienceData, educationData, certificationsData} from '../../../lib/data/Experience';
// Icon mapping for Lucide icons
const iconComponents = {
  Briefcase,
  GraduationCap,
  Award,
} as const;

const ExperienceTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('experience');
  const [activeExperienceId, setActiveExperienceId] = useState(experienceData[0]?.id || '');
  const [activeEducationId, setActiveEducationId] = useState(educationData[0]?.id || '');
  const [activeCertificationId, setActiveCertificationId] = useState(certificationsData[0]?.id || '');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'experience':
        return (
          <WorkExperience
            data={experienceData}
            activeId={activeExperienceId}
            onItemChange={setActiveExperienceId}
          />
        );
      case 'education':
        return (
          <Education
            data={educationData}
            activeId={activeEducationId}
            onItemChange={setActiveEducationId}
          />
        );
      case 'certifications':
        return (
          <Certifications
            data={certificationsData}
            activeId={activeCertificationId}
            onItemChange={setActiveCertificationId}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section 
      id="experience" 
      className="min-h-screen flex items-center justify-center py-20 px-4 md:px-8  dark:bg-slate-950"
    >
      <div className="w-full max-w-6xl">
        <SectionHeader title="My Journey" />
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-1.5 shadow-sm border border-white/80 dark:border-slate-700/80 inline-flex">
            {tabs.map((tab) => {
              const IconComponent = iconComponents[tab.icon];
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-themeRed rounded-xl"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <IconComponent className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ExperienceTabs;
