// Project data - Auto-discovered from local project directories
// Each project includes metadata parsed from the actual project files

export const projects = [
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
    color: '#6366f1',
    year: '2025',
    status: 'In Development'
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
    color: '#00ff88',
    year: '2025',
    status: 'Frontend Prototype'
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
    color: '#00f0ff',
    year: '2024',
    status: 'Complete'
  },
  {
    id: 'nba-ranking',
    name: 'NBA Unbiased Ranking',
    tagline: 'Data-Driven Player Analytics Platform',
    description: 'A full-stack application for NBA player ranking using R backend for statistical analytics and React frontend for interactive visualizations.',
    longDescription: 'Built a comprehensive analytics platform that removes bias from NBA player rankings through statistical modeling. Features include player comparisons, trend analysis, and streak tracking powered by a custom R backend.',
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
    color: '#f97316',
    year: '2024',
    status: 'Complete'
  },
  {
    id: 'australia-climate',
    name: 'Australia Climate Viz',
    tagline: 'Interactive Climate Data Storytelling',
    description: 'A comprehensive data visualization project exploring Australia\'s climate story including temperature anomalies, climate drivers, bushfire impacts, and koala habitat analysis.',
    longDescription: 'Created an interactive data journalism piece that tells the story of Australia\'s changing climate through sophisticated visualizations. Features choropleth maps, radar charts, and bubble plots built with Vega-Lite.',
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
    color: '#22c55e',
    year: '2025',
    status: 'Complete'
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
    status: 'Complete'
  }
]

export const categories = [
  'All',
  'Full Stack',
  'Web3 / Blockchain',
  'Creative / 3D',
  'Data Analytics',
  'Data Visualization',
  'Mobile App'
]
