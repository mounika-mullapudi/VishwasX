export interface SkillMatchResult {
  percentage: number;
  matchedSkills: string[];
  missingSkills: string[];
}

export function calculateSkillMatch(
  jobSkills: string[] = [],
  userSkills: string[] = []
): SkillMatchResult {
  if (!jobSkills || jobSkills.length === 0) {
    return { percentage: 100, matchedSkills: [], missingSkills: [] };
  }

  const normalizedUserSkills = new Set(
    (userSkills || []).map((s) => s.toLowerCase().trim())
  );

  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  jobSkills.forEach((skill) => {
    const sLower = skill.toLowerCase().trim();
    const isMatched = Array.from(normalizedUserSkills).some(
      (userSkill) => userSkill.includes(sLower) || sLower.includes(userSkill)
    );

    if (isMatched) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  const percentage = Math.round((matchedSkills.length / jobSkills.length) * 100);

  return {
    percentage,
    matchedSkills,
    missingSkills,
  };
}

export function sortJobsBySkillMatch(jobs: any[] = [], userSkills: string[] = []): any[] {
  return [...jobs].sort((a, b) => {
    const skillsA = a.skills || a.requiredSkills || [];
    const skillsB = b.skills || b.requiredSkills || [];
    const matchA = calculateSkillMatch(skillsA, userSkills).percentage;
    const matchB = calculateSkillMatch(skillsB, userSkills).percentage;
    return matchB - matchA;
  });
}

export function getMatchTextColor(percentage: number): string {
  if (percentage >= 75) {
    return "text-emerald-600 bg-emerald-500/10";
  }
  if (percentage >= 45) {
    return "text-amber-600 bg-amber-500/10";
  }
  return "text-rose-600 bg-rose-500/10";
}
