import React, { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/layout/Header';
import Hero from './components/section/Hero';
import SideElements from './components/layout/SideElements';
import Skills from './components/section/Skills';
import Experience from './components/section/experience/ExperienceTabs';
import Projects from './components/section/Projects';
import Services from './components/section/Services';
import Blog from './components/section/Blog';
import BlogPage from './components/section/blog/BlogPage';
import BlogDetail from './components/section/blog/BlogDetail';
import Contact from './components/section/Contact';
import CustomCursor from './components/effect-animation/CustomCursor';
import ChatbotContainer from './components/chatbot/ChatbotContainer';
// import BottomNav from './components/layout/BottomNav';
import ProjectsPage from './components/section/projects/ProjectsPage';
import ProjectDetail from './components/section/projects/ProjectDetail';
import AdminPage from './components/admin/pages/AdminPage';
import { SITE_CONFIG } from './config';
import { DarkModeProvider } from './contexts/DarkModeContext';

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
      return <AdminPage />;
    }

    if (currentPage === 'projects') {
      return <ProjectsPage />;
    }

    if (currentPage === 'blog') {
      return <BlogPage />;
    }

    if (typeof currentPage === 'object' && currentPage.type === 'project') {
      return (
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
      );
    }

    if (typeof currentPage === 'object' && currentPage.type === 'blog') {
      return (
        <BlogDetail
          slug={currentPage.slug}
          onBack={() => {
            window.location.hash = '#/blog';
          }}
        />
      );
    }

    // Home page
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
        <CustomCursor />
        {currentPage !== 'admin' && <Header />}
        {currentPage !== 'admin' && <SideElements />}
        {currentPage !== 'admin' && <ChatbotContainer />}
        {/* <BottomNav /> */}

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