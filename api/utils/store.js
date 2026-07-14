/**
 * JSON File Store
 * Generic read/write helpers for the project's JSON data files.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_DIR = join(__dirname, '..', '..', 'public', 'data');

/* ── Generic helpers ── */

function resolvePath(filename) {
  return join(DATA_DIR, filename);
}

export function readJSON(filename) {
  try {
    const filePath = resolvePath(filename);
    if (!existsSync(filePath)) return [];
    return JSON.parse(readFileSync(filePath, 'utf-8'));
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return [];
  }
}

export function writeJSON(filename, data) {
  try {
    const dir = DATA_DIR;
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(resolvePath(filename), JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
    return false;
  }
}

/* ── Domain-specific aliases ── */

export function readProjects() {
  return readJSON('projects.json');
}

export function writeProjects(projects) {
  return writeJSON('projects.json', projects);
}

export function readBlogs() {
  return readJSON('blogs.json');
}

export function writeBlogs(blogs) {
  return writeJSON('blogs.json', blogs);
}

/* ── ID generation ── */

export function generateNextId(items) {
  const maxId = items.reduce((max, item) => {
    const num = parseInt(item.id, 10);
    return isNaN(num) ? max : Math.max(max, num);
  }, 0);
  return (maxId + 1).toString();
}
