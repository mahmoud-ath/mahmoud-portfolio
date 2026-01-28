/**
 * Bun API Server for Admin Project Management
 * Handles project CRUD operations and file uploads
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { dirname, join, extname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to projects.json
const projectsPath = join(__dirname, 'public', 'data', 'projects.json');

/**
 * Upload Helper Functions
 */

/**
 * Generate project folder name from ID and slug
 */
function generateProjectFolderName(projectId, slug) {
  return `${projectId}.${slug}`;
}

/**
 * Create project directory structure
 */
function createProjectDirectories(projectId, slug) {
  const projectFolder = generateProjectFolderName(projectId, slug);
  const basePath = join(__dirname, 'public/Projects', projectFolder);
  
  // Create main project folder
  if (!existsSync(basePath)) {
    mkdirSync(basePath, { recursive: true });
  }
  
  // Create subfolders
  const subFolders = ['images', 'videos', 'docs'];
  subFolders.forEach(folder => {
    const folderPath = join(basePath, folder);
    if (!existsSync(folderPath)) {
      mkdirSync(folderPath, { recursive: true });
    }
  });
  
  return basePath;
}

/**
 * Save uploaded file to appropriate directory
 */
function saveUploadedFile(fileBuffer, fileName, projectId, slug, fileType) {
  const projectFolder = generateProjectFolderName(projectId, slug);
  let targetDir;
  
  // Determine target directory based on file type
  switch (fileType) {
    case 'image':
    case 'gallery':
      targetDir = 'images';
      break;
    case 'video':
      targetDir = 'videos';
      break;
    case 'doc':
    case 'documentation':
      targetDir = 'docs';
      break;
    default:
      throw new Error('Invalid file type');
  }
  
  const targetPath = join(__dirname, 'public/Projects', projectFolder, targetDir);
  
  // Ensure directory exists
  if (!existsSync(targetPath)) {
    mkdirSync(targetPath, { recursive: true });
  }
  
  // Save file
  const filePath = join(targetPath, fileName);
  writeFileSync(filePath, fileBuffer);
  
  // Return relative path for storing in database
  return `/Projects/${projectFolder}/${targetDir}/${fileName}`;
}

/**
 * Project Management Functions
 */

/**
 * Read projects from JSON file
 */
