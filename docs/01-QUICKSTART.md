# Quick Start

## Prerequisites
- Node.js 18+
- Bun (for API server)

## Setup
```bash
npm install            # Install dependencies
cp .env.example .env   # Environment variables (if exists)
```

## Run (2 Terminals)
```bash
# Terminal 1 — Vite frontend
npm run dev            # → http://localhost:3004

# Terminal 2 — Bun API server
npm run dev:server     # → http://localhost:3001
```

Or one command: `npm run dev:all`

## Admin Dashboard
- URL: `http://localhost:3004/#/admin`
- Default password: `Admin123!`
- Change in `src/components/admin/components/AdminLogin.tsx`

## Build for Production
```bash
npm run build
npm run preview        # Preview build
```
