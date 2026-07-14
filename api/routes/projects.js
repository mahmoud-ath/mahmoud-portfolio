/**
 * Project Routes (Bun Server)
 * CRUD operations for projects via the local Bun API server.
 */

import { json, error } from '../middleware/cors.js';
import { readProjects, writeProjects, generateNextId } from '../utils/store.js';

/**
 * GET /api/projects or GET /api/projects/:id
 */
function handleGet(path) {
  const projects = readProjects();
  const idMatch = path.match(/\/api\/projects\/(.+)/);

  if (idMatch) {
    const project = projects.find(p => p.id === idMatch[1]);
    if (!project) return error('Project not found', 404);
    return json(project);
  }

  return json(projects);
}

/**
 * POST /api/projects — Create a new project.
 */
async function handleCreate(req) {
  const all = readProjects();
  const newProject = await req.json();

  if (newProject.id && String(newProject.id).trim()) {
    const exists = all.some(p => p.id === String(newProject.id));
    if (exists) return error(`Project ID ${newProject.id} already exists`, 400);
    newProject.id = String(newProject.id);
  } else {
    newProject.id = generateNextId(all);
  }

  newProject.createdAt = new Date().toISOString();
  all.push(newProject);

  if (!writeProjects(all)) return error('Failed to save project');
  console.log(`✅ Created project: ${newProject.title} (ID: ${newProject.id})`);
  return json(newProject, 201);
}

/**
 * PUT /api/projects/:id — Update an existing project.
 */
async function handleUpdate(req, id) {
  const all = readProjects();
  const idx = all.findIndex(p => p.id === id);
  if (idx === -1) return error('Project not found', 404);

  const updates = await req.json();
  all[idx] = { ...all[idx], ...updates, id }; // preserve id

  if (!writeProjects(all)) return error('Failed to update project');
  console.log(`✅ Updated project: ${all[idx].title}`);
  return json(all[idx]);
}

/**
 * DELETE /api/projects/:id — Delete a project.
 */
function handleDelete(id) {
  const all = readProjects();
  const target = all.find(p => p.id === id);
  if (!target) return error('Project not found', 404);

  const filtered = all.filter(p => p.id !== id);
  if (!writeProjects(filtered)) return error('Failed to delete project');

  console.log(`🗑️  Deleted project: ${target.title}`);
  return json({ message: 'Project deleted successfully' });
}

/**
 * PUT /api/projects/batch — Batch update multiple projects.
 */
async function handleBatchUpdate(req) {
  const updates = await req.json();
  const all = readProjects();

  for (const [id, patch] of Object.entries(updates)) {
    const idx = all.findIndex(p => p.id === id);
    if (idx !== -1) {
      all[idx] = { ...all[idx], ...patch, id };
    }
  }

  if (!writeProjects(all)) return error('Failed to batch update projects');
  console.log(`✅ Batch updated ${Object.keys(updates).length} projects`);
  return json({ success: true, data: all, message: 'Projects batch updated successfully' });
}

/**
 * Route project requests to the correct handler.
 * Returns null if the path doesn't match.
 */
export async function handleProjectRoute(req, path) {
  // Batch update must be checked before :id route
  if (req.method === 'PUT' && path === '/api/projects/batch') {
    return handleBatchUpdate(req);
  }

  const idMatch = path.match(/\/api\/projects\/(.+)/);
  const id = idMatch ? idMatch[1] : null;

  if (req.method === 'GET' && path.startsWith('/api/projects')) {
    return handleGet(path);
  }

  if (req.method === 'POST' && path === '/api/projects') {
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
