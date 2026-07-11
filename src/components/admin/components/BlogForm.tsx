/**
 * Blog Form Component
 * Reusable form for creating and editing blog posts
 */

import React, { useState, useEffect, useRef } from 'react';
import { BlogPost } from '../../../lib/data/blogs';
import { Upload } from 'lucide-react';

interface BlogFormProps {
  initialData?: BlogPost;
  onSubmit: (data: Omit<BlogPost, 'id'> | Partial<BlogPost>) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  mode: 'create' | 'edit';
}

const BlogForm: React.FC<BlogFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
  mode = 'create',
}) => {
  const [formData, setFormData] = useState({
    slug: initialData?.slug || '',
    title: initialData?.title || '',
    excerpt: initialData?.excerpt || '',
    image: initialData?.image || '',
    readTime: initialData?.readTime || '5 min',
    tags: initialData?.tags || [],
    content: initialData?.content?.join('\n') || '',
    featured: initialData?.featured || false,
  });

  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploadData = new FormData();
      uploadData.append('file', file);
      uploadData.append('slug', formData.slug || 'new-post');

      const res = await fetch('/api/upload/blog', {
        method: 'POST',
        body: uploadData,
      });

      if (!res.ok) throw new Error('Upload failed');

      const result = await res.json();
      setFormData(prev => ({ ...prev, image: result.filePath }));
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');

  useEffect(() => {
    if (mode === 'create' && formData.title) {
      setFormData(prev => ({ ...prev, slug: generateSlug(prev.title) }));
    }
  }, [formData.title, mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, featured: e.target.checked }));
  };

  const addTag = () => {
    if (tagInput.trim()) {
      setFormData(prev => ({ ...prev, tags: [...new Set([...prev.tags, tagInput.trim()])] }));
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const contentLines = formData.content.split('\n').filter(line => line.trim());

    const data = {
      slug: formData.slug,
      title: formData.title,
      excerpt: formData.excerpt,
      image: formData.image,
      readTime: formData.readTime,
      tags: formData.tags,
      content: contentLines,
      featured: formData.featured,
      date: initialData?.date || new Date().toISOString().split('T')[0],
    };

    await onSubmit(data);
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
      errors[field] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
    }`;

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {mode === 'create' ? 'Create New Blog Post' : 'Edit Blog Post'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className={inputClass('title')} placeholder="Blog post title" />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slug</label>
          <input type="text" name="slug" value={formData.slug} onChange={handleChange} className={inputClass('slug')} placeholder="url-friendly-slug" />
        </div>

        {/* Read Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Read Time</label>
          <input type="text" name="readTime" value={formData.readTime} onChange={handleChange} className={inputClass('readTime')} placeholder="5 min" />
        </div>

        {/* Excerpt */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Excerpt *</label>
          <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} rows={3} className={inputClass('excerpt')} placeholder="Brief description of the post..." />
          {errors.excerpt && <p className="text-red-500 text-xs mt-1">{errors.excerpt}</p>}
        </div>

        {/* Image */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image *</label>
          
          {/* Upload area */}
          <div className="flex gap-2 mb-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="blog-image-upload"
            />
            <label
              htmlFor="blog-image-upload"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition cursor-pointer text-sm"
            >
              <Upload size={16} className={uploading ? 'animate-pulse' : ''} />
              {uploading ? 'Uploading...' : 'Upload Image'}
            </label>
            <span className="text-xs text-gray-500 dark:text-gray-400 self-center">or paste URL below</span>
          </div>

          <input type="text" name="image" value={formData.image} onChange={handleChange} className={inputClass('image')} placeholder="/blog/my-post.jpg or https://..." />
          {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
          {formData.image && (
            <img src={formData.image} alt="Preview" className="mt-2 h-32 w-full object-cover rounded-lg border border-gray-200 dark:border-gray-700" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          )}
        </div>

        {/* Tags */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags</label>
          <div className="flex gap-2">
            <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }} className={inputClass('tags')} placeholder="Add a tag..." />
            <button type="button" onClick={addTag} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Add</button>
          </div>
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="text-blue-600 dark:text-blue-400 hover:text-red-500">&times;</button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content *</label>
          <textarea name="content" value={formData.content} onChange={handleChange} rows={12} className={`${inputClass('content')} font-mono text-sm`} placeholder="Each line becomes a paragraph. Use ## for headings, - for lists, etc." />
          {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Each line is a separate paragraph. Supports markdown-like syntax.</p>
        </div>

        {/* Featured */}
        <div className="md:col-span-2 flex items-center gap-3">
          <input type="checkbox" id="featured" checked={formData.featured} onChange={handleCheckChange} className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500" />
          <label htmlFor="featured" className="text-sm font-medium text-gray-700 dark:text-gray-300">Featured post</label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button type="button" onClick={onCancel} className="px-6 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition font-medium">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
          {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />}
          {mode === 'create' ? 'Create Post' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
