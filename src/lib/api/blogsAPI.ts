/**
 * Blog API Service
 * Client-side operations for blog management with file persistence
 */

import { BlogPost } from '../data/blogs';

const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3001/api' : '/api';

export async function getAllBlogs(): Promise<BlogPost[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error loading blogs from API:', error);
    try {
      const response = await fetch('/data/blogs.json');
      if (response.ok) return await response.json();
    } catch {}
    return [];
  }
}

export async function getBlogById(id: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog by ID:', error);
    const all = await getAllBlogs();
    return all.find(b => b.id === id) || null;
  }
}

export async function createBlog(blogData: Omit<BlogPost, 'id'>): Promise<BlogPost> {
  const response = await fetch(`${API_BASE_URL}/blogs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(blogData),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Failed to create blog');
  }
  return response.json();
}

export async function updateBlog(id: string, blogData: Partial<BlogPost>): Promise<BlogPost> {
  const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(blogData),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Failed to update blog');
  }
  return response.json();
}

export async function deleteBlog(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Failed to delete blog');
  }
}
