# 🚀 Mahmoud EL GHARIB - Portfolio Website

> A modern, fully responsive portfolio website showcasing AI, Data Science, and Full-Stack Development expertise. Built with React, TypeScript, Vite, and Tailwind CSS with advanced animations and dark mode support.

![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-blue?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-6.2-blue?logo=vite)

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Data Management](#data-management)
- [Components](#components)
- [Customization Guide](#customization-guide)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## 🎯 Project Overview

This portfolio website is a **professional showcase platform** designed to demonstrate:

- **Artificial Intelligence & Machine Learning** expertise
- **Data Science & Analytics** projects and insights
- **Full-Stack Web Development** capabilities
- **Professional Experience** and achievements
- **Skills & Certifications** in modern technologies

The site is **fully responsive**, supports **dark/light mode**, includes **smooth animations**, and features a **custom cursor** effect for an engaging user experience.

---

## ✨ Features

### 🎨 User Interface
- ✅ **Responsive Design** - Mobile-first, works on all devices
- ✅ **Dark Mode Support** - Automatic theme detection + persistent preference
- ✅ **Smooth Animations** - Framer Motion for professional transitions
- ✅ **Custom Cursor** - Interactive cursor effect
- ✅ **Brutalist Design** - Bold borders and shadows for visual impact

### 📱 Pages & Sections
- ✅ **Hero Section** - Dynamic landing with mobile/desktop images
- ✅ **Skills Showcase** - Organized by category with animations
- ✅ **Experience Timeline** - Education, Certifications, Work History
- ✅ **Projects Dashboard** - Filterable project gallery with categories
- ✅ **Project Details** - Individual project pages with media tabs
- ✅ **Gallery Lightbox** - Fixed-size image viewer with keyboard navigation
- ✅ **Testimonials** - Client/peer endorsements
- ✅ **Contact Section** - Email, phone, and social links

### 🔧 Technical Features
- ✅ **Hash-based Routing** - Client-side navigation
- ✅ **Project Filtering** - By category, tier, and tags
- ✅ **Analytics Dashboard** - Project statistics and insights
- ✅ **Keyboard Navigation** - Arrow keys and ESC support in lightbox
- ✅ **LocalStorage Persistence** - Dark mode preference saved
- ✅ **Dynamic Imports** - Code splitting for performance

### 🤖 AI Assistant Chatbot
- ✅ **Intelligent Q&A System** - Hybrid rule-based + document search
- ✅ **Project Detection** - Auto-recognizes portfolio projects with direct links
- ✅ **Social Intelligence** - Contextual responses (client detection, collaboration offers)
- ✅ **Icon-Rich Responses** - 22+ Lucide icons for visual communication
- ✅ **Quick Actions** - Brain (Skills), Code (Projects), Briefcase (About), Document (CV)
- ✅ **Compact Responsive Design** - Optimized window (320px width, 500px max height)
- ✅ **Multi-Stage Processing** - Project detection → contextual → intent → document → fallback

---

## 🛠️ Technology Stack

### Frontend Framework
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.2.0 | UI library and component framework |
| **TypeScript** | 5.8.2 | Type-safe JavaScript development |
| **Vite** | 6.2.0 | Lightning-fast build tool and dev server |
| **Tailwind CSS** | 4.1.17 | Utility-first CSS framework |

### Animation & Effects
| Library | Version | Purpose |
|---------|---------|---------|
| **Framer Motion** | 12.23.24 | Advanced animations and transitions |
| **GSAP** | 3.13.0 | Timeline-based animations |
| **Lucide React** | 0.554.0 | Icon library with 22+ icons for UI and chatbot |

### UI Components & Utilities
| Package | Version | Purpose |
|---------|---------|---------|
| **Radix UI** | Latest | Unstyled, accessible component primitives |
| **Tailwind Merge** | 3.4.0 | Smart CSS class merging |
| **Class Variance Authority** | 0.7.1 | Type-safe component variants |
| **clsx** | 2.1.1 | Conditional className utility |

### Development Tools
| Tool | Purpose |
|------|---------|
| **ESLint** | Code quality and style |
| **TypeScript Compiler** | Type checking |
| **PostCSS** | CSS processing |
| **Autoprefixer** | Browser vendor prefixes |

---

## 📦 Installation & Setup

### Prerequisites
```bash
Node.js (v16+)
npm or yarn package manager
Git for version control
```

### Step-by-Step Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/mahmoud-ath/mahmoud-portfolio.git
cd mahmoud-portfolio
```

#### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

#### 3. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configuration
nano .env
```

#### 4. Start Development Server
```bash
npm run dev
# Server runs at http://localhost:5173
```

#### 5. Build for Production
```bash
npm run build
# Creates optimized build in dist/ folder
```

#### 6. Preview Production Build
```bash
npm run preview
# Test production build locally
```

---

## 📁 Project Structure

```
mahmoud-portfolio-v1/
│
├── src/                              # Source code directory
│   ├── components/                   # React components
│   │   ├── effect-animation/         # Animation components
│   │   │   ├── CustomCursor.tsx      # Interactive cursor effect
│   │   │   ├── BlobCursor.tsx        # Blob animation
│   │   │   ├── DecryptedText.tsx     # Text decryption animation
│   │   │   └── GradientCursor.tsx    # Gradient cursor effect
│   │   │
│   │   ├── layout/                   # Layout components
│   │   │   ├── Header.tsx            # Navigation header with dark mode toggle
│   │   │   ├── SideElements.tsx      # Decorative side elements
│   │   │   └── BottomNav.tsx         # Optional bottom navigation
│   │   │
│   │   ├── section/                  # Page sections
│   │   │   ├── Hero.tsx              # Landing hero section
│   │   │   ├── Skills.tsx            # Skills showcase
│   │   │   ├── Testimonials.tsx      # Client testimonials
│   │   │   ├── Contact.tsx           # Contact section
│   │   │   ├── Projects.tsx          # Featured projects
│   │   │   ├── experience/           # Experience subsections
│   │   │   │   ├── ExperienceTabs.tsx # Main experience component
│   │   │   │   └── tabs/
│   │   │   │       ├── Education.tsx
│   │   │   │       ├── Certifications.tsx
│   │   │   │       ├── Leadership.tsx
│   │   │   │       └── WorkHistory.tsx
│   │   │   │
│   │   │   └── projects/             # Projects subsystem
│   │   │       ├── ProjectsPage.tsx  # Projects listing page
│   │   │       ├── ProjectDetail.tsx # Individual project page
│   │   │       ├── dashboard/        # Dashboard components
│   │   │       │   ├── ProjectSidebar.tsx
│   │   │       │   ├── ProjectFilters.tsx
│   │   │       │   └── ProjectGrid.tsx
│   │   │       └── detail/           # Detail components
│   │   │           ├── ProjectHeader.tsx
│   │   │           ├── TabNavigation.tsx
│   │   │           └── tabs/
│   │   │               ├── GalleryTab.tsx     # Image gallery with lightbox
│   │   │               ├── DescriptionTab.tsx
│   │   │               ├── FeaturesTab.tsx
│   │   │               ├── TechnologiesTab.tsx
│   │   │               ├── DocumentationTab.tsx
│   │   │               └── LinksTab.tsx
│   │   │
│   │   └── ui/                       # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Badge.tsx
│   │       └── Tabs.tsx
│   │
│   ├── chatbot/                      # 🤖 AI Assistant Chatbot
│   │   ├── components/
│   │   │   ├── ChatWindow.tsx        # Main chat interface (320px, 500px max-height)
│   │   │   ├── ChatMessage.tsx       # Message display with project redirect button
│   │   │   ├── IconResponse.tsx      # Parse and render messages with Lucide icons
│   │   │   ├── QuickActions.tsx      # 4 quick action buttons with Lucide icons
│   │   │   └── ChatInput.tsx         # Single-line chat input
│   │   │
│   │   ├── utils/
│   │   │   ├── messageProcessor.ts   # 4-stage message routing with project detection
│   │   │   ├── intentMatcher.ts      # Intent matching and confidence scoring
│   │   │   ├── documentSearch.ts     # Document knowledge base search
│   │   │   └── iconMapping.ts        # Centralized 22+ Lucide icon configuration
│   │   │
│   │   ├── data/
│   │   │   ├── intents.json          # 12 intents with icon markers and portfolio data
│   │   │   └── documentContent.ts    # 7 knowledge base sections with real portfolio data
│   │   │
│   │   └── types.ts                  # Chatbot TypeScript interfaces
│   │
│   ├── contexts/                     # React Context API
│   │   └── DarkModeContext.tsx       # Global dark mode state
│   │
│   ├── lib/                          # Utility library
│   │   ├── data/                     # Static data files
│   │   │   ├── portfolio.ts          # Main portfolio data
│   │   │   ├── projects/
│   │   │   │   ├── projects.ts       # Projects with metadata
│   │   │   │   └── empty_projects.ts # Template for new projects
│   │   │   ├── skills.ts             # Skills by category
│   │   │   ├── experience.ts         # Work experience data
│   │   │   ├── social_links.ts       # Social media links
│   │   │   └── testimonials.ts       # Client testimonials
│   │   │
│   │   ├── hooks/                    # Custom React hooks
│   │   │   ├── useCurrentSection.ts  # Track active section
│   │   │   ├── useProjectFilter.ts   # Project filtering logic
│   │   │   ├── useProjectStats.ts    # Project statistics
│   │   │   └── index.ts              # Hook exports
│   │   │
│   │   ├── types/                    # TypeScript interfaces
│   │   │   ├── Project_Section.ts    # Project type definitions
│   │   │   ├── Experience.ts         # Experience type definitions
│   │   │   ├── Portfolio.ts          # Portfolio type definitions
│   │   │   └── index.ts              # Type exports
│   │   │
│   │   └── utils/                    # Utility functions
│   │       ├── helpers.ts            # Helper functions
│   │       ├── utils.ts              # Utility functions
│   │       ├── projectUtils.ts       # Project-specific utilities
│   │       ├── decryptPresets.ts     # Encryption utilities
│   │       ├── iconify.ts            # Icon utilities
│   │       └── lazyLoading.ts        # Lazy loading utilities
│   │
│   ├── App.tsx                       # Main app component
│   ├── index.tsx                     # React entry point
│   ├── index.css                     # Global styles
│   ├── config.ts                     # Site configuration
│   ├── constants.ts                  # Global constants
│   └── metadata.json                 # Site metadata
│
├── public/                           # Static assets
│   ├── CV/
│   │   └── Resume.pdf                # PDF resume
│   │
│   ├── Projects/                     # Project media files
│   │   ├── 1.cmh-data-management-system/
│   │   │   ├── images/
│   │   │   ├── videos/
│   │   │   └── docs/
│   │   ├── 2.smartmaint-predictive-maintenance/
│   │   ├── 3.morocco-road-accidents-analysis/
│   │   ├── 4.tech-horizon-magazine/
│   │   └── [other projects]/
│   │
│   ├── Experience/                   # Experience media
│   │   ├── certifications/
│   │   └── docs/
│   │
│   ├── Skills/
│   │   └── logos/
│   │
│   └── General/
│       └── [General assets]
│
├── tailwind.config.js                # Tailwind CSS configuration
├── vite.config.ts                    # Vite configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies and scripts
└── index.html                        # HTML entry point

zindex/                               # Documentation archive
└── [Various documentation files]

```

---

## ⚙️ Configuration

### Site Configuration (`src/config.ts`)

```typescript
export const SITE_CONFIG = {
  // Personal Information
  name: 'Mahmoud EL GHARIB',
  title: 'AI & Data Science Specialist | Full-Stack Developer',
  description: 'Master\'s student in Artificial Intelligence and Data Science...',
  email: 'elgharib.mahmoud2@gmail.com',
  phone: '+212 636-167511',
  location: 'Chefchaouen, Morocco',
  
  // Social Media Links
  social: {
    github: 'https://github.com/mahmoud-el-gharib',
    linkedin: 'https://linkedin.com/in/mahmoud-el-gharib',
    twitter: 'https://twitter.com/mahmoud_gharib',
    email: 'elgharib.mahmoud2@gmail.com'
  },

  // Theme Colors
  theme: {
    colors: {
      light: '#F5F5F5',
      dark: '#1A1A1A',
      accent: '#FF6B6B',
      primary: '#3B82F6',
      secondary: '#10B981'
    }
  }
};
```

### Tailwind Configuration (`tailwind.config.js`)

```javascript
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',  // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        themeLight: '#F8F6F6',
        themeYellow: '#F5D061',
        themeDark: '#2A363B',
        themeRed: '#CF4647',
      }
    }
  },
  plugins: [],
}
```

### Vite Configuration (`vite.config.ts`)

- Fast HMR (Hot Module Replacement)
- React Fast Refresh
- Optimized build output
- SVG support

---

## 📊 Data Management

### Project Structure

All portfolio data is managed through TypeScript files in `src/lib/data/`:

#### Projects (`projects.ts`)
```typescript
interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;            // Main thumbnail
  images: string[];         // Gallery images
  featured: boolean;        // Show on homepage
  tier: 'flagship' | 'major' | 'minor';
  impact: number;           // 1-20 scale
  links: {
    github?: string;
    demo?: string;
    live?: string;
  };
  videos?: string[];
  documentation?: string;
  technologies: string[];
  createdAt: string;
}
```

#### Skills (`skills.ts`)
```typescript
interface Skill {
  category: string;
  items: {
    name: string;
    proficiency: number;    // 1-100
    icon?: string;
    experience?: string;
  }[];
}
```

#### Experience (`experience.ts`)
```typescript
interface Experience {
  education: EducationItem[];
  certifications: CertificationItem[];
  workHistory: WorkItem[];
  leadership: LeadershipItem[];
}
```

### Data Sources

| File | Purpose | Update Frequency |
|------|---------|------------------|
| `projects.ts` | Project portfolio | As needed |
| `skills.ts` | Technical skills | Quarterly |
| `experience.ts` | Work/education history | As needed |
| `testimonials.ts` | Client feedback | On received |
| `social_links.ts` | Contact information | Rarely |

---

## 🧩 Components

### Layout Components

#### Header (`components/layout/Header.tsx`)
- Navigation menu with smooth scrolling
- Dark mode toggle button
- Mobile hamburger menu
- CV download link
- Active section highlighting

**Key Features:**
- Responsive design (desktop/mobile)
- Keyboard navigation support
- Smooth animations
- Theme toggle

#### SideElements (`components/layout/SideElements.tsx`)
- Floating decorative elements
- Social media icons
- Navigation shortcuts
- Scroll indicators

### Section Components

#### Hero (`components/section/Hero.tsx`)
- Landing section with hero image
- Mobile/desktop image variants
- Animated text effects
- Call-to-action buttons
- Blob cursor integration

#### Skills (`components/section/Skills.tsx`)
- Skill cards by category
- Proficiency indicators
- Interactive hover effects
- Animated progress bars

#### Experience (`components/section/experience/ExperienceTabs.tsx`)
- Tabbed interface (Education, Certifications, Work, Leadership)
- Timeline view
- Responsive tab navigation
- Mobile-friendly layout

#### Projects (`components/section/Projects.tsx`)
- Featured projects showcase
- Project filtering
- Quick project cards
- "View All" button to projects dashboard

### Projects Subsystem

#### ProjectsPage (`components/section/projects/ProjectsPage.tsx`)
- Complete projects dashboard
- Advanced filtering (by category, tier, tags)
- Project statistics sidebar
- Mobile category pills
- Grid/list view toggle

#### ProjectDetail (`components/section/projects/ProjectDetail.tsx`)
- Individual project view
- Navigation tabs (Gallery, Description, Features, Technologies, Documentation)
- Back navigation
- Related projects suggestions
- Responsive layout

#### GalleryTab (`components/section/projects/detail/tabs/GalleryTab.tsx`)
- Image gallery with hover effects
- Lightbox modal
- Fixed-size image container (500px height)
- Intelligent image scaling
- Keyboard navigation (arrow keys, ESC)
- Dot indicators for quick navigation

### Animation Components

#### CustomCursor (`components/effect-animation/CustomCursor.tsx`)
- Interactive cursor effect
- Smooth tracking
- Hover states
- Performance optimized

#### DecryptedText (`components/effect-animation/DecryptedText.tsx`)
- Text decryption animation
- Character-by-character reveal
- Smooth transitions

#### BlobCursor (`components/effect-animation/BlobCursor.tsx`)
- Blob-shaped cursor animation
- Morphing effects
- Interactive feedback

---

## 🎨 Customization Guide

### Update Personal Information

Edit `src/config.ts`:
```typescript
export const SITE_CONFIG = {
  name: 'Your Name',
  title: 'Your Title',
  description: 'Your description',
  email: 'your@email.com',
  // ... update social links, etc.
};
```

### Add New Project

1. **Create project folder** in `public/Projects/[number].[project-name]/`:
   ```
   ├── images/          # Screenshot images
   ├── videos/          # Project videos (optional)
   └── docs/            # PDF documentation (optional)
   ```

2. **Update `src/lib/data/projects/projects.ts`**:
   ```typescript
   {
     id: 'new-project',
     slug: 'new-project',
     title: 'Project Title',
     description: 'Project description...',
     category: 'Web Development',
     tags: ['React', 'TypeScript'],
     image: '/Projects/[number].[name]/images/thumbnail.jpg',
     images: [/* gallery images */],
     featured: true,  // Show on homepage
     tier: 'major',
     impact: 18,
     links: {
       github: 'https://github.com/...',
       demo: 'https://...'
     },
     technologies: ['React', 'TypeScript', 'Tailwind'],
     createdAt: '2024-12-18'
   }
   ```

### Add New Skill

Edit `src/lib/data/skills.ts`:
```typescript
{
  category: 'AI & Machine Learning',
  items: [
    {
      name: 'TensorFlow',
      proficiency: 85,
      icon: 'tensorflow-icon',
      experience: '2+ years'
    },
    // ... add more skills
  ]
}
```

### Update Theme Colors

Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      themeLight: '#F8F6F6',   // Light background
      themeDark: '#2A363B',    // Dark background
      themeRed: '#CF4647',     // Accent color
      themeYellow: '#F5D061',  // Secondary color
    }
  }
}
```

### Modify Dark Mode Behavior

Edit `src/contexts/DarkModeContext.tsx`:
```typescript
// Change default theme preference
const shouldBeDark = savedTheme ? 
  savedTheme === 'dark' : 
  prefersDark;  // Change to 'false' for light mode default