function readProjectsFromFile() {
  try {
    if (!existsSync(projectsPath)) {
      return [];
    }
    const data = readFileSync(projectsPath, 'utf-8');
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
    const dir = dirname(projectsPath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    
    writeFileSync(projectsPath, JSON.stringify(projects, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing projects.json:', error);
    return false;
  }
}

const server = Bun.serve({
  port: 3001,
  
  async fetch(req) {
    // Add CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
      return new Response(null, { 
        status: 200, 
        headers: corsHeaders 
      });
    }

    const url = new URL(req.url);
    const path = url.pathname;

    try {
      // Route: GET /api/projects or GET /api/projects/:id
      if (req.method === 'GET' && path.startsWith('/api/projects')) {
        const projects = readProjectsFromFile();
        
        // Check if requesting specific project by ID
        const idMatch = path.match(/\/api\/projects\/(.+)/);
        if (idMatch) {
          const id = idMatch[1];
          const project = projects.find(p => p.id === id);
          
          if (!project) {
            return new Response(
              JSON.stringify({ error: 'Project not found' }), 
              { 
                status: 404, 
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
              }
            );
          }
          
          return new Response(
            JSON.stringify(project), 
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        }
        
        // Return all projects
        return new Response(
          JSON.stringify(projects), 
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      // Route: POST /api/projects - Create new project
      if (req.method === 'POST' && path === '/api/projects') {
        const allProjects = readProjectsFromFile();
        const newProject = await req.json();
        
        // Use provided ID or generate new one
        if (newProject.id && newProject.id.toString().trim()) {
          // Check if ID already exists
          const idExists = allProjects.some(p => p.id === newProject.id.toString());
          if (idExists) {
            return new Response(
              JSON.stringify({ error: `Project ID ${newProject.id} already exists` }), 
              { 
                status: 400, 
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
              }
            );
          }
          newProject.id = newProject.id.toString();
        } else {
          // Generate new ID
          const maxId = allProjects.reduce((max, p) => {
            const num = parseInt(p.id);
            return isNaN(num) ? max : Math.max(max, num);
          }, 0);
          newProject.id = (maxId + 1).toString();
        }
        
        newProject.createdAt = new Date().toISOString();
        
        allProjects.push(newProject);
        
        if (writeProjectsToFile(allProjects)) {
          console.log(`✅ Created project: ${newProject.title} (ID: ${newProject.id})`);
          return new Response(
            JSON.stringify(newProject), 
            { 
              status: 201, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        } else {
          return new Response(
            JSON.stringify({ error: 'Failed to save project' }), 
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        }
      }

      // Route: PUT /api/projects/:id - Update existing project
      if (req.method === 'PUT' && path.startsWith('/api/projects/')) {
        const idMatch = path.match(/\/api\/projects\/(.+)/);
        if (!idMatch) {
          return new Response(
            JSON.stringify({ error: 'Project ID required' }), 
            { 
              status: 400, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        }
        
        const id = idMatch[1];
        const updates = await req.json();
        const projectsToUpdate = readProjectsFromFile();
        
        const projectIndex = projectsToUpdate.findIndex(p => p.id === id);
        if (projectIndex === -1) {
          return new Response(
            JSON.stringify({ error: 'Project not found' }), 
            { 
              status: 404, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        }
        
        projectsToUpdate[projectIndex] = { 
          ...projectsToUpdate[projectIndex], 
          ...updates, 
          id 
        };
        
        if (writeProjectsToFile(projectsToUpdate)) {
          console.log(`✅ Updated project: ${projectsToUpdate[projectIndex].title}`);
          return new Response(
            JSON.stringify(projectsToUpdate[projectIndex]), 
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        } else {
          return new Response(
            JSON.stringify({ error: 'Failed to update project' }), 
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        }
      }

      // Route: DELETE /api/projects/:id - Delete project
      if (req.method === 'DELETE' && path.startsWith('/api/projects/')) {
        const idMatch = path.match(/\/api\/projects\/(.+)/);
        if (!idMatch) {
          return new Response(
            JSON.stringify({ error: 'Project ID required' }), 
            { 
              status: 400, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        }
        
        const id = idMatch[1];
        const projectsToDelete = readProjectsFromFile();
        
        const projectToDelete = projectsToDelete.find(p => p.id === id);
        if (!projectToDelete) {
          return new Response(
            JSON.stringify({ error: 'Project not found' }), 
            { 
              status: 404, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        }
        
        const filteredProjects = projectsToDelete.filter(p => p.id !== id);
        
        if (writeProjectsToFile(filteredProjects)) {
          console.log(`🗑️  Deleted project: ${projectToDelete.title}`);
          return new Response(
            JSON.stringify({ message: 'Project deleted successfully' }), 
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        } else {
          return new Response(
            JSON.stringify({ error: 'Failed to delete project' }), 
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        }
      }

      // Route: POST /api/upload - Upload file
      if (req.method === 'POST' && path === '/api/upload') {
        const formData = await req.formData();
        const file = formData.get('file');
        const projectId = formData.get('projectId') || 'temp';
        const slug = formData.get('slug') || 'new-project';
        const fileType = formData.get('fileType') || 'image';
        
        if (!file) {
          return new Response(
            JSON.stringify({ error: 'No file provided' }), 
            { 
              status: 400, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        }

        // Create project directories if they don't exist
        createProjectDirectories(projectId, slug);

        // Convert file to buffer and save
        const fileBuffer = Buffer.from(await file.arrayBuffer());
        const fileName = file.name;
        
        try {
          const savedPath = saveUploadedFile(fileBuffer, fileName, projectId, slug, fileType);
          
          console.log(`✅ Uploaded ${fileType}: ${fileName} to ${savedPath}`);
          
          return new Response(
            JSON.stringify({ 
              success: true,
              filePath: savedPath,
              fileName: fileName,
              message: 'File uploaded successfully'
            }), 
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        } catch (error) {
          console.error('File save error:', error);
          return new Response(
            JSON.stringify({ error: 'Failed to save file' }), 
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        }
      }

      // 404 for unknown routes
      return new Response(
        JSON.stringify({ error: 'Not Found' }), 
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );

    } catch (error) {
      console.error('API Error:', error);
      return new Response(
        JSON.stringify({ error: 'Internal Server Error' }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
  },
});

console.log(`🚀 Bun Admin API Server running on http://localhost:${server.port}`);
console.log(`📁 Projects file: ${projectsPath}`);