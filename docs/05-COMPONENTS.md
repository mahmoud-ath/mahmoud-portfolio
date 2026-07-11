# Components

## Layout
| Component | File | Purpose |
|---|---|---|
| Header | `src/components/layout/Header.tsx` | Nav bar with links, CV download, dark mode toggle |
| SideElements | `src/components/layout/SideElements.tsx` | Decorative side elements with social links |
| SectionHeader | `src/components/layout/SectionHeader.tsx` | Reusable animated section title |

## Sections
| Component | File | Purpose |
|---|---|---|
| Hero | `src/components/section/Hero.tsx` | Landing section with TrueFocus title animation |
| Skills | `src/components/section/Skills.tsx` | Skills grid by category with proficiency bars |
| Experience | `src/components/section/experience/` | Tabbed view: Work, Education, Certifications |
| Projects | `src/components/section/Projects.tsx` | Featured projects (homepage) |
| Services | `src/components/section/Services.tsx` | Services offered |
| Blog | `src/components/section/Blog.tsx` | Blog preview on homepage |
| Contact | `src/components/section/Contact.tsx` | Contact form & social links |

## Blog (`src/components/section/blog/`)
| Component | File | Purpose |
|---|---|---|
| `BlogPage.tsx` | Full blog listing page |
| `BlogGrid.tsx` | Blog post cards grid |
| `BlogDetail.tsx` | Individual blog post view |
| `BlogDashboard.tsx` | Blog admin dashboard (CRUD list) |

## Projects (`src/components/section/projects/`)
| Component | File | Purpose |
|---|---|---|
| `ProjectsPage.tsx` | Page wrapper for /#/projects |
| `ProjectsDashboard.tsx` | Main dashboard with filters, grid/list, analytics |
| `ProjectDetail.tsx` | Full project detail view |
| `dashboard/ProjectFilters.tsx` | Search, sort, category filter, view toggle |
| `dashboard/ProjectGrid.tsx` | Grid view cards |
| `dashboard/ProjectList.tsx` | List view rows |
| `dashboard/AnalyticsTab.tsx` | Project statistics & charts |
| `dashboard/GitHubRepoCard.tsx` | GitHub stats card |
| `detail/ProjectHeader.tsx` | Project metadata header |
| `detail/SimilarProjects.tsx` | Related projects carousel |

## Admin (`src/components/admin/`)
| Component | File | Purpose |
|---|---|---|
| `pages/AdminPage.tsx` | Admin page wrapper (tabbed: Projects / Blogs) |
| `components/AdminLogin.tsx` | Password login |
| `components/AdminDashboard.tsx` | Project CRUD dashboard |
| `components/ProjectForm.tsx` | Create/edit project form |
| `components/BlogForm.tsx` | Create/edit blog post form |

## Effects (`src/components/effect-animation/`)
| Component | File | Purpose |
|---|---|---|
| `CustomCursor.tsx` | Custom animated cursor follower |
| `Preloader.tsx` | Loading screen on initial visit |
| `TrueFocus.tsx` | Decrypt-style text reveal animation |

## Archived chatbot (`src/archive/chatbot/`)
The legacy rule-based chatbot has been archived. All its components (`ChatbotContainer`, `ChatBubble`, `ChatWindow`, `ChatMessage`, `QuickActions`) plus intent matching logic (`intentMatcher`, `documentSearch`, `messageProcessor`) and data (`intents.json`, `documentContent.ts`) are preserved in `src/archive/chatbot/`.
