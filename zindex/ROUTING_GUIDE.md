# Routing & Navigation Guide

Your portfolio now uses hash-based routing with full project detail pages.

## Available Routes

### Home Page
- **URL**: `/#` or `/`
- **Component**: Main portfolio page with all sections
- **Displays**: Hero, About, Experience, Projects preview, Testimonials, Contact

### Projects Listing Page
- **URL**: `/#/projects`
- **Component**: `ProjectsPage.tsx`
- **Features**:
  - Full project grid with all projects
  - Category filters (Web Dev, ML, Data Analysis, Mobile)
  - Project statistics
  - Responsive layout

### Project Details Page
- **URL**: `/#/projects/{slug}`
- **Component**: `ProjectDetail.tsx`
- **Examples**:
  - `/#/projects/smartmaint-predictive-maintenance`
  - `/#/projects/road-accidents-analysis`
  - `/#/projects/tech-horizon-magazine`
- **Features**:
  - Full project description
  - Image gallery with thumbnails
  - Technology tags
  - Links to live demo and GitHub
  - Related projects section
  - Breadcrumb navigation

## Navigation Components

### From Project Card (Home Page)
- **"View Details" overlay button** → `#/projects/{slug}`
- **"Learn More" / "View Project" button** → `#/projects/{slug}`
- **"View All Projects" link** → `#/projects`

### From Projects Page
- **Project card click** → `#/projects/{slug}`

### From Project Details Page
- **Breadcrumb** → `#/projects`
- **"Back to All Projects"** → `#/projects`
- **Related project cards** → `#/projects/{slug}`

## How Routing Works

The app uses **hash-based routing** (not file-based routes):

```
URL Structure: domain.com/#/section/page
```

### Implementation Details

1. **Hash Change Detection** (`App.tsx`):
   - Listens to `hashchange` events
   - Parses the hash to determine current page
   - Re-renders appropriate component

2. **Automatic Scroll to Top**:
   - `ProjectDetail` component scrolls to top when slug changes
   - Ensures users see page header when navigating

3. **No Server Needed**:
   - All routing happens in the browser
   - Works with static hosting (GitHub Pages, Netlify, etc.)
   - No build-time route generation needed

## URL Examples

```
Home:              http://localhost:3001/#
Projects List:     http://localhost:3001/#/projects
Project 1 Detail:  http://localhost:3001/#/projects/smartmaint-predictive-maintenance
Project 2 Detail:  http://localhost:3001/#/projects/road-accidents-analysis
Project 3 Detail:  http://localhost:3001/#/projects/tech-horizon-magazine
```

## Adding New Projects

1. Add new project to `PROJECTS` array in `src/data/portfolio.ts`
2. Include a unique `slug` (URL-friendly identifier)
3. Include `category`, `tags`, `image`, and `links`
4. Optional: Add `images` array for gallery
5. Link automatically works: `#/projects/{slug}`

Example:
```typescript
{
  id: '4',
  slug: 'my-new-project',
  title: 'My New Project',
  description: '...',
  category: 'web-dev',
  tags: ['React', 'Node.js'],
  image: '/images/projects/my-project.jpg',
  images: ['/images/projects/my-project-1.jpg', '...'],
  featured: true,
  links: {
    github: 'https://github.com/...',
    demo: 'https://demo.com'
  }
}
```

## File Structure

```
src/
├── App.tsx                              # Route handler
├── components/
│   ├── projects/
│   │   ├── ProjectCard.tsx              # Card component
│   │   ├── ProjectFilters.tsx           # Filter buttons
│   │   ├── ProjectGallery.tsx           # Image gallery
│   │   ├── ProjectHeader.tsx            # Project page header
│   │   ├── ProjectDetail.tsx            # Project detail page
│   │   └── ProjectsPage.tsx             # Projects listing page
│   ├── section/
│   │   └── Projects.tsx                 # Home page projects section
│   └── ...
├── data/
│   └── portfolio.ts                     # Project data
└── types.ts                             # TypeScript interfaces
```

## Testing Routes

Try these URLs in your browser:

```
Home:
  http://localhost:3001/#

All Projects:
  http://localhost:3001/#/projects

SmartMaint Project:
  http://localhost:3001/#/projects/smartmaint-predictive-maintenance

Road Accidents Project:
  http://localhost:3001/#/projects/road-accidents-analysis

Tech Horizon Project:
  http://localhost:3001/#/projects/tech-horizon-magazine
```

All links in the app automatically use hash-based URLs, so navigation is seamless!
