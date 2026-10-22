const GUEST_KEY = "vishwasx_guest_mode";

export const isGuestMode = (): boolean => {
  return localStorage.getItem(GUEST_KEY) === "true";
};

export const enableGuestMode = (): void => {
  localStorage.setItem(GUEST_KEY, "true");

  const demoUser = {
    id: "demo-user-123",
    email: "demo@example.com",
    name: "Priya Sharma (Demo)",
    role: "user" as const,
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem("sheReboot_currentUser", JSON.stringify(demoUser));
  localStorage.setItem("restartai_career_stage", "Career Restart");
  localStorage.setItem(
    "restartai_profile",
    JSON.stringify({
      previousRole: "Frontend Developer",
      yearsExperience: 4,
      careerBreakDuration: "2 years (Maternity Break)",
      currentSkills: ["React", "JavaScript", "HTML", "CSS", "TypeScript", "Tailwind CSS"],
      desiredRole: "Senior Full Stack Engineer",
      educationLevel: "Bachelor's Degree",
    })
  );

  localStorage.setItem(
    "vishwasx_ai_feedback",
    JSON.stringify({
      success: true,
      experience_years: "4 years",
      extracted_skills: ["React", "JavaScript", "HTML", "CSS", "TypeScript", "Node.js"],
      predicted_best_role: "Full Stack Engineer",
      role_analysis: {
        role: "Full Stack Engineer",
        match_score: 82,
        matched_skills: ["React", "JavaScript", "HTML", "CSS", "TypeScript"],
        missing_skills: ["Next.js", "Docker", "GraphQL", "CI/CD"],
      },
      recommended_courses: [
        "Advanced React Patterns and Performance",
        "Full Stack with Next.js 14 and Tailwind",
        "Docker & Kubernetes Fundamentals",
      ],
      roadmap: [],
    })
  );
};

export const disableGuestMode = (): void => {
  localStorage.removeItem(GUEST_KEY);
};
