export interface LearningResource {
  id: string;
  title: string;
  platform: "YouTube" | "Coursera" | "Udemy" | "Google" | "LinkedIn Learning";
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  instructor: string;
  skillsCovered: string[];
  thumbnailUrl: string;
  videoUrl: string;
  description?: string;
  rating?: number;
}

export interface FeaturedWorkshop {
  title: string;
  instructor: string;
  instructorRole: string;
  instructorAvatar?: string;
  description: string;
  duration: string;
  date: string;
  attendees: number;
  maxAttendees: number;
  skillsCovered: string[];
  thumbnailUrl: string;
  videoUrl: string;
}

export const featuredWorkshop: FeaturedWorkshop = {
  title: "Mastering React 19 & Next.js for Returnee Engineers",
  instructor: "Anita Desai",
  instructorRole: "VP of Engineering at Swiggy",
  description: "A hands-on, confidence-rebuilding masterclass breaking down modern state architectures, server actions, and interview patterns.",
  duration: "2 hours",
  date: new Date(Date.now() + 86400000 * 3).toLocaleDateString(),
  attendees: 142,
  maxAttendees: 200,
  skillsCovered: ["React 19", "Next.js", "TypeScript", "Performance"],
  thumbnailUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
  videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
};

export const learningResources: LearningResource[] = [
  {
    id: "res-1",
    title: "Modern React & TypeScript: The Complete Guide",
    platform: "Coursera",
    duration: "14 hours",
    level: "Intermediate",
    instructor: "Dan Abramov & Meta Engineers",
    skillsCovered: ["React", "TypeScript", "Hooks", "Next.js"],
    thumbnailUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
    description: "Master React 18/19 patterns, state management with React Query, and TypeScript strictly typed component design.",
    rating: 4.9,
  },
  {
    id: "res-2",
    title: "Docker & Containerization for Frontend/Fullstack Developers",
    platform: "Udemy",
    duration: "8 hours",
    level: "Beginner",
    instructor: "Bret Fisher",
    skillsCovered: ["Docker", "Containers", "CI/CD", "DevOps"],
    thumbnailUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=pg19Z8LL06w",
    description: "Learn how to build Dockerfiles, compose multi-container stacks, and streamline local developer environments.",
    rating: 4.8,
  },
  {
    id: "res-3",
    title: "GraphQL & REST API Integration Best Practices",
    platform: "LinkedIn Learning",
    duration: "6 hours",
    level: "Intermediate",
    instructor: "Eve Porcello",
    skillsCovered: ["GraphQL", "REST", "Node.js", "APIs"],
    thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=eIQh02xuVw4",
    description: "Build robust queries, mutations, and caching layers with Apollo Client and backend schemas.",
    rating: 4.7,
  },
  {
    id: "res-4",
    title: "Python for Data Analysis & AI Career Returners",
    platform: "Google",
    duration: "20 hours",
    level: "Beginner",
    instructor: "Google Career Certificates",
    skillsCovered: ["Python", "Pandas", "Data Analysis", "SQL"],
    thumbnailUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw",
    description: "Comprehensive hands-on data manipulation, visualization, and practical analysis notebooks.",
    rating: 4.9,
  },
  {
    id: "res-5",
    title: "Mastering Tailwind CSS & Modern UI Engineering",
    platform: "YouTube",
    duration: "5 hours",
    level: "Beginner",
    instructor: "Traversy Media",
    skillsCovered: ["Tailwind CSS", "CSS", "UI Design", "HTML"],
    thumbnailUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=dFgzHOX84xQ",
    description: "Build responsive, modern UI components with utility-first CSS and polished glassmorphic styling.",
    rating: 4.8,
  },
  {
    id: "res-6",
    title: "System Design Interview Prep for Returnees",
    platform: "Coursera",
    duration: "10 hours",
    level: "Advanced",
    instructor: "Gaurav Sen",
    skillsCovered: ["System Design", "Scalability", "Microservices", "Architecture"],
    thumbnailUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=xpDnVSmNFX0",
    description: "High-level design, database sharding, caching, and load balancing explained clearly from the ground up.",
    rating: 4.9,
  },
];

export const getLearningResources = (role?: string): LearningResource[] => {
  if (!role) return learningResources;
  const roleLower = role.toLowerCase();
  if (roleLower.includes("data") || roleLower.includes("ai") || roleLower.includes("analyst")) {
    return learningResources.filter((r) =>
      r.skillsCovered.some((s) => ["Python", "SQL", "Data Analysis", "Machine Learning"].includes(s))
    );
  }
  return learningResources;
};

export const getResourcesBySkill = (skill: string): LearningResource[] => {
  const sLower = skill.toLowerCase();
  return learningResources.filter((r) =>
    r.skillsCovered.some((s) => s.toLowerCase().includes(sLower))
  );
};

export const getAllSkills = () : string[] => 
{
  const set = new Set <string> ();
  learningResources.forEach((r) => 
  {
    r.skillsCovered.forEach((s) => set.add(s));
  }
);
  return Array.from(set);

};