```

---

## 🚀 Deployment

### Build Optimization

```bash
npm run build
# Generates optimized dist/ folder with:
# - Minified JavaScript
# - Optimized CSS
# - Asset compression
# - Source maps
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel login
vercel
# Follow prompts to deploy
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

### Deploy to GitHub Pages

```bash
# Add to vite.config.ts
export default {
  base: '/mahmoud-portfolio/',
  // ...
}

npm run build
# Push dist/ folder to gh-pages branch
```

### Environment Variables

Create `.env.production`:
```
VITE_API_URL=https://your-api.com
VITE_ANALYTICS_ID=your-analytics-id
```

---

## 📱 Responsive Design

The portfolio is fully responsive across all breakpoints:

| Breakpoint | Device | Width |
|-----------|--------|-------|
| **sm** | Small mobile | 640px |
| **md** | Tablet | 768px |
| **lg** | Desktop | 1024px |
| **xl** | Large desktop | 1280px |
| **2xl** | Extra large | 1536px |

**Responsive Features:**
- Mobile-first design approach
- Touch-friendly navigation
- Optimized font sizes
- Flexible layouts
- Mobile menu with hamburger toggle
- Adaptive images (mobile/desktop variants)

---

## 🌙 Dark Mode

The site includes sophisticated dark mode support:

