# Quick Start

## Prerequisites
- Node.js 18+
- Bun (for API server)

## Setup
```bash
bun install            # Install dependencies
# Optional: create .env.local for GEMINI_API_KEY (used at build time)
```

## Run (2 Terminals)
```bash
# Terminal 1 — Vite frontend
bun run dev            # → http://localhost:3004

# Terminal 2 — Bun API server
bun run dev:server     # → http://localhost:3001
```

Or one command: `bun run dev:all`

## Admin Dashboard
- URL: `http://localhost:3004/#/admin`
- Default password: `Admin123!`
- Manage: **Projects** (CRUD) + **Blogs** (CRUD with image upload)
- Change password in `src/components/admin/components/AdminLogin.tsx`

## Build for Production
```bash
bun run build
bun run preview        # Preview build
```

## Notes
- The API server **must** be running for admin CRUD to work
- Blog images upload to `public/blog/{slug}.{ext}`
- Project media uploads to `public/Projects/{id}.{slug}/`
