# Projects Dashboard

## Features
- **Grid/List views** — toggleable display modes
- **Category filters** — web-dev, machine-learning, data-analyst
- **Search** — by title/description
- **Sort** — date (newest/oldest), name (asc/desc), impact (high/low)
- **Analytics tab** — total count, featured count, avg impact score, by category/tier, GitHub stats
- **GitHub integration** — repo stats cards for linked projects

## Project Hierarchy System
Each project has a **tier** and **metadata** for sorting:

| Tier | Priority | Description |
|---|---|---|
| `flagship` | 1 | Best work, featured prominently |
| `major` | 2 | Significant projects |
| `standard` | 3 | Regular projects |
| `experimental` | 4 | Side experiments |

**Default sort**: tier → impactScore → date

## Project Interface (`src/lib/types/Project_Section.ts`)
Key fields:
- `id`, `slug` — identity
- `title`, `description`, `category` — basics
- `tags`, `image`, `images` — media
- `videos: string[]`, `documentation?: string` — multimedia
- `links: { github?, demo?, live? }` — external links
- `tier: ProjectTier`, `impactScore: 1-20` — hierarchy
- `projectType`, `difficulty: 1-5` — context
- `featured`, `isNew`, `isTrending` — status flags
- `createdAt`, `completedAt` — dates

## Key Hooks & Utils
| File | Purpose |
|---|---|
| `src/lib/hooks/useProjectFilter.ts` | Filtering, search & sort logic |
| `src/lib/hooks/useProjectStats.ts` | Statistics calculation |
| `src/lib/hooks/useGitHubStats.ts` | GitHub repository stats fetching |
| `src/lib/utils/projectUtils.ts` | Slug generation, date formatting, featured filtering, similarity |
| `src/lib/data/projects/projectConfig.ts` | Categories, tiers, types, difficulty config constants |
| `src/lib/api/projectsAPI.ts` | Client-side API calls (CRUD) with fallback to static JSON |
