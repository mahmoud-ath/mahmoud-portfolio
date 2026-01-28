/**
 * Projects API Handler
 * Handles server-side CRUD operations for projects
 * 
 * This file works with Vite's API route handling
 * Run with: npm run dev
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { Project } from '../src/lib/types/Project_Section';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to projects.json
const projectsPath = path.join(__dirname, 'public', 'data', 'projects.json');

/**
 * Read all projects from JSON file
 */
function readProjects(): Project[] {
  try {
    if (!fs.existsSync(projectsPath)) {
      console.warn('projects.json not found, returning empty array');
      return [];
    }
    const data = fs.readFileSync(projectsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading projects.json:', error);
    return [];
  }
}

/**
 * Write projects to JSON file
 */
function writeProjects(projects: Project[]): boolean {
  try {
    // Ensure directory exists
    const dir = path.dirname(projectsPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing projects.json:', error);
    return false;
  }
}

/**
 * Generate unique ID for new projects
 */
function generateId(projects: Project[]): string {
  const maxId = Math.max(...projects.map(p => parseInt(p.id) || 0), 0);
  return (maxId + 1).toString();
}

/**
 * Generate slug from title
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * GET /api/projects
 * Get all projects
 */
export function handleGetAllProjects() {
  const projects = readProjects();
  return {
    success: true,
    data: projects,
  };
}

/**
 * GET /api/projects/:id
 * Get a single project by ID
 */
export function handleGetProjectById(id: string) {
  const projects = readProjects();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return {
      success: false,
      error: 'Project not found',
    };
  }

  return {
    success: true,
    data: project,
  };
}

/**
 * POST /api/projects
 * Create a new project
 */
export function handleCreateProject(projectData: Omit<Project, 'id'>) {
  try {
    const projects = readProjects();

    // Validate required fields
    if (!projectData.title || !projectData.description) {
      return {
        success: false,
        error: 'Title and description are required',
      };
    }

    // Generate ID and slug
    const id = generateId(projects);
    const slug = projectData.slug || generateSlug(projectData.title);

    // Check if slug already exists
    if (projects.some(p => p.slug === slug)) {
      return {
        success: false,
        error: 'A project with this slug already exists',
      };
    }

    // Create new project
    const newProject: Project = {
      ...projectData,
      id,
      slug,
      createdAt: projectData.createdAt || new Date().toISOString().split('T')[0],
    };

    projects.push(newProject);

    if (!writeProjects(projects)) {
      return {
        success: false,
        error: 'Failed to save project',
      };
    }

    return {
      success: true,
      data: newProject,
      message: 'Project created successfully',
    };
  } catch (error) {
    console.error('Error creating project:', error);
    return {
      success: false,
      error: 'Internal server error',
    };
  }
}

/**
 * PUT /api/projects/:id
 * Update an existing project
 */
export function handleUpdateProject(id: string, updates: Partial<Project>) {
  try {
    const projects = readProjects();
    const index = projects.findIndex(p => p.id === id);

    if (index === -1) {
      return {
        success: false,
        error: 'Project not found',
      };
    }

    const project = projects[index];

    // Check if slug is being changed and already exists
    if (updates.slug && updates.slug !== project.slug) {
      if (projects.some(p => p.slug === updates.slug && p.id !== id)) {
        return {
          success: false,
          error: 'A project with this slug already exists',
        };
      }
    }

    // Update project
    const updatedProject = {
      ...project,
      ...updates,
      id: project.id, // Ensure ID doesn't change
    };

    projects[index] = updatedProject;

    if (!writeProjects(projects)) {
      return {
        success: false,
        error: 'Failed to save project',
      };
    }

    return {
      success: true,
      data: updatedProject,
      message: 'Project updated successfully',
    };
  } catch (error) {
    console.error('Error updating project:', error);
    return {
      success: false,
      error: 'Internal server error',
    };
  }
}

/**
 * DELETE /api/projects/:id
 * Delete a project
 */
export function handleDeleteProject(id: string) {
  try {
    const projects = readProjects();
    const index = projects.findIndex(p => p.id === id);

    if (index === -1) {
      return {
        success: false,
        error: 'Project not found',
      };
    }

    const deletedProject = projects[index];
    projects.splice(index, 1);

    if (!writeProjects(projects)) {
      return {
        success: false,
        error: 'Failed to delete project',
      };
    }

    return {
      success: true,
      data: deletedProject,
      message: 'Project deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting project:', error);
    return {
      success: false,
      error: 'Internal server error',
    };
  }
}

/**
 * PUT /api/projects/batch
 * Batch update projects
 */
export function handleBatchUpdateProjects(updates: Record<string, Partial<Project>>) {
  try {
    const projects = readProjects();

    for (const [id, updateData] of Object.entries(updates)) {
      const index = projects.findIndex(p => p.id === id);
      if (index !== -1) {
        projects[index] = {
          ...projects[index],
          ...updateData,
          id: projects[index].id, // Ensure ID doesn't change
        };
      }
    }

    if (!writeProjects(projects)) {
      return {
        success: false,
        error: 'Failed to batch update projects',
      };
    }

    return {
      success: true,
      data: projects,
      message: 'Projects batch updated successfully',
    };
  } catch (error) {
    console.error('Error batch updating projects:', error);
    return {
      success: false,
      error: 'Internal server error',
    };
  }
}