### Features
- **Auto Detection** - Respects system preference
- **Manual Toggle** - Button in header to switch modes
- **Persistence** - Theme preference saved to localStorage
- **Smooth Transitions** - 300ms animation between themes
- **Complete Coverage** - All components support dark mode

### Implementation
```typescript
// Use dark mode classes in components
<div className="bg-white dark:bg-themeDark text-black dark:text-white">
  {/* Content */}
</div>
```

### Add Dark Mode to New Components
```tsx
// Always include dark: variants
className={`
  bg-white dark:bg-themeDark
  text-gray-900 dark:text-gray-100
  border-gray-200 dark:border-gray-700
  transition-colors duration-300
`}
```

---

## ♿ Accessibility

The portfolio includes accessibility features:

- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Color contrast compliance
- ✅ Alt text for images
- ✅ Focus indicators
- ✅ Screen reader support

---

## 📊 Performance Metrics

- **Lighthouse Score**: 95+
- **Page Load Time**: < 2s
- **Largest Contentful Paint**: < 1.5s
- **First Input Delay**: < 100ms
- **Cumulative Layout Shift**: < 0.05

### Optimization Techniques
- Code splitting with Vite
- Image lazy loading
- CSS minification
- JavaScript compression
- Efficient animations
- Optimized bundle size

