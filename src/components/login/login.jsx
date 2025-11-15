// src/components/login/Login.jsx
import React, { useState, useContext } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const adminEmails = [
    "takkemayur456@gmail.com",
    "digambarmarathe.9@gmail.com",
    "digambarmarathe.380@gmail.com",
  ].map((e) => e.toLowerCase());

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value.trim() });
    setErrors({});
  };

  const validateForm = () => {
    const e = {};
    if (!form.email) e.email = "Email required";
    if (!form.password) e.password = "Password required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/login`,
        form,
        { withCredentials: true }
      );

      const { token, user: userData, message } = res.data;
      if (!token) return toast.error(message || "Login failed");

      const emailNormalized = (userData?.email || form.email).trim().toLowerCase();
      const isAdmin = adminEmails.includes(emailNormalized);

      const safeUser = {
        id: userData?.id || "",
        name: userData?.name || "User",
        email: emailNormalized,
        role: isAdmin ? "admin" : "user",
        profileImg: userData?.profileImg || "https://i.pravatar.cc/300",
        token,
      };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(safeUser));
      setUser(safeUser);

      toast.success(
        `Welcome ${safeUser.name}! You are logged in as ${safeUser.role.toUpperCase()} ✅`
      );

      if (safeUser.role === "admin") navigate("/dashboard", { replace: true });
      else navigate("/", { replace: true });
    } catch (err) {
      console.error("Login error →", err);
      toast.error(err?.response?.data?.message || "Login failed");
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

          <form onSubmit={handleSubmit} className="space-y-4">
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
              className="w-full py-2 rounded-md bg-black text-white font-semibold hover:opacity-90 transition"
            >
              Login
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
