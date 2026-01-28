/**
 * Vercel API Route for Project Management
 * Handles CRUD operations for production deployment
 */

import fs from 'fs';
import path from 'path';

// Path to projects.json in public directory
const projectsPath = path.join(process.cwd(), 'public', 'data', 'projects.json');

/**
 * Read projects from JSON file
 */
function readProjectsFromFile() {
  try {
    if (!fs.existsSync(projectsPath)) {
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
function writeProjectsToFile(projects) {
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

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { method, query } = req;
  
  try {
    switch (method) {
      case 'GET':
        // Get all projects or single project by ID
        const projects = readProjectsFromFile();
        
        if (query.id) {
          const project = projects.find(p => p.id === query.id);
          if (!project) {
            return res.status(404).json({ error: 'Project not found' });
          }
          res.status(200).json(project);
        } else {
          res.status(200).json(projects);
        }
        break;

      case 'POST':
        // Create new project
        const allProjects = readProjectsFromFile();
        const newProject = req.body;
        
        // Generate new ID
        const maxId = allProjects.reduce((max, p) => {
          const num = parseInt(p.id);
          return isNaN(num) ? max : Math.max(max, num);
        }, 0);
        
        newProject.id = (maxId + 1).toString();
        newProject.createdAt = new Date().toISOString();
        
        allProjects.push(newProject);
        
        if (writeProjectsToFile(allProjects)) {
          res.status(201).json(newProject);
        } else {
          res.status(500).json({ error: 'Failed to save project' });
        }
        break;

      case 'PUT':
        // Update existing project
        const updates = req.body;
        const projectsToUpdate = readProjectsFromFile();
        
        const projectIndex = projectsToUpdate.findIndex(p => p.id === query.id);
        if (projectIndex === -1) {
          return res.status(404).json({ error: 'Project not found' });
        }
        
        projectsToUpdate[projectIndex] = { 
          ...projectsToUpdate[projectIndex], 
          ...updates, 
          id: query.id 
        };
        
        if (writeProjectsToFile(projectsToUpdate)) {
          res.status(200).json(projectsToUpdate[projectIndex]);
        } else {
          res.status(500).json({ error: 'Failed to update project' });
        }
        break;

      case 'DELETE':
        // Delete project
        const projectsToDelete = readProjectsFromFile();
        
        const filteredProjects = projectsToDelete.filter(p => p.id !== query.id);
        if (filteredProjects.length === projectsToDelete.length) {
          return res.status(404).json({ error: 'Project not found' });
        }
        
        if (writeProjectsToFile(filteredProjects)) {
          res.status(200).json({ message: 'Project deleted successfully' });
        } else {
          res.status(500).json({ error: 'Failed to delete project' });
        }
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}