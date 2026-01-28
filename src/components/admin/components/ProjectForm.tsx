/**
 * Project Form Component
 * Reusable form for creating and editing projects
 * Handles all project fields with validation
 */

import React, { useState, useEffect } from 'react';
import { Project, ProjectCategory, ProjectTier, ProjectType, DifficultyLevel } from '../../../lib/types/Project_Section';

interface ProjectFormProps {
  initialData?: Project;
  onSubmit: (data: Omit<Project, 'id'> | Partial<Project>) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  mode: 'create' | 'edit';
}

const CATEGORIES: ProjectCategory[] = ['web-dev', 'machine-learning', 'data-analyst'];
const TIERS: ProjectTier[] = ['flagship', 'major', 'standard', 'experimental'];
const PROJECT_TYPES: ProjectType[] = ['case-study', 'client', 'personal', 'Academic', 'Hackathon'];
const DIFFICULTY_LEVELS: DifficultyLevel[] = [1, 2, 3, 4, 5];

export const ProjectForm: React.FC<ProjectFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
  mode = 'create',
}) => {
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    slug: initialData?.slug || '',
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || 'web-dev',
    tags: initialData?.tags || [],
    image: initialData?.image || '',
    images: initialData?.images || [],
    featured: initialData?.featured || false,
    links: initialData?.links || { github: '', demo: '', live: '' },
    videos: initialData?.videos || [],
    documentation: initialData?.documentation || '',
    tier: initialData?.tier || 'standard',
    impactScore: initialData?.impactScore || 10,
    projectType: initialData?.projectType || 'personal',
    difficulty: initialData?.difficulty || 3,
    isNew: initialData?.isNew || false,
    isTrending: initialData?.isTrending || false,
    createdAt: initialData?.createdAt || new Date().toISOString().split('T')[0],
    completedAt: initialData?.completedAt || null,
  });

  // Manual project ID for file uploads
  const [manualProjectId, setManualProjectId] = useState(initialData?.id || '');

  const [tagInput, setTagInput] = useState('');
  const [imageInput, setImageInput] = useState('');
  const [videoInput, setVideoInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Upload states
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  // Auto-generate slug when title changes
  useEffect(() => {
    if (mode === 'create' && formData.title) {
      const slug = generateSlug(formData.title);
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, mode]);

  // Upload file utility
  const uploadFile = async (file: File, fileType: 'image' | 'gallery' | 'documentation') => {
    const uploadKey = `${fileType}-${Date.now()}`;
    
    try {
      setUploading(prev => ({ ...prev, [uploadKey]: true }));
      setUploadProgress(prev => ({ ...prev, [uploadKey]: 0 }));
      
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('projectId', manualProjectId || 'temp');
      uploadFormData.append('slug', formData.slug || 'new-project');
      uploadFormData.append('fileType', fileType);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const result = await response.json();
      setUploadProgress(prev => ({ ...prev, [uploadKey]: 100 }));
      
      return result.filePath;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    } finally {
      setUploading(prev => ({ ...prev, [uploadKey]: false }));
      setTimeout(() => {
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[uploadKey];
          return newProgress;
        });
      }, 2000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      links: {
        ...prev.links,
        [name]: value,
      },
    }));
  };

  const addTag = () => {
    if (tagInput.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...new Set([...prev.tags, tagInput.trim()])],
      }));
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag),
    }));
  };

  const addImage = () => {
    if (imageInput.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images || [], imageInput.trim()],
      }));
      setImageInput('');
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || [],
    }));
  };

  const addVideo = () => {
    if (videoInput.trim()) {
      setFormData(prev => ({
        ...prev,
        videos: [...prev.videos || [], videoInput.trim()],
      }));
      setVideoInput('');
    }
  };

  const removeVideo = (index: number) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos?.filter((_, i) => i !== index) || [],
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.image.trim()) newErrors.image = 'Main image is required';
    if (formData.impactScore < 1 || formData.impactScore > 20) newErrors.impactScore = 'Impact score must be between 1-20';
    
    // Validate project ID for new projects
    if (mode === 'create' && !manualProjectId.trim()) {
      newErrors.projectId = 'Project ID is required for new projects';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Include manual project ID for new projects
      const projectData = mode === 'create' && manualProjectId.trim()
        ? { ...formData, id: manualProjectId }
        : formData;
      
      await onSubmit(projectData);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        {mode === 'create' ? 'Create New Project' : 'Edit Project'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Project title"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } dark:bg-gray-800 dark:text-white`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {mode === 'create' ? 'Slug (auto-generated)' : 'Project Slug'}
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="project-slug"
              className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:text-white ${
                mode === 'create' ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed opacity-75' : ''
              }`}
              disabled={mode === 'create'}
            />
            {mode === 'create' && (
              <p className="text-xs text-gray-500 mt-1">Automatically generated from title</p>
            )}
          </div>
        </div>

        {/* Project ID (for new projects only) */}
        {mode === 'create' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Project ID *
            </label>
            <input
              type="text"
              value={manualProjectId}
              onChange={(e) => setManualProjectId(e.target.value)}
              placeholder="e.g., 11, 12, etc."
              className={`w-full max-w-xs px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                errors.projectId ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } dark:bg-gray-800 dark:text-white`}
            />
            {errors.projectId && <p className="text-red-500 text-sm mt-1">{errors.projectId}</p>}
            <p className="text-xs text-gray-500 mt-1">
              This ID will be used for organizing uploaded files in folders like "ID.slug/"
            </p>
          </div>
        )}

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Detailed project description"
            rows={4}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
              errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } dark:bg-gray-800 dark:text-white`}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Category, Tier, Type */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:text-white"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tier
            </label>
            <select
              name="tier"
              value={formData.tier}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:text-white"
            >
              {TIERS.map(tier => (
                <option key={tier} value={tier}>
                  {tier}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Project Type
            </label>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:text-white"
            >
              {PROJECT_TYPES.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Images & Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Main Image URL *
            </label>
            <div className="space-y-2">
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="/Projects/image.png"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.image ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } dark:bg-gray-800 dark:text-white`}
              />
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">or</span>
                <label className="cursor-pointer px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition">
                  📁 Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        try {
                          const filePath = await uploadFile(file, 'image');
                          setFormData(prev => ({ ...prev, image: filePath }));
                        } catch (error) {
                          alert('Failed to upload image');
                        }
                      }
                    }}
                  />
                </label>
                {Object.values(uploading).some(Boolean) && (
                  <span className="text-xs text-blue-500">Uploading...</span>
                )}
              </div>
            </div>
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Documentation URL
            </label>
            <div className="space-y-2">
              <input
                type="text"
                name="documentation"
                value={formData.documentation}
                onChange={handleChange}
                placeholder="/Projects/docs.pdf"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:text-white"
              />
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">or</span>
                <label className="cursor-pointer px-3 py-1 bg-purple-500 text-white text-sm rounded hover:bg-purple-600 transition">
                  📄 Upload Document
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        try {
                          const filePath = await uploadFile(file, 'documentation');
                          setFormData(prev => ({ ...prev, documentation: filePath }));
                        } catch (error) {
                          alert('Failed to upload document');
                        }
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Project Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="url"
              name="github"
              placeholder="GitHub URL"
              value={formData.links?.github || ''}
              onChange={handleLinkChange}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:text-white"
            />
            <input
              type="url"
              name="demo"
              placeholder="Demo URL"
              value={formData.links?.demo || ''}
              onChange={handleLinkChange}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:text-white"
            />
            <input
              type="url"
              name="live"
              placeholder="Live URL"
              value={formData.links?.live || ''}
              onChange={handleLinkChange}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tags
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              placeholder="Add a tag"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:text-white"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm flex items-center gap-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Gallery Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Gallery Images
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
              placeholder="Image URL"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:text-white"
            />
            <button
              type="button"
              onClick={addImage}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Add URL
            </button>
            <label className="cursor-pointer px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
              📁 Upload
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={async (e) => {
                  const files = Array.from(e.target.files || []);
                  for (const file of files) {
                    try {
                      const filePath = await uploadFile(file, 'gallery');
                      setFormData(prev => ({
                        ...prev,
                        images: [...(prev.images || []), filePath]
                      }));
                    } catch (error) {
                      alert(`Failed to upload ${file.name}`);
                    }
                  }
                }}
              />
            </label>
          </div>
          
          {/* Upload Progress Indicators */}
          {Object.entries(uploadProgress).map(([key, progress]) => (
            <div key={key} className="mb-2">
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                <span>Uploading...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ))}
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {formData.images?.map((img, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm"
              >
                <span className="truncate text-gray-700 dark:text-gray-300">{img}</span>
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Videos */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Video URLs
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="url"
              value={videoInput}
              onChange={(e) => setVideoInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addVideo())}
              placeholder="YouTube or video URL"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:text-white"
            />
            <button
              type="button"
              onClick={addVideo}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Add
            </button>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {formData.videos?.map((video, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm"
              >
                <span className="truncate text-gray-700 dark:text-gray-300">{video}</span>
                <button
                  type="button"
                  onClick={() => removeVideo(idx)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Impact Score (1-20)
            </label>
            <input
              type="number"
              name="impactScore"
              value={formData.impactScore}
              onChange={handleChange}
              min="1"
              max="20"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                errors.impactScore ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } dark:bg-gray-800 dark:text-white`}
            />
            {errors.impactScore && <p className="text-red-500 text-sm mt-1">{errors.impactScore}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Difficulty Level
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:text-white"
            >
              {DIFFICULTY_LEVELS.map(level => (
                <option key={level} value={level}>
                  {level} - {level === 1 ? 'Beginner' : level === 2 ? 'Easy' : level === 3 ? 'Medium' : level === 4 ? 'Hard' : 'Expert'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Created Date
            </label>
            <input
              type="date"
              name="createdAt"
              value={formData.createdAt}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* Completed Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Completed Date
            </label>
            <input
              type="date"
              name="completedAt"
              value={formData.completedAt || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div></div>
        </div>

        {/* Status Flags */}
        <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Status Flags</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleCheckChange}
                className="w-4 h-4 rounded cursor-pointer"
              />
              <span className="text-gray-700 dark:text-gray-300">Featured Project</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isNew"
                checked={formData.isNew}
                onChange={handleCheckChange}
                className="w-4 h-4 rounded cursor-pointer"
              />
              <span className="text-gray-700 dark:text-gray-300">Mark as New</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isTrending"
                checked={formData.isTrending}
                onChange={handleCheckChange}
                className="w-4 h-4 rounded cursor-pointer"
              />
              <span className="text-gray-700 dark:text-gray-300">Mark as Trending</span>
            </label>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : mode === 'create' ? 'Create Project' : 'Update Project'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
