/**
 * Blog Routes (Bun Server)
 * CRUD operations for blog posts via the local Bun API server.
 */

import { json, error } from '../middleware/cors.js';
import { readBlogs, writeBlogs, generateNextId } from '../utils/store.js';

/**
 * GET /api/blogs or GET /api/blogs/:id
 */
function handleGet(path) {
  const blogs = readBlogs();
  const idMatch = path.match(/\/api\/blogs\/(.+)/);

  if (idMatch) {
    const blog = blogs.find(b => b.id === idMatch[1]);
    if (!blog) return error('Blog not found', 404);
    return json(blog);
  }

  return json(blogs);
}

/**
 * POST /api/blogs — Create a new blog post.
 */
async function handleCreate(req) {
  const all = readBlogs();
  const newBlog = await req.json();

  if (newBlog.id && String(newBlog.id).trim()) {
    const exists = all.some(b => b.id === String(newBlog.id));
    if (exists) return error(`Blog ID ${newBlog.id} already exists`, 400);
    newBlog.id = String(newBlog.id);
  } else {
    newBlog.id = generateNextId(all);
  }

  newBlog.date = new Date().toISOString().split('T')[0];
  all.push(newBlog);

  if (!writeBlogs(all)) return error('Failed to save blog');
  console.log(`✅ Created blog: ${newBlog.title} (ID: ${newBlog.id})`);
  return json(newBlog, 201);
}

/**
 * PUT /api/blogs/:id — Update an existing blog post.
 */
async function handleUpdate(req, id) {
  const all = readBlogs();
  const idx = all.findIndex(b => b.id === id);
  if (idx === -1) return error('Blog not found', 404);

  const updates = await req.json();
  all[idx] = { ...all[idx], ...updates, id };

  if (!writeBlogs(all)) return error('Failed to update blog');
  console.log(`✅ Updated blog: ${all[idx].title}`);
  return json(all[idx]);
}

/**
 * DELETE /api/blogs/:id — Delete a blog post.
 */
function handleDelete(id) {
  const all = readBlogs();
  const target = all.find(b => b.id === id);
  if (!target) return error('Blog not found', 404);

  const filtered = all.filter(b => b.id !== id);
  if (!writeBlogs(filtered)) return error('Failed to delete blog');

  console.log(`🗑️  Deleted blog: ${target.title}`);
  return json({ message: 'Blog deleted successfully' });
}

/**
 * Route blog requests to the correct handler.
 * Returns null if the path doesn't match.
 */
export async function handleBlogRoute(req, path) {
  const idMatch = path.match(/\/api\/blogs\/(.+)/);
  const id = idMatch ? idMatch[1] : null;

  if (req.method === 'GET' && path.startsWith('/api/blogs')) {
    return handleGet(path);
  }

  if (req.method === 'POST' && path === '/api/blogs') {
    return handleCreate(req);
  }

  if (req.method === 'PUT' && id) {
    return handleUpdate(req, id);
  }

  if (req.method === 'DELETE' && id) {
    return handleDelete(id);
  }

  return null;
}
