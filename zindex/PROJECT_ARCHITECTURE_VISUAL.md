# Project Architecture - Visual Guide & Examples

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    USER INTERFACE                           │
├─────────────────────────────────────────────────────────────┤
│  ProjectsPage          │        ProjectDetail               │
│  ├─ ProjectFilters     │        ├─ ProjectHeader           │
│  └─ ProjectCard Grid   │        ├─ ProjectGallery          │
│                        │        └─ Related Projects         │
└─────────────────────────────────────────────────────────────┘
         ↑                              ↑
    Uses Hooks                    Uses Hooks
         │                              │
    ┌────┴──────────────────────────────┴────┐
    │     CUSTOM HOOKS LAYER               │
    ├─────────────────────────────────────────┤
    │ • useProjectFilter()                   │
    │ • useProjectNavigation()               │
    │                                         │
    │ (Filtering, Navigation, Stats Logic)  │
    └────┬──────────────────────────┬─────────┘
         │                          │
    Uses Config            Uses Data
         │                          │
    ┌────┴────────┐            ┌───┴──────────────┐
    │ projectConfig.ts      │ Projects.ts       │
    ├──────────────────────┤─────────────────────┤
    │ Categories           │ PROJECTS array     │
    │ Utility functions    │ All project data   │
    │ Category metadata    │                     │
    └──────────────────────┴─────────────────────┘
    
    DATA & CONFIGURATION LAYER
```

---

## Component Interaction Flow

### Scenario 1: Filtering Projects

```
User Clicks Filter Button
         ↓
  ProjectFilters
  onFilterChange('web-dev')
         ↓
  ProjectsPage
  setActiveFilter('web-dev')
         ↓
  useProjectFilter Hook
  Updates filtered array
         ↓
  Component Re-renders with
  filtered results
         ↓
  ProjectCard displays
  filtered projects
```

### Scenario 2: Viewing Project Details

```
User Clicks "View Details"
  href="#/projects/my-project-slug"
         ↓
  ProjectDetail receives slug
         ↓
  useProjectNavigation Hook
  Finds project by slug
         ↓
  Returns:
  - current project
  - related projects
  - prev/next navigation
         ↓
  Component renders full details
  + gallery + related projects
```

---

## Code Organization Example

### Before (Without Scaling)
```typescript
// ProjectsPage.tsx - 150+ lines, mixed concerns
const [activeFilter, setActiveFilter] = useState('all');
const filteredProjects = activeFilter === 'all'
  ? PROJECTS
  : PROJECTS.filter(p => p.category === activeFilter);

const stats = useMemo(() => ({
  total: PROJECTS.length,
  featured: PROJECTS.filter(p => p.featured).length,
  technologies: new Set(PROJECTS.flatMap(p => p.tags)).size,
}), []);

// Hardcoded categories
const CATEGORIES = [
  { id: 'all', label: 'All Projects', icon: '🚀' },
  // ... more categories
];

// Repeated in multiple components
const getCategoryEmoji = (category) => {
  const emojiMap = { 'web-dev': '💻', ... };
  return emojiMap[category] || '🚀';
};
```

### After (With Scaling)
```typescript
// ProjectsPage.tsx - ~50 lines, clean concerns
const { filtered, activeFilter, setActiveFilter, stats } = useProjectFilter(PROJECTS);
const [hoveredProject, setHoveredProject] = useState<string | null>(null);

// Categories imported from single source
import { PROJECT_CATEGORIES, getCategoryEmoji } from '@/data/projectConfig';
import { useProjectFilter } from '@/hooks';
```

**Result**: 
- ✅ Less code in components
- ✅ Logic centralized and testable
- ✅ Easy to modify behavior globally
- ✅ Clear separation of concerns

---

## Hook Usage Examples

### Example 1: useProjectFilter - Basic Filtering

```typescript
import { useProjectFilter } from '@/hooks';
import { PROJECTS } from '@/data/Projects';

function ProjectShowcase() {
  const { filtered, activeFilter, setActiveFilter, stats } = useProjectFilter(PROJECTS);

  return (
    <>
      <h2>Total: {stats.total} Projects</h2>
      <h3>Featured: {stats.featured}</h3>
      
      <button onClick={() => setActiveFilter('web-dev')}>
        Web Dev ({stats.byCategory['web-dev']})
      </button>
      
      {filtered.map(project => (
        <div key={project.id}>{project.title}</div>
      ))}
    </>
  );
}
```

### Example 2: useProjectFilter - With Custom Component

```typescript
// Reusable project list component
interface ProjectListProps {
  initialFilter?: string;
}

export function ProjectList({ initialFilter = 'all' }: ProjectListProps) {
  const { filtered, stats } = useProjectFilter(PROJECTS, initialFilter);

  return (
    <div>
      <p>Showing {filtered.length} of {stats.total} projects</p>
      <ProjectGrid projects={filtered} />
    </div>
  );
}

// Usage anywhere
<ProjectList initialFilter="machine-learning" />
```

### Example 3: useProjectNavigation - Navigation UI

```typescript
import { useProjectNavigation } from '@/hooks';

