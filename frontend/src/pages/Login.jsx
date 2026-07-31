import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../components/LoadingOverlay";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const handleLogin = async (e) => {
  e.preventDefault();
setLoading(true);
  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });

    localStorage.setItem("user", JSON.stringify(response.data));

    navigate("/dashboard");
  } catch (error) {

    alert("Invalid email or password");

  }finally {

   setLoading(false);

}
};
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {loading && (
  <LoadingOverlay text="Logging you in..." />
)}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Personal Finance Manager
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Login to your account
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
/>
          </div>

          <div>
            <label className="block mb-2 font-medium">Password</label>
            <input
  type="password"
  placeholder="Enter your password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
          </div>

          <button
  disabled={loading}
  type="submit"
  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition"
>
  {loading ? "Logging in..." : "Login"}
</button>
        </form>

        <p className="text-center mt-6">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

