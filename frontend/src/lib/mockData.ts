export interface UserProfile {
  careerStage?: string;
  previousRole?: string;
  yearsExperience?: number;
  careerBreakDuration?: string;
  currentSkills?: string[];
  desiredRole?: string;
  educationLevel?: string;
}

export interface CareerGapAnalysis {
  oldSkillsRelevance: number;
  transferableSkills: string[];
  industryEvolution: string[];
  skillsToUpdate: string[];
  newTrendsToLearn: string[];
}

export interface Workshop {
  id: string;
  title: string;
  instructor: string;
  level: "beginner" | "intermediate" | "advanced";
  description: string;
  date: string;
  duration: number;
  registrations: number;
  maxCapacity: number;
  skills: string[];
}

export interface SkillProficiency {
  skill: string;
  current: number;
  required: number;
  industry: number;
}

export interface Job {
  id: string;
  title: string;
  companyName: string;
  companies: string[];
  type: "Full-time" | "Returnship" | "Internship";
  description: string;
  requiredSkills: string[];
  skills: string[];
  isVerifiedCompany?: boolean;
  location?: string;
  salary?: string;
}

export interface Mentor {
  id: string;
  name: string;
  currentRole: string;
  company?: string;
  yearsExperience: number;
  skills: string[];
  bio?: string;
  avatar?: string;
}

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  category: "skill" | "industry" | "trend" | "opportunity";
  priority: "high" | "medium" | "low";
}

export interface CareerPath {
  role: string;
  timeline: number;
  matchScore: number;
  salaryRange: string;
  requiredSkills: string[];
  description?: string;
}

export interface Connection {
  name: string;
  avatar: string;
  previousRole: string;
  careerBreak: string;
  desiredRole: string;
  skills: string[];
  matchReason: string;
}

export interface RoadmapMonth {
  month: number;
  title: string;
  tasks: string[];
  resources: { name: string; platform: string; url: string }[];
}

export interface SkillGap {
  currentSkills: string[];
  missingSkills: string[];
  recommendations: string[];
}

export const sampleJobs: Job[] = [
  {
    id: "job-1",
    title: "Senior Full Stack Returnship",
    companyName: "Google Cloud",
    companies: ["Google", "Alphabet"],
    type: "Returnship",
    description: "Designed for women restarting careers after a break of 1+ years. Build cloud-native web applications with mentor pairing.",
    requiredSkills: ["React", "TypeScript", "Node.js", "Cloud Architecture"],
    skills: ["React", "TypeScript", "Node.js", "Cloud Architecture"],
    isVerifiedCompany: true,
    location: "Bengaluru (Hybrid)",
    salary: "₹28,00,000 - ₹35,00,000",
  },
  {
    id: "job-2",
    title: "Frontend Software Engineer",
    companyName: "Microsoft India",
    companies: ["Microsoft"],
    type: "Full-time",
    description: "Join the Teams platform experience engineering group. Flexible work hours and transition support program.",
    requiredSkills: ["React", "JavaScript", "HTML", "CSS", "Next.js"],
    skills: ["React", "JavaScript", "HTML", "CSS", "Next.js"],
    isVerifiedCompany: true,
    location: "Hyderabad / Remote",
    salary: "₹24,00,000 - ₹30,00,000",
  },
  {
    id: "job-3",
    title: "AI Product Analyst Returnship",
    companyName: "Swiggy",
    companies: ["Swiggy"],
    type: "Returnship",
    description: "Empowering career returners to leverage data analytics and product metrics for delivery operations.",
    requiredSkills: ["Python", "SQL", "Data Analysis", "Communication"],
    skills: ["Python", "SQL", "Data Analysis", "Communication"],
    isVerifiedCompany: true,
    location: "Bengaluru",
    salary: "₹18,00,000 - ₹24,00,000",
  },
  {
    id: "job-4",
    title: "UI/UX & Design Systems Engineer",
    companyName: "Flipkart",
    companies: ["Flipkart", "Walmart"],
    type: "Full-time",
    description: "Craft accessible, high-performance web components for millions of daily shoppers.",
    requiredSkills: ["Figma", "Tailwind CSS", "React", "Design Systems"],
    skills: ["Figma", "Tailwind CSS", "React", "Design Systems"],
    isVerifiedCompany: true,
    location: "Bengaluru",
    salary: "₹22,00,000 - ₹27,00,000",
  },
];

