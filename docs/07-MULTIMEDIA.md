# Multimedia Guide

## Project Media

### Supported Media per Project
- **Images**: `images: string[]` — gallery with thumbnail navigation
- **Videos**: `videos: string[]` — YouTube URLs or direct MP4/WebM/Ogg/MOV
- **Documentation**: `documentation: string` — PDF URL (opens in new tab)

### YouTube URL Formats Supported
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- With query params (t, pp, etc.) — extra params ignored

### Project Media Storage (Upload API)
```
public/Projects/{id}.{slug}/
├── images/       # image/gallery uploads
├── videos/       # video uploads
└── docs/         # PDF/documentation uploads
```

## Blog Media
- **Cover images**: uploaded via `POST /api/upload/blog`
- **Storage**: `public/blog/{slug}.{ext}`
- Blog images are referenced in blog posts via `image` field as `/blog/{slug}.{ext}`

## Public Media Structure
- `public/CV/` — CV/resume files
- `public/Experience/certifications/` — Certification media
- `public/Skills/logos/` — Skill logos
- `public/Skills/` — Skill images
- `public/General/` — General assets
- `public/blog/` — Blog cover images
