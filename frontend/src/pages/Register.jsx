import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import LoadingOverlay from "../components/LoadingOverlay";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Name is required.");
      return;
    }

    if (!email.trim()) {
      alert("Email is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!password.trim()) {
      alert("Password is required.");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration Successful!");

      navigate("/");

    } catch (error) {

      alert(error.response?.data || "Registration Failed");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      {loading && (
        <LoadingOverlay text="Creating your account..." />
      )}

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-gray-900">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Register to start managing your finances.
        </p>

        <form onSubmit={handleRegister} className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />

            <p className="text-sm text-gray-500 mt-2">
              Password must be at least 8 characters.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}