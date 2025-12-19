import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code2, Briefcase, FileText } from 'lucide-react';

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {
  const actions = [
    { 
      icon: Brain, 
      label: 'My Skills', 
      message: 'What are your main skills?' 
    },
    { 
      icon: Code2, 
      label: 'Projects', 
      message: 'Show me your projects' 
    },
    { 
      icon: Briefcase, 
      label: 'About Me', 
      message: 'Tell me about yourself' 
    },
    { 
      icon: FileText, 
      label: 'Download CV', 
      message: 'How can I download your CV?' 
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-1.5 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg transition-colors duration-300">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onActionClick(action.message)}
            className="flex items-center justify-center gap-1.5 px-2 py-1.5 text-xs font-medium bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-slate-900 hover:text-white dark:hover:bg-slate-900 dark:hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
            title={action.message}
          >
            <Icon size={14} />
            <span className="hidden sm:inline">{action.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default QuickActions;
