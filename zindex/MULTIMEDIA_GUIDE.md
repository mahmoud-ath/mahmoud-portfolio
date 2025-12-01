# Multimedia Integration Guide

This guide explains how to add videos and PDF documentation to your projects.

## Overview

The project system now supports:
- ✅ **Multiple images** in gallery
- ✅ **Multiple videos** (YouTube & direct video files)
- ✅ **PDF documentation** (opens in new tab)

---

## 1. Adding Videos

### Supported Video Types

#### A. YouTube Videos
Simply add the YouTube URL to the `videos` array:

```typescript
{
  id: "1",
  slug: "my-project",
  title: "My Awesome Project",
  // ... other fields
  videos: [
    "https://www.youtube.com/watch?v=VvtSsbJdqKk",
    "https://youtu.be/VvtSsbJdqKk",
    "https://www.youtube.com/watch?v=VvtSsbJdqKk&t=120s"
  ]
}
```

**Supported YouTube URL formats:**
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- With parameters: `?v=VIDEO_ID&t=120s&pp=...` (extra parameters are ignored)

#### B. Direct Video Files
Add direct links to video files:

```typescript
{
  videos: [
    "https://example.com/videos/demo.mp4",
    "https://cdn.example.com/project-overview.webm"
  ]
}
```

**Supported formats:** MP4, WebM, Ogg, MOV

---

## 2. Adding PDF Documentation

Add a `documentation` field with the PDF URL:

```typescript
{
  id: "1",
  slug: "my-project",
  title: "My Awesome Project",
  // ... other fields
  documentation: "https://example.com/docs/project-documentation.pdf",
  // or from your public folder:
  documentation: "/documentation/my-project.pdf"
}
```

