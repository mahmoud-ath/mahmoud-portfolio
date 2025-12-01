# Quick Start - Project Hierarchy & Metadata

## 30-Second Overview

Your projects now have:
- **Tiers** (flagship, major, standard, experimental)
- **Impact Score** (1-20 scale)
- **Difficulty** (1-5 stars)
- **Project Type** (case-study, client, personal, school)
- **Status Flags** (new, trending, featured)
- **Automatic Sorting** (tier → impact → date)

---

## Most Common Tasks

### 1. Sort Projects (Automatic)
```typescript
// Already done! useProjectFilter now auto-sorts
const { filtered } = useProjectFilter(PROJECTS);
// Returns: sorted by tier → impact → date
```

### 2. Display Tier Badge
```typescript
import { getTierBadge } from '@/utils/projectBadges';

const badge = getTierBadge(project.tier);
// Use: badge.icon, badge.label, badge.bgColor, badge.textColor
```

### 3. Display Difficulty Stars
```typescript
import { formatDifficulty } from '@/utils/projectBadges';

<span>{formatDifficulty(project.difficulty)}</span>
// Output: ★★★★☆
```

### 4. Display Impact Score
```typescript
import { formatImpactScore } from '@/utils/projectBadges';

<span>{formatImpactScore(project.impactScore)}</span>
// Output: 18/20 ████████░░
```

### 5. Get Trending Projects
```typescript
import { getTrendingProjects } from '@/utils/projectSort';

const trending = getTrendingProjects(PROJECTS);
// Auto-filtered and sorted
```

### 6. Group by Tier
```typescript
import { groupByTier } from '@/utils/projectSort';

const groups = groupByTier(PROJECTS);
console.log(groups.flagship);  // Tier'd projects
console.log(groups.major);
console.log(groups.standard);
console.log(groups.experimental);
```

---

## Data Model Quick Reference

### Fields to Set for Each Project

```typescript
{
  // Existing (unchanged)
  id, slug, title, description, category, tags, image, images, links, video,
  featured,
  
  // NEW - Tier
  tier: 'flagship' | 'major' | 'standard' | 'experimental',
  
  // NEW - Impact (1-20)
  impactScore: 15,
  
  // NEW - Type
  projectType: 'case-study' | 'client' | 'personal' | 'school',
  
  // NEW - Difficulty (1-5)
  difficulty: 4,
  
  // NEW - Status
  isNew: true,
  isTrending: true,
  
  // NEW - Dates
  createdAt: '2024-10-01',
  completedAt: '2024-10-28'
}
```

---

## Tier Selection Guide

| Tier | When to Use | Examples |
|------|------------|----------|
| **flagship** | Your BEST work, major accomplishments | SmartMaint, E-commerce Platform |
| **major** | Important projects, solid impact | Tech Horizon, Mobile Health Tracker |
| **standard** | Quality work, good execution | Portfolio Website, Data Pipeline |
| **experimental** | Learning, research, exploration | Chatbot Research, Prototype |

---

## Impact Score Guide

**How to Score (1-20)**

Consider:
- Technical complexity
- Business/research value
- Innovation level
- Outcomes/results
- Scale of impact

**Quick Scale:**
- **1-5**: Learning projects
- **6-10**: Solid contributions
- **11-15**: High impact
- **16-20**: Exceptional/breakthrough

---

## Sorting Priority

**Automatic sort order (lowest to highest priority):**
1. **Tier** (flagship, major, standard, experimental)
2. **Impact** (20, 19, 18, ..., 1)
3. **Date** (newest first)

**Result:** Best projects appear first! ⭐

---

## Utility Imports

### Sorting Utilities
```typescript
import {
  defaultProjectSort,       // tier → impact → date
  sortByImpact,            // impact descending
  sortByTier,              // tier priority
  sortByDifficulty,        // difficulty descending
  sortByDate,              // date descending
  getTrendingProjects,     // trending/new/high-impact
  getFeaturedProjects,     // featured only
  groupByTier,             // group by tier
  groupByType,             // group by type
  filterByDifficulty,      // filter range
  filterByImpact,          // filter range
  getProjectMetrics,       // stats
} from '@/utils/projectSort';
```

