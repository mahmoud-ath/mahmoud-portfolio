import React, { useEffect } from 'react';
import ProjectsDashboard from './ProjectsDashboard';
import ProjectDetail from './ProjectDetail';

interface ProjectsPageProps {
  view?: 'dashboard' | { type: 'detail'; slug: string };
  onViewChange?: (view: 'dashboard' | { type: 'detail'; slug: string }) => void;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ view = 'dashboard', onViewChange }) => {
  // Scroll to top when navigating to dashboard
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const handleProjectSelect = (slug: string) => {
    if (onViewChange) {
      onViewChange({ type: 'detail', slug });
    }
    window.location.hash = `#/projects/${slug}`;
  };

  const handleBack = () => {
    if (onViewChange) {
      onViewChange('dashboard');
    }
    window.location.hash = '#/projects';
  };

  if (view !== 'dashboard' && view.type === 'detail') {
    return (
      <ProjectDetail
        slug={view.slug}
        onBack={handleBack}
        onProjectSelect={handleProjectSelect}
      />
    );
  }

  return (
    <ProjectsDashboard onProjectSelect={handleProjectSelect} />
  );
};

export default ProjectsPage;
