# Project Scaling Architecture - Implementation Guide

## Overview

This document explains the new scalable architecture implemented for the Projects section of your portfolio. The system is designed with **separation of concerns**, **code reusability**, and **easy extensibility**.

---

## Architecture Layers

### 1. **Data Layer** (`src/data/`)

#### `Projects.ts`
- **Single source of truth** for all project data
- Contains `PROJECTS` array with complete project information
- Used by all components and hooks

#### `projectConfig.ts` (NEW)
- **Centralized configuration** for project categories
- Exports project categories with metadata
- Provides utility functions:
  - `getCategoryEmoji(category)` - Get emoji for category
  - `getCategoryLabel(category)` - Get readable label
  - `getCategoryById(id)` - Get full category object
  - `getFilterableCategories()` - Get non-'all' categories

**Why this structure?**
- Avoids hardcoding categories in components
- Easy to add/remove categories globally
- Consistent emojis and labels across the app

---

### 2. **Logic Layer** (`src/hooks/`)

#### `useProjectFilter.ts` (NEW)
**Purpose**: Manage project filtering logic

**Features**:
- Takes array of projects and initial filter
- Returns:
  - `filtered` - Filtered project list (memoized)
  - `activeFilter` - Current filter state
  - `setActiveFilter` - Update filter function
  - `stats` - Project statistics (total, featured, technologies)
  - `hasResults` - Boolean for empty state handling

**Usage Example**:
```typescript
const { filtered, activeFilter, setActiveFilter, stats } = useProjectFilter(PROJECTS);
```

**Benefits**:
- Reusable across components
- Memoized values prevent unnecessary re-renders
- Statistics computed once on data change

#### `useProjectNavigation.ts` (NEW)
**Purpose**: Handle project detail view navigation and related projects

**Features**:
- Takes projects array and current slug
- Returns:
  - `current` - Current project
  - `currentIndex` - Index in array
  - `related` - Related projects from same category
  - `navigation` - Previous/next project objects
  - `featured` - Featured projects (excluding current)
  - `isValid` - Whether project exists

**Usage Example**:
```typescript
const { current, related, navigation } = useProjectNavigation(PROJECTS, slug);
```

**Benefits**:
- Cleaner ProjectDetail component
- Easy navigation between projects
- Automatic "More Projects" section population

---

### 3. **Component Layer** (`src/components/section/projects/`)

#### Component Hierarchy
```
ProjectsPage (Main section view)
├── ProjectFilters (Category buttons)
└── ProjectCard (Grid of projects)

ProjectDetail (Single project view)
├── ProjectHeader (Title, category, links)
├── ProjectGallery (Image gallery)
└── Related Projects Section
```

#### `ProjectsPage.tsx` (REFACTORED)
- Imports from `useProjectFilter` hook
- Imports categories from `projectConfig`
- Simplified filtering logic
- Uses `getCategoryEmoji()` for consistent emojis
- Uses `stats` object for project statistics

#### `ProjectDetail.tsx` (REFACTORED)
- Imports from `useProjectNavigation` hook
- Gets related projects automatically
- Cleaner project lookup logic
- Easy to add prev/next navigation

#### `ProjectCard.tsx` (REFACTORED)
- Removed hardcoded emoji/label logic
- Imports `getCategoryEmoji`, `getCategoryLabel` from config
- Ensures consistency across all project displays

#### `ProjectFilters.tsx` (UPDATED)
- Accepts readonly category arrays
- More flexible type signature
- Reusable in other contexts

#### `index.ts` (NEW)
- Centralized exports for projects module
- Clean import: `import { ProjectsPage, ProjectDetail } from '@/components/section/projects'`

---

## Data Flow Diagram

```
PROJECTS (src/data/Projects.ts)
    ↓
┌───────────────────────────────────┐
│  ProjectsPage / ProjectDetail     │
│  (useProjectFilter/Navigation)    │
└───────────────────────────────────┘
    ↓
┌───────────────────────────────────┐
│  ProjectFilters / ProjectCard     │
│  (projectConfig utilities)        │
└───────────────────────────────────┘
```

---

## Usage Examples

