import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  MessageSquare,
  User,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      return toast.error("Full Name is required");
    }
    if (!formData.email.trim()) {
      return toast.error("Email is required");
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return toast.error("Email is invalid");
    }
    if (!formData.password.trim()) {
      return toast.error("Password is required");
    }

    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      signup(formData);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-950 text-gray-100">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center 
              group-hover:bg-indigo-500/20 transition-colors"
              >
                <MessageSquare className="w-6 h-6 text-indigo-500" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-gray-400">
                Get started with your free account
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full bg-gray-900 border border-gray-800 rounded-md py-2.5 pl-10 pr-4 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:outline-none"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  className="w-full bg-gray-900 border border-gray-800 rounded-md py-2.5 pl-10 pr-4 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:outline-none"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-gray-900 border border-gray-800 rounded-md py-2.5 pl-10 pr-10 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:outline-none"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-70"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-500 hover:text-indigo-400"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with like-minded individuals and share your ideas."
      />
    </div>
  );
};

export default SignUpPage;
