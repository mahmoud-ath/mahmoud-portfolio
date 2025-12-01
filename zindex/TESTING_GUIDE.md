# 🧪 Testing URLs & Navigation

## Development URLs
```
Local:    http://localhost:3001
Network:  http://192.168.21.1:3001 (or your IP)
```

## Test These Routes

### Home Page
```
http://localhost:3001/#
http://localhost:3001/           (redirect)
```
**Expected**: Full portfolio page with projects preview section

### Projects Listing
```
http://localhost:3001/#/projects
```
**Expected**: All projects in a grid with category filters

### Individual Projects

#### SmartMaint - Machine Learning
```
http://localhost:3001/#/projects/smartmaint-predictive-maintenance
```
**Expected**: 
- Project title "SmartMaint - Predictive Maintenance System"
- Image gallery
- Python, Machine Learning, scikit-learn tags
- GitHub and demo links

#### Road Accidents - Data Analysis
```
http://localhost:3001/#/projects/road-accidents-analysis
```
**Expected**:
- Project title "Statistical Analysis of Road Accidents..."
- Data Analysis category badge
- Python, Pandas, Matplotlib tags
- GitHub link only

#### Tech Horizon - Web Development
```
http://localhost:3001/#/projects/tech-horizon-magazine
```
**Expected**:
- Project title "Tech Horizon - Full-Stack Web Application"
- Web Development category badge
- Laravel, MySQL, JavaScript tags
- GitHub and demo links

---

## Interactive Navigation Tests

### From Home Page
1. Click any project card → goes to detail page
2. Click "View Details" hover button → goes to detail page
3. Click "View All Projects" button → goes to `/#/projects`

### From Projects Page
1. Use category filter buttons (Web Dev 💻, ML 🤖, etc.)
2. Click any project card → goes to detail page
3. Empty category shows error state

### From Project Detail
1. Click "Back to All Projects" → goes to `/#/projects`
2. Click breadcrumb "Projects" → goes to `/#/projects`
3. Click related project → goes to that project's detail
4. Click "Live Demo" → opens in new tab
5. Click "View Code" → opens GitHub in new tab

---

## Mobile Testing

Test on mobile devices or use browser DevTools:

```
iPhone/iPad:    http://localhost:3001/#/projects
Android:        http://localhost:3001/#/projects
Tablet:         http://localhost:3001/#/projects
```

**Check**:
- [ ] Responsive grid (1 col on mobile, 2 on tablet, 3 on desktop)
- [ ] Touch targets are adequate (buttons, links)
- [ ] Images scale properly
- [ ] Gallery thumbnails scroll horizontally
- [ ] No horizontal overflow

---

## Bookmark Tests

Try these as bookmarks/favorites to test deep linking:

1. **Home**: `http://localhost:3001/#`
2. **All Projects**: `http://localhost:3001/#/projects`
3. **ML Project**: `http://localhost:3001/#/projects/smartmaint-predictive-maintenance`
4. **Data Project**: `http://localhost:3001/#/projects/road-accidents-analysis`
5. **Web Project**: `http://localhost:3001/#/projects/tech-horizon-magazine`

**Expected**: Direct navigation to correct page without errors

---

## Browser Developer Tools Testing

### Console
```
Expected: No errors
May see: Vite HMR messages (normal in dev)
```

### Network Tab
```
Click project card → Should NOT create new HTTP request
Hash change visible in History
```

### Local Storage
```
Nothing should be stored (app is stateless)
```

---

## Gallery Component Testing

On `/#/projects/smartmaint-predictive-maintenance`:

1. **Image Carousel**:
   - [ ] Main image displays
   - [ ] Click left arrow → previous image
   - [ ] Click right arrow → next image
   - [ ] Image loops (last→first, first→last)

2. **Thumbnails**:
   - [ ] Thumbnail strip shows at bottom
   - [ ] Click thumbnail → main image updates
   - [ ] Active thumbnail highlighted with red border

3. **Counter**:
   - [ ] Shows "1 / 3" format
   - [ ] Updates with image selection
   - [ ] Visible on large images

4. **Transitions**:
   - [ ] Smooth fade between images
   - [ ] No jarring jumps
   - [ ] Framer-motion animations smooth

---

## Filter Testing

On `/#/projects`:

1. **Category Filters**:
   - [ ] "All Projects" (default) shows all 3 projects
   - [ ] "Web Development" shows 1 project (Tech Horizon)
   - [ ] "Machine Learning" shows 1 project (SmartMaint)
   - [ ] "Data Analysis" shows 1 project (Road Accidents)
   - [ ] "Mobile Apps" shows empty state with icon
   - [ ] Active filter has red background

2. **Empty State**:
   - [ ] Shows emoji for category
   - [ ] Shows "No projects found" message
   - [ ] Shows "View All Projects" button
   - [ ] Button click resets to "All"

3. **Statistics**:
   - [ ] "3 Total Projects" (at bottom)
   - [ ] "3 Featured Projects"
   - [ ] "X Technologies Used"

---

## Link Testing

### External Links
- [ ] GitHub links open in new tab
- [ ] Demo links open in new tab
- [ ] Links are correct for each project

### Internal Links
- [ ] Breadcrumbs navigate correctly
- [ ] "View All" buttons use hash navigation
- [ ] No page reloads on navigation

---

## Performance Testing

### Build Check
```bash
npm run build
# Expected: ~475KB JS (gzipped ~151KB)
```

### Load Testing
```bash
npm run preview
# Test at: http://localhost:4173
```

### Lighthouse (Chrome DevTools)
- Expected Performance score: 90+
- Expected Accessibility: 90+
- Expected Best Practices: 90+
- Expected SEO: 90+

---

## Browser Compatibility

Test in these browsers:

- [ ] Chrome/Chromium (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Safari on iOS
- [ ] Chrome on Android

**Expected**: Consistent experience across all browsers

---

## Responsive Breakpoints

Test these viewport sizes:

```
Mobile:   320px - 640px
Tablet:   640px - 1024px
Desktop:  1024px+
```

**Grid Layout**:
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

---

## Error Handling

Try these to test error cases:

1. **Invalid project slug**:
   ```
   http://localhost:3001/#/projects/non-existent-project
   ```
   Expected: "Project Not Found" message with back button

2. **Direct URL access**:
   ```
   http://localhost:3001/#/projects/smartmaint-predictive-maintenance
   ```
   Expected: Load detail page directly

3. **Browser back/forward buttons**:
   - Navigate around
   - Test back button
   - Test forward button
   - Expected: Navigation works smoothly

---

## Accessibility Testing

### Keyboard Navigation
```
Tab:       Cycle through buttons and links
Enter:     Activate buttons
Arrow:     Gallery navigation
```

### Screen Reader
- [ ] Page structure logical
- [ ] Headings properly nested (h1, h2, h3)
- [ ] Image alt text present
- [ ] Button labels clear
- [ ] Links have meaningful text

### Color Contrast
- [ ] Text readable on backgrounds
- [ ] Red buttons (#DC2626) have good contrast
- [ ] Form elements visible

---

## Final Checklist

- [ ] No console errors
- [ ] All links work
- [ ] Gallery functions properly
- [ ] Filters work correctly
- [ ] Mobile responsive
- [ ] Performance acceptable
- [ ] Browser compatible
- [ ] Deep links work
- [ ] Navigation smooth
- [ ] Ready for production

---

**Everything working? You're good to go! 🚀**

Deploy to production:
```bash
npm run build
# Upload dist/ folder to your hosting
```
