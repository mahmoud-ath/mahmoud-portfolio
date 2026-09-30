import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, Outlet, useParams, useNavigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
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
import { DarkModeProvider } from './contexts/DarkModeContext';
import { useSeo } from './lib/hooks/useSeo';

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

// Per-route SEO metadata
const SEO = {
  home: {
    title: 'Mahmoud El Gharib — AI & Data Science',
    description:
      'AI & Data Science portfolio of Mahmoud El Gharib — machine learning, data analytics, NLP/RAG, and full-stack software development with real project case studies.',
    path: '/',
  },
  projects: {
    title: 'Projects — Mahmoud El Gharib',
    description:
      'Explore the projects of Mahmoud El Gharib — machine learning, data science, data analytics, NLP/RAG, and full-stack web development case studies.',
    path: '/projects',
  },
  blog: {
    title: 'Blog — Mahmoud El Gharib',
    description:
      'Articles and insights from Mahmoud El Gharib on AI, machine learning, data science, and software engineering.',
    path: '/blog',
  },
};

// Applies per-route <title>, canonical URL, description, and Open Graph tags
const SeoTag: React.FC<{ seo: { title: string; description?: string; path: string } }> = ({ seo }) => {
  useSeo(seo);
  return null;
};

// Project detail route — keeps the existing prop-based component untouched
const ProjectDetailRoute: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  if (!slug) return <Navigate to="/projects" replace />;
  return (
    <>
      <SeoTag
        seo={{
          title: 'Project Case Study — Mahmoud El Gharib',
          description:
            'A project case study by Mahmoud El Gharib — machine learning, data science, and full-stack engineering.',
          path: `/projects/${slug}`,
        }}
      />
      <Suspense fallback={<PageLoader />}>
        <ProjectDetail
          slug={slug}
          onBack={() => navigate('/projects')}
          onProjectSelect={(s) => navigate(`/projects/${s}`)}
        />
      </Suspense>
    </>
  );
};

// Blog detail route — keeps the existing prop-based component untouched
const BlogDetailRoute: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  if (!slug) return <Navigate to="/blog" replace />;
  return (
    <>
      <SeoTag
        seo={{
          title: 'Blog Article — Mahmoud El Gharib',
          description:
            'An article by Mahmoud El Gharib on AI, data science, and software engineering.',
          path: `/blog/${slug}`,
        }}
      />
      <Suspense fallback={<PageLoader />}>
        <BlogDetail slug={slug} onBack={() => navigate('/blog')} />
      </Suspense>
    </>
  );
};

// Home page — sections loaded synchronously for instant FCP
const HomePage: React.FC = () => (
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

// Layout for all public pages (header + side elements + routed content)
const PublicLayout: React.FC = () => (
  <>
    <Header />
    <SideElements />
    <main>
      <Outlet />
    </main>
  </>
);

const App: React.FC = () => {
  return (
    <DarkModeProvider>
      <div className="bg-themeLight min-h-screen font-sans text-themeDark selection:bg-themeRed/30 selection:text-themeDark dark:bg-themeDark dark:text-themeLight">
        <Preloader />
        <CustomCursor />

        <Routes>
          {/* Private admin — no header / side elements */}
          <Route path="/admin" element={<Suspense fallback={<PageLoader />}><AdminPage /></Suspense>} />

          {/* Public pages */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<><SeoTag seo={SEO.home} /><HomePage /></>} />
            <Route path="/projects" element={<><SeoTag seo={SEO.projects} /><Suspense fallback={<PageLoader />}><ProjectsPage /></Suspense></>} />
            <Route path="/projects/:slug" element={<ProjectDetailRoute />} />
            <Route path="/blog" element={<><SeoTag seo={SEO.blog} /><Suspense fallback={<PageLoader />}><BlogPage /></Suspense></>} />
            <Route path="/blog/:slug" element={<BlogDetailRoute />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>

        {/* Loading overlay (simulated) */}
        <div className="fixed inset-0 bg-themeLight z-[100] pointer-events-none opacity-0 transition-opacity duration-1000 dark:bg-themeDark" id="loader">
          {/* Loader logic would go here if needed, but we'll keep it simple */}
        </div>

        {/* Vercel Analytics */}
        <Analytics />
        <SpeedInsights />
      </div>
    </DarkModeProvider>
  );
};

export default App;