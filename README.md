# Aldrich Vincent Liem | Personal Portfolio

A premium, recruiter-ready portfolio website featuring immersive scroll-based animations, interactive project showcases, and strong visual storytelling. Built to instantly capture attention and demonstrate both technical depth and creative excellence.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will start at `http://localhost:5173`

---

## Tech Stack & Architecture

### Core Technologies

| Technology | Purpose | Why Chosen |
|------------|---------|------------|
| **Vite + React** | Build tool & Framework | Lightning-fast HMR, optimal DX, tree-shaking |
| **Tailwind CSS** | Styling | Utility-first approach for rapid, consistent styling |
| **Framer Motion** | Animations | Declarative animations with excellent React integration |
| **GSAP + ScrollTrigger** | Scroll Animations | Industry-standard for complex scroll-driven effects |
| **Lenis** | Smooth Scrolling | Buttery-smooth scroll with inertia for premium feel |
| **Lucide React** | Icons | Lightweight, customizable icon library |

### Project Structure

```
src/
├── components/
│   ├── Navbar.jsx         # Fixed navigation with scroll detection
│   ├── Hero.jsx           # Animated intro with parallax effects
│   ├── About.jsx          # Narrative-driven story section
│   ├── Projects.jsx       # Interactive project cards with modal
│   ├── Skills.jsx         # Visual skill bars with animations
│   ├── Contact.jsx        # Contact form with social links
│   ├── CursorGlow.jsx     # Mouse-following gradient effect
│   └── ParticleField.jsx  # Canvas-based particle background
├── data/
│   └── projects.js        # Project metadata (auto-discovered)
├── App.jsx                # Main app with scroll setup
├── main.jsx               # React entry point
└── index.css              # Global styles & Tailwind config
```

---

## Design Decisions

### Visual Identity

- **Dark Mode First**: Deep void black (#050508) background with accent gradients
- **Color Palette**: Indigo (#6366f1) as primary, Purple (#8b5cf6) as secondary, Cyan (#22d3ee) for highlights
- **Typography**: Space Grotesk for display, Inter for body text, JetBrains Mono for code
- **Glass Morphism**: Frosted glass effects for cards and overlays
- **Grain Texture**: Subtle noise overlay for depth and premium feel

### UX Philosophy

1. **5-Second Rule**: Hero section designed to immediately communicate identity and value
2. **Scroll Storytelling**: Content reveals progressively, creating a narrative journey
3. **Micro-interactions**: Every hover, click, and scroll triggers thoughtful feedback
4. **Progressive Disclosure**: Project cards show summary; modals reveal full details

---

## Animation Strategy

### Scroll-Driven Animations

```
┌─────────────────────────────────────────────────────────┐
│                    SCROLL JOURNEY                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  HERO                                                    │
│  ├── Parallax background gradients                       │
│  ├── Content fade-out on scroll                          │
│  └── Floating scroll indicator                           │
│                                                          │
│  ABOUT                                                   │
│  ├── Staggered text reveal                               │
│  ├── Value cards slide in                                │
│  └── Stats counter animation                             │
│                                                          │
│  PROJECTS                                                │
│  ├── Cards reveal on scroll                              │
│  ├── 3D tilt effect on hover                             │
│  └── Category filter transitions                         │
│                                                          │
│  SKILLS                                                  │
│  ├── Progress bars animate to value                      │
│  ├── Technology marquee scroll                           │
│  └── Category cards fade in                              │
│                                                          │
│  CONTACT                                                 │
│  ├── Form fields fade up                                 │
│  ├── Social cards slide in                               │
│  └── Submit button state transitions                     │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Implementation Details

1. **Lenis Integration**: Smooth scroll with GSAP ScrollTrigger sync
2. **useInView Hook**: Framer Motion's intersection observer for reveal triggers
3. **Spring Animations**: Natural, physics-based motion for interactions
4. **Stagger Children**: Sequential reveals for grouped elements
5. **Layout Animations**: Smooth category filtering with AnimatePresence

---

## Project Discovery System

Projects are loaded from `src/data/projects.js`, which was populated by scanning:

- `C:\Users\aldri\Downloads\Claude Code Projects\*`
- `C:\Users\aldri\Downloads\Personal Projects\*`

### Discovered Projects

| Project | Category | Stack | Status |
|---------|----------|-------|--------|
| DataPraktis | Full Stack | Next.js, TypeScript, PostgreSQL | In Development |
| RECEIPTS Protocol | Web3 | Next.js, Solana, React | Prototype |
| HOV Corporation Archive | Creative / 3D | Three.js, WebGL, CSS3 | Complete |
| NBA Unbiased Ranking | Data Analytics | React, R, Docker | Complete |
| Australia Climate Viz | Data Visualization | Vega-Lite, JavaScript | Complete |
| Monash Mates | Mobile App | Kotlin, Jetpack Compose, Firebase | Complete |

### Adding New Projects

Edit `src/data/projects.js` and add a new entry:

```javascript
{
  id: 'unique-id',
  name: 'Project Name',
  tagline: 'Short tagline',
  description: 'Brief description',
  longDescription: 'Full description for modal',
  techStack: ['Tech1', 'Tech2'],
  category: 'Category Name',
  highlights: ['Feature 1', 'Feature 2'],
  github: 'https://github.com/...',
  color: '#hexcolor',
  year: '2025',
  status: 'Complete'
}
```

---

## MCP Integration Notes

This portfolio was built with assistance from Claude Code MCPs:

### File System MCP
- **Purpose**: Scan project directories to auto-discover portfolio content
- **Usage**: Read package.json, README files, and infer tech stacks from project structure
- **Benefit**: Automatic project metadata extraction without manual entry

### Chrome DevTools MCP (Available)
- **Purpose**: Real-time browser testing and debugging
- **Usage**: Can be used for performance profiling and visual testing

---

## Performance Optimizations

- **Code Splitting**: Vite handles automatic chunk splitting
- **Font Preconnect**: Google Fonts loaded with preconnect hints
- **Lazy Animation**: Scroll-triggered animations only run when visible
- **Particle Throttling**: Canvas particle count scales with viewport size
- **Image Placeholders**: Gradient placeholders for missing project images

---

## Customization Guide

### Changing Personal Info

1. Update `index.html` meta tags
2. Edit `Hero.jsx` for name and tagline
3. Modify `Contact.jsx` for email and social links
4. Update `About.jsx` for personal narrative

### Changing Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      accent: {
        primary: '#your-color',
        secondary: '#your-color',
      }
    }
  }
}
```

### Adding Sections

1. Create new component in `src/components/`
2. Import in `App.jsx`
3. Add navigation link in `Navbar.jsx`

---

## Browser Support

- Chrome 90+ (recommended)
- Firefox 88+
- Safari 14+
- Edge 90+

*Note: Some animations may be reduced on older browsers or when `prefers-reduced-motion` is enabled.*

---

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Deploy dist/ folder
```

### GitHub Pages

```bash
npm run build
# Push dist/ to gh-pages branch
```

---

## Credits

- **Design & Development**: Aldrich Vincent Liem
- **Fonts**: Google Fonts (Space Grotesk, Inter, JetBrains Mono)
- **Icons**: Lucide React
- **Animation Libraries**: Framer Motion, GSAP
- **Scroll**: Lenis by Studio Freight

---

## License

MIT License - Feel free to use this as inspiration for your own portfolio!

---

<p align="center">
  <strong>Built with precision and passion.</strong><br>
  <em>Making recruiters stop scrolling since 2025.</em>
</p>
