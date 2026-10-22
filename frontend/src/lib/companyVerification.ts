export const TRUST_VERIFY_THRESHOLD = 70;
export const PHISHING_REJECT_PROBABILITY = 0.35;

export interface CompanyVerificationInput {
  companyName: string;
  domain: string;
  email: string;
  website: string;
  industry: string;
  details: string;
}

export interface VerificationSignal {
  name: string;
  score: number;
  maxScore: number;
  note: string;
}

export interface CompanyVerificationResult {
  trustScore: number;
  phishingRiskPercent: number;
  isVerified: boolean;
  signals: VerificationSignal[];
  ruleFlags: string[];
  companyName?: string;
  normalizedDomain?: string;
  companyId?: string;
}

const STORAGE_KEY = "vishwasx_verified_companies";
const PERMISSION_KEY = "vishwasx_company_reg_permission";

export const getVerifiedCompanies = (): (CompanyVerificationResult & { companyName: string; normalizedDomain: string; companyId: string })[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Error reading verified companies:", e);
  }
  return [
    {
      companyId: "comp_google_01",
      companyName: "Google LLC",
      normalizedDomain: "google.com",
      trustScore: 98,
      phishingRiskPercent: 2,
      isVerified: true,
      signals: [],
      ruleFlags: [],
    },
    {
      companyId: "comp_microsoft_02",
      companyName: "Microsoft",
      normalizedDomain: "microsoft.com",
      trustScore: 97,
      phishingRiskPercent: 3,
      isVerified: true,
      signals: [],
      ruleFlags: [],
    },
    {
      companyId: "comp_tcs_03",
      companyName: "Tata Consultancy Services",
      normalizedDomain: "tcs.com",
      trustScore: 94,
      phishingRiskPercent: 6,
      isVerified: true,
      signals: [],
      ruleFlags: [],
    },
  ];
};

export const getCompanyRegistrationPermission = (): { companyName: string; normalizedDomain: string } | null => {
  try {
    const raw = localStorage.getItem(PERMISSION_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }
  return null;
};

export const verifyCompany = (
  input: CompanyVerificationInput
): { success: boolean; result?: CompanyVerificationResult; message?: string } => {
  if (!input.companyName.trim() || !input.domain.trim() || !input.email.trim()) {
    return {
      success: false,
      message: "Please fill in Company Name, Domain, and Official Email.",
    };
  }

  const normalizedDomain = input.domain.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  const normalizedEmail = input.email.trim().toLowerCase();
  const ruleFlags: string[] = [];

  // Check email domain match
  const emailDomain = normalizedEmail.split("@")[1] || "";
  const emailDomainMatch = emailDomain === normalizedDomain || emailDomain.endsWith("." + normalizedDomain);
  if (!emailDomainMatch && !["gmail.com", "outlook.com"].includes(emailDomain)) {
    ruleFlags.push(`Email domain (${emailDomain}) does not match corporate domain (${normalizedDomain}).`);
  }

  // Free email warning
  if (["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"].includes(emailDomain)) {
    ruleFlags.push("Official email uses public free mail provider instead of corporate domain.");
  }

  // HTTPS check
  const isHttps = input.website.trim().startsWith("https://");
  if (!isHttps && input.website.trim()) {
    ruleFlags.push("Website URL lacks HTTPS SSL encryption.");
  }

  // Suspicious keywords in domain
  const suspiciousKeywords = ["free", "bonus", "winner", "crypto", "paytm-login", "bank-update", "verification-login"];
  const hasSuspiciousKeyword = suspiciousKeywords.some((w) => normalizedDomain.includes(w));
  if (hasSuspiciousKeyword) {
    ruleFlags.push("Domain contains high-risk phishing and deceptive keyword patterns.");
  }

  // Calculate signals
  const signals: VerificationSignal[] = [
    {
      name: "Domain Reputation & Pattern",
      score: hasSuspiciousKeyword ? 5 : normalizedDomain.includes(".") && normalizedDomain.length > 4 ? 25 : 10,
      maxScore: 25,
      note: hasSuspiciousKeyword ? "Suspicious token detected in domain" : "Domain format is clean and verified",
    },
    {
      name: "SSL & Transport Security",
      score: isHttps ? 25 : 5,
      maxScore: 25,
      note: isHttps ? "Valid SSL / TLS protocol declared" : "Insecure HTTP or missing SSL",
    },
    {
      name: "Corporate Identity & Email Match",
      score: emailDomainMatch ? 30 : 10,
      maxScore: 30,
      note: emailDomainMatch ? "Corporate email domain matches corporate website" : "Mismatched or free mail provider",
    },
    {
      name: "Business Profile & Scope",
      score: input.details.trim().length > 20 ? 20 : 10,
      maxScore: 20,
      note: input.details.trim().length > 20 ? "Detailed operational description provided" : "Minimal description",
    },
  ];

  const totalScore = signals.reduce((sum, s) => sum + s.score, 0);
  const trustScore = Math.min(100, Math.max(0, totalScore));
  const phishingRiskPercent = Math.max(0, 100 - trustScore);
  const phishingProb = phishingRiskPercent / 100;

  const isVerified = trustScore >= TRUST_VERIFY_THRESHOLD && phishingProb < PHISHING_REJECT_PROBABILITY;

  const result: CompanyVerificationResult = {
    trustScore,
    phishingRiskPercent,
    isVerified,
    signals,
    ruleFlags,
    companyName: input.companyName,
    normalizedDomain,
    companyId: `comp_${Date.now()}`,
  };

  if (isVerified) {
    localStorage.setItem(
      PERMISSION_KEY,
      JSON.stringify({
        companyName: input.companyName,
        normalizedDomain,
      })
    );

    const existing = getVerifiedCompanies();
    const updated = [
      {
        ...result,
        companyName: input.companyName,
        normalizedDomain,
        companyId: result.companyId!,
      },
      ...existing.filter((c) => c.normalizedDomain !== normalizedDomain),
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  return {
    success: true,
    result,
  };
};
