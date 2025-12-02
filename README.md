# 🚀 Le Dang Khanh - 3D Portfolio Website

A modern, responsive 3D portfolio website built with React, Three.js, and TailwindCSS.

![Portfolio Preview](/placeholder.svg?height=400&width=800&query=3d%20portfolio%20website%20preview)

## ✨ Features

- **Interactive 3D Hero Section** - Floating geometric objects with particle effects
- **Typing Animation** - Dynamic text effect in the hero section
- **Responsive Design** - Mobile-first approach with fallbacks for 3D content
- **Lazy Loading** - 3D models load on demand for better performance
- **Smooth Animations** - Intersection Observer-based scroll animations
- **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation
- **SEO Optimized** - Meta tags and structured data

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **3D Graphics:** Three.js + React Three Fiber + Drei
- **Styling:** TailwindCSS + CSS Modules
- **UI Components:** Shadcn/UI
- **Language:** TypeScript

## 📋 Checklist

- [x] Lazy-load 3D models with Suspense
- [x] Mobile fallback (static image instead of canvas)
- [x] Accessible buttons with aria-labels
- [x] Keyboard focusable interactive elements
- [x] SEO meta tags in layout
- [x] Performance: DPR clamped to [1, 1.5]
- [x] Responsive design for all screen sizes

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/caindandut/portfolio.git
cd portfolio

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
\`\`\`

### Development

\`\`\`bash
# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

\`\`\`bash
# Build the application
npm run build

# Preview production build
npm run preview
\`\`\`

## 📁 Project Structure

\`\`\`
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Main page component
│   └── globals.css      # Global styles & Tailwind config
├── components/
│   ├── 3d/
│   │   └── hero-scene.tsx    # Hero 3D scene
│   ├── navbar.tsx
│   ├── hero-section.tsx
│   ├── about-section.tsx
│   ├── tech-section.tsx
│   ├── projects-section.tsx
│   ├── project-card.tsx      # Individual project card
│   ├── model-viewer.tsx      # 3D model viewer component
│   ├── contact-section.tsx
│   ├── footer.tsx
│   └── loading-screen.tsx
├── hooks/
│   └── use-in-view.ts   # Intersection Observer hook
└── public/
    └── assets/
        └── 3d/          # 3D model files (GLB/GLTF)
\`\`\`

## 🎨 Customization

### Colors

Edit `app/globals.css` to change the color scheme:

\`\`\`css
@theme inline {
  --color-primary: #00BFFF;    /* Main accent color */
  --color-background: #0a0a0f; /* Background color */
  --color-foreground: #e4e4e7; /* Text color */
}
\`\`\`

### Content

- Update `components/about-section.tsx` for About Me content
- Modify `components/tech-section.tsx` for tech stack icons
- Edit `components/projects-section.tsx` for project data
- Change `components/contact-section.tsx` for contact info

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Deploy!

### Netlify

1. Push your code to GitHub
2. Import project on [Netlify](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `.next`

## 📜 License

MIT License - feel free to use this template for your own portfolio!

## 👤 Author

**Le Dang Khanh**

- GitHub: [@caindandut](https://github.com/caindandut)
- Email: khanhdangabc2@gmail.com
- Location: Da Nang City, Vietnam

---

⭐ Star this repo if you found it helpful!
