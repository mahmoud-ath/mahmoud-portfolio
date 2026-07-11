# Portfolio — Overview

**Mahmoud EL GHARIB** — AI & Data Science Specialist portfolio built with React + TypeScript + Vite.

## Tech Stack
- **Frontend**: React 19, TypeScript 5.8, Vite 6.2, Tailwind CSS 4
- **Animation**: Framer Motion 12, GSAP 3, Motion 12
- **Icons**: Lucide React
- **UI**: Radix UI (ScrollArea, Separator, Slot, Tabs), shadcn/ui
- **Analytics**: Vercel Analytics
- **Backend**: Bun runtime (API server on port 3001)
- **Data**: Static `projects.json` + `blogs.json` with dynamic CRUD via admin dashboard
- **Environment**: `.env.local` for `GEMINI_API_KEY` (used in build)

## Key Directories
| Path | Purpose |
|---|---|
| `src/components/` | UI components (layout, sections, admin, effects) |
| `src/components/section/blog/` | Blog listing, detail, dashboard pages |
| `src/components/admin/` | Admin login, project & blog CRUD forms |
| `src/lib/` | Data, API clients, hooks, utils, types |
| `src/archive/chatbot/` | Archived legacy chatbot (rule-based, replaced) |
| `api/` | Vercel serverless API handler (production) |
| `api-server.js` | Bun API server (dev) — projects + blogs CRUD + uploads |
| `public/data/` | `projects.json` + `blogs.json` — dynamic storage |
| `public/Projects/` | Uploaded project media (images, videos, docs) |
| `public/blog/` | Uploaded blog cover images |
| `public/CV/`, `Experience/`, `Skills/`, `General/` | Static assets |

## Run Commands
```bash
bun run dev           # Vite dev server (port 3004)
bun run dev:server    # Bun API server (port 3001)
bun run dev:all       # Both together
bun run build         # Production build
```
