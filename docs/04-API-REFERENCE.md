# API Reference

**Base URL**: `http://localhost:3001/api` (dev) or `/api` (production/Vercel)

All endpoints accept and return JSON. CORS enabled.

## Endpoints

### Projects
| Method | Path | Description |
|---|---|---|
| `GET` | `/api/projects` | List all projects |
| `GET` | `/api/projects/:id` | Get project by ID |
| `POST` | `/api/projects` | Create project |
| `PUT` | `/api/projects/:id` | Update project |
| `PUT` | `/api/projects/batch` | Batch update multiple projects |
| `DELETE` | `/api/projects/:id` | Delete project |

### File Management
| Method | Path | Description |
|---|---|---|
| `POST` | `/api/upload` | Upload file (multipart form: file, projectId, slug, fileType) |
| `POST` | `/api/create-project-folders` | Create project dirs (JSON: projectId, slug) |

### System
| Method | Path | Description |
|---|---|---|
| `GET` | `/api/health` | Health check |

## Response Format
```json
// Single project
{ "success": true, "data": { ...project } }

// All projects
{ "success": true, "data": [ ...projects ] }

// Error
{ "success": false, "error": "message" }
```

## Upload File Types
- `image` / `gallery` → `public/Projects/{id}.{slug}/images/`
- `video` → `public/Projects/{id}.{slug}/videos/`
- `doc` / `documentation` → `public/Projects/{id}.{slug}/docs/`

## Vercel (Production)
- `api/projects.js` handles same CRUD routes via Vercel serverless functions
- No upload support in serverless context