---

## 🤖 AI Assistant Chatbot

### Overview

The portfolio features an intelligent AI assistant chatbot that provides interactive Q&A about your portfolio, projects, skills, and experience. The chatbot combines rule-based intent matching with semantic document search for comprehensive answers.

### Key Features

#### 🎯 Smart Detection
- **Project Recognition** - Automatically detects when users ask about specific projects (CMH, SmartMaint, Morocco, Tech Horizon, Energy, Watchly)
- **Context Awareness** - Provides contextual responses based on question type (client inquiry, collaboration offer, technical question)
- **Social Intelligence** - Detects client-related keywords and generates collaboration-focused responses

#### 🎨 User Experience
- **Icon-Rich Responses** - 22+ Lucide icons for visual communication (mail, code, database, award, checkmark, arrow, etc.)
- **Quick Actions** - 4 persistent action buttons:
  - 🧠 **Brain** - Ask about skills and expertise
  - 💻 **Code** - Explore projects and technologies
  - 💼 **Briefcase** - Learn about professional background
  - 📄 **Document** - Download CV/Resume
- **Compact Design** - Responsive window (320px width, 500px max height) fits on any screen
- **Smooth Animations** - Framer Motion transitions for message appearances

#### 🔧 Intelligent Processing

The chatbot uses a **4-stage message processing pipeline**:

