# 🔧 API Reference & Troubleshooting Guide

## API Reference

### Base URL
```
http://localhost:3001
```

All endpoints accept and return JSON.

---

## Endpoints

### 1. GET /api/projects
Get all projects

**Request:**
```bash
curl http://localhost:3001/api/projects
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "slug": "my-project",
      "title": "My Project",
      ...
    }
  ]
}
```

**Status Codes:**
- 200: Success
- 500: Server error

---

### 2. GET /api/projects/:id
Get a single project

**Request:**
```bash
curl http://localhost:3001/api/projects/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "slug": "my-project",
    "title": "My Project",
    ...
  }
}
```

**Status Codes:**
- 200: Success
- 404: Project not found
- 500: Server error

---

### 3. POST /api/projects
Create a new project

**Request:**
```bash
curl -X POST http://localhost:3001/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Project",
    "description": "Project description",
    "category": "web-dev",
    "tags": ["React", "TypeScript"],
    "image": "/Projects/new/image.png",
    "images": [],
    "featured": true,
    "links": {
      "github": "https://github.com/...",
      "demo": "",
      "live": ""
    },
    "videos": [],
    "documentation": "",
    "tier": "standard",
    "impactScore": 15,
    "projectType": "personal",
    "difficulty": 3,
    "isNew": true,
    "isTrending": false,
    "createdAt": "2025-01-27",
    "completedAt": "2025-01-27"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "10",
    "slug": "new-project",
    "title": "New Project",
    ...
  },
  "message": "Project created successfully"
}
```

**Status Codes:**
- 201: Created
- 400: Bad request (missing required fields)
- 500: Server error

**Required Fields:**
- title
- description
- image

---

### 4. PUT /api/projects/:id
Update an existing project

**Request:**
```bash
curl -X PUT http://localhost:3001/api/projects/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "featured": true,
    "isTrending": true
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "slug": "my-project",
    "title": "Updated Title",
    ...
  },
  "message": "Project updated successfully"
}
```

**Status Codes:**
- 200: Success
- 400: Bad request
- 404: Project not found
- 500: Server error

**Notes:**
- Only include fields you want to update
- Cannot change project ID
- Slug changes must be unique

---

### 5. DELETE /api/projects/:id
Delete a project

**Request:**
```bash
curl -X DELETE http://localhost:3001/api/projects/1 \
  -H "Content-Type: application/json"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "slug": "my-project",
    ...
  },
  "message": "Project deleted successfully"
}
```

**Status Codes:**
- 200: Success
- 404: Project not found
- 500: Server error

**Notes:**
- Deletion is permanent
- Cannot undo via API
- Files/images not deleted automatically

---

### 6. PUT /api/projects/batch
Batch update multiple projects

**Request:**
```bash
curl -X PUT http://localhost:3001/api/projects/batch \
  -H "Content-Type: application/json" \
  -d '{
    "1": {"featured": true, "isTrending": true},
    "2": {"featured": false},
    "3": {"impactScore": 20}
  }'
```

**Response:**
```json
{
  "success": true,
  "data": [...all projects...],
  "message": "Projects batch updated successfully"
}
```

**Status Codes:**
- 200: Success
- 400: Bad request
- 500: Server error

**Use Cases:**
- Reorder projects
- Update multiple projects at once
- Bulk enable/disable flags

---

## Troubleshooting

### Issue: CORS Error