### Example 1: Display Filtered Projects
```typescript
import { useProjectFilter } from '@/hooks';
import { PROJECTS } from '@/data/Projects';
import { PROJECT_CATEGORIES } from '@/data/projectConfig';

function MyComponent() {
  const { filtered, activeFilter, setActiveFilter, stats } = useProjectFilter(PROJECTS);

  return (
    <div>
      <p>{stats.total} projects, {stats.featured} featured</p>
      <button onClick={() => setActiveFilter('web-dev')}>
        Web Development ({stats.byCategory['web-dev']})
      </button>
      {filtered.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
```

### Example 2: Add New Project Category
```typescript
// 1. Update projectConfig.ts
export const PROJECT_CATEGORIES = [
  // ... existing categories
  { id: 'devops', label: 'DevOps', icon: '⚙️' },
];

// 2. Update types.ts Project interface
category: 'web-dev' | 'machine-learning' | 'data-analyst' | 'mobile' | 'devops';

// 3. Add projects with new category in Projects.ts
{
  id: '10',
  category: 'devops',
  // ... other fields
}

// Components automatically support the new category!
```

### Example 3: Add Navigation Between Projects
```typescript
// In ProjectDetail or any component
const { current, navigation } = useProjectNavigation(PROJECTS, slug);

return (
  <div>
    <h1>{current?.title}</h1>
    {navigation.prev && (
      <a href={`#/projects/${navigation.prev.slug}`}>← Previous</a>
    )}
    {navigation.next && (
      <a href={`#/projects/${navigation.next.slug}`}>Next →</a>
    )}
  </div>
);
```

---

## Scalability Features

### ✅ Easy to Extend
- Add new categories without touching components
- Add new statistics by extending the `stats` object
- Add new filters with minimal code changes

### ✅ Performance Optimized
- Hooks use `useMemo` to prevent unnecessary recalculations
- Filtered results cached per filter state
- Statistics computed once on data changes

### ✅ Type-Safe
- Full TypeScript support
- Category types enforced via union types
- IDE autocomplete for all utilities

### ✅ Maintainable
- Single source of truth for configuration
- Logic separated from presentation
- Easy to test hooks independently
- Clear separation of concerns

### ✅ Reusable
- Hooks work with any component
- Config can be used anywhere
- Components can be imported individually or via index

---

## File Structure Summary

```
src/
├── data/
│   ├── Projects.ts          (project data)
│   └── projectConfig.ts     (project configuration - NEW)
├── hooks/
│   ├── index.ts             (hook exports - NEW)
│   ├── useProjectFilter.ts  (filtering logic - NEW)
│   └── useProjectNavigation.ts (navigation logic - NEW)
└── components/section/projects/
    ├── index.ts             (component exports - NEW)
    ├── ProjectsPage.tsx     (refactored)
    ├── ProjectDetail.tsx    (refactored)
    ├── ProjectCard.tsx      (refactored)
    ├── ProjectFilters.tsx   (updated)
    ├── ProjectHeader.tsx
    └── ProjectGallery.tsx
```

---

## Key Improvements

| Aspect | Before | After |
|--------|--------|-------|
| **Config Management** | Hardcoded in components | Centralized in projectConfig.ts |
| **Filtering Logic** | In component state | Custom hook `useProjectFilter` |
| **Navigation** | Manual lookups | Custom hook `useProjectNavigation` |
| **Code Duplication** | Category logic repeated | Shared utility functions |
| **Scalability** | Difficult to extend | Easy to add features |
| **Testing** | Component-only tests | Testable hook logic |

---

## Next Steps (Optional Enhancements)

1. **Add Search Hook**: `useProjectSearch()` for text search
2. **Add Sorting Hook**: `useProjectSort()` for sorting options
3. **Add Tags Filter**: Filter by multiple tags
4. **Add Animations**: Reusable animation variants
5. **Add Testing**: Unit tests for hooks and utilities

---

## Troubleshooting

**Q: Category not showing in filters?**
A: Check that it's added to `PROJECT_CATEGORIES` in `projectConfig.ts` and the `category` field in Projects.ts matches.

**Q: Related projects not showing?**
A: Ensure projects have the same `category` value. The `useProjectNavigation` hook filters by category.

**Q: Stats showing incorrect numbers?**
A: Check that `PROJECTS` data is properly formatted. Stats are memoized, so refresh the page if you modify data.

---

## Summary

This architecture provides a **production-ready**, **scalable**, and **maintainable** system for managing projects in your portfolio. It follows React best practices and TypeScript conventions, making future extensions straightforward and enjoyable.
