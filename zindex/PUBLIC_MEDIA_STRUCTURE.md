# Project Media Structure

Your project details pages expect images in the following structure:

```
public/
└── images/
    └── projects/
        ├── smartmaint.jpg
        ├── smartmaint-dashboard.jpg
        ├── smartmaint-model.jpg
        ├── road-accidents.jpg
        ├── road-accidents-map.jpg
        ├── road-accidents-analysis.jpg
        ├── tech-horizon.jpg
        ├── tech-horizon-dashboard.jpg
        └── tech-horizon-articles.jpg
```

## How to Add Images

1. Create the folder structure above in your `public/` directory
2. Add your project screenshots/images to the appropriate folders
3. Update the `images` array in `src/data/portfolio.ts` with the correct paths

## Current Projects & Image Paths

### 1. SmartMaint - Predictive Maintenance System
- **Category**: Machine Learning
- **Images**:
  - `/images/projects/smartmaint.jpg` (hero image)
  - `/images/projects/smartmaint-dashboard.jpg` (dashboard screenshot)
  - `/images/projects/smartmaint-model.jpg` (model visualization)

### 2. Road Accidents Analysis
- **Category**: Data Analysis
- **Images**:
  - `/images/projects/road-accidents.jpg` (hero image)
  - `/images/projects/road-accidents-map.jpg` (geospatial map)
  - `/images/projects/road-accidents-analysis.jpg` (analytics dashboard)

### 3. Tech Horizon Magazine
- **Category**: Web Development
- **Images**:
  - `/images/projects/tech-horizon.jpg` (hero image)
  - `/images/projects/tech-horizon-dashboard.jpg` (admin panel)
  - `/images/projects/tech-horizon-articles.jpg` (articles view)

## Placeholder Images

Until you add real images, the component will use the main `image` field as a fallback.
