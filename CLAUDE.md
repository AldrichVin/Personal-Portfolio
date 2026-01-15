# Personal Portfolio — Development Guide

> A premium, recruiter-ready portfolio with immersive scroll animations and interactive project showcases.

---

## Quick Reference

```
Project Path    C:\Users\aldri\Downloads\Claude Code Projects\Project4 -- PersonalPortfolio
Dev Server      npm run dev → http://localhost:5173
Build           npm run build → dist/
Preview         npm run preview
```

---

## Architecture Overview

```
src/
├── components/
│   ├── Navbar.jsx          Navigation with scroll detection
│   ├── Hero.jsx            Animated intro section
│   ├── About.jsx           Personal narrative
│   ├── Projects.jsx        Interactive project grid + modal
│   ├── Skills.jsx          Animated skill bars
│   ├── Contact.jsx         Contact form + socials
│   ├── CursorGlow.jsx      Mouse-following gradient
│   └── ParticleField.jsx   Canvas particle background
│
├── data/
│   └── projects.js         ★ Project data source
│
├── App.jsx                 Main app + Lenis scroll
├── main.jsx                React entry
└── index.css               Global styles + Tailwind
```

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | React 18 + Vite | Fast builds, HMR |
| Styling | Tailwind CSS v4 | Utility-first CSS |
| Animation | Framer Motion | Declarative animations |
| Scroll | GSAP ScrollTrigger | Scroll-driven effects |
| Smooth Scroll | Lenis | Premium scroll feel |
| Icons | Lucide React | Lightweight icons |

---

## Adding New Projects

Projects are defined in `src/data/projects.js`. To add a new project:

### Step 1 — Add Project Entry

Open `src/data/projects.js` and add a new object to the `projects` array:

```javascript
{
  id: 'project-slug',                    // Unique identifier (lowercase, dashes)
  name: 'Project Name',                  // Display name
  tagline: 'Short Catchy Tagline',       // One-liner description
  description: 'Brief description...',   // 2-3 sentences for card preview
  longDescription: 'Full description...', // Detailed description for modal
  techStack: [                           // Technologies used (array of strings)
    'React',
    'Node.js',
    'PostgreSQL'
  ],
  category: 'Full Stack',                // Must match a category (see below)
  highlights: [                          // Key features (array of strings)
    'Feature one',
    'Feature two',
    'Feature three'
  ],
  github: 'https://github.com/...',      // GitHub URL (optional)
  live: 'https://example.com',           // Live demo URL (optional)
  color: '#6366f1',                      // Accent color (hex)
  year: '2025',                          // Year completed
  status: 'Complete'                     // Status: Complete | In Development | Prototype
}
```

### Step 2 — Choose a Category

Available categories (defined in same file):

```javascript
'Full Stack'
'Web3 / Blockchain'
'Creative / 3D'
'Data Analytics'
'Data Visualization'
'Mobile App'
```

To add a new category, update the `categories` array:

```javascript
export const categories = [
  'All',
  'Full Stack',
  'Web3 / Blockchain',
  'Creative / 3D',
  'Data Analytics',
  'Data Visualization',
  'Mobile App',
  'Your New Category'    // Add here
]
```

### Step 3 — Choose an Accent Color

Recommended colors that work well with the dark theme:

| Color | Hex | Use Case |
|-------|-----|----------|
| Indigo | `#6366f1` | Full Stack, General |
| Purple | `#8b5cf6` | Mobile, Backend |
| Cyan | `#22d3ee` | 3D, Creative |
| Green | `#00ff88` | Web3, Blockchain |
| Orange | `#f97316` | Data, Analytics |
| Emerald | `#10b981` | Visualization |
| Rose | `#f43f5e` | Design, UI/UX |

---

## Project Template

Copy this template for new projects:

```javascript
{
  id: '',
  name: '',
  tagline: '',
  description: '',
  longDescription: '',
  techStack: [],
  category: '',
  highlights: [],
  github: '',
  live: '',
  color: '#6366f1',
  year: '2025',
  status: 'Complete'
}
```

---

## Customization

### Update Personal Info

| File | What to Change |
|------|----------------|
| `index.html` | Meta tags, title, description |
| `Hero.jsx` | Name, role, tagline, social links |
| `About.jsx` | Bio, story, stats, philosophy |
| `Contact.jsx` | Email, location, social usernames |
| `Skills.jsx` | Skill categories and percentages |

### Update Colors

Edit `src/index.css` under `@theme`:

```css
@theme {
  --color-void: #050508;           /* Background */
  --color-accent: #6366f1;         /* Primary accent */
  --color-accent-secondary: #8b5cf6; /* Secondary */
  --color-accent-cyan: #22d3ee;    /* Tertiary */
}
```

### Update Fonts

Fonts are loaded from Google Fonts in `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=...');
```

Current fonts:
- **Display:** Space Grotesk
- **Body:** Inter
- **Mono:** JetBrains Mono

---

## Animation System

### Scroll Triggers

Animations are triggered using Framer Motion's `useInView`:

```jsx
const isInView = useInView(ref, { once: true, margin: '-100px' })
```

### Stagger Effects

Elements animate sequentially using variants:

```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}
```

### Smooth Scroll

Lenis is initialized in `App.jsx` and synced with GSAP:

```jsx
lenisRef.current.on('scroll', ScrollTrigger.update)
```

---

## File Size Reference

```
Component Sizes (approximate)
─────────────────────────────
Projects.jsx     ~350 lines    Project grid + modal
Hero.jsx         ~180 lines    Animated hero
Skills.jsx       ~200 lines    Skill bars + marquee
About.jsx        ~170 lines    Narrative section
Contact.jsx      ~220 lines    Form + socials
Navbar.jsx       ~150 lines    Navigation
```

---

## Commands

```bash
npm run dev        # Start development server
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

---

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm run build
# Deploy dist/ folder via Netlify UI
```

### Manual

```bash
npm run build
# Upload dist/ to any static host
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Styles not updating | Clear browser cache, restart dev server |
| Animations not triggering | Check `useInView` margin settings |
| Scroll feels janky | Ensure Lenis is properly initialized |
| Build fails | Check for TypeScript/ESLint errors |

---

## Dependencies

```json
{
  "react": "^18.x",
  "framer-motion": "^11.x",
  "gsap": "^3.x",
  "lenis": "^1.x",
  "lucide-react": "^0.x",
  "tailwindcss": "^4.x"
}
```

---

*Last updated: January 2025*
