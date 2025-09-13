# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-page website for Shibli Homestaging Services, built as a static HTML file with embedded CSS and JavaScript. The website showcases home staging portfolio projects with an interactive image gallery system.

## Architecture

### Core Structure
- **Single File Application**: The entire website is contained in `index.html` with embedded styles and scripts
- **Static Asset Organization**: Images are organized in project-specific folders (`Daly City/`, `Danville/`) with room-based subfolders
- **External Image Hosting**: Primary images are hosted on GitHub raw URLs as fallbacks to local assets
- **No Build System**: Direct HTML/CSS/JS implementation, no compilation or bundling required

### Key Components

**Navigation System**
- Fixed header with smooth scroll navigation
- Responsive design with mobile navigation handling

**Hero Section** 
- Animated hero content with CSS keyframe animations
- Gradient backgrounds and floating elements

**Portfolio Gallery**
- Modal-based image viewing system
- Project-specific image grids with different layouts (3x4, 4x3, 5x3)
- Lightbox functionality with keyboard navigation
- Dynamic image loading with fallback handling

**Contact Integration**
- Formspree integration for form submission (`https://formspree.io/f/mpwlprla`)
- Client-side form state management

### Image Management System

The website uses a dual-source image strategy:
1. **Primary**: GitHub-hosted images (`https://raw.githubusercontent.com/Majdiscode/mom/main/`)
2. **Secondary**: Local image folders organized by project and room type

**Project Structure:**
- `projectImages` object in JavaScript defines image arrays for each project
- Different grid layouts per project type (Daly City: 4x3, Danville: 5x3, Burlingame: 4x2)
- Automatic fallback handling for missing images

## Development Workflow

### Local Development
- Open `index.html` directly in browser (no server required)
- Use browser dev tools for testing and debugging
- Test responsiveness across different screen sizes

### Image Updates
- Add new images to appropriate project folders under `Daly City/` or `Danville/`
- Update the `projectImages` object in the JavaScript section (line ~799)
- Test modal functionality and grid layouts

### Styling Changes
- All styles are in the `<style>` section (lines 7-651)
- CSS custom properties used for consistent theming
- Mobile-first responsive approach with `@media` queries

### Contact Form
- Form submissions handled by Formspree service
- Success/error states managed client-side
- Form validation built into HTML5 attributes

## Key Features to Maintain

1. **Performance**: Images lazy-load and have error handling
2. **Accessibility**: Semantic HTML, keyboard navigation support
3. **Mobile Responsiveness**: Fluid grid systems and touch-friendly interactions
4. **SEO**: Structured meta tags and semantic markup
5. **User Experience**: Smooth animations, loading states, and feedback messages

## Common Tasks

### Adding a New Project
1. Create new folder structure under project name
2. Add images to appropriate room subfolders
3. Add project entry to `projectImages` object
4. Create new portfolio item in HTML grid
5. Test modal functionality and grid layout

### Updating Existing Project Images
1. Add images to existing project folder
2. Update corresponding array in `projectImages` object
3. Verify grid layout displays correctly

### Styling Updates
1. Locate relevant CSS section in `<style>` block
2. Test changes across different screen sizes
3. Ensure consistent color scheme and spacing