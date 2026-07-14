import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { getAllProjects } from '../../../lib/api/projectsAPI';
import { getProjectBySlug, getProjectDuration, getReadingTime } from '../../../lib/utils/projectUtils';
import { Project } from '../../../lib/types/Project_Section';
import { PROJECT_CATEGORIES, PROJECT_TIERS, PROJECT_TYPES } from '../../../lib/data/projects/projectConfig';
import ProjectHeader from './detail/ProjectHeader';
import SimilarProjects from './detail/SimilarProjects';
import { ExternalLink, Github, Target, Zap, Clock, Image, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectDetailProps {
  slug: string;
  onBack: () => void;
  onProjectSelect: (slug: string) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ slug, onBack, onProjectSelect }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Load projects and find the specific one
  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        const projectsData = await getAllProjects();
        setAllProjects(projectsData);
        const foundProject = getProjectBySlug(projectsData, slug);
        setProject(foundProject || null);
        setError(null);
      } catch (err) {
        console.error('Failed to load project:', err);
        setError('Failed to load project. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="bg-themeLight dark:bg-themeDark min-h-screen flex items-center justify-center p-4 transition-colors duration-500">
        <div className="text-center px-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-themeRed mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Loading Project...</h2>
          <p className="text-gray-600 dark:text-gray-400">Please wait while we fetch the project details.</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-themeLight dark:bg-themeDark min-h-screen flex items-center justify-center p-4 transition-colors duration-500">
        <div className="text-center px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-300">Error Loading Project</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 transition-colors duration-300">{error}</p>
          <button
            onClick={onBack}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-themeRed dark:bg-themeRed text-white font-semibold rounded-xl sm:rounded-2xl text-sm sm:text-base hover:bg-green-700 dark:hover:bg-green-700 active:bg-green-800 dark:active:bg-green-800 transition-colors duration-500"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  // Project not found state
  if (!project) {
    return (
      <div className="bg-themeLight dark:bg-themeDark min-h-screen flex items-center justify-center p-4 transition-colors duration-500">
        <div className="text-center px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-300">Project Not Found</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 transition-colors duration-300">The project you're looking for doesn't exist.</p>
          <button
            onClick={onBack}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-themeRed dark:bg-themeRed text-white font-semibold rounded-xl sm:rounded-2xl text-sm sm:text-base hover:bg-green-700 dark:hover:bg-green-700 active:bg-green-800 dark:active:bg-green-800 transition-colors duration-500"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const category = project.category as keyof typeof PROJECT_CATEGORIES;
  const tier = project.tier as keyof typeof PROJECT_TIERS;
  const projectType = project.projectType as keyof typeof PROJECT_TYPES;
  const catInfo = PROJECT_CATEGORIES[category];
  const tierInfo = PROJECT_TIERS[tier];
  const typeInfo = PROJECT_TYPES[projectType];
  const duration = getProjectDuration(project.createdAt, project.completedAt);
  const readingTime = getReadingTime(project.description);
  const images = project.images || [];

  // Extract YouTube ID for video embedding
  const extractYouTubeId = (url: string): string | null => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

const scrollToTop = () => {
  const scrollStep = -window.scrollY / 15;
  
  const scrollInterval = setInterval(() => {
    if (window.scrollY !== 0) {
      window.scrollBy(0, scrollStep);
    } else {
      clearInterval(scrollInterval);
    }
  }, 15);
};

  return (
    <div className="bg-themeLight dark:bg-slate-950 min-h-screen pb-8 sm:pb-12 transition-colors duration-500">
      <div className="pt-16 sm:pt-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto pt-12">
          {/* Header with Breadcrumb */}
          <ProjectHeader project={project} />

          {/* Live Demo Button */}
          <div className="flex flex-wrap gap-3 mb-8">
            {project.links?.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-themeRed text-white font-semibold hover:bg-green-700 rounded-2xl transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white font-semibold hover:bg-gray-800 dark:hover:bg-gray-600 rounded-2xl transition-all duration-300"
              >
                <Github className="w-4 h-4" />
                View Source
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Media + Metrics Side by Side */}
      <div className="px-4 sm:px-6">
        <div className="max-w-6xl mx-auto mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left - Main Media (smaller) */}
            <div className="lg:col-span-2">
              {project.videos && project.videos.length > 0 ? (
                <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${extractYouTubeId(project.videos[0])}`}
                    title={project.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Right - Metrics */}
            <div className="lg:col-span-1 space-y-4">
              
              {/* Impact Score */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4">
                <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">Impact Score</h3>
                <div className="flex items-center justify-between mb-2">
                  <Target className="w-4 h-4 text-blue-500" />
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{project.impactScore}/20</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5">
                  <div className="bg-blue-500 dark:bg-blue-400 h-full transition-all duration-1000" style={{ width: `${(project.impactScore / 20) * 100}%` }} />
                </div>
              </div>

              {/* Difficulty */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4">
                <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">Difficulty</h3>
                <div className="flex items-center justify-between mb-2">
                  <Zap className="w-4 h-4 text-orange-500" />
                  <span className="text-xl font-bold text-orange-600 dark:text-orange-400">{project.difficulty}/5</span>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`flex-1 h-1.5 ${i < project.difficulty ? 'bg-orange-500 dark:bg-orange-400' : 'bg-gray-200 dark:bg-gray-700'}`} />
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4">
                <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">Timeline</h3>
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-green-500" />
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{duration}</span>
                </div>
                <p className="text-xs text-gray-500">{project.createdAt} → {project.completedAt || 'Ongoing'}</p>
              </div>

              {/* Category / Tier / Type / Status Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">Category</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-100 capitalize">{catInfo?.label || project.category}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">Status</p>
                  <p className="text-sm font-bold text-green-600 dark:text-green-400">{project.completedAt ? 'Completed' : 'In Progress'}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">Tier</p>
                  <p className="text-sm font-bold text-themeRed capitalize">{project.tier}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">Type</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{typeInfo?.label || project.projectType}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description + Technologies - Full Width Below */}
      <div className="px-4 sm:px-6">
        <div className="max-w-6xl mx-auto mb-12">
          <div className="space-y-6">
            
            {/* Description */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">About This Project</h2>
              <div className="text-gray-700 dark:text-gray-400 leading-relaxed prose dark:prose-invert max-w-none">
                <ReactMarkdown>{project.description}</ReactMarkdown>
              </div>
              <p className="text-xs text-gray-500 mt-3">{readingTime} min read</p>
            </div>

            {/* Technologies */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-xs font-semibold text-blue-900 dark:text-blue-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Gallery Section */}
      {images.length > 0 && (
        <div className="px-4 sm:px-6 py-8 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
              <Image className="w-6 h-6 text-themeRed" />
              Gallery
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => setLightboxIndex(idx)}
                >
                  <img
                    src={img}
                    alt={`${project.title} ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && images.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
              }}
              className="absolute left-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Image */}
          <img
            src={images[lightboxIndex]}
            alt={`${project.title} ${lightboxIndex + 1}`}
            className="max-w-[90vw] max-h-[90vh] object-contain cursor-zoom-out"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex + 1) % images.length);
              }}
              className="absolute right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}

      {/* Similar Projects Section */}
      <div className="px-4 sm:px-6 py-12 border-t border-gray-200 dark:border-gray-700" onClick={scrollToTop}>
        <div className="max-w-6xl mx-auto">
          <SimilarProjects
            currentProject={project}
            allProjects={allProjects}
            onProjectSelect={onProjectSelect}
          />
        </div>
      </div>

      {/* Back Button */}
      <div className="px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white dark:bg-gray-800 border-2 border-themeRed text-themeRed font-semibold hover:bg-themeRed/5 transition-colors duration-500"
          >
            ← Back to Projects
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
