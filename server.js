/**
 * Projects API Server
 * Node.js Express server for handling project CRUD operations
 * Run this alongside Vite dev server: node server.js
 */

import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Path to projects.json
const projectsPath = path.join(__dirname, 'public', 'data', 'projects.json');

/**
 * Read all projects from JSON file
 */
function readProjects() {
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
function writeProjects(projects) {
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
function generateId(projects) {
  const maxId = Math.max(...projects.map(p => parseInt(p.id) || 0), 0);
  return (maxId + 1).toString();
}

/**
 * Generate slug from title
 */
function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// ==================== API Routes ====================

/**
 * GET /api/projects
 * Get all projects
 */
app.get('/api/projects', (req, res) => {
  try {
    const projects = readProjects();
    res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch projects',
    });
  }
});

/**
 * GET /api/projects/:id
 * Get a single project by ID
 */
app.get('/api/projects/:id', (req, res) => {
  try {
    const { id } = req.params;
    const projects = readProjects();
    const project = projects.find(p => p.id === id);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch project',
    });
  }
});

/**
 * POST /api/projects
 * Create a new project
 */
app.post('/api/projects', (req, res) => {
  try {
    const projectData = req.body;
    const projects = readProjects();

    // Validate required fields
    if (!projectData.title || !projectData.description) {
      return res.status(400).json({
        success: false,
        error: 'Title and description are required',
      });
    }

    // Generate ID and slug
    const id = generateId(projects);
    const slug = projectData.slug || generateSlug(projectData.title);

    // Check if slug already exists
    if (projects.some(p => p.slug === slug)) {
      return res.status(400).json({
        success: false,
        error: 'A project with this slug already exists',
      });
    }

    // Create new project
    const newProject = {
      ...projectData,
      id,
      slug,
      createdAt: projectData.createdAt || new Date().toISOString().split('T')[0],
    };

    projects.push(newProject);

    if (!writeProjects(projects)) {
      return res.status(500).json({
        success: false,
        error: 'Failed to save project',
      });
    }

    res.status(201).json({
      success: true,
      data: newProject,
      message: 'Project created successfully',
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});

/**
 * PUT /api/projects/:id
 * Update an existing project
 */
app.put('/api/projects/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const projects = readProjects();
    const index = projects.findIndex(p => p.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    const project = projects[index];

    // Check if slug is being changed and already exists
    if (updates.slug && updates.slug !== project.slug) {
      if (projects.some(p => p.slug === updates.slug && p.id !== id)) {
        return res.status(400).json({
          success: false,
          error: 'A project with this slug already exists',
        });
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
      return res.status(500).json({
        success: false,
        error: 'Failed to save project',
      });
    }

    res.json({
      success: true,
      data: updatedProject,
      message: 'Project updated successfully',
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});

/**
 * DELETE /api/projects/:id
 * Delete a project
 */
app.delete('/api/projects/:id', (req, res) => {
  try {
    const { id } = req.params;
    const projects = readProjects();
    const index = projects.findIndex(p => p.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    const deletedProject = projects[index];
    projects.splice(index, 1);

    if (!writeProjects(projects)) {
      return res.status(500).json({
        success: false,
        error: 'Failed to delete project',
      });
    }

    res.json({
      success: true,
      data: deletedProject,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});

/**
 * PUT /api/projects/batch
 * Batch update projects
 */
app.put('/api/projects/batch', (req, res) => {
  try {
    const updates = req.body;
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
      return res.status(500).json({
        success: false,
        error: 'Failed to batch update projects',
      });
    }

    res.json({
      success: true,
      data: projects,
      message: 'Projects batch updated successfully',
    });
  } catch (error) {
    console.error('Error batch updating projects:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});

/**
 * Health check
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Projects API Server running on http://localhost:${PORT}`);
  console.log(`📊 Projects file: ${projectsPath}`);
});
