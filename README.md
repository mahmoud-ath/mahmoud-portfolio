<div align="center">
  <h1>🚀 Mahmoud EL GHARIB</h1>
  <p><strong>AI & Data Science Specialist · Full-Stack Developer</strong></p>
  <p>
    <a href="https://mahmoud-portfolio.vercel.app">🌐 Live Demo</a> ·
    <a href="mailto:elgharib.mahmoud2@gmail.com">📧 Email</a> ·
    <a href="https://linkedin.com/in/mahmoud-el-gharib">💼 LinkedIn</a>
  </p>
  <p>
    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite" alt="Vite" />
    <img src="https://img.shields.io/badge/Bun-1.3-000?logo=bun" alt="Bun" />
  </p>
</div>

---

## 👀 TL;DR

**Interactive portfolio** showcasing AI/ML + full-stack projects. Built with React 19, TypeScript, Tailwind CSS 4, and Framer Motion. Features a **hash-routed admin dashboard** with live CRUD for projects & blogs via a Bun API server. Deployed on Vercel.

**[→ Live Demo](https://mahmoud-portfolio.vercel.app)**

---

## ✨ Highlights

| Feature | What it does |
|---|---|
| **Projects Dashboard** | Filterable gallery with analytics, GitHub stats, grid/list views |
| **Blog System** | Full CRUD with image upload, markdown content, featured posts |
| **Admin Panel** | Password-protected dashboard to manage projects & blogs live |
| **Dark Mode** | Auto-detects system preference, persists choice |
| **Hash Routing** | Client-side navigation (`/#/projects`, `/#/blog`, `/#/admin`, `/#/projects/{slug}`) |
| **Custom Cursor** | Animated cursor follower with hover states |
| **TrueFocus Animation** | Decrypt-style text reveal on the hero section |

> **Note:** The legacy rule-based chatbot has been archived. A new ML-powered version is planned.

---

## 🛠️ Tech Stack

```
Frontend    React 19 · TypeScript 5.8 · Vite 6 · Tailwind CSS 4
Animation   Framer Motion 12 · GSAP 3
UI          Radix UI · Lucide React · shadcn/ui
Backend     Bun · api-server.js (dev) · Vercel Serverless (prod)
Data        public/data/{projects,blogs}.json — live CRUD via admin
Analytics   Vercel Analytics
```

---

## 🚀 Quick Start

```bash
git clone https://github.com/mahmoud-ath/mahmoud-portfolio.git
cd mahmoud-portfolio
bun install
bun run dev:all     # Starts Vite (:3004) + Bun API (:3001)
```

Open `http://localhost:3004` — admin at `/#/admin` (password: `Admin123!`).

---

## 📁 Structure (top-level)

```
src/
 ├── components/
 │   ├── section/          # Hero, Skills, Experience, Projects, Blog, Contact
 │   ├── section/blog/     # BlogPage, BlogDetail, BlogGrid, BlogDashboard
 │   ├── section/projects/ # Dashboard, Detail, Filters, Analytics, GitHub stats
 │   ├── admin/            # AdminPage, AdminLogin, ProjectForm, BlogForm
 │   ├── layout/           # Header, SideElements, SectionHeader
 │   └── effect-animation/ # CustomCursor, Preloader, TrueFocus
 ├── lib/
 │   ├── api/              # projectsAPI.ts, blogsAPI.ts
 │   ├── data/             # Static data (skills, experience, social links)
 │   ├── hooks/            # useProjectFilter, useProjectStats, useGitHubStats
 │   ├── types/            # Project_Section.ts, Experience_Section.ts
 │   └── utils/            # projectUtils, blogUtils, iconify
 ├── archive/chatbot/      # Legacy rule-based chatbot (archived)
 ├── App.tsx               # Hash router + page logic
 └── config.ts             # SITE_CONFIG (name, social links, theme colors)
api/
 └── projects.js           # Vercel serverless CRUD handler (production)
api-server.js              # Bun dev server — full CRUD + file uploads
```

See [`docs/`](./docs/) for architecture, API reference, admin guide, and component details.

---

## 🤖 Architecture in 30 seconds

```
Vite (:3004)  ←→  Bun API (:3001)  ←→  public/data/{projects,blogs}.json
     │
 React App (hash-based routing)
     │
 Components ← hooks ← API clients (projectsAPI, blogsAPI)
```

- **Dev**: Vite proxies `/api/*` to `localhost:3001` (Bun)
- **Prod**: Vercel routes `/api/*` to `api/projects.js` serverless function
- **Admin**: Password-protected CRUD for projects & blogs with file uploads

---

## 🧠 Coolest Feature: The (Archived) Chatbot

The portfolio originally shipped with a **custom rule-based chatbot** that used:
- **Keyword intent matching** against 12 intents (greeting, skills, projects, etc.)
- **Document search** across 7 knowledge base sections with similarity scoring
- **4-stage pipeline**: project detection → contextual → intent → document → fallback
- **Icon-rich responses** using 22+ Lucide icons parsed from `[icon]` markers

It's preserved in [`src/archive/chatbot/`](./src/archive/chatbot/) as a reference while a new ML-powered version (RAG + LLM) is in the works.

---

## 📄 License & Contact

**MIT** — 

**Mahmoud EL GHARIB** · [elgharib.mahmoud2@gmail.com](mailto:elgharib.mahmoud2@gmail.com) · [+212 636-167511](tel:+212636167511)

| Platform | Link |
|---|---|
| GitHub | [@mahmoud-ath](https://github.com/mahmoud-ath) |
| LinkedIn | [mahmoud-el-gharib](https://linkedin.com/in/mahmoud-el-gharib) |


