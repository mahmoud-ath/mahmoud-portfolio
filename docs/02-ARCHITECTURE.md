# Architecture

## High-Level Data Flow
```
Vite Dev Server (:3004) ←→ Bun API Server (:3001) ←→ public/data/projects.json
       ↓
React App (hash-based routing)
       ↓
Components ← hooks ← API service (projectsAPI.ts)
```

## Hash Routing
- `/#` — Home page (Hero, Skills, Experience, Projects, Testimonials, Contact)
- `/#/projects` — Full project listing with filters/grid/list views
- `/#/projects/{slug}` — Project detail page
- `/#/admin` — Admin dashboard (password protected)

## Layers
| Layer | Location | Responsibility |
|---|---|---|
| UI | `src/components/section/` | React components per section |
| Admin | `src/components/admin/` | Admin login, dashboard, project form |
| Chatbot | `src/components/chatbot/` | Hybrid intent+search chatbot |
| State | `src/contexts/` | Dark mode context |
| Data | `src/lib/data/` | Static portfolio data (skills, experience, etc.) |
| API | `src/lib/api/` | Client-side API service |
| Hooks | `src/lib/hooks/` | Project filtering, stats, admin auth |
| Utils | `src/lib/utils/` | Helpers, project utils, iconify, lazy loading |
| Types | `src/lib/types/` | TypeScript interfaces |
| Services | `src/services/` | Project service, category registry, filtering pipeline |

## Data Sources
- **Static**: `src/lib/data/*.ts` — skills, experience, testimonials, social links
- **Dynamic**: `public/data/projects.json` — projects managed via admin dashboard
- **Vercel (production)**: `api/projects.js` — serverless CRUD handler
