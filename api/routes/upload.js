/**
 * Upload Routes
 * Handles file uploads for projects and blogs.
 */

import { join } from 'path';
import { fileURLToPath } from 'url';
import { json, error } from '../middleware/cors.js';
import { createProjectDirectories, saveUploadedFile, ensureDir } from '../utils/fileHelpers.js';

const __dirname = join(fileURLToPath(import.meta.url), '..', '..', '..');

/**
 * POST /api/upload — Upload a project file (image, doc, etc.)
 */
async function handleProjectUpload(req) {
  const formData = await req.formData();
  const file = formData.get('file');
  const projectId = formData.get('projectId') || 'temp';
  const slug = formData.get('slug') || 'new-project';
  const fileType = formData.get('fileType') || 'image';

  if (!file) {
    return error('No file provided', 400);
  }

  createProjectDirectories(projectId, slug);

  const buffer = Buffer.from(await file.arrayBuffer());
  const savedPath = saveUploadedFile(buffer, file.name, projectId, slug, fileType);

  console.log(`✅ Uploaded ${fileType}: ${file.name} → ${savedPath}`);
  return json({ success: true, filePath: savedPath, fileName: file.name });
}

/**
 * POST /api/upload/blog — Upload a blog cover image.
 */
async function handleBlogUpload(req) {
  const formData = await req.formData();
  const file = formData.get('file');
  const slug = formData.get('slug') || 'new-post';

  if (!file) {
    return error('No file provided', 400);
  }

  const blogDir = join(__dirname, 'public', 'blog');
  ensureDir(blogDir);

  const ext = file.name.split('.').pop() || 'jpg';
  const fileName = `${slug}.${ext}`;
  const filePath = join(blogDir, fileName);
  const buffer = Buffer.from(await file.arrayBuffer());

  const { writeFileSync } = await import('fs');
  writeFileSync(filePath, buffer);

  console.log(`✅ Uploaded blog image: ${fileName}`);
  return json({ success: true, filePath: `/blog/${fileName}`, fileName });
}

/**
 * POST /api/create-project-folders — Create folder structure for a project.
 */
async function handleCreateFolders(req) {
  const { projectId, slug } = await req.json();

  if (!projectId || !slug) {
    return error('Project ID and slug are required', 400);
  }

  createProjectDirectories(projectId, slug);
  const folderName = `${projectId}.${slug}`;

  console.log(`✅ Created project directories: ${folderName}`);
  return json({ success: true, projectPath: `/Projects/${folderName}` });
}

/**
 * Route upload requests to the correct handler based on path.
 */
export async function handleUploadRoute(req, path) {
  if (req.method === 'POST' && path === '/api/upload') {
    return handleProjectUpload(req);
  }

  if (req.method === 'POST' && path === '/api/upload/blog') {
    return handleBlogUpload(req);
  }

  if (req.method === 'POST' && path === '/api/create-project-folders') {
    return handleCreateFolders(req);
  }

  return null; // not an upload route
}
