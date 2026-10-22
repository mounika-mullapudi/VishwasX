const PROGRESS_KEY = "vishwasx_learning_progress";

export const getProgress = (): Record<string, boolean> => {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }
  return {
    "1-0": true,
    "1-1": true,
  };
};

export const saveProgress = (progress: Record<string, boolean>): void => {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
};

export const isItemCompleted = (id: string): boolean => {
  const progress = getProgress();
  return !!progress[id];
};

export const toggleItemCompletion = (id: string): void => {
  const progress = getProgress();
  progress[id] = !progress[id];
  saveProgress(progress);
};

export const calculateProgress = (completed: number, total: number): number => {
  if (total <= 0) return 0;
  return Math.min(100, Math.round((completed / total) * 100));
};

export const getMilestoneStatus = (progress: number): string => {
  if (progress >= 100) return "Mastered";
  if (progress >= 75) return "Advanced";
  if (progress >= 50) return "In Progress";
  if (progress >= 25) return "Started";
  return "Not Started";
};

export const getMilestoneColor = (progress: number): string => {
  if (progress >= 75) return "hsl(var(--secondary))";
  if (progress >= 50) return "hsl(var(--primary))";
  return "hsl(var(--accent))";
};

export const getMilestoneTextColor = (progress: number): string => {
  if (progress >= 75) return "text-secondary";
  if (progress >= 50) return "text-primary";
  return "text-accent";
};
