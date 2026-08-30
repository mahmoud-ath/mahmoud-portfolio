import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectsDashboard from './ProjectsDashboard';

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();

  // Scroll to top when navigating to the dashboard
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return <ProjectsDashboard onProjectSelect={(slug) => navigate(`/projects/${slug}`)} />;
};

export default ProjectsPage;
