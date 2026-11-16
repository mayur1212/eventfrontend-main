import { api, apiError, authLog } from "../../api";
// src/components/login/Login.jsx
import React, { useState, useContext } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const location = useLocation();
  const [form, setForm] = useState({ email: location.state?.email || "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({});
  };

  const validateForm = () => {
    const e = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setMessage("");
    if (!validateForm()) {
      setMessage("Please correct the highlighted fields.");
      authLog("login", "validation failed");
      return;
    }
    authLog("login", "request started");

    setSubmitting(true);
    try {
      const res = await api.post(
        "/login",
        { ...form, email: form.email.trim().toLowerCase() }
      );

      const { token, user: userData, message } = res.data;
      if (res.data.success === false) throw new Error(message || "Login failed.");
      if (typeof token !== "string" || !token) throw new Error("Backend response is missing a valid login token.");

      if (!userData || !["admin", "user"].includes(userData.role)) throw new Error("Backend must return user with role admin or user.");
      const safeUser = { ...userData, name: userData.name || userData.clientName || "User" };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(safeUser));
      setUser(safeUser);

      authLog("login", "success", { role: safeUser.role });
      toast.success(
        `Welcome ${safeUser.name}! You are logged in as ${safeUser.role.toUpperCase()} ✅`
      );

      if (safeUser.role === "admin") navigate("/dashboard", { replace: true });
      else navigate("/", { replace: true });
    } catch (err) {
      const text = err.isAxiosError ? apiError(err) : err.message || "Login could not be completed.";
      setMessage(text);
      toast.error(text);
      authLog("login", "failed", { status: err.response?.status || null });
    } finally {
      setSubmitting(false);
    }
  };

  return (
     <div className="flex flex-col min-h-screen">
      <Navbar />
      <div
        className="flex-grow flex items-center justify-center bg-gradient-to-b to-white py-20"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgb(111, 173, 255), #ffffff)",
        }}
      >
        <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md mt-20">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-200 p-4 rounded-full shadow">
              <FaLock className="text-2xl text-gray-600" />
            </div>
          </div>

          <h2 className="text-xl font-semibold text-center mb-2">Login</h2>

          {location.state?.registrationMessage && !message && <p role="status" className="text-green-700 bg-green-50 p-3 rounded mb-4">{location.state.registrationMessage}</p>}
          {message && <p role="alert" className="text-red-700 bg-red-50 p-3 rounded mb-4">{message}</p>}
          <form noValidate onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center border rounded-md px-3 py-2 bg-white shadow-sm">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="username"
                className="w-full outline-none text-sm"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}

            <div className="flex items-center border rounded-md px-3 py-2 bg-white shadow-sm">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                className="w-full outline-none text-sm"
                value={form.password}
                onChange={handleChange}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2 rounded-md bg-black text-white font-semibold hover:opacity-90 transition"
            >
              {submitting ? "Signing in…" : "Login"}
            </button>
          </form>

          <Link
            to="/register"
            className="mt-4 block text-center text-blue-500 hover:underline text-sm"
          >
            Or sign up
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
