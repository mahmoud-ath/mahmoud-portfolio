# Portfolio Admin CMS Setup Guide

## 🚀 Quick Start

Your portfolio now has a lightweight CMS with file upload capabilities! Here's how to use it:

### Development Mode (Local)

**To run the complete admin system with file uploads, start these 3 servers:**

1. **API Server** (Terminal 1):
   ```bash
   bun run dev:api
   ```
   
2. **Upload Server** (Terminal 2):
   ```bash
   bun run dev:upload
   ```
   
3. **Main App** (Terminal 3):
   ```bash
   bun run dev
   ```

### Server Configuration
- **Main app**: `http://localhost:3004` (or next available port)
- **Admin API**: `http://localhost:3001` (project CRUD operations)
- **Upload API**: `http://localhost:3002` (file upload handling)

### What You Can Do

✅ **Add Projects**: Create new projects with all metadata  
✅ **Upload Files**: Upload images and documents directly  
✅ **Auto-Organization**: Files are organized into proper folder structure  
✅ **Edit Projects**: Update existing project information  
✅ **Delete Projects**: Remove projects from your portfolio  
✅ **Real-time Updates**: Changes appear immediately on your site  

## 📁 Automatic File Organization

When you upload files, they're automatically organized as:

```
public/
├── Projects/
│   ├── 1.project-slug/
│   │   ├── images/
│   │   │   ├── main-image.jpg
│   │   │   ├── gallery-1.jpg
│   │   │   └── gallery-2.jpg
│   │   ├── videos/
│   │   └── docs/
│   │       └── documentation.pdf
│   └── 2.another-project/
│       ├── images/
│       ├── videos/
│       └── docs/
```

### 📤 Upload Features

1. **Main Image Upload**: Click "📁 Upload Image" next to Main Image URL
2. **Gallery Images**: Click "📁 Upload" to add multiple images
3. **Documentation**: Click "📄 Upload Document" for PDF/DOC files
4. **Progress Tracking**: Visual upload progress indicators
5. **Auto-Path Generation**: File paths automatically set in form

## 🔄 Complete Workflow

### Adding a New Project:
1. Go to `http://localhost:3004/#/admin`
2. Click "Create New Project"
3. Fill in project details
4. Upload main image, gallery images, and documentation
5. Files are automatically organized and paths are set
6. Save project - appears immediately on your portfolio

### Editing Existing Projects:
1. Find project in admin dashboard
2. Click "Edit" button
3. Modify any details or upload new files
4. Files maintain the same folder structure
5. Save changes

## 🌐 Production Deployment

### Local Development → Production:
1. **Create/Edit Projects**: Use admin interface with uploads
2. **Commit Files**: Git add the new files in `public/Projects/`
3. **Commit Data**: Commit updated `projects.json`
4. **Deploy**: Push to GitHub → Vercel auto-deploys

### File Structure in Git:
```bash
git add public/Projects/*/
git add public/data/projects.json
git commit -m "Add new project with media files"
git push origin main
```

## 💡 Benefits

✅ **No External Storage**: All files stored in your project  
✅ **Version Control**: Images and docs tracked in Git  
✅ **Simple Deployment**: Works with any static hosting  
✅ **Organized Structure**: Clean, predictable folder organization  
✅ **Development Friendly**: Easy to manage locally  
✅ **Production Ready**: Same structure works everywhere  

## 🛠️ Available Scripts

- `bun run dev:api` - Start project API server
- `bun run dev:upload` - Start file upload server  
- `bun run dev` - Start main development server
- `bun run dev:admin-full` - Show instructions for full setup

## 🔧 File Upload Settings

**Supported Image Formats**: JPG, PNG, GIF, WebP, SVG  
**Supported Document Formats**: PDF, DOC, DOCX, TXT  
**Upload Location**: `public/Projects/[projectId].[slug]/[type]/`  
**Max File Size**: Limited by browser and server capacity

## 🐛 Troubleshooting

**Upload Fails**:
- Ensure upload server is running on port 3002
- Check file permissions in `public/Projects/` directory
- Verify file format is supported

**Files Not Appearing**:
- Check that files are in the correct folder structure
- Ensure project ID and slug match folder name
- Refresh browser cache

**Port Conflicts**:
- API Server: Change port in `api-server.js`
- Upload Server: Change port in `upload-server.js`
- Main App: Vite will auto-select next available port