export const sampleMentors: Mentor[] = [
  {
    id: "mentor-1",
    name: "Anita Desai",
    currentRole: "VP of Engineering at Swiggy",
    company: "Swiggy",
    yearsExperience: 14,
    skills: ["Engineering Leadership", "Career Transition", "System Design", "React"],
    bio: "Returned to tech after a 3-year motherhood sabbatical and scaled engineering orgs.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AnitaDesai",
  },
  {
    id: "mentor-2",
    name: "Meera Kulkarni",
    currentRole: "Principal Architect at Microsoft",
    company: "Microsoft",
    yearsExperience: 16,
    skills: ["Cloud Architecture", "Distributed Systems", "Resume Crafting", "Interview Prep"],
    bio: "Passionate about mentoring women returning to STEM careers.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MeeraKulkarni",
  },
  {
    id: "mentor-3",
    name: "Sunita Roy",
    currentRole: "Staff AI Engineer at Google",
    company: "Google",
    yearsExperience: 11,
    skills: ["Machine Learning", "Python", "Generative AI", "Data Science"],
    bio: "Helping returners bridge tech skill gaps with modern AI tools.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SunitaRoy",
  },
];

export const sampleWorkshops: Workshop[] = [
  {
    id: "ws-1",
    title: "Rebuilding Technical Confidence & Modern React 19",
    instructor: "Anita Desai",
    level: "intermediate",
    description: "Hands-on refresher on React hooks, server components, and modern full-stack workflows.",
    date: new Date(Date.now() + 86400000 * 3).toISOString(),
    duration: 2,
    registrations: 42,
    maxCapacity: 50,
    skills: ["React", "TypeScript", "Vite"],
  },
  {
    id: "ws-2",
    title: "System Design for Technical Returnee Interviews",
    instructor: "Meera Kulkarni",
    level: "advanced",
    description: "Strategies to tackle architecture diagrams and trade-offs without feeling rusty.",
    date: new Date(Date.now() + 86400000 * 7).toISOString(),
    duration: 3,
    registrations: 28,
    maxCapacity: 35,
    skills: ["System Design", "Scalability", "Microservices"],
  },
];

export const sampleSkillProficiencies: SkillProficiency[] = [
  { skill: "JavaScript/TS", current: 85, required: 90, industry: 88 },
  { skill: "React Ecosystem", current: 80, required: 85, industry: 82 },
  { skill: "Full Stack / Node", current: 65, required: 80, industry: 78 },
  { skill: "Cloud & DevOps", current: 45, required: 75, industry: 70 },
  { skill: "System Design", current: 55, required: 75, industry: 72 },
];

export const sampleCareerGapAnalysis: CareerGapAnalysis = {
  oldSkillsRelevance: 78,
  transferableSkills: [
    "Software Architecture Thinking",
    "Cross-functional Team Collaboration",
    "Project Scoping & Delivery",
    "Analytical Problem Solving",
  ],
  industryEvolution: [
    "Transition from monolithic apps to modular Next.js / serverless setups",
    "Widespread adoption of TypeScript as industry standard",
    "AI-assisted developer workflows (copilots and automated testing)",
    "Cloud containerization with Docker and Kubernetes",
  ],
  skillsToUpdate: [
    "TypeScript strict mode and generics",
    "Modern State Management (React Query, Zustand)",
    "Tailwind CSS and Shadcn component architectures",
  ],
  newTrendsToLearn: [
    "Full-stack Next.js 14 App Router",
    "Docker basics and CI/CD pipelines",
    "Prompt engineering and LLM API integrations",
  ],
};

