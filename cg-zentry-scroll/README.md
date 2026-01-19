# Valentine to Zentry Scroll Gallery

A beautiful two-page interactive website featuring:
- Romantic Valentine surprise page with animated buttons
- Stunning image gallery with smooth scrolling animations
- Seamless transitions between pages

## Deployment Instructions

### Option 1: Vercel Dashboard (Easiest)
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login
3. Click "New Project"
4. Import this repository or drag the `cg-zentry-scroll` folder
5. Deploy!

### Option 2: Vercel CLI
```bash
npm i -g vercel
cd cg-zentry-scroll
vercel
```

## Project Structure
- `index.html` - Valentine homepage (main entry point)
- `index-gallery.html` - Zentry scroll image gallery
- `index-landing.html` - Site selection page
- `assets/` - Images, GIFs, and media files
- `vercel.json` - Deployment configuration

## Routes
- `/` - Valentine surprise page
- `/gallery` - Image gallery
- `/landing` - Site selector

Built with HTML, CSS, JavaScript, GSAP, and Lenis Scroll.