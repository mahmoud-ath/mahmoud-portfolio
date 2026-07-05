# Components

## Layout
| Component | File | Purpose |
|---|---|---|
| Header | `src/components/layout/Header.tsx` | Nav bar with links |
| SideElements | `src/components/layout/SideElements.tsx` | Decorative side elements |
| BottomNav | `src/components/layout/BottomNav.tsx` | Mobile bottom nav (commented out) |

## Sections
| Component | File | Purpose |
|---|---|---|
| Hero | `src/components/section/Hero.tsx` | Landing section |
| Skills | `src/components/section/Skills.tsx` | Skills grid by category |
| Experience | `src/components/section/experience/ExperienceTabs.tsx` | Tabbed experience/education/certifications |
| Projects | `src/components/section/Projects.tsx` | Featured projects (homepage) |
| Testimonials | `src/components/section/Testimonials.tsx` | Testimonial cards |
| Contact | `src/components/section/Contact.tsx` | Contact form/links |

## Projects Dashboard (`src/components/section/projects/`)
| Component | Purpose |
|---|---|
| `ProjectsPage.tsx` | Page wrapper for /#/projects |
| `ProjectsDashboard.tsx` | Main dashboard with sidebar, filters, grid/list |
| `ProjectDetail.tsx` | Full project detail view |
| `dashboard/ProjectSidebar.tsx` | Analytics sidebar |
| `dashboard/ProjectFilters.tsx` | Search, sort, view controls |
| `dashboard/ProjectGrid.tsx` | Grid view cards |
| `dashboard/ProjectList.tsx` | List view rows |
| `detail/ProjectHeader.tsx` | Project metadata header |
| `detail/ProjectGallery.tsx` | Image/video gallery |
| `detail/ProjectDetails.tsx` | Full description & links |
| `detail/SimilarProjects.tsx` | Related projects |

## Admin (`src/components/admin/`)
| Component | Purpose |
|---|---|
| `pages/AdminPage.tsx` | Admin page wrapper |
| `components/AdminLogin.tsx` | Password login |
| `components/AdminDashboard.tsx` | Project CRUD management |
| `components/ProjectForm.tsx` | Create/edit project form |

## Effects
| Component | Purpose |
|---|---|
| `CustomCursor.tsx` | Custom animated cursor |
| Animation components in `effect-animation/` | Various effects |

## Chatbot (`src/components/chatbot/`)
| Component | Purpose |
|---|---|
| `ChatbotContainer.tsx` | Main wrapper & orchestrator |
| `ChatBubble.tsx` | Floating bubble (bottom-right) |
| `ChatWindow.tsx` | Chat interface window |
| `ChatMessage.tsx` | Message display |
| `QuickActions.tsx` | Quick action buttons |
