/**
 * Consolidated Bun API Server
 * Handles project CRUD operations, file uploads, batch updates, and health checks
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to data files
const projectsPath = join(__dirname, 'public', 'data', 'projects.json');
const blogsPath = join(__dirname, 'public', 'data', 'blogs.json');

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

/* ── Blog Helpers ── */

function readBlogsFromFile() {
  try {
    if (!existsSync(blogsPath)) {
      return [];
    }
    const data = readFileSync(blogsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading blogs.json:', error);
    return [];
  }
}

function writeBlogsToFile(blogs) {
  try {
    const dir = dirname(blogsPath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(blogsPath, JSON.stringify(blogs, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing blogs.json:', error);
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

      // Route: PUT /api/projects/batch - Batch update projects
      if (req.method === 'PUT' && path === '/api/projects/batch') {
        const updates = await req.json();
        const projectsToBatch = readProjectsFromFile();

        for (const [id, updateData] of Object.entries(updates)) {
          const index = projectsToBatch.findIndex(p => p.id === id);
          if (index !== -1) {
            projectsToBatch[index] = {
              ...projectsToBatch[index],
              ...updateData,
              id: projectsToBatch[index].id,
            };
          }
        }

        if (writeProjectsToFile(projectsToBatch)) {
          console.log(`✅ Batch updated ${Object.keys(updates).length} projects`);
          return new Response(
            JSON.stringify({ success: true, data: projectsToBatch, message: 'Projects batch updated successfully' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        } else {
          return new Response(
            JSON.stringify({ error: 'Failed to batch update projects' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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

      // Route: POST /api/upload/blog - Upload blog image
      if (req.method === 'POST' && path === '/api/upload/blog') {
        const formData = await req.formData();
        const file = formData.get('file');
        const slug = formData.get('slug') || 'new-post';

        if (!file) {
          return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        const blogDir = join(__dirname, 'public', 'blog');
        if (!existsSync(blogDir)) mkdirSync(blogDir, { recursive: true });

        const ext = file.name.split('.').pop() || 'jpg';
        const fileName = `${slug}.${ext}`;
        const filePath = join(blogDir, fileName);
        const fileBuffer = Buffer.from(await file.arrayBuffer());
        writeFileSync(filePath, fileBuffer);

        console.log(`✅ Uploaded blog image: ${fileName}`);
        return new Response(JSON.stringify({ success: true, filePath: `/blog/${fileName}`, fileName }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      // Route: POST /api/create-project-folders - Create folder structure for a project
      if (req.method === 'POST' && path === '/api/create-project-folders') {
        const { projectId, slug } = await req.json();

        if (!projectId || !slug) {
          return new Response(
            JSON.stringify({ error: 'Project ID and slug are required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        } catch (error) {
          console.error('Directory creation error:', error);
          return new Response(
            JSON.stringify({ error: 'Failed to create project directories' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      }

      /* ── Blog Routes ── */

      // GET /api/blogs or GET /api/blogs/:id
      if (req.method === 'GET' && path.startsWith('/api/blogs')) {
        const blogs = readBlogsFromFile();
        const idMatch = path.match(/\/api\/blogs\/(.+)/);
        if (idMatch) {
          const id = idMatch[1];
          const blog = blogs.find(b => b.id === id);
          if (!blog) {
            return new Response(JSON.stringify({ error: 'Blog not found' }), { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
          }
          return new Response(JSON.stringify(blog), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }
        return new Response(JSON.stringify(blogs), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      // POST /api/blogs - Create new blog
      if (req.method === 'POST' && path === '/api/blogs') {
        const allBlogs = readBlogsFromFile();
        const newBlog = await req.json();
        if (newBlog.id && newBlog.id.toString().trim()) {
          const idExists = allBlogs.some(b => b.id === newBlog.id.toString());
          if (idExists) {
            return new Response(JSON.stringify({ error: `Blog ID ${newBlog.id} already exists` }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
          }
          newBlog.id = newBlog.id.toString();
        } else {
          const maxId = allBlogs.reduce((max, b) => { const n = parseInt(b.id); return isNaN(n) ? max : Math.max(max, n); }, 0);
          newBlog.id = (maxId + 1).toString();
        }
        newBlog.date = new Date().toISOString().split('T')[0];
        allBlogs.push(newBlog);
        if (writeBlogsToFile(allBlogs)) {
          console.log(`✅ Created blog: ${newBlog.title} (ID: ${newBlog.id})`);
          return new Response(JSON.stringify(newBlog), { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }
        return new Response(JSON.stringify({ error: 'Failed to save blog' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      // PUT /api/blogs/:id - Update existing blog
      if (req.method === 'PUT' && path.startsWith('/api/blogs/')) {
        const idMatch = path.match(/\/api\/blogs\/(.+)/);
        if (!idMatch) return new Response(JSON.stringify({ error: 'Blog ID required' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        const id = idMatch[1];
        const updates = await req.json();
        const blogsToUpdate = readBlogsFromFile();
        const blogIndex = blogsToUpdate.findIndex(b => b.id === id);
        if (blogIndex === -1) return new Response(JSON.stringify({ error: 'Blog not found' }), { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        blogsToUpdate[blogIndex] = { ...blogsToUpdate[blogIndex], ...updates, id };
        if (writeBlogsToFile(blogsToUpdate)) {
          console.log(`✅ Updated blog: ${blogsToUpdate[blogIndex].title}`);
          return new Response(JSON.stringify(blogsToUpdate[blogIndex]), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }
        return new Response(JSON.stringify({ error: 'Failed to update blog' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      // DELETE /api/blogs/:id - Delete blog
      if (req.method === 'DELETE' && path.startsWith('/api/blogs/')) {
        const idMatch = path.match(/\/api\/blogs\/(.+)/);
        if (!idMatch) return new Response(JSON.stringify({ error: 'Blog ID required' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        const id = idMatch[1];
        const blogsToDelete = readBlogsFromFile();
        const blogToDelete = blogsToDelete.find(b => b.id === id);
        if (!blogToDelete) return new Response(JSON.stringify({ error: 'Blog not found' }), { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        const filtered = blogsToDelete.filter(b => b.id !== id);
        if (writeBlogsToFile(filtered)) {
          console.log(`🗑️  Deleted blog: ${blogToDelete.title}`);
          return new Response(JSON.stringify({ message: 'Blog deleted successfully' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }
        return new Response(JSON.stringify({ error: 'Failed to delete blog' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      // Route: GET /api/health - Health check
      if (req.method === 'GET' && path === '/api/health') {
        return new Response(
          JSON.stringify({ status: 'ok', server: 'Bun API Server', uptime: process.uptime() }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
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
console.log(`📁 Blogs file: ${blogsPath}`);