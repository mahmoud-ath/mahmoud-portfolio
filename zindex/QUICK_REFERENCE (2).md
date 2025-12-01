# Quick Reference - Unified Project System

## 🎯 The One Hook You Need

```tsx
import { useProjects } from './hooks/useProjects';

const MyComponent = () => {
  const {
    projects,           // Filtered projects
    activeCategory,     // Current filter
    setActiveCategory,  // Change category
    stats,             // Project statistics
    searchProjects,    // Search function
    // ... and more
  } = useProjects(PROJECTS, { itemsPerPage: 6 });
};
```

## 📁 The One Config You Edit

**File:** `src/data/projectConfig.ts`

### Add a Category

```ts
const newCategory = {
  id: 'new-category',
  label: 'New Category Label',
  icon: SomeIcon,
  color: 'text-blue-500',
  priority: 5,
};

// Add to PROJECT_CATEGORIES array
export const PROJECT_CATEGORIES: CategoryConfig[] = [
  // ... existing categories
  newCategory,
];
```

### Get Category Info

```ts
// All utility functions auto-work with new categories:
getCategoryLabel(id)         // "New Category Label"
getCategoryIcon(id)          // SomeIcon component
getCategoryColor(id)         // "text-blue-500"
getCategoryById(id)          // Full category object
getFilterableCategories()    // All except 'signature'
getAllCategories()           // All categories
```

## 🔧 The One Component That Does Everything

**File:** `src/components/section/Projects-Unified.tsx`

### Display Modes

```tsx
// Home section (minimal)
<ProjectsUnified mode="home" itemsPerPage={3} showPagination />

// Dashboard (enhanced)
<ProjectsUnified 
  mode="dashboard" 
  showFilters 
  showStats 
/>

// Full page (complete)
<ProjectsUnified 
  mode="full" 
  showFilters 
  showStats 
  showSearch 
  showPagination 
/>
```

### All Props

```tsx
interface ProjectsProps {
  mode?: 'home' | 'dashboard' | 'full';
  itemsPerPage?: number;          // default: 6
  showFilters?: boolean;          // Show category filters
  showStats?: boolean;            // Show statistics cards
  showSearch?: boolean;           // Show search input
  showPagination?: boolean;       // Show pagination controls
  initialCategory?: string;       // default: 'signature'
}
```

## ➕ Adding Projects

**File:** `src/data/Projects.ts`

```ts
const newProject: Project = {
  id: '99',
  slug: 'unique-slug',
  title: 'Project Title',
  description: 'Description...',
  category: 'web-dev',        // Must exist in categories
  tags: ['React', 'TypeScript'],
  image: 'url',
  featured: false,
  tier: 'major',
  impactScore: 15,
  projectType: 'personal',
  difficulty: 3,
  isNew: true,
  isTrending: false,
  // optional:
  selected: true,             // For 'signature' category
  createdAt: '2024-11-28',
  completedAt: '2024-12-01',
  images: ['url1', 'url2'],
  links: { github: '...', demo: '...' },
};
```

That's it! The project appears everywhere.

## 🔍 What `useProjects` Returns

```ts
{
  // Filtering & Display
  projects,              // Filtered projects array
  allProjects,          // All unfiltered projects
  activeCategory,       // Current filter (string)
  setActiveCategory,    // Function to change filter
  
  // Statistics
  stats: {
    total,              // Total projects
    featured,           // Featured count
    trending,           // Trending count
    new,               // New count
    byCategory,        // {category: count}
    technologies,      // Unique tech count
    uniqueTags,        // [tag1, tag2, ...]
  },
  
  // Pagination
  currentPage,         // Current page number
  setCurrentPage,      // Function to change page
  totalPages,          // Total pages
  paginatedProjects,   // Current page results
  
  // Utilities
  searchProjects,           // (query) => Project[]
  getRelatedProjects,       // (id, limit?) => Project[]
  getProjectById,           // (id) => Project | undefined
  getProjectsByDifficulty,  // (difficulty) => Project[]
  getProjectsByTier,        // (tier) => Project[]
  
  // Metadata
  hasResults,          // Boolean
  categoryStats,       // {category: count}
  technologies,        // [tech1, tech2, ...]
}
```

## 🏗️ Component Usage Examples

### Home Section
```tsx
// src/components/section/Projects.tsx
import ProjectsUnified from './Projects-Unified';

const Projects = () => (
  <ProjectsUnified
    mode="home"
    itemsPerPage={3}
    showPagination
  />
);
```

### Projects Page
```tsx
// src/components/section/projects/ProjectsPage.tsx
import ProjectsUnified from '../Projects-Unified';

const ProjectsPage = () => (
  <ProjectsUnified
    mode="full"
    itemsPerPage={6}
    showFilters
    showStats
    showSearch
    showPagination
  />
);
```

### Custom Component
```tsx
import { useProjects } from './hooks/useProjects';

const MyCustomProjects = () => {
  const {
    projects,
    searchProjects,
    getRelatedProjects,
    stats,
  } = useProjects(PROJECTS);
  
  // Use however you want
  return (
    <div>
      {projects.map(p => (
        <div key={p.id}>
          {p.title}
          {stats.total} total
        </div>
      ))}
    </div>
  );
};
```

## 🚀 Performance Features

All built-in and automatic:

- ✅ **Memoization**: All expensive operations cached
- ✅ **Single-pass Filtering**: O(n) instead of O(n²)
- ✅ **Pagination**: Only render visible items
- ✅ **Search Optimization**: Efficient string matching
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Zero Config**: Works out of the box

## 🔄 Migration from Old Code

### Old Hook → New Hook

```ts
// Before
const { filtered, stats } = useProjectFilter(projects);

// After
const { projects: filtered, stats } = useProjects(projects);
```

```ts
// Before
const { projects: data } = useProjectData(projects);

// After
const { projects: data } = useProjects(projects);
```

```ts
// Before
const { related } = useProjectNavigation(projects, slug);

// After
const { getRelatedProjects } = useProjects(projects);
const related = getRelatedProjects(slug);
```

## 📊 File Organization

```
src/
├── data/
│   └── projectConfig.ts          ← Categories config (EDIT THIS)
│   └── Projects.ts               ← Project data (EDIT THIS)
├── hooks/
│   └── useProjects.ts            ← Main hook (USE THIS)
├── components/section/
│   ├── Projects-Unified.tsx      ← Main component (USE THIS)
│   ├── Projects.tsx              ← Thin wrapper
│   └── projects/
│       ├── ProjectsPage.tsx      ← Thin wrapper
│       ├── ProjectCard.tsx
│       ├── ProjectFilters.tsx
│       └── ProjectDetail.tsx
```

## ✨ Key Benefits

1. **One Hook** - `useProjects`
2. **One Config** - `projectConfig.ts`
3. **One Component** - `Projects-Unified`
4. **Multiple Modes** - home, dashboard, full
5. **Zero Duplication** - DRY principle
6. **Type Safe** - Full TypeScript
7. **Scalable** - Add categories/projects easily
8. **Fast** - Auto-memoized & optimized

## 🎓 How It Works

1. Add category to `projectConfig.ts`
2. Add project to `Projects.ts` with that category
3. Use `useProjects` hook in any component
4. Choose display mode with `Projects-Unified`
5. Everything works automatically!

---

**That's it!** No more scattered configuration, no more duplicate logic, no more complexity. Just clean, scalable project handling.
