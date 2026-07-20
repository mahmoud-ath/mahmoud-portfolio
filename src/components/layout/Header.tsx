import React, { useState, useEffect, useCallback } from 'react';
import { X, Home, Briefcase, Code2, BookOpen, FileText, Moon, Sun, Palette, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from '../../contexts/DarkModeContext';

const ACCENT = "#3fb950";
const NAV_ITEMS = [
  { id: 'home',     icon: <Home size={15} />,      label: 'Home',     href: '#home' },
  { id: 'projects', icon: <Briefcase size={15} />, label: 'Projects', href: '#projects' },
  { id: 'services', icon: <Code2 size={15} />,     label: 'Services', href: '#services' },
  { id: 'blog',     icon: <BookOpen size={15} />,   label: 'Blog', href: '#blog' },
  { id: 'contact',  icon: <FileText size={15} />,   label: 'Contact',  href: '#contact' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'projects' | 'blog'>('home');
  const { isDarkMode, darkModeStyle, toggleDarkMode, cycleDarkStyle } = useDarkMode();

  // ── Scroll detection ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Hash routing ──
  useEffect(() => {
    const parse = () => {
      const raw = window.location.hash.slice(1);
      const hasSlash = raw.startsWith('/');
      const parts = raw.split('/').filter(Boolean);
      if (parts.length === 0 || parts[0] === 'home') setCurrentPage('home');
      else if (parts[0] === 'projects') setCurrentPage('projects');
      else if (parts[0] === 'blog' && hasSlash && parts.length === 1) setCurrentPage('blog');
      else setCurrentPage('home');
    };
    parse();
    window.addEventListener('hashchange', parse);
    return () => window.removeEventListener('hashchange', parse);
  }, []);

  // ── Scroll-based active section ──
  useEffect(() => {
    if (currentPage !== 'home') return;
    const onScroll = () => {
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= 120 && r.bottom >= 120) { setActiveSection(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [currentPage]);

  // ── Navigation handler ──
  const handleNavClick = useCallback((e: React.MouseEvent, id: string) => {
    if (currentPage !== 'home') {
      e.preventDefault();
      window.location.hash = '#home';
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
      return;
    }
    // Double-click → dashboard
    if ((id === 'projects' || id === 'blog') && activeSection === id) {
      e.preventDefault();
      window.location.hash = id === 'projects' ? '#/projects' : '#/blog';
    }
  }, [currentPage, activeSection]);

  const headerHeight = scrolled ? 'h-14' : 'h-16';
  const bgOpacity = scrolled ? 'bg-white/90 dark:bg-slate-950/90' : 'bg-transparent';
  const blurAmount = scrolled ? 'backdrop-blur-md' : '';

  return (
    <>
      {/* ── Desktop header ── */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 ${bgOpacity} ${blurAmount} transition-all duration-500 ${headerHeight}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-full flex items-center justify-between">
          {/* ── Logo ── */}
          <a href="#home" className="relative flex items-center gap-2 group" aria-label="Home">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
              <motion.path d="M 4,2 L 2,2 L 2,6" stroke={ACCENT} strokeWidth="1" strokeLinecap="square"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
              <motion.path d="M 32,2 L 34,2 L 34,6" stroke={ACCENT} strokeWidth="1" strokeLinecap="square"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.05 }} />
              <motion.path d="M 4,34 L 2,34 L 2,30" stroke={ACCENT} strokeWidth="1" strokeLinecap="square"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.1 }} />
              <motion.path d="M 32,34 L 34,34 L 34,30" stroke={ACCENT} strokeWidth="1" strokeLinecap="square"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.15 }} />
              <text x="18" y="24" textAnchor="middle" fontSize="16" fontWeight="700" fill="currentColor"
                className="text-slate-900 dark:text-white">M</text>
            </svg>
          </a>

          {/* ── Navigation ── */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              const isHovered = hoveredItem === item.id;
              return (
                <motion.a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative flex items-center gap-2 py-1"
                  animate={{
                    color: isActive
                      ? isDarkMode ? '#ffffff' : '#0f172a'
                      : isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
                  }}
                  whileHover={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
                  transition={{ duration: 0.25 }}
                >
                  <motion.span
                    animate={{
                      scale: isActive || isHovered ? 1 : 0.85,
                      opacity: isActive || isHovered ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    {item.icon}
                  </motion.span>
                  <span className="text-sm font-semibold tracking-wide">{item.label}</span>
                  {/* Active green dot */}
                  {isActive && (
                    <motion.span
                      layoutId="dot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ backgroundColor: ACCENT }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </motion.a>
              );
            })}
          </nav>

          {/* CV Button & Mobile Menu */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Dark Mode Toggle */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-full p-0.5 border border-slate-200 dark:border-slate-700">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isDarkMode ? 'text-slate-400' : 'bg-themeRed text-white shadow-sm'
                }`}
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
              </button>
              {isDarkMode && (
                <button
                  onClick={cycleDarkStyle}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    darkModeStyle === 'original' ? 'bg-themeRed text-white shadow-sm' : 'text-slate-400'
                  }`}
                  title={
                    darkModeStyle === 'github'
                      ? 'Switch to original dark'
                      : 'Switch to GitHub dark'
                  }
                >
                  <Palette size={16} />
                </button>
              )}
            </div>

            <motion.a
              href="/CV/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex px-4 md:px-6 py-2 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white rounded-full font-bold hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-all duration-300 text-xs md:text-sm items-center gap-2"
            >
              <FileText size={16} />
              <span className="hidden sm:block">Resume</span>
              <span className="sm:hidden">CV</span>
            </motion.a>

            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              className="p-2 text-slate-900 dark:text-white lg:hidden"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="absolute top-6 right-6 p-2 text-white/40 hover:text-white transition-colors"
            >
              <X size={28} />
            </button>

            <nav className="flex flex-col items-center gap-8">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  onClick={(e) => {
                    setIsOpen(false);
                    handleNavClick(e as any, item.id);
                  }}
                  className="flex items-center gap-4 text-3xl md:text-4xl font-light tracking-wide text-white/50 hover:text-white transition-colors duration-300"
                >
                  {item.icon && (
                    <span className="text-white/20">{item.icon}</span>
                  )}
                  {item.label}
                </motion.a>
              ))}

              <motion.a
                href="/CV/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 border-2 border-gray-300 text-gray-900 font-light tracking-wide hover:border-themeRed hover:text-themeRed hover:bg-themeRed/5 transition-all duration-300 flex items-center gap-2 dark:text-white"
              >
                <span className="text-3xl md:text-4xl">Resume</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </motion.a>
            </nav>

            {/* Bottom metadata */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-8 text-[10px] font-mono text-white/10 tracking-wider"
            >
              2026
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
