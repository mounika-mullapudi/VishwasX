const getDefaultApiUrl = (): string => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  if (typeof window !== "undefined" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
    return "https://vishwasx-backend-894r.onrender.com";
  }
  return "http://localhost:4000";
};

export const API_BASE_URL = getDefaultApiUrl();

const request = async <T = any>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      headers,
    });
  } catch (err: any) {
    if (err?.message?.includes("Failed to fetch") || err?.name === "TypeError") {
      throw new Error(`Unable to connect to backend at ${API_BASE_URL}. Ensure the backend service is running and CORS is configured.`);
    }
    throw err;
  }

  if (!response.ok) {
    let errorDetail = `Request failed with status ${response.status}`;
    try {
      const errJson = await response.json();
      errorDetail = errJson.detail || errJson.message || errorDetail;
    } catch {
      // ignore
    }
    throw new Error(errorDetail);
  }

  return response.json();
};

export const jobsApi = {
  getAll: async () => {
    return request<{ success: boolean; jobs: any[] }>("/api/jobs");
  },
  getById: async (jobId: string) => {
    return request<{ success: boolean; job: any }>(`/api/jobs/${jobId}`);
  },
  apply: async (payload: any) => {
    return request<{ success: boolean; message?: string }>("/api/jobs/apply", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  create: async (job: any) => {
    return request<{ success: boolean; message?: string; job?: any }>("/api/company/post-job", {
      method: "POST",
      body: JSON.stringify(job),
    });
  },
  getByCompany: async (companyId: string) => {
    return request<{ success: boolean; jobs: any[] }>(`/api/company/my-jobs/${companyId}`);
  },
  delete: async (jobId: string) => {
    return request<{ success: boolean; message?: string }>(`/api/job/${jobId}`, {
      method: "DELETE",
    });
  },
};

export const userApi = {
  getProfile: async (userId: string) => {
    return request<{ success: boolean; user?: any; profile?: any }>(`/api/user/profile/${encodeURIComponent(userId)}`);
  },
  updateProfile: async (payload: any) => {
    return request<{ success: boolean; message?: string; profile?: any }>("/api/auth/user/profile", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  getApplications: async (userId: string) => {
    return request<{ success: boolean; applications: any[] }>(`/api/user/applications/${encodeURIComponent(userId)}`);
  },
};

export const videoApi = {
  upload: async (blob: Blob) => {
    const formData = new FormData();
    formData.append("file", blob, "answer_video.webm");

    const response = await fetch(`${API_BASE_URL}/api/video/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Video upload failed: ${response.statusText}`);
    }

    return response.json() as Promise<{ success: boolean; videoId: string }>;
  },
  getUrl: (videoId: string) => `${API_BASE_URL}/api/video/${videoId}`,
};

export const applicationApi = {
  updateStatus: async (applicationId: string, status: string) => {
    return request<{ success: boolean; message?: string }>(`/api/applications/status/${applicationId}`, {
      method: "POST",
      body: JSON.stringify({ status }),
    });
  },
  getCompanyApplicants: async (companyId: string) => {
    return request<{ success: boolean; applicants: any[] }>(`/api/company/applicants/${companyId}`);
  },
};
