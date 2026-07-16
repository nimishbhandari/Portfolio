export type SectionId =
  | 'home'
  | 'about'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'education'
  | 'contact';

export interface FileEntry {
  id: SectionId;
  file: string;
  lang: 'tsx' | 'md' | 'ts' | 'js' | 'json' | 'log' | 'css';
  label: string;
}

/** Sidebar files double as section nav — order here drives explorer, tabs and palette. */
export const files: FileEntry[] = [
  { id: 'home', file: 'home.tsx', lang: 'tsx', label: 'Home' },
  { id: 'about', file: 'about.md', lang: 'md', label: 'About' },
  { id: 'experience', file: 'experience.ts', lang: 'ts', label: 'Experience' },
  { id: 'projects', file: 'projects.js', lang: 'js', label: 'Projects' },
  { id: 'skills', file: 'skills.json', lang: 'json', label: 'Skills' },
  { id: 'education', file: 'education.log', lang: 'log', label: 'Education' },
  { id: 'contact', file: 'contact.css', lang: 'css', label: 'Contact' },
];

export const profile = {
  firstName: 'Nimish',
  lastName: 'Bhandari',
  initials: 'NB',
  role: 'Software Engineer 2',
  company: 'Lyearn',
  location: 'Gurugram, India',
  email: 'nimishbhandari727521@gmail.com',
  phone: '+91-8303578247',
  github: 'https://github.com/nimishbhandari',
  githubHandle: 'nimishbhandari',
  linkedin: 'https://www.linkedin.com/in/b-nimish/',
  linkedinHandle: 'in/b-nimish',
  resume: 'resume.pdf',
  chips: ['Software Engineer 2', 'Full-Stack Developer', 'AI Integrations', '@ Lyearn'],
  /** Typewriter phrases on the hero. */
  typewriter: [
    'AI-powered learning platforms',
    'systems that scale to 50k+ users',
    'products that drive real revenue',
    'things that actually ship',
  ],
  tagline:
    'I build full-stack products at the intersection of AI and education — from proctoring systems that verify 50,000+ students to AI course builders and roleplay engines.',
};

export const stats = [
  { value: '3+', label: 'YEARS' },
  { value: '50k+', label: 'USERS REACHED' },
  { value: '30%', label: 'REVENUE DRIVEN' },
  { value: '↑', label: 'ALWAYS SHIPPING' },
];

export const about = {
  paragraphs: [
    "I'm a software engineer with 3+ years building products end to end — currently **Software Engineer 2 at Lyearn**, where I work on AI-driven features for enterprise learning: productivity measurement, virtual roleplay, and an AI-first course builder.",
    "Before that I spent two and a half years at **Imarticus Learning**, where I shipped the systems that carried real business weight — an AI proctoring platform, a virtual machine lab that lifted profitability by 60%, and the channel partner portal that drives **30% of company revenue**.",
    "I like problems where the engineering is load-bearing: things that have to stay correct at scale, under real traffic, for real users. Mostly **TypeScript, React, Node.js**, and increasingly **LLM integrations**.",
  ],
  facts: [
    { key: 'currently', value: 'Software Engineer 2 @ Lyearn' },
    { key: 'based_in', value: 'Gurugram, India' },
    { key: 'focus', value: 'Full-stack · AI integrations' },
    { key: 'open_to', value: 'Interesting problems' },
  ],
};

export interface Job {
  company: string;
  role: string;
  location: string;
  period: string;
  current: boolean;
  bullets: { title: string; body: string }[];
}