function ProjectDetailPage({ slug }: { slug: string }) {
  const { current, navigation, related } = useProjectNavigation(PROJECTS, slug);

  if (!current) return <NotFound />;

  return (
    <>
      <ProjectContent project={current} />
      
      {/* Navigation */}
      <nav className="flex justify-between">
        {navigation.prev ? (
          <a href={`#/projects/${navigation.prev.slug}`}>
            ← {navigation.prev.title}
          </a>
        ) : <span />}
        
        {navigation.next ? (
          <a href={`#/projects/${navigation.next.slug}`}>
            {navigation.next.title} →
          </a>
        ) : <span />}
      </nav>

      {/* Related */}
      <RelatedProjects projects={related} />
    </>
  );
}
```

### Example 4: useProjectNavigation - Statistics

```typescript
function ProjectStats() {
  const { featured, stats } = useProjectNavigation(PROJECTS, slug);

  return (
    <div>
      <p>Featured in this category: {featured.length}</p>
      <p>Browse: {stats.total} total projects</p>
    </div>
  );
}
```

---

## Adding Features - Step by Step

### Feature: Search Filter

#### Step 1: Create Hook
```typescript
// src/hooks/useProjectSearch.ts
import { useMemo, useState } from 'react';
import { Project } from '../types';

export const useProjectSearch = (projects: Project[], initialQuery = '') => {
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    if (!query.trim()) return projects;
    
    const lower = query.toLowerCase();
    return projects.filter(p =>
      p.title.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower) ||
      p.tags.some(tag => tag.toLowerCase().includes(lower))
    );
  }, [projects, query]);

  return { results, query, setQuery };
};
```

#### Step 2: Use in Component
```typescript
// src/components/section/projects/ProjectsPage.tsx
import { useProjectSearch } from '@/hooks';

export default function ProjectsPage() {
  const { filtered } = useProjectFilter(PROJECTS);
  const { results, query, setQuery } = useProjectSearch(filtered);

  return (
    <>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search projects..."
      />
      <ProjectGrid projects={results} />
    </>
  );
}
```

---

## Type Safety Example

### projectConfig.ts with Full Type Support
```typescript
// Categories are readonly constants with inferred types
export const PROJECT_CATEGORIES = [
  { id: 'all', label: 'All Projects', icon: '🚀' },
  { id: 'web-dev', label: 'Web Development', icon: '💻' },
] as const;

// Type extracted automatically
type CategoryId = typeof PROJECT_CATEGORIES[number]['id'];
// Result: 'all' | 'web-dev' | ...
```

### Usage with Type Safety
```typescript
// This works ✅
setActiveFilter('web-dev');

// This fails at compile time ❌
setActiveFilter('invalid-category');  // Type error!

// IDE autocomplete works perfectly ✨
// Type hints show all valid categories
```

---

## Performance Optimization

### Memoization in Hooks
```typescript
// useProjectFilter.ts

// ✅ Memoized: Only recalculates when dependencies change
const filtered = useMemo(() => {
  // Expensive filtering operation
  return activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);
}, [projects, activeFilter]);

// ✅ Memoized: Stats computed once
const stats = useMemo(() => {
  const allTags = new Set<string>();
  projects.forEach(p => p.tags.forEach(tag => allTags.add(tag)));
  return {
    total: projects.length,
    featured: projects.filter(p => p.featured).length,
    technologies: allTags.size,
  };
}, [projects]);
```

### Result
- Filter changes don't recalculate stats
- Project data changes trigger minimal re-renders
- Components stay in sync efficiently

---

## Testing Hooks (Example)

```typescript
// __tests__/hooks/useProjectFilter.test.ts
import { renderHook, act } from '@testing-library/react';
import { useProjectFilter } from '@/hooks';
import { PROJECTS } from '@/data/Projects';

describe('useProjectFilter', () => {
  it('should filter projects by category', () => {
    const { result } = renderHook(() => useProjectFilter(PROJECTS));

    act(() => {
      result.current.setActiveFilter('web-dev');
    });

    expect(result.current.filtered.every(p => p.category === 'web-dev')).toBe(true);
  });

  it('should calculate correct statistics', () => {
    const { result } = renderHook(() => useProjectFilter(PROJECTS));
    
    expect(result.current.stats.total).toBe(PROJECTS.length);
    expect(result.current.stats.featured).toBe(
      PROJECTS.filter(p => p.featured).length
    );
  });
});
```

---

## Summary Table

| Component/Hook | Purpose | Reusable | Testable | Location |
|---|---|---|---|---|
| `projectConfig.ts` | Category metadata | ✅ Yes | ✅ Yes | `src/data/` |
| `useProjectFilter` | Filtering logic | ✅ Yes | ✅ Yes | `src/hooks/` |
| `useProjectNavigation` | Navigation logic | ✅ Yes | ✅ Yes | `src/hooks/` |
| `ProjectsPage` | Projects listing | ❌ No | ✅ Partial | `src/components/` |
| `ProjectDetail` | Single project | ❌ No | ✅ Partial | `src/components/` |
| `ProjectCard` | Project UI | ✅ Yes | ✅ Yes | `src/components/` |

---

This architecture is designed to scale with your portfolio as you add more features, projects, and functionality!