export const interviewQuestions: string[] = [
  "How do you address your career break positively in behavioral interviews?",
  "Can you explain an architectural challenge you solved in your prior role?",
  "How have you kept your technical skills updated during your break?",
  "Walk me through a project where you learned a new technology quickly.",
];

export const technicalTopics: string[] = [
  "JavaScript Event Loop, Closures, and Async/Await",
  "React 18 Hooks: useEffect, useMemo, useCallback, and concurrency",
  "RESTful API design and status code standards",
  "SQL Joins, Indexing, and Query Optimization",
  "Git branching models and pull request review workflows",
];

export const resumeTips: string[] = [
  "Use a functional or hybrid resume format emphasizing projects and skills first.",
  "State your career break transparently with positive growth activities (courses, open-source).",
  "Quantify past achievements with measurable metrics (e.g. 'Improved load speed by 35%').",
  "Include links to live GitHub projects and your active VishwasX portfolio.",
];

export const confidenceTips: string[] = [
  "Your foundational problem-solving abilities do not expire; only syntax evolves.",
  "Mock interview with mentors to overcome imposter syndrome in a safe space.",
  "Remember that diversity of life experience is a leadership strength, not a weakness.",
  "Focus on continuous progress rather than perfection on day one.",
];

export const generateSkillGap = (profile: any): SkillGap => {
  const currentSkills = Array.isArray(profile?.currentSkills)
    ? profile.currentSkills
    : (profile?.currentSkills || "").split(",").map((s: string) => s.trim()).filter(Boolean);

  const desired = (profile?.desiredRole || "").toLowerCase();

  let missing = ["TypeScript", "Next.js", "Docker", "System Design"];
  if (desired.includes("data") || desired.includes("ai")) {
    missing = ["Python", "Pandas", "Scikit-Learn", "SQL"];
  }

  return {
    currentSkills: currentSkills.length > 0 ? currentSkills : ["JavaScript", "HTML", "CSS", "React"],
    missingSkills: missing,
    recommendations: [
      "Complete the VishwasX 3-month structured roadmap.",
      "Build a modern portfolio repository showcasing end-to-end full stack architecture.",
      "Schedule 1-on-1 mentorship practice sessions.",
    ],
  };
};

export const generateRoadmap = (missingSkills: string[] = []): RoadmapMonth[] => {
  return [
    {
      month: 1,
      title: "Core Foundation Refresh & Modern Tooling",
      tasks: [
        "Revise modern JavaScript ES6+ and TypeScript fundamentals",
        "Set up local development container workflow",
        "Complete 2 mini projects using component libraries",
      ],
      resources: [
        { name: "TypeScript Handbook", platform: "Documentation", url: "https://www.typescriptlang.org" },
        { name: "Modern React Course", platform: "Coursera", url: "https://coursera.org" },
      ],
    },
    {
      month: 2,
      title: "Full Stack Integration & Advanced State",
      tasks: [
        "Build secure RESTful APIs with input validation",
        "Implement optimistic UI updates with React Query",
        "Write unit tests with Vitest and React Testing Library",
      ],
      resources: [
        { name: "TanStack Query Deep Dive", platform: "YouTube", url: "https://youtube.com" },
        { name: "Docker Fundamentals", platform: "Udemy", url: "https://udemy.com" },
      ],
    },
    {
      month: 3,
      title: "System Design, Mock Interviews & Job Applications",
      tasks: [
        "Practice 5 high-frequency system design case studies",
        "Conduct 2 mentor mock interviews",
        "Submit verified applications to partner returnships",
      ],
      resources: [
        { name: "System Design Primer", platform: "GitHub", url: "https://github.com" },
        { name: "VishwasX Mentor Network", platform: "VishwasX", url: "/messages" },
      ],
    },
  ];
};