export const experience: Job[] = [
  {
    company: 'Lyearn',
    role: 'Software Engineer 2',
    location: 'Gurugram',
    period: 'Oct 2025 — Present',
    current: true,
    bullets: [
      {
        title: 'Productivity Measurement System',
        body: 'Engineered an employee productivity measurement system using **OpenAI** and **Lyearn Workflows** to evaluate employee productivity based on workplace activities.',
      },
      {
        title: 'AI-Driven Roleplay',
        body: 'Built an AI-powered virtual roleplay system using **ElevenLabs**, **Lyearn Knowledge Base**, and **OpenAI** to simulate mock interviews, customer interactions, and client management scenarios.',
      },
      {
        title: 'Widget-Based Homepage',
        body: 'Implemented a fully customizable widget-based homepage that enabled clients to tailor dashboards to their business needs, including deployments for **HDFC**, **Blinkit**, **Belcorp**, and **UnifyApps**.',
      },
      {
        title: 'AI-First Course Builder',
        body: 'Designed multiple guardrails for the **AI Course Builder**, including future-step invalidation, dynamic course structure updates, and AI-powered autofill logic.',
      },
    ],
  },
  {
    company: 'Imarticus Learning',
    role: 'Software Engineer',
    location: 'Noida',
    period: 'Apr 2023 — Oct 2025',
    current: false,
    bullets: [
      {
        title: 'AI-Powered Exam Proctoring System',
        body: 'Engineered an automated proctoring system using **AWS Liveness**, **Face Recognition**, and **Face Comparison** to verify student identity and prevent cheating, with automated checks every two minutes to ensure exam integrity at scale.',
      },
      {
        title: 'Virtual Machine Lab',
        body: "Implemented a platform enabling instructors to provision **pre-loaded virtual machines**, improving students' hands-on learning experience and contributing to a **60% increase in profitability**.",
      },
      {
        title: 'Free Courses Feature',
        body: 'Launched a scalable platform offering free course access, attracting over **50,000 student registrations** and significantly increasing user engagement and brand reach.',
      },
      {
        title: 'National Employability Test',
        body: 'Created a high-traffic assessment platform supporting free employability tests, helping more than **50,000 students** connect with job opportunities through skill-based evaluations.',
      },
      {
        title: 'Channel Partner Portal',
        body: "Developed the **core enterprise portal** for partner onboarding, lead generation, and invoicing, directly contributing to **30% of the company's total revenue**.",
      },
      {
        title: 'Email Delivery Logs',
        body: 'Integrated **AWS SNS** to monitor email delivery and bounce events, reducing bounce rates to **1%** and improving the reliability of email communication.',
      },
      {
        title: 'Deep Linking',
        body: 'Integrated deep linking across **Android**, **iOS**, and the web, increasing app engagement by **30%** while reducing user drop-offs by **10%**.',
      },
      {
        title: 'Agreements Management System',
        body: 'Streamlined agreement workflows by enabling digital signatures for teachers and students, reducing manual processing time to under one minute and improving the overall user experience.',
      },
    ],
  },
];

export interface Project {
  index: string;
  name: string;
  kind: string;
  blurb: string;
  tech: string[];
  live: string;
  liveLabel: string;
  repo: string;
  period: string;
}

export const projects: Project[] = [
  {
    index: '01',
    name: 'PropShop',
    kind: 'E-commerce Web Application',
    blurb:
      'Built and deployed a scalable e-commerce platform supporting over **1,000 transactions** during its initial launch while eliminating manual order management.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Redux', 'JavaScript'],
    live: 'https://prop-shop.onrender.com',
    liveLabel: 'prop-shop.onrender.com',
    repo: 'https://github.com/nimishbhandari/mern_shop',
    period: 'Dec 2021 — Mar 2022',
  },
  {
    index: '02',
    name: 'DevMeet',
    kind: 'Social Media Platform',
    blurb:
      'Created a full-stack social networking platform enabling users to connect, share interests, and interact through posts — with robust CRUD operations and JWT-based authentication for over **1,500 users**.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Redux', 'JWT'],
    live: 'https://devmeet-ic00.onrender.com',
    liveLabel: 'devmeet-ic00.onrender.com',
    repo: 'https://github.com/nimishbhandari/devmeet',
    period: 'Jun 2021 — Nov 2021',
  },
];

/** Shaped to render as a real skills.json document. */
export const skills: Record<string, string[]> = {
  languages: ['TypeScript', 'JavaScript', 'Java'],
  frontend: ['React', 'Next.js', 'HTML5', 'CSS3', 'Bootstrap', 'Material UI'],
  backend: ['Node.js', 'Express.js', 'GraphQL', 'CI/CD', 'Docker', 'Travis CI'],
  databases: ['MongoDB', 'MySQL', 'Redis', 'Couchbase', 'ClickHouse', 'Firebase'],
  cloud_and_tools: ['AWS', 'DigitalOcean', 'Git', 'GitHub', 'BigQuery', 'Looker Studio', 'Postman'],
  core_cs: ['Data Structures & Algorithms', 'Object-Oriented Programming'],
};

/** Flat list for the marquee. */
export const stack = Object.values(skills).flat();

export const education = {
  school: 'Madan Mohan Malaviya University of Technology',
  location: 'Gorakhpur, India',
  degree: 'Bachelor of Technology (B.Tech.)',
  branch: 'Electronics and Communication Engineering',
  gpa: '7.3',
  period: 'Jul 2019 — Jun 2023',
};