### Badge Utilities
```typescript
import {
  getTierBadge,            // tier styling
  getDifficultyBadge,      // difficulty styling
  getStatusBadges,         // status styling
  formatImpactScore,       // "18/20 ████"
  formatDifficulty,        // "★★★★☆"
  TIER_BADGE_CONFIG,       // all tier configs
  DIFFICULTY_BADGE_CONFIG, // all difficulty configs
  STATUS_BADGE_CONFIG,     // all status configs
} from '@/utils/projectBadges';
```

---

## Common Code Snippets

### Display Project Badge Set
```typescript
import { getTierBadge, getDifficultyBadge } from '@/utils/projectBadges';

function ProjectBadges({ project }) {
  const tier = getTierBadge(project.tier);
  const difficulty = getDifficultyBadge(project.difficulty);
  
  return (
    <div className="flex gap-2">
      <span className={`${tier.bgColor} ${tier.textColor} px-2 py-1 rounded`}>
        {tier.icon} {tier.label}
      </span>
      <span className={`${difficulty.bgColor} ${difficulty.textColor} px-2 py-1 rounded`}>
        {difficulty.icon} {difficulty.label}
      </span>
    </div>
  );
}
```

### Get High-Impact Projects
```typescript
import { filterByImpact, defaultProjectSort } from '@/utils/projectSort';

const highImpact = filterByImpact(PROJECTS, 15, 20)
  .sort(defaultProjectSort);
```

### Create Tier-Based Showcase
```typescript
import { groupByTier } from '@/utils/projectSort';

const tiers = groupByTier(PROJECTS);

return (
  <>
    <Section title="Flagship">
      {tiers.flagship.map(p => <Card project={p} />)}
    </Section>
    <Section title="Major">
      {tiers.major.map(p => <Card project={p} />)}
    </Section>
  </>
);
```

---

## Hook Integration

### useProjectFilter (Updated)

```typescript
import { useProjectFilter } from '@/hooks';
import { PROJECTS } from '@/data/Projects';

function ProjectsPage() {
  const { filtered, activeFilter, setActiveFilter, stats } = useProjectFilter(PROJECTS);
  // filtered = auto-sorted by tier → impact → date
  // stats.trending = count of trending projects
  // stats.new = count of new projects
  
  return (
    <>
      <p>Trending: {stats.trending}</p>
      <p>New: {stats.new}</p>
      {filtered.map(p => <ProjectCard project={p} />)}
    </>
  );
}
```

---

## Sample Data

### 10 Sample Projects Pre-Configured

Already added with realistic:
- ✅ Tiers (mix of flagship, major, standard, experimental)
- ✅ Impact scores (realistic 11-20 range)
- ✅ Difficulties (range 2-5)
- ✅ Project types (mix of all types)
- ✅ Status flags (some new, some trending)
- ✅ Dates (realistic timeline)

Find in: `src/data/Projects.ts`

---

## Files Reference

| File | Purpose | Key Exports |
|------|---------|-------------|
| `src/types.ts` | Type definitions | Project, ProjectTier, DifficultyLevel |
| `src/data/Projects.ts` | Sample data | PROJECTS array (10 projects) |
| `src/utils/projectSort.ts` | Sorting logic | 15+ sort functions |
| `src/utils/projectBadges.ts` | UI configs | Badge styling, formatting |
| `src/hooks/useProjectFilter.ts` | Filtering hook | Auto-sorting included |
| `src/data/projectConfig.ts` | Config | `getSortedProjects()` added |

---

## Verification

- [x] 10 sample projects with full metadata
- [x] All type definitions in place
- [x] Sorting functions tested
- [x] Badge utilities ready
- [x] Hook updated with sorting
- [x] Zero TypeScript errors
- [x] Zero breaking changes

---

## What's Automatic Now

1. ✅ Projects sorted by tier → impact → date
2. ✅ Filtered projects maintain sort order
3. ✅ Stats include trending/new counts
4. ✅ All badge configs pre-built
5. ✅ All format functions ready to use

**Just use it!** Everything integrates seamlessly. 🚀

---

## Need More?

📖 **Full Guide**: `PROJECT_HIERARCHY_UPGRADE.md`
- Complete documentation
- API reference
- Advanced examples
- Integration guide

---

**Status**: ✅ Ready to Use | **Integration**: Seamless | **Breaking Changes**: None
