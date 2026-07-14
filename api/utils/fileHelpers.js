/**
 * File & Directory Helpers
 * Functions for generating project folder names, creating directory structures,
 * and saving uploaded files to the correct location.
 */

import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECTS_ROOT = join(__dirname, '..', '..', 'public', 'Projects');

/**
 * Generate project folder name from ID and slug (e.g. "10.dragon-tasks")
 */
export function generateProjectFolderName(projectId, slug) {
  return `${projectId}.${slug}`;
}

/**
 * Create the full directory tree for a project (images/, videos/, docs/)
 */
export function createProjectDirectories(projectId, slug) {
  const folderName = generateProjectFolderName(projectId, slug);
  const basePath = join(PROJECTS_ROOT, folderName);

  if (!existsSync(basePath)) {
    mkdirSync(basePath, { recursive: true });
  }

  for (const sub of ['images', 'videos', 'docs']) {
    const subPath = join(basePath, sub);
    if (!existsSync(subPath)) {
      mkdirSync(subPath, { recursive: true });
    }
  }

  return basePath;
}

/**
 * Map a fileType string to its target subfolder name.
 */
function targetDirForType(fileType) {
  switch (fileType) {
    case 'image':
    case 'gallery':
      return 'images';
    case 'video':
      return 'videos';
    case 'doc':
    case 'documentation':
      return 'docs';
    default:
      throw new Error(`Invalid file type: ${fileType}`);
  }
}

/**
 * Save a file buffer to the correct project subfolder.
 * Returns the public-facing relative path (e.g. /Projects/10.slug/images/photo.jpg).
 */
export function saveUploadedFile(fileBuffer, fileName, projectId, slug, fileType) {
  const folder = generateProjectFolderName(projectId, slug);
  const subDir = targetDirForType(fileType);
  const targetDir = join(PROJECTS_ROOT, folder, subDir);

  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
  }

  const filePath = join(targetDir, fileName);
  writeFileSync(filePath, fileBuffer);

  return `/Projects/${folder}/${subDir}/${fileName}`;
}

/**
 * Ensure a directory exists, creating it recursively if needed.
 */
export function ensureDir(dirPath) {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
}
