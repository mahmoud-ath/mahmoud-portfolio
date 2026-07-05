# Admin Guide

## Access
1. Start both servers (`npm run dev:all`)
2. Go to `http://localhost:3004/#/admin`
3. Enter password: `Admin123!`
4. Session persisted in `localStorage`

## Features
- **CRUD**: Create, Read, Update, Delete projects via web forms
- **Search**: By title or description
- **Filter**: By category (web-dev, machine-learning, data-analyst)
- **Sort**: By date, title, or impact score
- **Real-time**: Changes saved to `public/data/projects.json` instantly

## Project Form Fields
| Field | Type | Required |
|---|---|---|
| Title | text | Yes |
| Description | textarea | Yes |
| Category | select (web-dev / ml / data-analyst) | Yes |
| Tags | text (comma-separated) | No |
| Main Image | URL | Yes |
| Gallery Images | URL array | No |
| Videos | URL array (YouTube or direct) | No |
| PDF Documentation | URL | No |
| Links (GitHub / Demo / Live) | URL | No |
| Tier | select (flagship / major / standard / experimental) | No |
| Impact Score | number (1–20) | No |
| Project Type | select (case-study / client / personal / Academic / Hackathon) | No |
| Difficulty | number (1–5) | No |
| Flags | featured, isNew, isTrending (checkboxes) | No |
| Dates | createdAt, completedAt | No |

## Change Password
Edit `ADMIN_PASSWORD` in `src/components/admin/components/AdminLogin.tsx`
