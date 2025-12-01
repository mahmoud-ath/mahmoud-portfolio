import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Briefcase, Zap, Users, Award, FileText, Moon, Sun,BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from '../../contexts/DarkModeContext';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'projects'>('home');
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const navItems = [
    { id: 'home', icon: <Home size={20} />, label: 'Home', href: '#home' },
    { id: 'skills', icon: <BrainCircuit size={20} />, label: 'Skills', href: '#skills' },
    { id: 'experience', icon: <Briefcase size={20} />, label: 'Experience', href: '#experience' },
    { id: 'projects', icon: <Zap size={20} />, label: 'Projects', href: '#projects' },
    { id: 'reviews', icon: <Users size={20} />, label: 'Testimonials', href: '#reviews' },
    { id: 'contact', icon: <FileText size={20} />, label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const parseHashAndUpdatePage = () => {
      const hash = window.location.hash.slice(1);
      const pathParts = hash.split('/').filter(Boolean);

      if (pathParts.length === 0 || pathParts[0] === 'home') {
        setCurrentPage('home');
      } else if (pathParts[0] === 'projects') {
        setCurrentPage('projects');
      } else {
        setCurrentPage('home');
      }
    };

    parseHashAndUpdatePage();
    window.addEventListener('hashchange', parseHashAndUpdatePage);
    return () => window.removeEventListener('hashchange', parseHashAndUpdatePage);
  }, []);

  // Update active section based on scroll in home page
  useEffect(() => {
    if (currentPage !== 'home') return;

    const handleScroll = () => {
      const sections = navItems.map(item => {
        const element = document.getElementById(item.id);
        return { id: item.id, element };
      });

      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  return (
    <>
      {/* Desktop Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50 transition-colors duration-500"
      >
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-0.25 flex items-center justify-between">
         {/* Logo with Smooth Scroll */}
{/* Logo as Link */}
<motion.a
  whileHover={{ scale: 1.05 }}
  href="#home"
  className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-themeYellow dark:bg-themeRed flex items-center justify-center border-2 border-slate-900 dark:border-white transition-all duration-500 flex-shrink-0 cursor-pointer"
>
  <span className="font-bold text-slate-900 dark:text-white text-lg md:text-xl">MA</span>
</motion.a>

          {/* Navigation - Icons only, labels on hover/active - Hidden on mobile */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <motion.a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  // If on projects dashboard page, redirect to home and scroll to the section
                  if (currentPage === 'projects') {
                    e.preventDefault();
                    window.location.hash = '#home';
                    setTimeout(() => {
                      const element = document.getElementById(item.id);
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                  // If on home page, just let the default anchor link behavior work
                }}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="flex items-center gap-2 p-3 rounded-lg transition-all duration-300 group">
                  {/* Icon Container */}
                  <div className={`p-2 rounded-lg transition-colors duration-300 ${
                    activeSection === item.id 
                      ? 'bg-themeRed text-white' 
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}>
                    {item.icon}
                  </div>

                  {/* Label - Shows on hover and active */}
                  {(activeSection === item.id || hoveredItem === item.id) && (
                    <motion.span
                      initial={{ opacity: 0, width: 0, x: -10 }}
                      animate={{ opacity: 1, width: 'auto', x: 0 }}
                      exit={{ opacity: 0, width: 0, x: -10 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      className="font-semibold text-sm text-slate-900 dark:text-white whitespace-nowrap overflow-hidden transition-colors duration-300"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </div>

                {/* Animated underline - Left to Right */}
                {(activeSection === item.id || hoveredItem === item.id) && (
                  <motion.div
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-themeRed"
                  />
                )}
              </motion.a>
            ))}
          </nav>

          {/* CV Button & Mobile Menu */}
          <div className="flex items-center gap-2 md:gap-4">
            <motion.a
              href="/CV/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex px-4 md:px-6 py-2 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white rounded-full font-bold hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-all duration-300 text-xs md:text-sm items-center gap-2"
            >
              <FileText size={16} />
              <span className="hidden sm:block">Curriculum Vitae</span>
              <span className="sm:hidden">CV</span>
            </motion.a>

            <button
              onClick={() => setIsOpen(true)}
              className="p-2 text-slate-900 dark:text-white lg:hidden"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed inset-0 bg-slate-900/95 dark:bg-slate-950 backdrop-blur-lg flex flex-col items-center justify-center z-50 transition-colors duration-500"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 p-2 text-white hover:text-themeYellow transition-colors"
            >
              <X size={32} />
            </button>

            {/* Mobile Navigation Items */}
            <div className="flex flex-col items-center gap-8 w-full px-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    setIsOpen(false);
                    if (item.id === 'projects') {
                      e.preventDefault();
                      window.location.hash = '#projects';
                    } else if (item.id === 'contact') {
                      e.preventDefault();
                      if (currentPage === 'projects') {
                        window.location.hash = '#home';
                      }
                      setTimeout(() => {
                        const contactElement = document.getElementById('contact');
                        contactElement?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    } else if (currentPage === 'projects') {
                      e.preventDefault();
                      window.location.hash = '#home';
                      setTimeout(() => {
                        const element = document.getElementById(item.id);
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }
                  }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`w-full max-w-xs flex items-center gap-6 p-4 rounded-2xl transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-themeRed text-white shadow-lg'
                      : 'bg-white/10 text-white hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {/* Mobile Icon */}
                  <div className={`p-3 rounded-xl ${
                    activeSection === item.id ? 'bg-white/20' : 'bg-white/10'
                  }`}>
                    {item.icon}
                  </div>
                  
                  {/* Mobile Label */}
                  <span className="text-2xl font-heading font-bold flex-1">
                    {item.label}
                  </span>

                  {/* Active Indicator for Mobile */}
                  {activeSection === item.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 bg-white rounded-full"
                    />
                  )}
                </motion.a>
              ))}
              
              {/* Mobile CV Button */}
              <motion.a
                href="/CV/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="w-full max-w-xs px-6 py-4 border-2 border-white text-white rounded-2xl font-bold hover:bg-white hover:text-slate-900 transition-all duration-300 flex items-center justify-center gap-3 mt-4 text-lg"
              >
                <FileText size={24} />
                Curriculum Vitae
              </motion.a>

        
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;