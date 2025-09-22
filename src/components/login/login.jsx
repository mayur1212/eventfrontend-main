import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

// ✅ Import Navbar & Footer
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '', api: '' });
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '', password: '', api: '' };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '', api: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, form);
      const token = res.data.token;
      console.log("Token received:", token);

      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setErrors({ ...errors, api: err.response?.data?.message || 'Login failed' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* ✅ Navbar on top */}
      <Navbar />

      {/* ✅ Login Section */}
      <div
  className="flex-grow flex items-center justify-center bg-gradient-to-b to-white py-20"
  style={{ backgroundImage: 'linear-gradient(to bottom, rgb(111, 173, 255), #ffffff)' }}
>
  <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md mt-20">

          <div className="flex justify-center mb-6">
            <div className="bg-gray-200 p-4 rounded-full shadow">
              <FaLock className="text-2xl text-gray-600" />
            </div>
          </div>

          <h2 className="text-xl font-semibold text-center mb-2">Login with email</h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Make a new doc to bring your words, data, and teams together. For free
          </p>

          {errors.api && <p className="text-red-500 text-sm text-center mb-2">{errors.api}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center border rounded-md px-3 py-2 bg-white shadow-sm">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full outline-none text-sm"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

            <div className="flex items-center border rounded-md px-3 py-2 bg-white shadow-sm">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full outline-none text-sm"
                value={form.password}
                onChange={handleChange}
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

            <div className="flex justify-between text-sm text-gray-500">
              <span></span>
              <Link to="/forgot-password" className="hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-md bg-black text-white font-semibold hover:opacity-90 transition"
            >
              Get Started
            </button>
          </form>

          <Link
            to="/register"
            className="my-6 block text-center text-blue-500 hover:underline text-sm"
          >
            Or sign up
          </Link>

          <div className="flex justify-center space-x-4 mt-4">
            <button type="button" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <FaGoogle />
            </button>
            <button type="button" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <FaFacebookF />
            </button>
            <button type="button" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <FaApple />
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Footer at bottom */}
      <Footer />
    </div>
  );
};

export default Login;
