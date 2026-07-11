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

### Blogs
| Method | Path | Description |
|---|---|---|
| `GET` | `/api/blogs` | List all blog posts |
| `GET` | `/api/blogs/:id` | Get blog post by ID |
| `POST` | `/api/blogs` | Create blog post |
| `PUT` | `/api/blogs/:id` | Update blog post |
| `DELETE` | `/api/blogs/:id` | Delete blog post |

### File Management
| Method | Path | Description |
|---|---|---|
| `POST` | `/api/upload` | Upload project file (multipart: file, projectId, slug, fileType) |
| `POST` | `/api/upload/blog` | Upload blog cover image (multipart: file, slug) |
| `POST` | `/api/create-project-folders` | Create project dirs (JSON: projectId, slug) |

### System
| Method | Path | Description |
|---|---|---|
| `GET` | `/api/health` | Health check |

## Response Format
```json
// Success
{ "success": true, "data": { ... } }

// List
[ { ...item1 }, { ...item2 } ]

// Error
{ "error": "message" }
```

## Upload File Types
- **Project**: `image` / `gallery` → `public/Projects/{id}.{slug}/images/`; `video` → `.../videos/`; `doc` / `documentation` → `.../docs/`
- **Blog**: image → `public/blog/{slug}.{ext}`

## Vercel (Production)
- `api/projects.js` handles **project** CRUD via Vercel serverless functions
- Blog CRUD is **not** available in production Vercel serverless — only via Bun dev server
- No file upload support in serverless context
