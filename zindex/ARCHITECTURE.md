# 🏗️ Portfolio Application Architecture

> Complete technical architecture documentation for the Mahmoud EL GHARIB Portfolio Website. This document covers system design, data flow, component hierarchy, and technical patterns.

**Version**: 1.0.0  
**Last Updated**: December 2024  
**Framework**: React 19.2 + TypeScript 5.8 + Vite 6.2

---

## 📑 Table of Contents

1. [System Architecture Overview](#system-architecture-overview)
2. [Directory Structure](#directory-structure)
3. [Component Hierarchy](#component-hierarchy)
4. [Chatbot System Architecture](#chatbot-system-architecture)
5. [Data Flow Architecture](#data-flow-architecture)
6. [Routing Architecture](#routing-architecture)
7. [State Management](#state-management)
8. [Styling Architecture](#styling-architecture)
9. [Performance Architecture](#performance-architecture)
10. [Build & Deployment](#build--deployment)
11. [Design Patterns](#design-patterns)

---

## 🏛️ System Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            Presentation Layer (React)               │  │
│  │                                                      │  │
│  │  Header  │  Hero  │  Skills  │  Projects  │  Footer │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
           │                    │                    │
           ▼                    ▼                    ▼
┌─────────────────────────────────────────────────────────────┐
│                  STATE MANAGEMENT LAYER                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  DarkModeContext │ Custom Hooks │ React.Context    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
           │                    │                    │
           ▼                    ▼                    ▼
┌─────────────────────────────────────────────────────────────┐
│                    BUSINESS LOGIC LAYER                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Hooks │ Utilities │ Helpers │ Custom Functions    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
           │                    │                    │
           ▼                    ▼                    ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Static Data │ TypeScript Types │ Configuration    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
           │                    │                    │
           ▼                    ▼                    ▼
┌─────────────────────────────────────────────────────────────┐
│                    EXTERNAL RESOURCES                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Public Assets │ localStorage │ Social Links      │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Architecture Principles

| Principle | Description | Implementation |
|-----------|-------------|-----------------|
| **Separation of Concerns** | Clear division between UI, logic, and data | Folder structure by responsibility |
| **Component Composition** | Small, reusable, focused components | Functional components with single purpose |
| **Type Safety** | Full TypeScript coverage | Interface-first approach |
| **Immutability** | Functional approach to state | No direct state mutations |
| **Performance** | Optimized rendering and assets | Code splitting, lazy loading |
| **Accessibility** | WCAG compliance | Semantic HTML, ARIA labels |
| **Responsiveness** | Mobile-first design | Tailwind breakpoints |

---

## 📂 Directory Structure & Purpose

### Root Level

```
mahmoud-portfolio-v1/
├── src/                          # Source code
├── public/                       # Static assets (images, videos, PDFs)
├── zindex/                       # Documentation archive
├── package.json                  # Dependencies & scripts
├── vite.config.ts               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── index.html                   # HTML entry point
└── README.md                    # This file
```

### Source Directory (`src/`)

#### 1. Components Directory (`src/components/`)

**Purpose**: All React components organized by feature/layout

```
components/
│
├── effect-animation/            # Special effects & animations
│   ├── CustomCursor.tsx         # Interactive cursor effect
│   ├── BlobCursor.tsx           # Blob morphing animation
│   ├── DecryptedText.tsx        # Text character reveal animation
│   └── GradientCursor.tsx       # Gradient-based cursor
│
├── layout/                       # Page layout components
│   ├── Header.tsx               # Navigation & theme toggle
│   │   ├── Desktop nav menu
│   │   ├── Mobile hamburger menu
│   │   ├── Dark mode toggle button
│   │   ├── CV download link
│   │   └── Scroll detection for active section
│   │
│   ├── SideElements.tsx         # Floating decorative elements
│   │   ├── Social media icons
│   │   ├── Navigation shortcuts
│   │   └── Scroll indicators
│   │
│   └── BottomNav.tsx            # Optional mobile bottom navigation
│
├── section/                      # Major page sections
│   │
│   ├── Hero.tsx                 # Landing section
│   │   ├── Hero image (mobile/desktop variants)
│   │   ├── Animated text intro
│   │   ├── CTA buttons
│   │   └── Blob cursor integration
│   │
│   ├── Skills.tsx               # Skills showcase
│   │   ├── Skills by category
│   │   ├── Proficiency indicators
│   │   ├── Hover animations
│   │   └── Responsive grid
│   │
│   ├── Testimonials.tsx         # Client testimonials
│   │   ├── Testimonial cards
│   │   ├── Author info
│   │   └── Star ratings
│   │
│   ├── Contact.tsx              # Contact section
│   │   ├── Contact info cards
│   │   ├── Social links
│   │   ├── Email form (optional)
│   │   └── Call-to-action
│   │
│   ├── Projects.tsx             # Featured projects (homepage)
│   │   ├── Featured projects grid (3-6 projects)
│   │   ├── Project card component
│   │   ├── Quick project preview
│   │   └── "View All" button to projects page
│   │
│   ├── experience/              # Experience subsystem
│   │   ├── ExperienceTabs.tsx   # Main component with tab switching
│   │   │   ├── Tab navigation
│   │   │   ├── Tab content switching
│   │   │   └── Responsive layout
│   │   │
│   │   └── tabs/
│   │       ├── Education.tsx
│   │       │   ├── School name & logo
│   │       │   ├── Degree & field
│   │       │   ├── Duration
│   │       │   └── Achievements
│   │       │
│   │       ├── Certifications.tsx
│   │       │   ├── Certification cards
│   │       │   ├── Issuing organization
│   │       │   ├── Date earned
│   │       │   └── Verification links
│   │       │
│   │       ├── Leadership.tsx
│   │       │   ├── Leadership roles
│   │       │   ├── Organization
│   │       │   ├── Responsibilities
│   │       │   └── Timeline
│   │       │
│   │       └── WorkHistory.tsx
│   │           ├── Company & position
│   │           ├── Duration & location
│   │           ├── Key responsibilities
│   │           └── Technologies used
│   │
│   └── projects/                # Projects subsystem (complex)
│       │
│       ├── ProjectsPage.tsx     # Projects dashboard/listing page
│       │   ├── Project filtering system
│       │   ├── Project dashboard with sidebar
│       │   ├── Project grid display
│       │   ├── Mobile category pills
│       │   ├── View toggle (grid/list)
│       │   └── Back to Home button
│       │
│       ├── ProjectDetail.tsx    # Individual project detail page
│       │   ├── Project header (title, date, tags)
│       │   ├── Tab navigation
│       │   ├── Tab content rendering
│       │   ├── Back navigation buttons
│       │   ├── Related projects
│       │   └── Responsive layout
│       │
│       ├── dashboard/
│       │   ├── ProjectSidebar.tsx
│       │   │   ├── Navigation section (Back to Home)
│       │   │   ├── Analytics section (stats cards)
│       │   │   └── Category filter section
│       │   │
│       │   ├── ProjectFilters.tsx
│       │   │   ├── Category selection
│       │   │   ├── Tag filters
│       │   │   ├── Tier selection
│       │   │   └── Search functionality
│       │   │
│       │   ├── ProjectGrid.tsx
│       │   │   ├── Project card grid
│       │   │   ├── Responsive layout
│       │   │   └── Hover effects
│       │   │
│       │   └── ProjectList.tsx
│       │       ├── Project list view
│       │       ├── Expandable cards
│       │       └── Quick project info
│       │
│       └── detail/
│           ├── ProjectHeader.tsx
│           │   ├── Project title
│           │   ├── Project description
│           │   ├── Tags/categories
│           │   ├── Date created
│           │   └── Links (GitHub, demo)
│           │
│           ├── TabNavigation.tsx
│           │   ├── Tab button group
│           │   ├── Active tab indicator
│           │   ├── Mobile responsive tabs
│           │   └── Animation transitions
│           │
│           └── tabs/
│               ├── GalleryTab.tsx
│               │   ├── Image gallery with hover
│               │   ├── Lightbox modal
│               │   ├── Fixed-size image container
│               │   ├── Keyboard navigation
│               │   ├── Image counter
│               │   ├── Dot navigation
│               │   └── Zoom controls
│               │
│               ├── DescriptionTab.tsx
│               │   ├── Formatted project description
│               │   ├── Problem statement
│               │   ├── Solution overview
│               │   └── Results & outcomes
│               │
│               ├── FeaturesTab.tsx
│               │   ├── Feature list
│               │   ├── Feature icons
│               │   ├── Feature descriptions
│               │   └── Checkmarks/badges
│               │
│               ├── TechnologiesTab.tsx
│               │   ├── Tech stack display
│               │   ├── Tech icons
│               │   ├── Tech descriptions
│               │   └── Badge colors by category
│               │
│               ├── DocumentationTab.tsx
│               │   ├── PDF viewer/links
│               │   ├── Documentation list
│               │   ├── Download buttons
│               │   └── External links
│               │
│               └── LinksTab.tsx
│                   ├── Project links
│                   ├── GitHub repository
│                   ├── Live demo
│                   ├── Case study
│                   └── Video tutorials
│
└── ui/                          # Reusable UI components
    ├── Button.tsx               # Generic button component
    ├── Card.tsx                 # Reusable card wrapper
    ├── Badge.tsx                # Tag/badge component
    ├── Tabs.tsx                 # Tab component
    ├── Modal.tsx                # Modal/dialog component
    └── Input.tsx                # Form input component

└── chatbot/                     # 🤖 AI Assistant Chatbot
    ├── components/
    │   ├── ChatWindow.tsx       # Main chat container
    │   │   ├── Message management state
    │   │   ├── Input handling
    │   │   ├── Message processing pipeline
    │   │   └── Auto-scroll behavior
    │   │
    │   ├── ChatMessage.tsx      # Message display
    │   │   ├── User message rendering
    │   │   ├── Bot message rendering
    │   │   ├── Project redirect button
    │   │   └── ArrowRight icon for projects
    │   │
    │   ├── IconResponse.tsx     # Icon parsing & rendering
    │   │   ├── Content parsing (line-by-line)
    │   │   ├── Icon pattern detection [iconName]
    │   │   ├── Lucide icon rendering
    │   │   └── Deduplication logic
    │   │
    │   ├── QuickActions.tsx     # Quick action buttons
    │   │   ├── Brain (Skills query)
    │   │   ├── Code2 (Projects query)
    │   │   ├── Briefcase (About query)
    │   │   └── FileText (CV query)
    │   │
    │   ├── ChatInput.tsx        # User input field
    │   │   ├── Single-line input
    │   │   ├── onChange handler
    │   │   └── onSubmit handler
    │   │
    │   └── types.ts             # Chatbot TypeScript interfaces
    │       ├── Message interface
    │       ├── ProcessedMessage interface
    │       ├── Intent interface
    │       └── DocumentSection interface
    │
    ├── utils/
    │   ├── messageProcessor.ts  # 4-stage message routing
    │   │   ├── projectDetection() - Step 0
    │   │   ├── contextualResponses() - Step 1
    │   │   ├── intentMatching() - Step 2
    │   │   ├── documentSearch() - Step 3
    │   │   ├── fallbackResponse() - Step 4
    │   │   ├── projectMap configuration
    │   │   └── confidence scoring
    │   │
    │   ├── intentMatcher.ts     # Intent matching logic
    │   │   ├── loadIntents()
    │   │   ├── matchIntent()
    │   │   ├── calculateConfidence()
    │   │   └── getMatchedIntent()
    │   │
    │   ├── documentSearch.ts    # Knowledge base search
    │   │   ├── loadDocuments()
    │   │   ├── searchDocuments()
    │   │   ├── calculateRelevance()
    │   │   └── getTopMatch()
    │   │
    │   └── iconMapping.ts       # 22+ Lucide icon config
    │       ├── Icon definitions (22+ icons)
    │       ├── Color assignments
    │       ├── getIcon()
    │       └── getIconWithColor()
    │
    └── data/
        ├── intents.json         # 12 intents with metadata
        │   ├── greet
        │   ├── collaboration
        │   ├── about_me
        │   ├── skills
        │   ├── projects
        │   ├── experience
        │   ├── contact
        │   ├── cv_download
        │   ├── help
        │   ├── location
        │   ├── farewell
        │   └── greeting_follow
        │
        └── documentContent.ts   # 7 knowledge base sections
            ├── CMH Data Management
            ├── SmartMaint Predictive Maintenance
            ├── Morocco Road Accidents Analysis
            ├── Skills Overview
            ├── Education & Certifications
            ├── Experience & Leadership
            └── Languages & Interests
```

#### 2. Contexts Directory (`src/contexts/`)

**Purpose**: Global state management with React Context API

```
contexts/
└── DarkModeContext.tsx
    ├── Context Definition
    │   ├── DarkModeContextType interface
    │   └── DarkModeContext creation
    │
    ├── DarkModeProvider component
    │   ├── State management (isDarkMode)
    │   ├── Loading state (prevent flash)
    │   ├── localStorage persistence
    │   ├── System preference detection
    │   ├── Theme application logic
    │   └── Provider wrapper
    │
    └── useDarkMode hook
        ├── Context retrieval
        ├── Error handling
        └── Type-safe returns (isDarkMode, toggleDarkMode)
```

**Data Flow**:
```
App.tsx
  └── <DarkModeProvider>
      ├── Detects system preference
      ├── Loads saved theme from localStorage
      ├── Applies 'dark' class to <html>
      │
      └── All child components
          └── useDarkMode() hook
              ├── Access isDarkMode state
              ├── Access toggleDarkMode function
              └── Update Tailwind dark: classes
```

#### 3. Library Directory (`src/lib/`)

**Purpose**: Shared utilities, types, and data

```
lib/
│
├── data/                        # Static data files
│   │
│   ├── portfolio.ts             # Main portfolio data (possibly)
│   │
│   ├── projects/
│   │   ├── projects.ts          # All project data & metadata
│   │   │   ├── CMH Data Management System
│   │   │   ├── SmartMaint Predictive Maintenance
│   │   │   ├── Morocco Road Accidents Analysis
│   │   │   ├── Tech Horizon Magazine
│   │   │   ├── Energy Consumption Prediction
│   │   │   ├── Markus Pub Website
│   │   │   ├── WhatsApp Chat Analyzer
│   │   │   ├── Titanic Survivor Prediction
│   │   │   └── Watchly AI
│   │   │
│   │   └── empty_projects.ts    # Template for new projects
│   │
│   ├── skills.ts                # Skills by category
│   │   ├── Languages (Python, JavaScript, etc.)
│   │   ├── AI/ML Frameworks
│   │   ├── Data Science Tools
│   │   ├── Web Development
│   │   ├── Databases
│   │   └── Tools & Platforms
│   │
│   ├── experience.ts            # Professional experience
│   │   ├── Education
│   │   ├── Certifications
│   │   ├── Work History
│   │   └── Leadership Roles
│   │
│   ├── testimonials.ts          # Client/peer testimonials
│   │   ├── Name & title
│   │   ├── Company
│   │   ├── Testimonial text
│   │   ├── Avatar
│   │   └── Rating
│   │
│   └── social_links.ts          # Social media configuration
│       ├── GitHub
│       ├── LinkedIn
│       ├── Twitter
│       ├── Email
│       └── Phone
│
├── hooks/                       # Custom React hooks
│   │
│   ├── useCurrentSection.ts
│   │   ├── Tracks active section in viewport
│   │   ├── Detects scroll position
│   │   ├── Updates header highlight
│   │   └── Returns currentSection string
│   │
│   ├── useProjectFilter.ts
│   │   ├── Manages project filtering state
│   │   ├── Filter by category
│   │   ├── Filter by tier
│   │   ├── Filter by tags
│   │   ├── Returns filtered projects
│   │   └── Provides filter setters
│   │
│   ├── useProjectStats.ts
│   │   ├── Calculates project statistics
│   │   ├── Total projects count
│   │   ├── Count by category
│   │   ├── Average project metrics
│   │   └── Returns stats object
│   │
│   └── index.ts                 # Hook exports
│
├── types/                       # TypeScript interfaces
│   │
│   ├── Project_Section.ts       # Project type definitions
│   │   ├── Project interface
│   │   ├── ProjectCategory enum
│   │   ├── ProjectTier enum
│   │   └── ProjectLink interface
│   │
│   ├── Experience.ts            # Experience type definitions
│   │   ├── EducationItem
│   │   ├── CertificationItem
│   │   ├── WorkItem
│   │   └── LeadershipItem
│   │
│   ├── Portfolio.ts             # Portfolio type definitions
│   │   ├── PortfolioState
│   │   ├── PortfolioConfig
│   │   └── PortfolioMetadata
│   │
│   └── index.ts                 # Type exports
│
└── utils/                       # Utility functions
    │
    ├── projectUtils.ts          # Project-specific utilities
    │   ├── getFeaturedProjects()
    │   ├── filterProjectsByCategory()
    │   ├── filterProjectsByTier()
    │   ├── sortProjectsByDate()
    │   ├── sortProjectsByImpact()
    │   └── calculateProjectStats()
    │
    ├── helpers.ts               # Common helper functions
    │   ├── String manipulation
    │   ├── Date formatting
    │   ├── Array utilities
    │   └── Object utilities
    │
    ├── utils.ts                 # General utilities
    │   ├── Formatting functions
    │   ├── Validation functions
    │   └── Conversion functions
    │
    ├── decryptPresets.ts        # Encryption utilities (optional)
    │   ├── Preset encryption
    │   └── Decryption logic
    │
    ├── iconify.ts               # Icon utilities (optional)
    │   ├── Icon mapping
    │   └── Icon rendering
    │
    └── lazyLoading.ts           # Lazy loading utilities (optional)
        ├── Image lazy loading
        └── Component code splitting
```

#### 4. App Root (`src/`)

```
src/
├── App.tsx                      # Main application component
│   ├── Router logic (hash-based)
│   ├── Page rendering
│   ├── Layout components
│   └── DarkModeProvider wrapper
│
├── index.tsx                    # React entry point
│   ├── React.createRoot()
│   ├── App component render
│   └── Root mounting
│
├── index.css                    # Global styles
│   ├── Tailwind directives
│   ├── Custom CSS variables
│   ├── Global resets
│   └── Animation keyframes
│
├── config.ts                    # Site configuration
│   ├── Personal information
│   ├── Social media links
│   ├── Theme colors
│   ├── Navigation config
│   └── API endpoints (if any)
│
├── constants.ts                 # Global constants
│   ├── SOCIAL_LINKS array
│   ├── SOCIAL_LINKS_DATA object
│   ├── PROJECT_CATEGORIES
│   ├── SKILLS_CATEGORIES
│   └── Other constants
│
└── metadata.json                # Site metadata
    ├── Title
    ├── Description
    ├── Keywords
    └── Author info
```

### Public Directory (`public/`)

```
public/
│
├── CV/
│   └── Resume.pdf               # Downloadable PDF resume
│
├── Projects/                    # Project-specific media
│   ├── 1.cmh-data-management-system/
│   │   ├── images/              # Screenshots & thumbnails
│   │   ├── videos/              # Project demo videos
│   │   └── docs/                # PDF documentation
│   │
│   ├── 2.smartmaint-predictive-maintenance/
│   ├── 3.morocco-road-accidents-analysis/
│   ├── 4.tech-horizon-magazine/
│   ├── 5.energy-consumption-prediction-cart/
│   ├── 6.markus-pub-website-officiel/
│   ├── 7.whatsapp-chat-analyzer/
│   ├── 8.titanic-survivor-prediction/
│   ├── 9.watchly-ai/
│   └── DEFAULT/                 # Default/placeholder media
│
├── Experience/                  # Experience-related media
│   ├── certifications/          # Certificate images/PDFs
│   └── docs/                    # Experience documents
│
├── Skills/                      # Skill-related media
│   └── logos/                   # Technology logos
│
└── General/                     # General assets
    ├── profile-photo.jpg
    └── background-images/
```

---

## 🔗 Component Hierarchy

### Component Tree Overview

```
App
├── DarkModeProvider
│   ├── Header
│   │   ├── Logo
│   │   ├── Desktop Navigation
│   │   │   └── NavItem[] (with icons & labels)
│   │   ├── Mobile Menu
│   │   │   └── NavItem[] (full labels)
│   │   ├── CV Button
│   │   └── Dark Mode Toggle (Sun/Moon Icon)
│   │
│   ├── SideElements
│   │   ├── Social Media Icons
│   │   ├── Navigation Shortcuts
│   │   └── Scroll Indicators
│   │
│   ├── CustomCursor
│   │   └── Animated Cursor Shape
│   │
│   ├── Main Content (based on currentPage)
│   │   │
│   │   ├── Home Page Route
│   │   │   ├── Hero
│   │   │   │   ├── Mobile Image
│   │   │   │   ├── Desktop Image
│   │   │   │   ├── Animated Text
│   │   │   │   └── CTA Buttons
│   │   │   │
│   │   │   ├── Skills
│   │   │   │   ├── Section Header
│   │   │   │   ├── Skills Container
│   │   │   │   └── SkillCard[]
│   │   │   │       ├── Category Badge
│   │   │   │       └── Proficiency Bar
│   │   │   │
│   │   │   ├── Experience
│   │   │   │   ├── Tabs
│   │   │   │   │   ├── Education Tab
│   │   │   │   │   ├── Certifications Tab
│   │   │   │   │   ├── Work History Tab
│   │   │   │   │   └── Leadership Tab
│   │   │   │   └── Tab Content
│   │   │   │       └── Item Cards
│   │   │   │
│   │   │   ├── Projects (Featured)
│   │   │   │   ├── Section Header
│   │   │   │   ├── Project Grid (3-6)
│   │   │   │   │   └── ProjectCard[]
│   │   │   │   │       ├── Image
│   │   │   │   │       ├── Title
│   │   │   │   │       ├── Description
│   │   │   │   │       └── Tags
│   │   │   │   └── View All Button
│   │   │   │
│   │   │   ├── Testimonials
│   │   │   │   ├── Section Header
│   │   │   │   └── Testimonial Carousel
│   │   │   │       └── TestimonialCard[]
│   │   │   │           ├── Author Info
│   │   │   │           ├── Quote Text
│   │   │   │           └── Rating
│   │   │   │
│   │   │   └── Contact
│   │   │       ├── Section Header
│   │   │       ├── Contact Cards
│   │   │       │   ├── Email Card
│   │   │       │   ├── Phone Card
│   │   │       │   └── Location Card
│   │   │       └── Social Links
│   │   │
│   │   ├── Projects Page Route
│   │   │   ├── ProjectsPage
│   │   │   │   ├── ProjectSidebar
│   │   │   │   │   ├── Navigation Section
│   │   │   │   │   │   └── Back to Home Button
│   │   │   │   │   ├── Analytics Section
│   │   │   │   │   │   └── Stats Cards
│   │   │   │   │   └── Categories Section
│   │   │   │   │       └── Category Buttons
│   │   │   │   ├── Main Content
│   │   │   │   │   ├── Project Filters (Mobile)
│   │   │   │   │   ├── View Toggle
│   │   │   │   │   └── Project Grid
│   │   │   │   │       └── ProjectCard[]
│   │   │   │   └── Mobile Category Pills
│   │   │   │
│   │   │   └── ProjectDetail Route
│   │   │       ├── ProjectHeader
│   │   │       ├── TabNavigation
│   │   │       └── Tab Content Panels
│   │   │           ├── GalleryTab
│   │   │           │   ├── Image Gallery Grid
│   │   │           │   │   └── Image Card[]
│   │   │           │   └── Lightbox Modal
│   │   │           │       ├── Image Container
│   │   │           │       ├── Navigation Buttons
│   │   │           │       ├── Image Counter
│   │   │           │       ├── Dot Indicators
│   │   │           │       └── Footer Info
│   │   │           │
│   │   │           ├── DescriptionTab
│   │   │           ├── FeaturesTab
│   │   │           ├── TechnologiesTab
│   │   │           ├── DocumentationTab
│   │   │           └── LinksTab
│   │   │
│   │   └── Fallback (Error Route)
│   │
│   └── BottomNav (Optional)
│       └── Bottom Navigation Items
│
└── Loader Overlay (Optional)
    └── Loading indicator
```

### Component Dependencies Map

```
Header
├── useDarkMode (from DarkModeContext)
├── useCurrentSection (custom hook)
├── lucide-react icons (Moon, Sun, Menu, etc.)
└── framer-motion (animations)

Projects (Featured)
├── getFeaturedProjects (utility)
├── ProjectCard
├── SectionHeader
└── framer-motion

ProjectsPage
├── ProjectSidebar
├── ProjectFilters
├── ProjectGrid
├── useProjectFilter (custom hook)
├── useProjectStats (custom hook)
└── projectsData (static data)

ProjectDetail
├── ProjectHeader
├── TabNavigation
├── GalleryTab
├── DescriptionTab
├── FeaturesTab
├── TechnologiesTab
├── DocumentationTab
├── LinksTab
└── Project data (props)

GalleryTab
├── lucide-react (ChevronLeft, ChevronRight, X)
├── framer-motion (animations)
└── Image dimension calculations
```

---

## 🤖 Chatbot System Architecture

### Overview

The chatbot is an intelligent Q&A system integrated into the portfolio that provides interactive assistance to visitors. It uses a **hybrid approach combining rule-based intent matching with semantic document search** to deliver comprehensive responses.

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    ChatWindow (Container)                    │
│  ├── State: messages[], inputValue, isLoading               │
│  ├── Effect: Auto-scroll to latest message                  │
│  └── Styles: w-80, max-h-500px, responsive                 │
└─────────────────────────────────────────────────────────────┘
         │
         ├─────────────────────────────────────────┐
         │                                         │
         ▼                                         ▼
┌──────────────────────────────┐    ┌──────────────────────────┐
│   Message List (ChatMessage) │    │   Input Section          │
│                              │    │                          │
│  ├─ User Message            │    ├─ ChatInput              │
│  │  └─ Plain text           │    │  └─ onChange handler    │
│  │                          │    │  └─ onSubmit handler    │
│  └─ Bot Message            │    │                          │
│     ├─ IconResponse         │    └─ QuickActions          │
│     │  └─ Lucide icons      │       ├─ Brain (Skills)     │
│     └─ Project redirect btn │       ├─ Code (Projects)    │
│        └─ ArrowRight icon   │       ├─ Briefcase (About)  │
│                              │       └─ File (CV)         │
└──────────────────────────────┘    └──────────────────────────┘
         │                                    │
         └────────────────┬───────────────────┘
                          │
                          ▼
         ┌─────────────────────────────────────┐
         │   messageProcessor (Processing)     │
         │                                     │
         │  4-Stage Message Routing:           │
         │  1. projectDetection()              │
         │  2. contextualResponses()           │
         │  3. intentMatching()                │
         │  4. documentSearch()                │
         │  5. fallbackResponse()              │
         │                                     │
         │  Returns:                           │
         │  - response: string                 │
         │  - source: 'project'|...           │
         │  - intent?: string                 │
         │  - projectSlug?: string            │
         └─────────────────────────────────────┘
```

### Message Processing Pipeline

#### Stage 0: Project Detection

**Purpose**: Recognize when users ask about specific projects and provide direct redirects

```typescript
// Project mapping
const projectMap = {
  'cmh': { slug: 'cmh', name: 'CMH Data Management System' },
  'smartmaint': { slug: 'smartmaint', name: 'SmartMaint Predictive Maintenance' },
  'morocco': { slug: 'morocco', name: 'Morocco Road Accidents Analysis' },
  'tech-horizon': { slug: 'tech-horizon', name: 'Tech Horizon Magazine' },
  'energy': { slug: 'energy', name: 'Energy Consumption Prediction' },
  'watchly': { slug: 'watchly', name: 'Watchly AI' },
};

// When project detected:
// 1. Generate snippet with key metrics
// 2. Create message with source: 'project'
// 3. ChatMessage renders redirect button
// 4. Button click navigates to /#/projects/[slug]
```

#### Stage 1: Contextual Response Detection

**Purpose**: Detect client inquiries and collaboration offers

```typescript
// Client detection keywords
if (message.includes('client') || message.includes('freelance')) {
  return clientCollaborationResponse;
}

// Collaboration keywords
if (message.includes('hire') || message.includes('work together')) {
  return collaborationOfferResponse;
}
```

#### Stage 2: Intent Matching

**Purpose**: Match user input against predefined intents

**Intents** (12 total):
- `greet` - Initial greeting
- `collaboration` - Partnership inquiries
- `about_me` - Professional background
- `skills` - Technical expertise
- `projects` - Project portfolio
- `experience` - Work history
- `contact` - Contact information
- `cv_download` - Resume requests
- `help` - Chatbot help
- `location` - Location/availability
- `farewell` - Goodbye
- `greeting_follow` - Follow-ups

**Intent Structure** (from `intents.json`):
```typescript
interface Intent {
  keywords: string[];           // Keywords to match against
  response: string;             // Response with [iconName] markers
  icon: string;                 // Associated Lucide icon
  confidence?: number;          // Match confidence (0-1)
}
```

#### Stage 3: Document Search

**Purpose**: Search knowledge base for relevant information

**Knowledge Base Sections** (7 total):

```typescript
interface DocumentSection {
  section: string;              // Section name
  content: string;              // Full text content
  keywords: string[];           // Search keywords
}
```

| Section | Content | Size |
|---------|---------|------|
| CMH Data Management | 50K+ records, 500K+ emails, 92% accuracy | ~2500 chars |
| SmartMaint | Predictive maintenance, ML algorithms | ~2000 chars |
| Morocco Accidents | Analytics, road safety, visualization | ~1800 chars |
| Skills Overview | Programming languages, frameworks, tools | ~2200 chars |
| Education | Master's AI2SD, Bachelor's Data Analytics | ~1500 chars |
| Experience & Leadership | Team leadership, project management | ~2400 chars |
| Languages & Interests | Language proficiency, tech interests | ~1200 chars |

**Search Algorithm**:
```
1. Split message into keywords
2. For each document section:
   a. Count keyword matches
   b. Calculate relevance score
3. Return highest matching section
4. If score > MIN_KEYWORD_MATCHES (2):
   → Use document section as response
```

#### Stage 4: Fallback Response

**Purpose**: Provide helpful guidance when no match found

Returns generic response with suggestions to use quick actions.

### Component Structure

```
ChatWindow (Container & Logic)
├── State: messages[], inputValue, isLoading
├── Effect: Handle auto-scroll
├── Handler: onSendMessage()
│   └── calls messageProcessor()
│
├── ChatMessage (Message Display)
│   ├── If source === 'project':
│   │   ├── Display text
│   │   └── Show redirect button
│   │
│   └── If source === 'intent'|'document'|'fallback':
│       └── Use IconResponse
│
├── IconResponse (Icon Rendering)
│   ├── Split content by newlines
│   ├── Detect [iconName] pattern per line
│   ├── Get icon from iconMapping
│   ├── Render: <Icon /> + text
│   └── Prevent duplication with line-by-line parsing
│
├── ChatInput (User Input)
│   └── Single-line input
│
└── QuickActions (Persistent Buttons)
    ├── Brain - Ask about skills
    ├── Code2 - Explore projects
    ├── Briefcase - About you
    └── FileText - Download CV
```

### Icon Mapping System

**File**: `src/chatbot/utils/iconMapping.ts`

```typescript
export const iconMapping = {
  mail: { icon: Mail, color: 'text-blue-500' },
  code: { icon: Code2, color: 'text-purple-500' },
  database: { icon: Database, color: 'text-green-500' },
  award: { icon: Award, color: 'text-yellow-500' },
  checkmark: { icon: CheckCircle, color: 'text-green-500' },
  arrow: { icon: ArrowRight, color: 'text-red-500' },
  brain: { icon: Brain, color: 'text-blue-500' },
  linkedin: { icon: Linkedin, color: 'text-blue-600' },
  github: { icon: Github, color: 'text-gray-700' },
  briefcase: { icon: Briefcase, color: 'text-orange-500' },
  // ... 12+ more icons
};

// Usage in responses:
// "You can reach me at [mail] or connect on [linkedin]"
```

### Data Types

```typescript
// Message type (updated)
interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  source?: 'intent' | 'document' | 'fallback' | 'project';
  intentId?: string;
  projectSlug?: string;
}

// Message processor return
interface ProcessedMessage {
  response: string;
  source: 'intent' | 'document' | 'fallback' | 'project';
  intentId?: string;
  projectSlug?: string;
}

// Intent structure
interface Intent {
  keywords: string[];
  response: string;
  icon: string;
  confidence?: number;
}

// Document section
interface DocumentSection {
  section: string;
  content: string;
  keywords: string[];
}
```

### Data Flow Example

**User asks: "Tell me about CMH"**

```
1. ChatWindow receives message
2. Calls messageProcessor(message)
   │
   ├─ Step 0: projectDetection()
   │  └─ Finds "CMH" in projectMap
   │  └─ Returns: {
   │      response: "CMH Data Management System snippet...",
   │      source: 'project',
   │      projectSlug: 'cmh'
   │    }
   │
   └─ DONE (no further stages)

3. ChatMessage component receives message
   └─ source === 'project' → render redirect button
   └─ User clicks → navigate to /#/projects/cmh

4. ProjectDetail page opens with CMH project
```

**User asks: "What are your skills?"**

```
1. ChatWindow receives message
2. Calls messageProcessor(message)
   │
   ├─ Step 0: projectDetection()
   │  └─ No project found → Continue
   │
   ├─ Step 1: contextualResponses()
   │  └─ No client inquiry → Continue
   │
   ├─ Step 2: intentMatching()
   │  └─ Matches 'skills' intent
   │  └─ Returns: {
   │      response: "I specialize in Python [code] ML [brain]...",
   │      source: 'intent',
   │      intentId: 'skills'
   │    }
   │
   └─ DONE

3. ChatMessage component receives message
   └─ Uses IconResponse component
   └─ IconResponse parses and renders inline icons
```

### Processing Configuration

Thresholds and settings in `messageProcessor.ts`:

```typescript
// Intent matching confidence threshold
const INTENT_THRESHOLD = 0.5;

// Minimum keyword matches for document search
const MIN_KEYWORD_MATCHES = 2;

// Project keywords mapping
const PROJECT_KEYWORDS = {
  cmh: 'cmh-data-management-system',
  smartmaint: 'smartmaint-predictive-maintenance',
  // ...
};

// Confidence calculation
const confidence = matchedKeywords.length / intent.keywords.length;
```

### Features

**Multi-Source Responses**
- Projects → Redirect button
- Intents → Icon-rich formatted responses
- Documents → Knowledge base content
- Fallback → Helpful suggestions

**Social Intelligence**
- Client inquiry detection
- Collaboration offer detection
- Context-aware responses

**Professional UI**
- 22+ Lucide icons (no emoji)
- Compact responsive design
- Smooth animations
- Quick action buttons (always visible)

**Project Recognition**
- 6 projects mapped
- Auto-detection with keywords
- Snippet + redirect system
- Project detail page integration

---

## 📊 Data Flow Architecture

### State Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      App.tsx (Root)                          │
│                                                              │
│  State: currentPage                                          │
│  State: selectedProjectSlug                                 │
│                                                              │
│  Event: window.hashchange listener                           │
│  → Updates currentPage based on URL hash                    │
└─────────────────────────────────────────────────────────────┘
         │
         ├─────────────────────────────────────────────┐
         │                                             │
         ▼                                             ▼
┌──────────────────────────────┐      ┌──────────────────────────┐
│   DarkModeProvider           │      │  Main Content Router     │
│                              │      │                          │
│  State: isDarkMode           │      │  Route: Home             │
│  State: isLoading            │      │  Route: Projects         │
│  Effect: Load from storage   │      │  Route: ProjectDetail    │
│  Effect: Detect system pref  │      │  Route: Fallback         │
│                              │      │                          │
│  Provides:                   │      │  Provides via Props:     │
│  - isDarkMode               │      │  - onProjectSelect       │
│  - toggleDarkMode()         │      │  - onBackToHome          │
└──────────────────────────────┘      └──────────────────────────┘
         │                                      │
         ├─ Consumed by ─────┬─────────────────┤
         │                   │                  │
         ▼                   ▼                  ▼
    Header            All Components      ProjectsPage
  ├─ Toggle Button    ├─ dark: classes    ├─ Sidebar
  ├─ Theme Classes    ├─ Tailwind         ├─ Filters
  └─ Background       └─ HTML element     └─ Grid
                                
                              ▼
                        ProjectDetail
                        ├─ Tabs
                        └─ GalleryTab
```

### Data Flow for Project Filtering

```
Projects Page Load
        │
        ▼
 useProjectFilter() Hook
        │
        ├─ State: selectedCategory
        ├─ State: selectedTags
        ├─ State: selectedTier
        │
        ▼
 projectsData (Static)
        │
        ├─ Filter by category
        ├─ Filter by tags
        ├─ Filter by tier
        └─ Sort by impact/date
        │
        ▼
 Filtered Results
        │
        ▼
 ProjectGrid
        │
        └─ Render ProjectCard[]
```

### Data Flow for Theme Switching

```
User Clicks Dark Mode Toggle
        │
        ▼
 Header Click Handler
        │
        └─ Calls: toggleDarkMode()
        │
        ▼
 DarkModeContext
        │
        ├─ Update state: isDarkMode = !isDarkMode
        ├─ Update localStorage: 'theme-mode' = 'dark'|'light'
        └─ Apply class: document.documentElement.classList.add/remove('dark')
        │
        ▼
 Context Subscribers (All Components)
        │
        ├─ useDarkMode() updates
        ├─ React re-renders
        │
        ▼
 Tailwind Processes
        │
        ├─ Apply dark: prefixed styles
        ├─ CSS transitions trigger
        │
        ▼
 Visual Theme Change
        │
        └─ Background: light → dark
           Text colors update
           Border colors update
           All animations transition smoothly
```

### Image Gallery Data Flow

```
GalleryTab Props
├─ images: string[] (image URLs)
└─ title: string

        │
        ▼
 Load Image Dimensions
 (useEffect with Image API)
        │
        └─ For each image:
           ├─ Create Image element
           ├─ Detect naturalWidth/naturalHeight
           ├─ Calculate aspectRatio
           └─ Store in imageDimensions state

        │
        ▼
 Render Image Gallery Grid
        │
        └─ Image Cards[]
           ├─ Hover effects
           ├─ Image number badge
           └─ Click to open lightbox

        │
        ▼
 User Clicks Image
        │
        ├─ Set selectedImageIndex
        ├─ Set lightboxOpen = true
        │
        ▼
 Calculate Optimal Dimensions
        │
        ├─ Get viewport size
        ├─ Get image natural dimensions
        ├─ Calculate scale factor
        └─ Determine final display size

        │
        ▼
 Render Lightbox Modal
        │
        ├─ Display image at calculated dimensions
        ├─ Show navigation buttons
        ├─ Show image counter
        ├─ Enable keyboard navigation
        │
        ▼
 User Navigates (Arrow Keys / Buttons)
        │
        ├─ Update selectedImageIndex
        ├─ Calculate new image dimensions
        ├─ Re-render with animation
        │
        ▼
 User Closes (ESC / X Button)
        │
        └─ Set lightboxOpen = false
           Close modal with fade animation
```

---

## 🛣️ Routing Architecture

### Hash-Based Router Implementation

```typescript
// URL Structure
#                           // Home page
#/projects                  // Projects dashboard
#/projects/{slug}           // Individual project
#/projects/{slug}/gallery   // Project gallery tab
```

### Router Logic Flow

```
Window Load / Hash Change Event
        │
        ▼
 parseHashAndUpdatePage()
        │
        ├─ Get window.location.hash
        ├─ Parse hash string
        ├─ Split by '/'
        │
        ▼
 Determine Current Page
        │
        ├─ If hash = "" or "#"
        │  └─ setCurrentPage('home')
        │
        ├─ If hash = "#/projects" (no slug)
        │  └─ setCurrentPage('projects')
        │
        ├─ If hash = "#/projects/{slug}"
        │  └─ setCurrentPage({ type: 'project', slug })
        │
        └─ Else
           └─ setCurrentPage('home')

        │
        ▼
 useEffect Hook Listeners
        │
        ├─ On mount: Call parseHashAndUpdatePage()
        ├─ Listen to: window.hashchange event
        └─ On cleanup: Remove listener
```

### Navigation Patterns

```javascript
// Navigate to Home
window.location.hash = '#'

// Navigate to Projects Dashboard
window.location.hash = '#/projects'

// Navigate to Specific Project
window.location.hash = `#/projects/${projectSlug}`

// From within React
<a href="#/projects/cmh-data-management">View Project</a>
```

### Mobile Navigation Flow

```
Mobile Menu Open
        │
        ├─ Click "Projects"
        │  └─ Close menu
        │  └─ Navigate to #/projects
        │
        ├─ Click "Home"
        │  └─ Scroll to section
        │  └─ or navigate to #home
        │
        └─ Project Link
           └─ Navigate to #/projects/{slug}
```

---

## 🗂️ State Management

### Context API Structure

#### DarkModeContext

```typescript
interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

// Provider
<DarkModeProvider>
  {/* All child components can use useDarkMode() */}
</DarkModeProvider>

// Usage
const { isDarkMode, toggleDarkMode } = useDarkMode();
```

**State Diagram:**
```
User Preference (localStorage)
        │
        ├─ exists: Use saved value
        └─ not exists: Use system preference
        │
        ▼
 isDarkMode: boolean
        │
        ├─ true → 'dark' class on <html>
        └─ false → no 'dark' class
        │
        ▼
 Tailwind CSS
        │
        ├─ Apply dark: prefixed styles
        └─ Update component colors
```

### Component Local State

**Header Component:**
```typescript
const [isOpen, setIsOpen] = useState(false);           // Mobile menu
const [activeSection, setActiveSection] = useState('home');  // Active nav
const [hoveredItem, setHoveredItem] = useState<string | null>(null);  // Hover
const [currentPage, setCurrentPage] = useState<'home' | 'projects'>('home');
```

**ProjectsPage Component:**
```typescript
const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
const [selectedTags, setSelectedTags] = useState<string[]>([]);
const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
```

**GalleryTab Component:**
```typescript
const [lightboxOpen, setLightboxOpen] = useState(false);
const [selectedImageIndex, setSelectedImageIndex] = useState(0);
const [imageDimensions, setImageDimensions] = useState<Record<number, ImageDimensions>>({});
```

---

## 🎨 Styling Architecture

### Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        themeLight: '#F8F6F6',
        themeDark: '#2A363B',
        themeRed: '#CF4647',
        themeYellow: '#F5D061',
      },
      spacing: { /* custom spacing */ },
      fontSize: { /* custom font sizes */ },
      animation: { /* custom animations */ },
    }
  },
  plugins: [require('tailwindcss-animate')],
}
```

### CSS Layer Organization

```
Global Styles (index.css)
├── @tailwind base
│   └── Resets, typography
├── @tailwind components
│   └── Reusable component classes
└── @tailwind utilities
    └── Responsive utilities

Component Styles
├── Inline className (primary)
├── CSS modules (if needed)
└── Tailwind @apply (for repeated patterns)

Animation Styles
├── Framer Motion (most effects)
├── Tailwind animations (simple)
└── Custom CSS keyframes (specialized)
```

### Dark Mode Implementation

```tsx
// Pattern for dark mode support
<div className="
  bg-white dark:bg-themeDark
  text-gray-900 dark:text-gray-100
  border-gray-200 dark:border-gray-700
  transition-colors duration-300
">
  {/* Content */}
</div>

// Media queries (alternative)
@media (prefers-color-scheme: dark) {
  /* dark mode styles */
}
```

### Responsive Breakpoints

```
Tailwind Breakpoints
├─ default (0px)    Mobile-first
├─ sm (640px)       Small devices
├─ md (768px)       Tablets
├─ lg (1024px)      Desktops
├─ xl (1280px)      Large screens
└─ 2xl (1536px)     Extra large

Usage in Components:
<div className="
  px-4 sm:px-6 md:px-8 lg:px-12
  text-sm sm:text-base md:text-lg
  grid-cols-1 md:grid-cols-2 lg:grid-cols-3
">
```

---

## ⚡ Performance Architecture

### Code Splitting Strategy

```
Entry Point (index.tsx)
        │
        ├─ App.tsx (main bundle)
        │
        ├─ Lazy Load Components
        │  ├─ ProjectsPage (when navigated)
        │  ├─ ProjectDetail (when project selected)
        │  └─ Heavy Modals (on demand)
        │
        └─ CDN Assets (images, videos)
           ├─ public/Projects/
           ├─ public/CV/
           └─ public/Experience/
```

### Asset Optimization

**Images:**
- Responsive images (mobile/desktop variants)
- Lazy loading with IntersectionObserver
- Optimized formats (WebP with JPG fallback)
- Compressed thumbnails for gallery

**JavaScript:**
- Tree-shaking of unused code
- Minification in production
- Source maps for debugging
- Gzip compression

**CSS:**
- Tailwind PurgeCSS (removes unused styles)
- Critical CSS inlined
- CSS minification
- Gzip compression

### Performance Metrics

```
Lighthouse Scores
├─ Performance: 95+
├─ Accessibility: 95+
├─ Best Practices: 95+
└─ SEO: 95+

Web Vitals
├─ LCP (Largest Contentful Paint): < 1.5s
├─ FID (First Input Delay): < 100ms
├─ CLS (Cumulative Layout Shift): < 0.05
└─ TTFB (Time to First Byte): < 600ms
```

---

## 🏗️ Build & Deployment

### Build Process

```
npm run build
        │
        ├─ Vite bundles source
        ├─ TypeScript compilation
        ├─ Tailwind CSS generation
        ├─ Asset optimization
        └─ Output to dist/
        │
        ▼
dist/
├── index.html           # Minified entry point
├── assets/
│   ├── index-HASH.js    # JavaScript bundle
│   ├── index-HASH.css   # Tailwind CSS bundle
│   ├── vendor-HASH.js   # Dependencies
│   └── [image-HASH]     # Optimized images
└── [other-assets]
```

### Deployment Targets

**Vercel (Recommended)**
```bash
vercel --prod
```

**Netlify**
```bash
netlify deploy --prod --dir=dist
```

**GitHub Pages**
```bash
npm run build
# Push dist/ to gh-pages branch
```

**Docker**
```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

### Environment Configuration

```
.env
├─ VITE_API_URL=...          # API endpoints
├─ VITE_ANALYTICS_ID=...     # Analytics tracking
└─ VITE_SITE_URL=...         # Site URL

.env.production
├─ VITE_API_URL=https://...  # Production API
├─ VITE_ANALYTICS_ID=...     # Prod analytics
└─ VITE_SITE_URL=...         # Prod URL
```

---

## 🎯 Design Patterns

### Component Patterns

#### 1. Container/Presentational Pattern

```typescript
// Container Component (Logic)
const SkillsContainer: React.FC = () => {
  const skills = useSkillsData();
  const [filter, setFilter] = useState('all');
  
  return <SkillsPresentation skills={skills} filter={filter} />;
};

// Presentational Component (Display)
interface SkillsPresentationProps {
  skills: Skill[];
  filter: string;
}

const SkillsPresentation: React.FC<SkillsPresentationProps> = ({ skills, filter }) => (
  <div>
    {skills.map(skill => <SkillCard key={skill.id} skill={skill} />)}
  </div>
);
```

#### 2. Higher-Order Component (HOC) Pattern

```typescript
// Wrap component with dark mode support
const withDarkMode = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => {
    const { isDarkMode } = useDarkMode();
    return <Component {...props} isDarkMode={isDarkMode} />;
  };
};

// Usage
const StyledComponent = withDarkMode(MyComponent);
```

#### 3. Render Props Pattern

```typescript
// Provide filtering logic via render prop
<ProjectFilter render={(filteredProjects) => (
  <ProjectGrid projects={filteredProjects} />
)} />
```

#### 4. Custom Hook Pattern

```typescript
// Encapsulate complex logic
const useProjectFiltering = (projects: Project[]) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const filtered = useMemo(() => {
    return projects.filter(p => 
      !selectedCategory || p.category === selectedCategory
    );
  }, [projects, selectedCategory]);
  
  return { filtered, selectedCategory, setSelectedCategory };
};

// Usage
const { filtered, selectedCategory, setSelectedCategory } = useProjectFiltering(projects);
```

### State Management Patterns

#### 1. Context Pattern (Global State)

```typescript
// Theme state via Context
export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
```

#### 2. Local State Pattern (Component State)

```typescript
// Component-specific state
const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div onClick={() => setIsExpanded(!isExpanded)}>
      {/* Card content */}
    </div>
  );
};
```

#### 3. Derived State Pattern

```typescript
// Compute state from props
const selectedProjectCount = useMemo(
  () => selectedProjects.length,
  [selectedProjects]
);
```

### Fetch & Data Patterns

#### 1. Static Data Pattern (Current)

```typescript
// Data defined in TypeScript files
export const projectsData: Project[] = [
  { id: '1', title: 'CMH', ... },
  { id: '2', title: 'SmartMaint', ... },
];

// Usage
import { projectsData } from '../lib/data/projects/projects.ts';
```

#### 2. Async Data Pattern (Future Enhancement)

```typescript
// If adding API calls
const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);
  
  return { projects, loading, error };
};
```

### Animation Patterns

#### 1. Framer Motion Basic

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 20 }}
  transition={{ duration: 0.5 }}
>
  {/* Content */}
</motion.div>
```

#### 2. Staggered Animations

```typescript
<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map((item) => (
    <motion.div key={item.id} variants={itemVariants}>
      {/* Item */}
    </motion.div>
  ))}
</motion.div>
```

#### 3. Scroll Trigger Animations

```typescript
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  {/* Animates when in viewport */}
</motion.div>
```

---

## 🔄 Data Update Flow

### How to Update Projects

```
1. Edit src/lib/data/projects/projects.ts
   └─ Modify project object or add new project

2. Add assets to public/Projects/[project-folder]/
   ├─ images/     (screenshots)
   ├─ videos/     (demo videos)
   └─ docs/       (documentation)

3. Update paths in project data object
   ├─ image: '/Projects/[folder]/images/...'
   ├─ images: [array of screenshot paths]
   └─ documentation: '/Projects/[folder]/docs/...'

4. Rebuild (Vite HMR hot reloads)
   ├─ Dev mode: Instant reload
   └─ Prod: npm run build

5. Verify in browser
   ├─ Check featured projects section
   ├─ Navigate to projects dashboard
   └─ View individual project details
```

### How to Update Skills

```
1. Edit src/lib/data/skills.ts
   └─ Add/modify skill object

2. Update categories if needed
   ├─ Add new category
   └─ Update skill proficiency levels

3. Rebuild
   └─ Changes hot reload in dev mode

4. Verify in Skills section
```

---

## 📈 System Health Metrics

### Monitoring

```
Development Checklist
├─ TypeScript compilation (0 errors)
├─ ESLint warnings (0 warnings)
├─ Tailwind CSS coverage (100% of classes)
├─ React DevTools (component tree)
├─ Browser DevTools (network/performance)
└─ Lighthouse audits (score > 90)

Production Checklist
├─ Build size < 200KB (gzipped)
├─ All images optimized
├─ No console errors
├─ Performance metrics target
└─ SEO metadata complete
```

---

## 🔐 Security Considerations

### Security Practices

```
✅ Content Security Policy
├─ Restrict resource loading
├─ Prevent XSS attacks
└─ HTTPS only in production

✅ Input Validation
├─ Sanitize user inputs
├─ Validate data types
└─ Use TypeScript for type safety

✅ Dependency Security
├─ Regular npm audits
├─ Update dependencies
└─ Check for vulnerabilities

✅ Environment Variables
├─ Never commit .env files
├─ Use .env.example template
└─ Secure production secrets
```

---

## 📚 Quick Reference

### Key Files to Understand

| File | Purpose | Priority |
|------|---------|----------|
| `src/App.tsx` | Main router & layout | 🔴 Critical |
| `src/contexts/DarkModeContext.tsx` | Global state management | 🔴 Critical |
| `src/lib/data/projects/projects.ts` | Project portfolio data | 🔴 Critical |
| `src/components/layout/Header.tsx` | Navigation & theme toggle | 🟡 High |
| `src/components/section/projects/ProjectsPage.tsx` | Projects dashboard | 🟡 High |
| `src/lib/hooks/useProjectFilter.ts` | Project filtering logic | 🟡 High |
| `tailwind.config.js` | Styling configuration | 🟡 High |
| `vite.config.ts` | Build configuration | 🟠 Medium |

### Essential Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm install [pkg]    # Install new package
npm remove [pkg]     # Remove package
npm list             # List all dependencies
```

---

**End of Architecture Documentation**

---

**Document Information:**
- **Last Updated:** December 2024
- **Version:** 1.0.0
- **Author:** Mahmoud EL GHARIB
- **Status:** Complete
- **Maintenance:** Active
