import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { disableGuestMode } from "@/lib/guestMode";
import { GirlIllustration2, GirlIllustration3 } from "@/components/BackgroundIllustrations";
import { signInCompany } from "@/lib/auth";
import { API_BASE_URL } from "@/lib/apiService";

const CompanySignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Company Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (
      formData.email.trim().toLowerCase() === "demo@company.com" ||
      formData.email.trim().toLowerCase() === "demo@example.com"
    ) {
      setLoading(true);
      const demoCompany = {
        companyId: "comp-demo-123",
        companyName: "TechNova Innovations",
        contactEmail: formData.email.trim(),
        normalizedDomain: "technova.io",
        hiringContactName: "Sarah Jenkins (Demo)",
        isVerified: true,
      };
      signInCompany(demoCompany);
      setSuccessMessage("Signed in as Demo Company! Redirecting...");
      setTimeout(() => {
        navigate("/company/dashboard");
      }, 800);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/company/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password })
      });
      
      const result = await response.json();

      if (response.ok && result.success) {
        disableGuestMode();
        signInCompany(result.company);
        setSuccessMessage("Signed in successfully! Redirecting...");
        if (rememberMe) {
          localStorage.setItem("sheReboot_company_rememberMe", formData.email);
        }
        setTimeout(() => {
          navigate("/company/dashboard");
        }, 1500);
      } else {
        setErrors({ submit: result.detail || result.message || "Invalid credentials" });
      }
    } catch (error: any) {
      if (error?.message?.includes("Failed to fetch") || error?.name === "TypeError") {
        setErrors({
          submit: `Backend server at ${API_BASE_URL} is unreachable. Ensure the backend is deployed and running, or click Demo Company below.`
        });
      } else {
        setErrors({ submit: "An error occurred. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/25 via-background via-primary/15 to-accent/20 flex items-center justify-center px-0 py-12 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: "linear-gradient(0deg, transparent 24%, rgba(255,0,0,.05) 25%, rgba(255,0,0,.05) 26%, transparent 27%, transparent 74%, rgba(255,0,0,.05) 75%, rgba(255,0,0,.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,0,0,.05) 25%, rgba(255,0,0,.05) 26%, transparent 27%, transparent 74%, rgba(255,0,0,.05) 75%, rgba(255,0,0,.05) 76%, transparent 77%, transparent)",
        backgroundSize: "50px 50px"
      }}></div>

      {/* Girl illustrations */}
      <div className="absolute -left-20 top-20 w-56 h-72">
        <GirlIllustration2 />
      </div>
      <div className="absolute -right-24 bottom-10 w-56 h-72">
        <GirlIllustration3 />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Company Login</h1>
          <p className="text-muted-foreground">Sign in to your VishwasX company account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-card/80 backdrop-blur-md rounded-2xl border border-border/50 p-6 shadow-xl">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Company Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="hr@company.com"
                className="w-full rounded-lg border border-input bg-background/50 pl-10 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded-lg border border-input bg-background/50 pl-10 pr-10 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
            />
            <label htmlFor="rememberMe" className="text-sm text-muted-foreground cursor-pointer">
              Remember me
            </label>
          </div>

          {/* Error Message */}
          {errors.submit && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 space-y-2">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{errors.submit}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const demoCompany = {
                    companyId: "comp-demo-123",
                    companyName: "TechNova Innovations",
                    contactEmail: "demo@company.com",
                    normalizedDomain: "technova.io",
                    hiringContactName: "Sarah Jenkins (Demo)",
                    isVerified: true,
                  };
                  signInCompany(demoCompany);
                  navigate("/company/dashboard");
                }}
                className="w-full text-xs font-semibold py-1.5 px-3 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                ⚡ Continue as Demo Company instead
              </button>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="rounded-lg border border-secondary/30 bg-secondary/5 p-3 flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
              <p className="text-sm text-secondary">{successMessage}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg gradient-primary px-4 py-2.5 text-base font-semibold text-primary-foreground transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-lg"
          >
            {loading ? "Signing In..." : "Sign In as Company"}
          </button>

          {/* One-Click Demo Company Button */}
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">or test without backend</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              const demoCompany = {
                companyId: "comp-demo-123",
                companyName: "TechNova Innovations",
                contactEmail: "demo@company.com",
                normalizedDomain: "technova.io",
                hiringContactName: "Sarah Jenkins (Demo)",
                isVerified: true,
              };
              signInCompany(demoCompany);
              navigate("/company/dashboard");
            }}
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/5 hover:bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition-all"
          >
            <Sparkles className="h-4 w-4" />
            Explore Demo Company Dashboard
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <p className="text-center text-sm text-muted-foreground">
            Want to register your company?{" "}
            <Link to="/company-signup" className="font-semibold text-primary hover:underline">
              Register here
            </Link>
          </p>
          <p className="text-center text-sm text-muted-foreground">
            Not a company?{" "}
            <Link to="/signin" className="font-semibold text-primary hover:underline">
              User Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default CompanySignIn;