**Error Message:**
```
Access to XMLHttpRequest at 'http://localhost:3001/api/projects' 
from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solutions:**
1. **Ensure server.js is running**
   ```bash
   node server.js
   # Should see: 🚀 Projects API Server running on http://localhost:3001
   ```

2. **Check if port 3001 is in use**
   ```bash
   # Windows - find what's using port 3001
   netstat -ano | findstr :3001
   
   # Mac/Linux
   lsof -i :3001
   ```

3. **Restart the server**
   ```bash
   # Kill the process (use PID from above)
   # Then restart
   node server.js
   ```

---

### Issue: 404 - Project Not Found

**When you see:** 
```json
{
  "success": false,
  "error": "Project not found"
}
```

**Solutions:**
1. Verify the project ID exists
2. Check project wasn't deleted
3. Use GET /api/projects to see all IDs
4. Make sure ID matches exactly

---

### Issue: projects.json Not Found

**When you see:**
```json
{
  "success": false,
  "error": "Failed to read projects.json"
}
```

**Solutions:**
1. Create the file manually:
   ```bash
   mkdir -p public/data
   echo [] > public/data/projects.json
   ```

2. Run the setup script:
   ```bash
   setup.bat    # Windows
   ./setup.sh   # Mac/Linux
   ```

3. Check file permissions
   ```bash
   # Mac/Linux - ensure readable/writable
   chmod 644 public/data/projects.json
   ```

---

### Issue: Form Won't Submit

**Possible Causes:**

1. **Missing required fields**
   - Check console for validation errors
   - Fill: Title, Description, and Image URL

2. **Server not running**
   ```bash
   npm run dev:server
   # or
   node server.js
   ```

3. **Bad image URL**
   - Verify image path is correct
   - Make sure it's a valid image format
   - Check image exists in /public folder

4. **Invalid JSON in projects.json**
   - Open public/data/projects.json
   - Validate JSON syntax
   - Use JSONLint.com to check

---

### Issue: Can't Login to Admin

**Solutions:**

1. **Check password**
   - Default: `Admin123!` (case-sensitive)
   - Make sure Caps Lock is off

2. **Clear localStorage**
   ```javascript
   // Open browser console (F12)
   localStorage.clear()
   // Refresh page
   ```

3. **Check for typos in code**
   - Open: `src/components/section/projects/AdminLogin.tsx`
   - Find: `const ADMIN_PASSWORD = 'Admin123!';`
   - Make sure it matches what you're entering

---

### Issue: Changes Not Appearing

**Solutions:**

1. **Refresh the page**
   - `Ctrl+R` or `Cmd+R`
   - Or `Ctrl+Shift+R` (hard refresh)

2. **Check if project is featured**
   - Only featured projects show on homepage
   - Featured flag must be checked
   - Go to /projects page to see all

3. **Verify file was saved**
   - Open: `public/data/projects.json`
   - Check if your changes are there
   - Look for your project data

4. **Check for errors**
   - Open browser console: `F12`
   - Look for red error messages
   - Check "Network" tab for failed requests

---

### Issue: Port Already in Use

**When you see:**
```
Error: listen EADDRINUSE: address already in use :::3001
```

**Solutions:**

1. **Find what's using the port**
   ```bash
   # Windows
   netstat -ano | findstr :3001
   
   # Mac/Linux
   lsof -i :3001
   ```

2. **Kill the process**
   ```bash
   # Windows (using PID from above)
   taskkill /PID <PID> /F
   
   # Mac/Linux
   kill -9 <PID>
   ```

3. **Use different port**
   - Edit `server.js`
   - Change: `const PORT = 3001;`
   - Use: `const PORT = 3002;`

---

### Issue: API Returns 400 Bad Request

**When you see:**
```json
{
  "success": false,
  "error": "Title and description are required"
}
```

**Solutions:**

1. **Check required fields**
   - Provide: title, description, image
   - All are required for new projects

2. **Validate JSON format**
   ```json
   {
     "title": "string",
     "description": "string",
     "image": "string",
     ...
   }
   ```

3. **Check data types**
   - impactScore: number (not string)
   - difficulty: number (1-5)
   - featured: boolean (true/false)

4. **Check for slug conflicts**
   - Each slug must be unique
   - Change the slug if creating duplicate

---

### Issue: Server Crashes After Creating Project

**Solutions:**

1. **Check file permissions**
   - Ensure `/public/data` is writable
   - Mac/Linux: `chmod 755 public/data`

2. **Check for disk space**
   - Ensure disk isn't full
   - Delete old data if needed

3. **Check JSON syntax**
   - Corrupt projects.json will cause crashes
   - Restore from backup if available

4. **Check for circular references**
   - Make sure no object references itself
   - Stick to the schema

---

## Common Validation Errors

| Error | Cause | Fix |
|-------|-------|-----|
| "Title is required" | Empty title field | Provide a project title |
| "Description is required" | Empty description | Write project description |
| "Main image is required" | No image URL | Add valid image path |
| "A project with this slug already exists" | Duplicate slug | Use unique slug |
| "Impact score must be between 1-20" | Score out of range | Use value 1-20 |
| "Project not found" | Invalid ID in request | Check project ID |

---

## API Testing Tools

### Using cURL
```bash
# Get all projects
curl http://localhost:3001/api/projects

# Get single project
curl http://localhost:3001/api/projects/1

# Create project (basic example)
curl -X POST http://localhost:3001/api/projects \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Test","image":"/test.png"}'
```

### Using Postman
1. Open Postman
2. Create new request
3. Set method to GET
4. Enter URL: `http://localhost:3001/api/projects`
5. Click Send

### Using VS Code REST Client
Create file: `test.http`
```http
GET http://localhost:3001/api/projects

###

POST http://localhost:3001/api/projects
Content-Type: application/json

{
  "title": "Test Project",
  "description": "A test project",
  "image": "/Projects/test/image.png"
}
```

---

## Performance Tips

1. **Minimize API calls**
   - Cache projects locally
   - Use batch endpoints

2. **Optimize images**
   - Compress before uploading
   - Use WebP format when possible

3. **Monitor file size**
   - projects.json grows with each project
   - Consider database for large portfolios

4. **Regular backups**
   - Backup projects.json regularly
   - Keep version history

---

## Security Checklist

- [ ] Change default admin password
- [ ] Use HTTPS in production
- [ ] Implement proper authentication
- [ ] Validate all inputs server-side
- [ ] Add rate limiting
- [ ] Use environment variables for secrets
- [ ] Backup data regularly
- [ ] Monitor API access logs
- [ ] Update dependencies
- [ ] Test error handling

---

## Debugging Tips

### Enable Detailed Logging
Modify `server.js`:
```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

### Check Project Data
```javascript
// In browser console
fetch('/api/projects')
  .then(r => r.json())
  .then(d => console.log(d))
```

### Monitor File Changes
```bash
# Watch projects.json for changes
# Windows: Install 'chokidar-cli' first
chokidar "public/data/projects.json" -c "echo File changed"
```

---

## Support Resources

- **Full Guide**: See `ADMIN_GUIDE.md`
- **Quick Start**: See `QUICK_START.md`
- **Implementation**: See `IMPLEMENTATION_COMPLETE.md`
- **Browser Console**: F12 for debugging
- **Network Tab**: F12 → Network to monitor API calls

---

**Last Updated**: January 27, 2025  
**Status**: ✅ Complete and Ready
