# Public Assets

## Profile Image Setup

Place your profile image in this directory with the filename: `mahmoud-profile.jpg`

### Requirements:
- **Filename**: `mahmoud-profile.jpg`
- **Format**: JPG, PNG, or WebP
- **Recommended Size**: 400x400px - 600x600px
- **File Size**: Optimized to < 200KB for best performance

### How to Use:
1. Add your profile photo to this `public` folder
2. Rename it to `mahmoud-profile.jpg` (or update the image reference in `src/components/Hero.tsx` if you prefer a different name)
3. The image will automatically display in the Hero section with:
   - Grayscale effect by default
   - Color on hover
   - Border animation
   - Responsive sizing (192px on mobile, 288px on desktop)

### Image Path Reference:
- **Component**: `src/components/Hero.tsx`
- **Current Image Path**: `/mahmoud-profile.jpg`
- **Fallback**: If image not found, add a placeholder or use an external image URL

### Optional: Using External Image
If you prefer to use an external image URL instead, update the image src in `Hero.tsx`:
```tsx
<img 
  src="YOUR_IMAGE_URL_HERE" 
  alt="Mahmoud EL GHARIB" 
  className="..."
/>
```