The documentation button will appear on the project detail page, allowing users to:
- Open the PDF in a new tab
- Download the PDF
- View it directly in the browser (depending on user's PDF viewer settings)

---

## 3. Complete Project Example

Here's a complete example with all multimedia fields:

```typescript
{
  id: "5",
  slug: "ai-customer-support",
  title: "AI-Powered Customer Support System",
  description: "An intelligent customer support system leveraging machine learning and natural language processing.",
  category: "machine-learning",
  tags: ["Python", "TensorFlow", "FastAPI", "React", "NLP"],
  
  // Main image
  image: "https://picsum.photos/800/600?random=4",
  
  // Gallery images (displayed in order)
  images: [
    "https://picsum.photos/800/600?random=4",
    "https://picsum.photos/800/600?random=5",
    "https://picsum.photos/800/600?random=6"
  ],
  
  // Project videos
  videos: [
    "https://www.youtube.com/watch?v=VvtSsbJdqKk",
    "https://example.com/videos/system-demo.mp4"
  ],
  
  // Project documentation
  documentation: "https://example.com/docs/ai-support-system.pdf",
  
  links: {
    github: "https://github.com/mahmoud/ai-support",
    demo: "https://ai-support-demo.com"
  },
  
  tier: "major",
  impactScore: 17,
  projectType: "personal",
  difficulty: 4,
  featured: true,
  isNew: true,
  isTrending: true,
  createdAt: "2024-11-01",
  completedAt: null
}
```

---

## 4. Gallery Display Order

The gallery displays media in this order:
1. **Main image** (`image` field)
2. **Additional images** (from `images` array, in order)
3. **Videos** (from `videos` array, in order)

**Example:**
```typescript
image: "https://example.com/main.jpg",
images: [
  "https://example.com/screenshot-1.jpg",
  "https://example.com/screenshot-2.jpg"
],
videos: [
  "https://www.youtube.com/watch?v=...",
  "https://example.com/demo.mp4"
]
```

**Gallery order:**
1. Main image
2. Screenshot 1
3. Screenshot 2
4. YouTube video (with auto-generated thumbnail)
5. Demo video

---

## 5. Media Type Indicators

Each media item in the gallery shows:
- **Type badge** (top-left): "Image" or "Video"
- **Counter** (bottom-center): Current index and total count
- **Thumbnail icons** (thumbnail strip):
  - 🟦 Blue icon = Image
  - 🔴 Red icon = Video
  - ▶️ Play icon overlay = Video thumbnail

---

## 6. How Videos Are Processed

### YouTube Videos
1. **URL parsing:** Extracts video ID from various YouTube URL formats
2. **Thumbnail generation:** Automatically generates thumbnail from YouTube API
3. **Embedding:** Embeds iframe with modestbranding and no related videos

### Direct Video Files
1. **File detection:** Recognizes video file extensions
2. **Fallback thumbnail:** Uses first frame or placeholder
3. **Player:** Uses HTML5 video player with controls

---

## 7. Documentation Button

The documentation button appears as a card section between the gallery and project details.

**Features:**
- 🔴 Red themed button (matches your design)
- Opens PDF in new tab
- Shows helpful text: "Access the project documentation and technical details"
- Download icon included

**How to add:**
```typescript
documentation: "https://example.com/my-documentation.pdf"
```

---

## 8. Best Practices

### Images
- ✅ Use consistent dimensions (800x600 or 1920x1080)
- ✅ Compress images for faster loading
- ✅ Use descriptive filenames
- ✅ Provide 2-4 images per project

### Videos
- ✅ Keep videos under 5 minutes for quick demos
- ✅ Use YouTube for best compatibility
- ✅ Use direct video files for non-YouTube content
- ✅ Provide 1-2 videos per project
- ✅ Ensure videos are publicly accessible

### Documentation
- ✅ Keep PDF size under 10MB
- ✅ Use clear, readable fonts
- ✅ Include table of contents
- ✅ Add technical specifications
- ✅ Provide setup/installation instructions

---

## 9. Hosting Your Media

### Free Hosting Options

**Images & Videos:**
- Cloudinary (free tier: 25GB storage)
- Imgbb (free image hosting)
- GitHub releases (for documentation)
- Vercel/Netlify (static files)

**PDFs:**
- Google Drive (share link)
- Dropbox (public sharing)
- GitHub (in public folder or releases)
- Any CDN or static hosting

### Using Your Public Folder

Store files in your project's `public/` folder:

```
public/
├── documentation/
│   ├── project-1-docs.pdf
│   └── project-2-docs.pdf
├── videos/
│   ├── demo.mp4
│   └── tutorial.webm
└── images/
    ├── screenshot-1.jpg
    └── screenshot-2.jpg
```

Reference in projects:
```typescript
documentation: "/documentation/project-1-docs.pdf",
videos: ["/videos/demo.mp4"],
images: ["/images/screenshot-1.jpg"]
```

---

## 10. Troubleshooting

### Videos Not Showing
**Problem:** Videos array defined but not displaying
**Solution:** 
- Ensure videos are in an array: `videos: ["url"]` (not `video: "url"`)
- Check the Project type in `lib/types/project.ts` has `videos?: string[]`
- Verify video URLs are accessible (not blocked)

### YouTube Video Not Embedding
**Problem:** YouTube URL shows but doesn't embed
**Solution:**
- Use standard YouTube URL format: `https://www.youtube.com/watch?v=VIDEO_ID`
- Ensure VIDEO_ID is exactly 11 characters
- Check if video is public/unlisted (not private)
- Remove extra parameters like `&pp=...` if they cause issues

### PDF Not Opening
**Problem:** Documentation button appears but PDF doesn't open
**Solution:**
- Verify PDF URL is correct and accessible
- Check CORS settings if PDF is from external source
- Test URL directly in browser
- Ensure PDF is not password protected

### Images Loading Slowly
**Problem:** Gallery images lag or don't load
**Solution:**
- Use optimized image formats (WebP, optimized JPG)
- Compress images before uploading
- Use image CDN (Cloudinary, Imgix)
- Consider lazy loading for multiple images

---

## 11. Type Definition Reference

```typescript
export interface Project {
  // ... other fields
  image: string;              // Main image
  images?: string[];          // Gallery images array
  videos?: string[];          // Video URLs array
  documentation?: string;     // PDF documentation URL
}
```

---

## 12. Next Steps

1. **Add videos** to your existing projects
2. **Add documentation PDFs** for technical projects
3. **Optimize** image and video files
4. **Test** the gallery on mobile and desktop
5. **Share** your projects!

---

For more information, see:
- 📁 `lib/data/projects.ts` - Project data
- 📝 `lib/types/project.ts` - Type definitions
- 🎨 `src/components/section/projects/detail/ProjectGallery.tsx` - Gallery component
- 📄 `src/components/section/projects/ProjectDetail.tsx` - Detail page with documentation
