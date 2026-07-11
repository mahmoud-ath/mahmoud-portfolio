import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/layout/Header';
import Hero from './components/section/Hero';
import SideElements from './components/layout/SideElements';
import Skills from './components/section/Skills';
import Experience from './components/section/experience/ExperienceTabs';
import Projects from './components/section/Projects';
import Services from './components/section/Services';
import Blog from './components/section/Blog';
import Contact from './components/section/Contact';
import CustomCursor from './components/effect-animation/CustomCursor';
import Preloader from './components/effect-animation/Preloader';
import { SITE_CONFIG } from './config';
import { DarkModeProvider } from './contexts/DarkModeContext';

// Lazy-loaded route pages — reduces initial bundle by ~200KB
const BlogPage = lazy(() => import('./components/section/blog/BlogPage'));
const BlogDetail = lazy(() => import('./components/section/blog/BlogDetail'));
const ProjectsPage = lazy(() => import('./components/section/projects/ProjectsPage'));
const ProjectDetail = lazy(() => import('./components/section/projects/ProjectDetail'));
const AdminPage = lazy(() => import('./components/admin/pages/AdminPage'));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-6 h-6 border-2 border-themeRed/30 border-t-themeRed rounded-full animate-spin" />
  </div>
);

type PageType = 'home' | 'projects' | 'blog' | 'admin' | { type: 'project'; slug: string } | { type: 'blog'; slug: string };

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  // Parse hash and update page
  const parseHashAndUpdatePage = () => {
    const rawHash = window.location.hash.slice(1);
    const hasLeadingSlash = rawHash.startsWith('/');
    const pathParts = rawHash.split('/').filter(Boolean);

    if (pathParts.length === 0) {
      setCurrentPage('home');
    } else if (pathParts[0] === 'projects' && !pathParts[1]) {
      setCurrentPage('projects');
    } else if (pathParts[0] === 'projects' && pathParts[1]) {
      setCurrentPage({ type: 'project', slug: pathParts[1] });
    } else if (pathParts[0] === 'admin') {
      setCurrentPage('admin');
    } else if (pathParts[0] === 'blog' && pathParts.length === 1 && hasLeadingSlash) {
      setCurrentPage('blog');
    } else if (pathParts[0] === 'blog' && pathParts[1]) {
      setCurrentPage({ type: 'blog', slug: pathParts[1] });
    } else {
      setCurrentPage('home');
    }
  };

  // Initialize on mount and listen to hash changes
  useEffect(() => {
    parseHashAndUpdatePage();
    window.addEventListener('hashchange', parseHashAndUpdatePage);
    return () => window.removeEventListener('hashchange', parseHashAndUpdatePage);
  }, []);

  const renderPage = () => {
    if (currentPage === 'admin') {
      return <Suspense fallback={<PageLoader />}><AdminPage /></Suspense>;
    }

    if (currentPage === 'projects') {
      return <Suspense fallback={<PageLoader />}><ProjectsPage /></Suspense>;
    }

    if (currentPage === 'blog') {
      return <Suspense fallback={<PageLoader />}><BlogPage /></Suspense>;
    }

    if (typeof currentPage === 'object' && currentPage.type === 'project') {
      return (
        <Suspense fallback={<PageLoader />}>
          <ProjectDetail
            slug={currentPage.slug}
            onBack={() => {
              setCurrentPage('projects');
              window.location.hash = '#/projects';
            }}
            onProjectSelect={(slug) => {
              setCurrentPage({ type: 'project', slug });
              window.location.hash = `#/projects/${slug}`;
            }}
          />
        </Suspense>
      );
    }

    if (typeof currentPage === 'object' && currentPage.type === 'blog') {
      return (
        <Suspense fallback={<PageLoader />}>
          <BlogDetail
            slug={currentPage.slug}
            onBack={() => {
              window.location.hash = '#/blog';
            }}
          />
        </Suspense>
      );
    }

    // Home page — loaded synchronously for instant FCP
    return (
      <>
        <Hero />
       
        <Skills />
        <Experience />
        <Projects /> 
         <Services />
        <Blog />
        <Contact />
      </>
    );
  };

  return (
    <DarkModeProvider>
      <div className="bg-themeLight min-h-screen font-sans text-themeDark selection:bg-themeRed/30 selection:text-themeDark dark:bg-themeDark dark:text-themeLight">
        <Preloader />
        <CustomCursor />
        {currentPage !== 'admin' && <Header />}
        {currentPage !== 'admin' && <SideElements />}

        <main>{renderPage()}</main>

        {/* Loading overlay (simulated) */}
        <div className="fixed inset-0 bg-themeLight z-[100] pointer-events-none opacity-0 transition-opacity duration-1000 dark:bg-themeDark" id="loader">
          {/* Loader logic would go here if needed, but we'll keep it simple */}
        </div>
        
        {/* Vercel Analytics */}
        <Analytics />
      </div>
    </DarkModeProvider>
  );
};

export default App;