import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Image, Play, FileText } from 'lucide-react';

type TabType = 'overview' | 'gallery' | 'videos' | 'docs';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'overview' as TabType, icon: BarChart3, label: 'Overview', color: 'bg-blue-500' },
    { id: 'gallery' as TabType, icon: Image, label: 'Gallery', color: 'bg-emerald-500' },
    { id: 'videos' as TabType, icon: Play, label: 'Videos', color: 'bg-red-500' },
    { id: 'docs' as TabType, icon: FileText, label: 'Docs', color: 'bg-violet-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-16 sm:top-20 z-30 border-gray-200/60 dark:border-gray-700/60 transition-colors duration-500 px-2 sm:px-0"
    >
      <div className="flex justify-center py-2 sm:py-3">
        <div className="flex bg-gray-100/80 dark:bg-gray-700/80 rounded-full p-1 shadow-inner backdrop-blur-md border border-gray-200/50 dark:border-gray-600/50 transition-colors duration-300 w-full sm:w-auto max-w-full overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-1 sm:gap-2 min-w-[80px] sm:min-w-[100px] justify-center whitespace-nowrap flex-shrink-0 ${
                  isActive 
                    ? 'text-white' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-600/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className={`absolute inset-0 ${tab.color} rounded-full shadow-sm`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon size={14} className="relative z-10 sm:w-4 sm:h-4" />
                <span className="relative z-10 hidden xs:inline sm:inline">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default TabNavigation;