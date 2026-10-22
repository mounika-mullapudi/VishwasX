export interface CurrentUser {
  id: string;
  email: string;
  name: string;
  role: "user" | "company";
  companyName?: string;
  companyId?: string;
  normalizedDomain?: string;
  createdAt?: string;
}

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const isValidPassword = (password: string): boolean => {
  // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
  if (password.length < 8) return false;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return hasUpper && hasLower && hasNumber;
};

export const getPasswordStrength = (
  password: string
): { strength: "weak" | "medium" | "strong"; feedback: string } => {
  if (!password) {
    return { strength: "weak", feedback: "Enter a password" };
  }

  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 2) {
    return { strength: "weak", feedback: "Too weak. Use 8+ characters, numbers, and symbols." };
  }
  if (score <= 4) {
    return { strength: "medium", feedback: "Moderate strength. Add special characters or length." };
  }
  return { strength: "strong", feedback: "Strong password!" };
};

export const getCurrentUser = (): CurrentUser | null => {
  try {
    const rawCompany = localStorage.getItem("sheReboot_companyUser");
    if (rawCompany) {
      const company = JSON.parse(rawCompany);
      return {
        id: company.companyId || company.id || company.contactEmail || company.email,
        email: company.contactEmail || company.email,
        name: company.hiringContactName || company.companyName || "Company Admin",
        role: "company",
        companyName: company.companyName,
        companyId: company.companyId,
        normalizedDomain: company.normalizedDomain,
      };
    }

    const rawUser = localStorage.getItem("sheReboot_currentUser");
    if (rawUser) {
      return JSON.parse(rawUser);
    }
  } catch (e) {
    console.error("Error reading current user from localStorage:", e);
  }
  return null;
};

export const setCurrentUser = (user: CurrentUser): void => {
  localStorage.setItem("sheReboot_currentUser", JSON.stringify(user));
};

export const signInCompany = (company: any): void => {
  const companyData: CurrentUser = {
    id: company.companyId || company.id || company.contactEmail || company.email,
    email: company.contactEmail || company.email,
    name: company.hiringContactName || company.companyName,
    role: "company",
    companyName: company.companyName,
    companyId: company.companyId,
    normalizedDomain: company.normalizedDomain,
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem("sheReboot_companyUser", JSON.stringify(companyData));
  localStorage.setItem("sheReboot_currentUser", JSON.stringify(companyData));
};

export const signOut = (): void => {
  localStorage.removeItem("sheReboot_currentUser");
  localStorage.removeItem("sheReboot_companyUser");
  localStorage.removeItem("vishwasx_guest_mode");
  localStorage.removeItem("restartai_career_stage");
  localStorage.removeItem("restartai_profile");
};
