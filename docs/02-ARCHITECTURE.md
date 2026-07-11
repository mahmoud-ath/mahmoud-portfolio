# Architecture

## High-Level Data Flow
```
Vite Dev Server (:3004) ←→ Bun API Server (:3001) ←→ public/data/{projects,blogs}.json
       ↓
React App (hash-based routing)
       ↓
Components ← hooks ← API services (projectsAPI.ts, blogsAPI.ts)
```

## Hash Routing
- `/#` — Home page (Hero, Skills, Experience, Projects, Services, Blog, Contact)
- `/#/projects` — Full project listing with filters/grid/list views
- `/#/projects/{slug}` — Project detail page
- `/#/blog` — Full blog listing
- `/#/blog/{slug}` — Blog detail page
- `/#/admin` — Admin dashboard (password protected)

## Layers
| Layer | Location | Responsibility |
|---|---|---|
| UI | `src/components/section/` | React components per section |
| Blog | `src/components/section/blog/` | Blog listing, detail, dashboard |
| Admin | `src/components/admin/` | Admin login, project & blog CRUD forms |
| Effects | `src/components/effect-animation/` | CustomCursor, Preloader, TrueFocus |
| State | `src/contexts/` | Dark mode context |
| Data | `src/lib/data/` | Static portfolio data (skills, experience, blogs config) |
| API | `src/lib/api/` | Client-side API services (projectsAPI, blogsAPI) |
| Hooks | `src/lib/hooks/` | Project filtering, stats, GitHub stats, section tracking |
| Utils | `src/lib/utils/` | Project utils, blog utils, iconify |
| Types | `src/lib/types/` | TypeScript interfaces (Project, Experience) |
| Archive | `src/archive/chatbot/` | Legacy rule-based chatbot (replaced) |

## Data Sources
- **Static**: `src/lib/data/*.ts` — skills, experience, social links
- **Dynamic**: `public/data/projects.json` + `public/data/blogs.json` — managed via admin dashboard
- **Production (Vercel)**: `api/projects.js` — serverless CRUD handler

## Environment Variables
- `GEMINI_API_KEY` (`.env.local`) — injected at build time via Vite define
- The dev API server (`api-server.js`) runs on port 3001; Vite proxies `/api/*` to it