1. **Project Detection** - Checks for project keywords and generates project-specific snippets with redirect buttons
2. **Contextual Responses** - Detects client inquiries and collaboration offers
3. **Intent Matching** - Matches user input against 12 predefined intents (greet, skills, projects, experience, etc.)
4. **Document Search** - Searches 7 knowledge base sections for relevant information
5. **Fallback Response** - Provides helpful guidance if no match found

### Chatbot Architecture

#### Knowledge Base Sections

The chatbot has access to 7 portfolio sections:

| Section | Content | Keywords |
|---------|---------|----------|
| **CMH Data Management** | Lead ML project (50K+ records, 500K+ emails, 92% accuracy) | data, management, records, emails, accuracy |
| **SmartMaint** | Predictive maintenance ML system | predictive, maintenance, algorithms, performance |
| **Morocco Road Accidents** | Analytics & visualization project | analysis, accidents, road, safety |
| **Skills Overview** | Technical skills by category | python, javascript, react, machine learning |
| **Education** | Master's & Bachelor's degrees, certifications | education, degree, certification, training |
| **Experience & Leadership** | Work history, team leadership, projects | experience, leadership, team, management |
| **Languages & Interests** | Language proficiency, technical interests | languages, interests, community |

#### Intent System

The chatbot recognizes 12 intents:

```json
{
  "greet": "Initial greeting responses",
  "collaboration": "Collaboration and partnership inquiries",
  "about_me": "Questions about professional background",
  "skills": "Technical skills and expertise",
  "projects": "Project portfolio and case studies",
  "experience": "Work experience and achievements",
  "contact": "Contact information and social links",
  "cv_download": "Resume/CV download requests",
  "help": "Help and chatbot functionality",
  "location": "Location and availability information",
  "farewell": "Goodbye responses",
  "greeting_follow": "Follow-up interactions"
}
```

#### Icon Mapping System

All responses use Lucide icons configured in `iconMapping.ts`:

```typescript
export const iconMapping = {
  mail: { icon: Mail, color: 'text-blue-500' },
  code: { icon: Code2, color: 'text-purple-500' },
  database: { icon: Database, color: 'text-green-500' },
  award: { icon: Award, color: 'text-yellow-500' },
  checkmark: { icon: CheckCircle, color: 'text-green-500' },
  arrow: { icon: ArrowRight, color: 'text-red-500' },
  // ... 16+ more icons
};
```

### Project Redirect System

When users ask about specific projects, the chatbot:
1. Detects the project mention
2. Provides a brief snippet with key metrics
3. Shows a "View Project" button with ArrowRight icon
4. Redirects to detailed project page on click

