/**
 * File Upload API Handler
 * Handles uploading files to project directories
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { dirname, join, extname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

const server = Bun.serve({
  port: 3002,
  
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

      // Route: POST /api/create-project-folders - Create folder structure
      if (req.method === 'POST' && path === '/api/create-project-folders') {
        const { projectId, slug } = await req.json();
        
        if (!projectId || !slug) {
          return new Response(
            JSON.stringify({ error: 'Project ID and slug are required' }), 
            { 
              status: 400, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        }

        try {
          const projectPath = createProjectDirectories(projectId, slug);
          const projectFolder = generateProjectFolderName(projectId, slug);
          
          console.log(`✅ Created project directories: ${projectFolder}`);
          
          return new Response(
            JSON.stringify({ 
              success: true,
              projectPath: `/Projects/${projectFolder}`,
              message: 'Project directories created successfully'
            }), 
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        } catch (error) {
          console.error('Directory creation error:', error);
          return new Response(
            JSON.stringify({ error: 'Failed to create project directories' }), 
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
      console.error('Upload API Error:', error);
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

console.log(`🚀 File Upload API Server running on http://localhost:${server.port}`);
console.log(`📁 Upload directory: public/Projects/`);