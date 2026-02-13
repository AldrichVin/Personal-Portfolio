// Project data - Auto-discovered from local project directories
// Each project includes metadata parsed from the actual project files

export const projects = [
  {
    id: 'llm-evaluation-playground',
    name: 'LLM Evaluation Playground',
    tagline: 'Multi-Model AI Testing & Benchmarking Platform',
    description: 'A comprehensive platform for evaluating and comparing large language models across 6 dimensions with streaming chat, side-by-side comparison, and experiment tracking.',
    longDescription: 'Built a full-featured LLM evaluation platform that enables researchers and developers to systematically test, compare, and benchmark language models. Features a 6-dimensional radar evaluation system, real-time streaming chat interface, side-by-side model comparison, and comprehensive experiment tracking with over 100 logged experiments. Supports CSV/JSON export for further analysis.',
    techStack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS 4', 'Framer Motion', 'Zustand', 'Ollama', 'Docker'],
    category: 'AI / Machine Learning',
    highlights: [
      '6D evaluation radar (accuracy, coherence, creativity, relevance, speed, safety)',
      'Real-time streaming chat interface',
      'Side-by-side model comparison view',
      'Experiment tracking with 100+ logged experiments',
      'CSV/JSON export for analysis'
    ],
    github: 'https://github.com/AldrichVin/llm-evaluation-playground',
    live: 'https://llm-evaluation-playground.vercel.app',
    color: '#6366f1',
    year: '2025',
    status: 'Complete',
    featured: true
  },
  {
    id: 'clawd',
    name: 'Clawd',
    tagline: 'WhatsApp AI Assistant with Real-World Automation',
    description: 'An intelligent WhatsApp assistant powered by Claude AI that handles email management, calendar scheduling, and food ordering automation with Bahasa Indonesia NLP.',
    longDescription: 'Developed a sophisticated WhatsApp AI assistant that bridges the gap between conversational AI and real-world task automation. Clawd understands natural language commands in Bahasa Indonesia, manages Gmail inboxes, schedules Google Calendar events, and automates GrabFood ordering through Puppeteer browser automation. Built with multi-user SaaS architecture for scalability.',
    techStack: ['Node.js 18+', 'Claude AI (Anthropic)', 'Google APIs', 'Puppeteer', 'Clawdbot', 'WhatsApp Web'],
    category: 'AI / Automation',
    highlights: [
      'Bahasa Indonesia natural language processing',
      'Gmail inbox management & smart replies',
      'Google Calendar event scheduling',
      'GrabFood ordering automation via Puppeteer',
      'Multi-user SaaS architecture'
    ],
    github: 'https://github.com/AldrichVin/clawd',
    color: '#8b5cf6',
    year: '2025',
    status: 'In Development',
    featured: true
  },
  {
    id: 'australia-climate',
    name: 'Australia Climate Viz',
    tagline: 'Interactive Climate Data Storytelling',
    description: 'A comprehensive data visualization project exploring Australia\'s climate story including temperature anomalies, climate drivers, bushfire impacts, and koala habitat analysis.',
    longDescription: 'Created an interactive data journalism piece that tells the story of Australia\'s changing climate through sophisticated visualizations. Features choropleth maps, radar charts, and bubble plots built with Vega-Lite. The narrative guides viewers through temperature anomalies, El Nino/La Nina climate drivers, bushfire devastation impacts, and koala habitat core mapping.',
    techStack: ['Vega-Lite', 'JavaScript', 'HTML5', 'CSS3', 'GeoJSON', 'PureCSS Grid'],
    category: 'Data Visualization',
    highlights: [
      'Interactive choropleth maps',
      'Multi-layer climate driver analysis',
      'Bushfire impact on fauna tracking',
      'Koala habitat core mapping',
      'Responsive dashboard design'
    ],
    github: 'https://github.com/AldrichVin/Australia-s-Weather-Data-Visualization.git',
    live: 'https://alie0025.github.io/DV2_Final/',
    color: '#22c55e',
    year: '2025',
    status: 'Complete',
    featured: true
  },
  {
    id: 'nba-ranking',
    name: 'NBA Unbiased Ranking',
    tagline: 'Data-Driven Player Analytics Platform',
    description: 'A full-stack application for NBA player ranking using R backend for statistical analytics and React frontend for interactive visualizations.',
    longDescription: 'Built a comprehensive analytics platform that removes bias from NBA player rankings through statistical modeling. Features include player comparisons, trend analysis, and streak tracking powered by a custom R backend with Plumber API. Dockerized for consistent deployment and hosted on Firebase.',
    techStack: ['React 18', 'R', 'Plumber API', 'Docker', 'Vite', 'Recharts', 'Firebase', 'Axios'],
    category: 'Data Analytics',
    highlights: [
      'Custom R statistical models',
      'Interactive player comparison tools',
      'Trend and streak analysis',
      'Dockerized R backend API',
      'Firebase deployment'
    ],
    github: 'https://github.com/AldrichVin/NBA-Unbiased-Ranking-System.git',
    live: 'https://nba-ranking-starter.vercel.app',
    color: '#f97316',
    year: '2024',
    status: 'Complete',
    featured: true
  },
  {
    id: 'landing-lab',
    name: 'Landing Lab',
    tagline: '3D Sky Gallery for Landing Page Showcases',
    description: 'A creative 3D web experience built with React Three Fiber featuring immersive scene rendering, post-processing effects, and a sky gallery concept for showcasing landing pages.',
    longDescription: 'Designed and developed an experimental 3D web experience that pushes the boundaries of browser-based rendering. Landing Lab uses React Three Fiber and Three.js to create an illustrated sky world where landing page designs are showcased as floating artifacts. Features post-processing effects, smooth camera transitions, and state management via Zustand.',
    techStack: ['React 19', 'TypeScript', 'Vite', 'R3F', 'Three.js', 'Framer Motion', 'React Router', 'Zustand'],
    category: 'Creative / 3D',
    highlights: [
      'Immersive 3D scene rendering with R3F',
      'Post-processing visual effects pipeline',
      'Sky gallery concept with floating artifacts',
      'Smooth camera transitions and controls',
      'State management with Zustand'
    ],
    github: 'https://github.com/AldrichVin/landing-lab',
    live: 'https://landinglab-three.vercel.app/',
    color: '#22d3ee',
    year: '2025',
    status: 'In Development',
    featured: true
  },
  {
    id: 'datapraktis',
    name: 'DataPraktis',
    tagline: 'Indonesian SMB Data Analytics Marketplace',
    description: 'A niche marketplace connecting Indonesian SMBs with data analysts. Features guided project templates, milestone-based escrow payments, and role-based dashboards for clients and analysts.',
    longDescription: 'Built a full-stack marketplace platform that bridges the gap between Indonesian small-medium businesses and professional data analysts. The platform features intelligent matching algorithms, secure escrow-based payments via Midtrans, and comprehensive admin tools for platform management.',
    techStack: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'NextAuth.js', 'Midtrans', 'AWS S3'],
    category: 'Full Stack',
    highlights: [
      'Role-based dashboards (Client/Analyst/Admin)',
      'Multi-step project creation wizard',
      'Milestone-based payment with escrow',
      'In-app messaging system',
      'Monorepo architecture with Turborepo'
    ],
    github: 'https://github.com/AldrichVin/datapraktis.git',
    live: 'https://datapraktis.vercel.app/',
    color: '#6366f1',
    year: '2025',
    status: 'In Development',
    featured: false
  },
  {
    id: 'receipts',
    name: 'RECEIPTS Protocol',
    tagline: 'Reputation-Weighted Prediction Markets on Solana',
    description: 'A prediction protocol where users make crypto market predictions and build verifiable track records on-chain. Rankings based on accuracy, not stake size.',
    longDescription: 'Developed a Web3 prediction protocol that revolutionizes how prediction markets work by prioritizing prediction accuracy over capital. Users build reputation through accurate predictions, creating a meritocratic system for market forecasting.',
    techStack: ['Next.js', 'React 19', 'Solana', 'TypeScript', 'Tailwind CSS', 'Phantom Wallet', 'Solflare'],
    category: 'Web3 / Blockchain',
    highlights: [
      'On-chain prediction verification',
      'Oracle ranking leaderboard',
      'Wallet integration (Phantom, Solflare)',
      'Accuracy-based reputation system',
      'Real-time market discovery'
    ],
    github: 'https://github.com/AldrichVin/CommunityOracleNetwork.git',
    live: 'https://receipts-app-vert.vercel.app',
    color: '#00ff88',
    year: '2025',
    status: 'Frontend Prototype',
    featured: false
  },
  {
    id: 'hov-corporation',
    name: 'HOV Corporation Archive',
    tagline: '3D Immersive Mythological Database',
    description: 'A futuristic interactive web experience styled as an alien observation archive cataloging mythological entities with premium 3D character visualization.',
    longDescription: 'Created an immersive sci-fi themed web application featuring real-time 3D model rendering, holographic UI effects, and a unique narrative experience. The archive catalogs legendary figures as "subjects" in a classified alien database.',
    techStack: ['Three.js', 'JavaScript ES6', 'CSS3', 'GLTFLoader', 'OrbitControls', 'WebGL'],
    category: 'Creative / 3D',
    highlights: [
      '4 high-fidelity 3D character models',
      'Holographic node navigation system',
      'Procedural Earth globe renderer',
      'RGB split glitch transition effects',
      'Auto-rotating model viewer'
    ],
    github: 'https://github.com/AldrichVin/HOV-Corporation.git',
    live: 'https://hov-corporation.vercel.app',
    color: '#00f0ff',
    year: '2024',
    status: 'Complete',
    featured: false
  },
  {
    id: 'monash-mates',
    name: 'Monash Mates',
    tagline: 'Peer Mentorship Mobile App',
    description: 'A mobile application connecting Monash students with experienced peers or alumni for academic and personal guidance through real-time chat.',
    longDescription: 'Developed for Macathon 2025, this Android application creates meaningful connections between students through a modern peer mentorship platform featuring secure authentication and instant messaging.',
    techStack: ['Kotlin', 'Jetpack Compose', 'Firebase Auth', 'Firestore', 'Realtime Database', 'Firebase Storage'],
    category: 'Mobile App',
    highlights: [
      'Modern Jetpack Compose UI',
      'Real-time chat functionality',
      'Secure Firebase authentication',
      'Media sharing capabilities',
      'Cross-platform data sync'
    ],
    github: 'https://github.com/AldrichVin/MonashMates.git',
    color: '#8b5cf6',
    year: '2025',
    status: 'Complete',
    featured: false
  },
  {
    id: 'imposter-game',
    name: 'Imposter Game',
    tagline: 'Retro Pixel-Art Arcade Experience',
    description: 'A retro-styled browser arcade game built with vanilla HTML5 Canvas featuring multiple mini-games, 8-bit pixel art aesthetic, and classic arcade gameplay mechanics.',
    longDescription: 'Created a nostalgic browser-based arcade experience using pure HTML5 Canvas and vanilla JavaScript. The game features multiple mini-games with retro pixel-art visuals, 8-bit sound design, and classic arcade mechanics. No frameworks or libraries — just raw Canvas API for maximum performance and creative control.',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Canvas API'],
    category: 'Game Development',
    highlights: [
      'Pure Canvas API rendering — no frameworks',
      'Multiple mini-games with varied mechanics',
      '8-bit pixel art aesthetic throughout',
      'Retro arcade UI and sound design',
      'Responsive canvas scaling'
    ],
    github: 'https://github.com/AldrichVin/Imposter_Game',
    live: 'https://retrogames-seven.vercel.app/',
    color: '#ef4444',
    year: '2024',
    status: 'Complete',
    featured: false
  }
]

export const categories = [
  'All',
  'Full Stack',
  'AI / Machine Learning',
  'AI / Automation',
  'Web3 / Blockchain',
  'Creative / 3D',
  'Data Analytics',
  'Data Visualization',
  'Mobile App',
  'Game Development'
]

// Placeholder images for projects (desaturated Unsplash)
export const projectImages = {
  'llm-evaluation-playground': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2532&auto=format&fit=crop&sat=-100',
  'clawd': 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=2487&auto=format&fit=crop&sat=-100',
  'australia-climate': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2544&auto=format&fit=crop&sat=-100',
  'nba-ranking': 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2490&auto=format&fit=crop&sat=-100',
  'landing-lab': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2532&auto=format&fit=crop&sat=-100',
  'datapraktis': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop&sat=-100',
  'receipts': 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2532&auto=format&fit=crop&sat=-100',
  'hov-corporation': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop&sat=-100',
  'monash-mates': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2540&auto=format&fit=crop&sat=-100',
  'imposter-game': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2540&auto=format&fit=crop&sat=-100',
}
