import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Link2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      await login(
        formData.email,
        formData.password
      );

      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6]">

      {/* Back */}
      <div className="mx-auto max-w-7xl px-6 pt-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#FF5A1F]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>

      {/* Login */}
      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">

        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="mb-8 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF5A1F]">
                <Link2 className="h-5 w-5 text-white" />
              </div>

              <span className="text-xl font-bold text-[#171717]">
                SmartLink
              </span>
            </Link>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm sm:p-8">

            <div className="text-center">
              <h1 className="text-2xl font-bold text-[#171717]">
                Welcome back
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Sign in to manage your links.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
            >

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[#171717]"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm text-[#171717] outline-none transition placeholder:text-gray-400 focus:border-[#FF5A1F] focus:ring-2 focus:ring-orange-100"
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-[#171717]"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-medium text-gray-400"
                  >
                    Forgot password?
                  </button>
                </div>

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm text-[#171717] outline-none transition placeholder:text-gray-400 focus:border-[#FF5A1F] focus:ring-2 focus:ring-orange-100"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#FF5A1F] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#E94D16] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>

            </form>

            {/* Register */}
            <p className="mt-7 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#FF5A1F] hover:underline"
              >
                Create one
              </Link>
            </p>

          </div>

        </div>

      </main>
    </div>
  );
};

export default Login;