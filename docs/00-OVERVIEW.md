# Portfolio — Overview

**Mahmoud EL GHARIB** — AI & Data Science Specialist portfolio built with React + TypeScript + Vite.

## Tech Stack
- **Frontend**: React 19, TypeScript 5.8, Vite 6.2, Tailwind CSS 4
- **Animation**: Framer Motion 12, GSAP 3, Motion 12
- **Icons**: Lucide React
- **UI**: Radix UI (ScrollArea, Separator, Slot, Tabs), shadcn/ui
- **Analytics**: Vercel Analytics
- **Backend**: Bun runtime (API server on port 3001)
- **Data**: Static `projects.json` + dynamic CRUD via admin dashboard

## Key Directories
| Path | Purpose |
|---|---|
| `src/components/` | UI components (layout, sections, admin, chatbot, effects) |
| `src/lib/` | Data, API client, hooks, utils, types |
| `api/` | Vercel serverless API handler |
| `public/data/` | `projects.json` — dynamic project storage |
| `public/Projects/` | Uploaded project media (images, videos, docs) |
| `public/CV/`, `Experience/`, `Skills/`, `General/` | Static assets |

## Run Commands
```bash
npm run dev           # Vite dev server (port 3004)
npm run dev:server    # Bun API server (port 3001)
npm run dev:all       # Both together
npm run build         # Production build
```
