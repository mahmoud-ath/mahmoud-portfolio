import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, Zap, Users, Award } from 'lucide-react';

interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  href: string;
}

const BottomNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  const navItems: NavItem[] = [
    {
      id: 'home',
      icon: <Home size={20} />,
      label: 'Home',
      href: '#home',
    },
    {
      id: 'experience',
      icon: <Briefcase size={20} />,
      label: 'Experience',
      href: '#experience',
    },
    {
      id: 'my-work',
      icon: <Zap size={20} />,
      label: 'Projects',
      href: '#my-work',
    },
    {
      id: 'reviews',
      icon: <Users size={20} />,
      label: 'Testimonials',
      href: '#reviews',
    },
    {
      id: 'certifications',
      icon: <Award size={20} />,
      label: 'Certifications',
      href: '#certifications',
    },
  ];

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => {
        const element = document.getElementById(item.id);
        return { id: item.id, element };
      });

      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          // Check if section is in view (top part of viewport)
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="fixed bottom-8 left-1/3 -translate-x-1/3 z-40"
    >
      {/* Main Navigation Container */}
      <div className="flex items-center gap-2 px-6 py-4 bg-white/20 dark:bg-slate-950/20 backdrop-blur-xl border border-white/30 dark:border-slate-700/30 rounded-full shadow-2xl hover:bg-white/25 dark:hover:bg-slate-900/25 transition-all duration-300">
        {navItems.map((item, index) => (
          <motion.a
            key={item.id}
            href={item.href}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
            title={item.label}
          >
            {/* Icon Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`relative p-3 rounded-full transition-all duration-300 flex items-center justify-center
                ${activeSection === item.id
                  ? 'text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              {/* Background highlight for active state */}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeIcon"
                  className="absolute inset-0 bg-themeRed rounded-full z-[-1]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              {/* Icon */}
              {item.icon}
            </motion.button>

            {/* Tooltip Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-mono rounded-lg whitespace-nowrap pointer-events-none"
            >
              {item.label}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-white transform rotate-45" />
            </motion.div>
          </motion.a>
        ))}
      </div>

      {/* Floating pulse effect */}
      <div className="absolute inset-0 bg-themeRed/10 rounded-full blur-2xl -z-10 animate-pulse" />
    </motion.div>
  );
};

export default BottomNav;
