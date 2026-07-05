# Projects Dashboard

## Features
- **Grid/List views** — toggleable display modes
- **Category filters** — web-dev, machine-learning, data-analyst
- **Search** — by title/description
- **Sort** — date (newest/oldest), name (asc/desc), impact (high/low)
- **Analytics sidebar** — total count, featured count, avg impact score, by category/tier

## Project Hierarchy System
Each project has a **tier** and **metadata** for sorting:

| Tier | Priority | Description |
|---|---|---|
| `flagship` | 1 | Best work, featured prominently |
| `major` | 2 | Significant projects |
| `standard` | 3 | Regular projects |
| `experimental` | 4 | Side experiments |

**Default sort**: tier → impactScore → date

## Project Interface (src/lib/types/Project_Section.ts)
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

## Key Hooks & Services
| File | Purpose |
|---|---|
| `src/lib/hooks/useProjectFilter.ts` | Filtering & search logic |
| `src/lib/hooks/useProjectStats.ts` | Statistics calculation |
| `src/lib/hooks/useProjectData.ts` | Service-based with memoization |
| `src/services/projectService.ts` | Singleton data processing with caching |
| `src/services/categoryRegistry.ts` | Dynamic category management |
| `src/services/filteringPipeline.ts` | Optimized single-pass filtering |
| `src/lib/utils/projectUtils.ts` | 15+ utility functions (slug, format, sort) |
