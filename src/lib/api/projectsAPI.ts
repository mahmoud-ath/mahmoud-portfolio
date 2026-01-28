/**
 * Project API Service
 * Client-side operations for project management with real file persistence
 * Compatible with Vite development server and production deployment
 */

import { Project } from '../types/Project_Section';

const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3001/api' : '/api';

/**
 * Load projects from JSON file via API
 */
async function loadProjectsFromAPI(): Promise<Project[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading projects from API:', error);
    
    // Fallback to direct JSON fetch
    try {
      const response = await fetch('/data/projects.json');
      if (response.ok) {
        return await response.json();
      }
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError);
    }
    
    return [];
  }
}

/**
 * Get all projects
 */
export async function getAllProjects(): Promise<Project[]> {
  return loadProjectsFromAPI();
}

/**
 * Get project by ID
 */
export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching project by ID:', error);
    
    // Fallback to getting all projects and filtering
    const allProjects = await getAllProjects();
    return allProjects.find(p => p.id === id) || null;
  }
}

/**
 * Create a new project
 */
export async function createProject(projectData: Omit<Project, 'id'>): Promise<Project> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating project:', error);
    throw new Error('Failed to create project');
  }
}

/**
 * Update an existing project
 */
export async function updateProject(id: string, updates: Partial<Project>): Promise<Project> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Project with id ${id} not found`);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
}

/**
 * Delete a project
 */
export async function deleteProject(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Project with id ${id} not found`);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
}

/**
 * Update multiple projects at once (for batch operations)
 */
export async function updateProjectsBatch(newProjects: Project[]): Promise<Project[]> {
  try {
    // For now, we'll update each project individually
    // In the future, you could add a batch endpoint to the API
    const updatePromises = newProjects.map(project => 
      updateProject(project.id, project)
    );
    
    return await Promise.all(updatePromises);
  } catch (error) {
    console.error('Error in batch update:', error);
    throw error;
  }
}

/**
 * Default export for backward compatibility
 */
export default {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  updateProjectsBatch,
};