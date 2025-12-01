# Mahmoud EL GHARIB - Portfolio Website

A modern, responsive portfolio website showcasing AI and Data Science expertise, built with React, TypeScript, Vite, and Tailwind CSS.

## 🚀 Project Overview

This portfolio website is designed to showcase Mahmoud's professional achievements, projects, and technical expertise in:
- **Artificial Intelligence & Machine Learning**
- **Data Science & Analytics**
- **Full-Stack Web Development**

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx               # Navigation header
│   ├── Hero.tsx                 # Hero/landing section
│   ├── About.tsx                # About section
│   ├── Experience.tsx           # Professional experience
│   ├── Projects.tsx             # Project showcase
│   ├── Testimonials.tsx         # Client/peer testimonials
│   ├── Contact.tsx              # Contact section
│   ├── CustomCursor.tsx         # Custom cursor animation
│   └── SideElements.tsx         # Decorative side elements
├── data/
│   └── portfolio.ts             # All portfolio data
├── utils/
│   └── helpers.ts               # Utility functions
├── config.ts                    # Site configuration
├── types.ts                     # TypeScript interfaces
├── App.tsx                      # Main app component
└── index.tsx                    # React entry point
```

## 🛠️ Technology Stack

- **React 19.2.0** - UI library
- **TypeScript 5.8.2** - Type-safe JavaScript
- **Vite 6.2.0** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion 12.23.24** - Advanced animations
- **Lucide React 0.554.0** - Icon library

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

## 🚀 Available Scripts

```bash
npm run dev      # Development server (hot reload)
npm run build    # Build for production
npm run preview  # Preview production build
```

## 📝 Data Management

All portfolio content is centralized in `src/data/portfolio.ts`:
- Professional experience
- Projects with tags and images
- Skills organized by category
- Certifications
- Education history
- Leadership roles
- Testimonials
- Languages

## 🎨 Customization

### Update Site Config
Edit `src/config.ts` to change:
- Name, title, description
- Contact information
- Social media links
- Theme colors

### Update Portfolio Data
Edit `src/data/portfolio.ts` to add/modify:
- Projects
- Experience
- Skills
- Certifications
- Education
- Testimonials

## 📞 Contact

**Mahmoud EL GHARIB**
- 📧 Email: elgharib.mahmoud2@gmail.com
- 📱 Phone: +212 636-167511
- 💼 LinkedIn: [mahmoud-el-gharib](https://linkedin.com/in/mahmoud-el-gharib)
- 🐙 GitHub: [mahmoud-el-gharib](https://github.com/mahmoud-ath)
- 📍 Location: Chefchaouen, Morocco

## 📄 License

MIT License - feel free to use this template for your own portfolio
