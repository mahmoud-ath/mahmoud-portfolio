/**
 * Admin Dashboard Page
 * Complete management interface with Projects & Blogs CRUD
 */

import React, { useState, useEffect } from 'react';
import { Project } from '../../../lib/types/Project_Section';
import { BlogPost } from '../../../lib/data/blogs';
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../../../lib/api/projectsAPI';
import {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../../../lib/api/blogsAPI';
import ProjectForm from './ProjectForm';
import BlogForm from './BlogForm';
import { AlertCircle, Plus, Edit, Trash2, ChevronDown, ChevronUp, X, FileText, FolderKanban } from 'lucide-react';

type Tab = 'projects' | 'blogs';

interface AdminState {
  tab: Tab;
  projects: Project[];
  blogs: BlogPost[];
  loading: boolean;
  error: string | null;
  success: string | null;
  formMode: 'hidden' | 'create' | 'edit';
  selectedProject: Project | null;
  selectedBlog: BlogPost | null;
  filterCategory: string;
  searchQuery: string;
  sortBy: 'date' | 'title' | 'impact';
  expandedId: string | null;
}

const AdminDashboard: React.FC = () => {
  const [state, setState] = useState<AdminState>({
    tab: 'projects',
    projects: [],
    blogs: [],
    loading: true,
    error: null,
    success: null,
    formMode: 'hidden',
    selectedProject: null,
    selectedBlog: null,
    filterCategory: 'all',
    searchQuery: '',
    sortBy: 'date',
    expandedId: null,
  });

  // Fetch data on mount and tab change
  useEffect(() => {
    if (state.tab === 'projects') loadProjects();
    else loadBlogs();
  }, [state.tab]);

  // Clear success message after 5 seconds
  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        setState(prev => ({ ...prev, success: null }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state.success]);

  /* ── Projects ── */

  const loadProjects = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const projects = await getAllProjects();
      setState(prev => ({ ...prev, projects: projects || [], loading: false }));
    } catch {
      setState(prev => ({ ...prev, error: 'Failed to load projects', loading: false }));
    }
  };

  const handleCreateClick = () => {
    setState(prev => ({ ...prev, formMode: 'create', selectedProject: null, selectedBlog: null }));
  };

  const handleEditClick = (project: Project) => {
    setState(prev => ({ ...prev, formMode: 'edit', selectedProject: project, selectedBlog: null }));
  };

  const handleFormCancel = () => {
    setState(prev => ({ ...prev, formMode: 'hidden', selectedProject: null, selectedBlog: null }));
  };

  /* ── Blogs ── */

  const loadBlogs = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const blogs = await getAllBlogs();
      setState(prev => ({ ...prev, blogs: blogs || [], loading: false }));
    } catch {
      setState(prev => ({ ...prev, error: 'Failed to load blogs', loading: false }));
    }
  };

  const handleCreateBlogClick = () => {
    setState(prev => ({ ...prev, formMode: 'create', selectedBlog: null, selectedProject: null }));
  };

  const handleEditBlogClick = (blog: BlogPost) => {
    setState(prev => ({ ...prev, formMode: 'edit', selectedBlog: blog, selectedProject: null }));
  };

  /* ── Form Submit ── */

  const handleFormSubmit = async (data: any) => {
    console.log('📥 Admin received form data, links:', JSON.stringify(data.links));
    setState(prev => ({ ...prev, loading: true }));
    try {
      if (state.tab === 'projects') {
        if (state.formMode === 'create') {
          await createProject(data as Omit<Project, 'id'>);
          setState(prev => ({ ...prev, success: 'Project created successfully!' }));
        } else if (state.selectedProject) {
          await updateProject(state.selectedProject.id, data);
          setState(prev => ({ ...prev, success: 'Project updated successfully!' }));
        }
        await loadProjects();
      } else {
        if (state.formMode === 'create') {
          await createBlog(data as Omit<BlogPost, 'id'>);
          setState(prev => ({ ...prev, success: 'Blog post created successfully!' }));
        } else if (state.selectedBlog) {
          await updateBlog(state.selectedBlog.id, data);
          setState(prev => ({ ...prev, success: 'Blog post updated successfully!' }));
        }
        await loadBlogs();
      }
      // Brief pause to show success, then return to dashboard
      setTimeout(() => {
        setState(prev => ({ ...prev, formMode: 'hidden', selectedProject: null, selectedBlog: null }));
      }, 800);
    } catch (err) {
      console.error('Form submit error:', err);
      setState(prev => ({ ...prev, error: `Failed to save: ${err instanceof Error ? err.message : 'Unknown error'}` }));
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  /* ── Delete ── */

  const handleDelete = async (id: string) => {
    const label = state.tab === 'projects' ? 'project' : 'blog post';
    if (confirm(`Are you sure you want to delete this ${label}? This action cannot be undone.`)) {
      setState(prev => ({ ...prev, loading: true }));
      try {
        if (state.tab === 'projects') {
          await deleteProject(id);
          setState(prev => ({ ...prev, success: 'Project deleted successfully!' }));
          await loadProjects();
        } else {
          await deleteBlog(id);
          setState(prev => ({ ...prev, success: 'Blog post deleted successfully!' }));
          await loadBlogs();
        }
      } catch {
        setState(prev => ({ ...prev, error: `Failed to delete ${label}. Please try again.` }));
      } finally {
        setState(prev => ({ ...prev, loading: false }));
      }
    }
  };

  // Filter and sort projects
  const filteredProjects = state.projects
    .filter(p => {
      const matchesCategory = state.filterCategory === 'all' || p.category === state.filterCategory;
      const matchesSearch =
        state.searchQuery === '' ||
        p.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(state.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (state.sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'impact':
          return b.impactScore - a.impactScore;
        case 'date':
        default:
          return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
      }
    });

  /* ── Filter blogs ── */
  const filteredBlogs = state.blogs
    .filter(b => {
      if (!state.searchQuery) return true;
      const q = state.searchQuery.toLowerCase();
      return b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q);
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  /* ── Render form if in form mode ── */
  if (state.formMode !== 'hidden') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={handleFormCancel}
            className="mb-6 flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
          >
            ← Back to Dashboard
          </button>

          {/* Form-level alerts */}
          {state.error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
              <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="font-semibold text-red-800 dark:text-red-200">Error</p>
                <p className="text-red-700 dark:text-red-300 text-sm">{state.error}</p>
              </div>
              <button onClick={() => setState(prev => ({ ...prev, error: null }))} className="ml-auto text-red-500 hover:text-red-700"><X size={18} /></button>
            </div>
          )}
          {state.success && (
            <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3">
              <AlertCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="font-semibold text-green-800 dark:text-green-200">Success</p>
                <p className="text-green-700 dark:text-green-300 text-sm">{state.success}</p>
              </div>
            </div>
          )}

          {state.tab === 'projects' ? (
            <ProjectForm
              initialData={state.selectedProject || undefined}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              loading={state.loading}
              mode={state.formMode}
            />
          ) : (
            <BlogForm
              initialData={state.selectedBlog || undefined}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              loading={state.loading}
              mode={state.formMode}
            />
          )}
        </div>
      </div>
    );
  }

  /* ── Dashboard ── */
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-1 w-fit">
          <button
            onClick={() => setState(prev => ({ ...prev, tab: 'projects', searchQuery: '', expandedId: null }))}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition ${
              state.tab === 'projects'
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <FolderKanban size={16} />
            Projects
          </button>
          <button
            onClick={() => setState(prev => ({ ...prev, tab: 'blogs', searchQuery: '', expandedId: null }))}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition ${
              state.tab === 'blogs'
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <FileText size={16} />
            Blogs
          </button>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {state.tab === 'projects' ? 'Project Admin' : 'Blog Admin'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {state.tab === 'projects' ? 'Manage your portfolio projects' : 'Manage your blog posts'}
            </p>
          </div>
          <button
            onClick={state.tab === 'projects' ? handleCreateClick : handleCreateBlogClick}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
          >
            <Plus size={20} />
            Create {state.tab === 'projects' ? 'Project' : 'Blog Post'}
          </button>
        </div>

        {/* Alerts */}
        {state.error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-semibold text-red-800 dark:text-red-200">Error</p>
              <p className="text-red-700 dark:text-red-300 text-sm">{state.error}</p>
            </div>
            <button onClick={() => setState(prev => ({ ...prev, error: null }))} className="ml-auto text-red-500 hover:text-red-700"><X size={18} /></button>
          </div>
        )}
        {state.success && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3">
            <AlertCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-semibold text-green-800 dark:text-green-200">Success</p>
              <p className="text-green-700 dark:text-green-300 text-sm">{state.success}</p>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder={`Search ${state.tab === 'projects' ? 'projects' : 'blog posts'}...`}
              value={state.searchQuery}
              onChange={(e) => setState(prev => ({ ...prev, searchQuery: e.target.value }))}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white"
            />
            {state.tab === 'projects' && (
              <select
                value={state.filterCategory}
                onChange={(e) => setState(prev => ({ ...prev, filterCategory: e.target.value }))}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Categories</option>
                <option value="web-dev">Web Development</option>
                <option value="machine-learning">Machine Learning</option>
                <option value="data-analyst">Data Analysis</option>
              </select>
            )}
            <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
              {state.tab === 'projects' ? filteredProjects.length : filteredBlogs.length} {state.tab === 'projects' ? 'project' : 'post'}{state.tab === 'projects' ? (filteredProjects.length !== 1 ? 's' : '') : (filteredBlogs.length !== 1 ? 's' : '')}
            </div>
          </div>
        </div>

        {/* Loading */}
        {state.loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
          </div>
        )}

        {/* ── Projects List ── */}
        {!state.loading && state.tab === 'projects' && (
          filteredProjects.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">No projects found</p>
              {state.filterCategory !== 'all' || state.searchQuery ? (
                <button onClick={() => setState(prev => ({ ...prev, filterCategory: 'all', searchQuery: '' }))} className="text-blue-500 hover:text-blue-600">Clear filters</button>
              ) : (
                <button onClick={handleCreateClick} className="text-blue-500 hover:text-blue-600">Create your first project</button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProjects.map(project => (
                <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                  <button
                    onClick={() => setState(prev => ({ ...prev, expandedId: prev.expandedId === project.id ? null : project.id }))}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                  >
                    <div className="flex items-center gap-4 flex-1 text-left">
                      <img src={project.image} alt={project.title} className="w-12 h-12 rounded object-cover" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                        <div className="flex gap-2 mt-1">
                          <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded">{project.category}</span>
                          <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded">{project.tier}</span>
                          {project.featured && <span className="text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded">Featured</span>}
                          {project.isNew && <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded">New</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Impact: {project.impactScore}</span>
                      {state.expandedId === project.id ? <ChevronUp size={20} className="text-gray-600 dark:text-gray-400" /> : <ChevronDown size={20} className="text-gray-600 dark:text-gray-400" />}
                    </div>
                  </button>
                  {state.expandedId === project.id && (
                    <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-700/30">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Description</p>
                          <p className="text-sm text-gray-900 dark:text-white line-clamp-2">{project.description}</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm"><span className="text-gray-600 dark:text-gray-400">Difficulty:</span><span className="font-medium text-gray-900 dark:text-white">{project.difficulty}/5</span></div>
                          <div className="flex justify-between text-sm"><span className="text-gray-600 dark:text-gray-400">Type:</span><span className="font-medium text-gray-900 dark:text-white">{project.projectType}</span></div>
                          <div className="flex justify-between text-sm"><span className="text-gray-600 dark:text-gray-400">Created:</span><span className="font-medium text-gray-900 dark:text-white">{new Date(project.createdAt || '').toLocaleDateString()}</span></div>
                        </div>
                      </div>
                      {project.tags.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Tags</p>
                          <div className="flex flex-wrap gap-2">{project.tags.map(tag => (<span key={tag} className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded">{tag}</span>))}</div>
                        </div>
                      )}
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => handleEditClick(project)} className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"><Edit size={16} /> Edit</button>
                        <button onClick={() => handleDelete(project.id)} className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"><Trash2 size={16} /> Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        )}

        {/* ── Blogs List ── */}
        {!state.loading && state.tab === 'blogs' && (
          filteredBlogs.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">No blog posts found</p>
              {state.searchQuery ? (
                <button onClick={() => setState(prev => ({ ...prev, searchQuery: '' }))} className="text-blue-500 hover:text-blue-600">Clear search</button>
              ) : (
                <button onClick={handleCreateBlogClick} className="text-blue-500 hover:text-blue-600">Create your first blog post</button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBlogs.map(blog => (
                <div key={blog.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                  <button
                    onClick={() => setState(prev => ({ ...prev, expandedId: prev.expandedId === blog.id ? null : blog.id }))}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                  >
                    <div className="flex items-center gap-4 flex-1 text-left">
                      <img src={blog.image} alt={blog.title} className="w-12 h-12 rounded object-cover" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{blog.title}</h3>
                        <div className="flex gap-2 mt-1">
                          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">{blog.readTime}</span>
                          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">{new Date(blog.date).toLocaleDateString()}</span>
                          {blog.featured && <span className="text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded">Featured</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {state.expandedId === blog.id ? <ChevronUp size={20} className="text-gray-600 dark:text-gray-400" /> : <ChevronDown size={20} className="text-gray-600 dark:text-gray-400" />}
                    </div>
                  </button>
                  {state.expandedId === blog.id && (
                    <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-700/30">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Excerpt</p>
                      <p className="text-sm text-gray-900 dark:text-white line-clamp-2 mb-4">{blog.excerpt}</p>
                      {blog.tags.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Tags</p>
                          <div className="flex flex-wrap gap-2">{blog.tags.map(tag => (<span key={tag} className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded">{tag}</span>))}</div>
                        </div>
                      )}
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => handleEditBlogClick(blog)} className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"><Edit size={16} /> Edit</button>
                        <button onClick={() => handleDelete(blog.id)} className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"><Trash2 size={16} /> Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