**Example:**
```
User: "Tell me about CMH"
Bot: "The CMH Data Management System is a comprehensive ML solution... 
     [50K+ records] [500K+ emails] [92% accuracy] 
     [View Project →]"
```

### Message Processing Flow

```
User Message
    ↓
[Step 0] Project Detection
    ├─→ Found: Return project snippet with redirect button
    └─→ Not found: Continue
    ↓
[Step 1] Contextual Response Detection
    ├─→ Client inquiry: Generate collaboration response
    └─→ Not matched: Continue
    ↓
[Step 2] Intent Matching
    ├─→ Matched: Return intent response with icons
    └─→ No match: Continue
    ↓
[Step 3] Document Search
    ├─→ Found: Return relevant document section
    └─→ Not found: Continue
    ↓
[Step 4] Fallback Response
    └─→ Return helpful guidance and quick action suggestions
```

### Components

```typescript
// Main chat interface (compact, responsive)
<ChatWindow />

// Individual message display with icon rendering
<ChatMessage />

// Parse and render responses with inline Lucide icons
<IconResponse content="..." />

// Always-visible quick action buttons
<QuickActions />

// Single-line user input
<ChatInput />
```

### Customization

#### Add New Intent

Edit `src/chatbot/data/intents.json`:
```json
{
  "custom_intent": {
    "keywords": ["keyword1", "keyword2"],
    "response": "Response with [mail] icon markers",
    "icon": "brain"
  }
}
```

#### Add New Project Detection

Edit `src/chatbot/utils/messageProcessor.ts`:
```typescript
const projectMap = {
  'your-project': { slug: 'your-slug', name: 'Your Project Name' },
  // Add new project
};
```

#### Update Knowledge Base

Edit `src/chatbot/data/documentContent.ts`:
```typescript
export const documentContent = [
  {
    section: 'Your Section',
    content: '...',
    keywords: ['keyword1', 'keyword2'],
  },
  // Add new section
];
```

### Chatbot Configuration

The chatbot behavior can be customized in `src/chatbot/utils/messageProcessor.ts`:

```typescript
// Confidence thresholds for intent matching
const INTENT_THRESHOLD = 0.5;

// Number of keywords to match for document search
const MIN_KEYWORD_MATCHES = 2;

// Project detection keywords
const PROJECT_KEYWORDS = {
  'cmh': { slug: 'cmh', ...},
  'smartmaint': { slug: 'smartmaint', ...},
};
```

---

## 🐛 Troubleshooting

### Development Issues

**Issue: Hot reload not working**
```bash
# Restart dev server
npm run dev
```

**Issue: Tailwind classes not applying**
```bash
# Check tailwind.config.js content paths
# Rebuild CSS
npm run dev
```

**Issue: Dark mode not persisting**
```bash
# Check localStorage is enabled
# Clear browser cache
# Hard refresh (Ctrl+Shift+R)
```

### Build Issues

**Issue: Build fails with TypeScript errors**
```bash
# Check for type errors
npx tsc --noEmit

# Fix errors and rebuild
npm run build
```

**Issue: Images not loading in production**
```bash
# Verify public/ folder assets exist
# Check base path in vite.config.ts
# Rebuild and test
```

---

## 📚 Resources & Documentation

### Official Documentation
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Vite Guide](https://vitejs.dev)

### Useful Links
- [GitHub Repository](https://github.com/mahmoud-ath/mahmoud-portfolio)
- [Live Portfolio](https://mahmoud-portfolio.vercel.app)
- [Contact Email](mailto:elgharib.mahmoud2@gmail.com)

---

## 👥 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **Framer Motion** for smooth animations
- **Tailwind CSS** for beautiful styling
- **Lucide Icons** for gorgeous icons
- **React Community** for amazing tools and resources

---

## 📞 Contact & Social

- **Email**: elgharib.mahmoud2@gmail.com
- **Phone**: +212 636-167511
- **GitHub**: [@mahmoud-ath](https://github.com/mahmoud-ath)
- **LinkedIn**: [Mahmoud EL GHARIB](https://linkedin.com/in/mahmoud-el-gharib)
- **Twitter**: [@mahmoud_gharib](https://twitter.com/mahmoud_gharib)

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Maintained by**: Mahmoud EL GHARIB
