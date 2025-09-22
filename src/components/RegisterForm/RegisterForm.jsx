import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaUser, FaPhone, FaMapMarkerAlt, FaCity } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

// ✅ Import Navbar & Footer
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Register = () => {
  const [form, setForm] = useState({
    eventName: '',
    clientName: '',
    contactNumber: '',
    email: '',
    password: '',
    venue: '',
    city: '',
    startDate: '',
    endDate: '',
  });

  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({
    eventName: '',
    clientName: '',
    contactNumber: '',
    email: '',
    password: '',
    venue: '',
    city: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let valid = true;
    const errors = { ...formErrors };

    if (!form.eventName) {
      errors.eventName = 'Event Name is required.';
      valid = false;
    } else {
      errors.eventName = '';
    }

    if (!form.clientName) {
      errors.clientName = 'Client Name is required.';
      valid = false;
    } else {
      errors.clientName = '';
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!form.contactNumber || !phonePattern.test(form.contactNumber)) {
      errors.contactNumber = 'Contact Number must be a valid 10-digit number.';
      valid = false;
    } else {
      errors.contactNumber = '';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailPattern.test(form.email)) {
      errors.email = 'Please enter a valid email.';
      valid = false;
    } else {
      errors.email = '';
    }

    if (!form.password || form.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
      valid = false;
    } else {
      errors.password = '';
    }

    if (!form.venue) {
      errors.venue = 'Venue is required.';
      valid = false;
    } else {
      errors.venue = '';
    }

    if (!form.city) {
      errors.city = 'City is required.';
      valid = false;
    } else {
      errors.city = '';
    }

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/register`, form);
      alert(res.data.message);
      setError('');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* ✅ Navbar */}
      <Navbar />

      {/* ✅ Register Form Section */}
      <div
  className="flex-grow flex items-center justify-center bg-gradient-to-b to-white pt-40"
  style={{ backgroundImage: 'linear-gradient(to bottom, rgb(111, 173, 255), #ffffff)' }}
>
  <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-xl font-semibold text-center mb-2">Register for an Event</h2>

          {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-3">
            <Input icon={<FaUser />} name="eventName" placeholder="Event Name" value={form.eventName} onChange={handleChange} error={formErrors.eventName} />
            <Input icon={<FaEnvelope />} name="clientName" placeholder="Client Name" value={form.clientName} onChange={handleChange} error={formErrors.clientName} />
            <Input icon={<FaPhone />} name="contactNumber" placeholder="Contact Number" value={form.contactNumber} onChange={handleChange} error={formErrors.contactNumber} />
            <Input icon={<FaEnvelope />} type="email" name="email" placeholder="Email ID" value={form.email} onChange={handleChange} error={formErrors.email} />
            <Input icon={<FaLock />} type="password" name="password" placeholder="Email Password" value={form.password} onChange={handleChange} error={formErrors.password} />
            <Input icon={<FaMapMarkerAlt />} name="venue" placeholder="Venue" value={form.venue} onChange={handleChange} error={formErrors.venue} />
            <Input icon={<FaCity />} name="city" placeholder="City" value={form.city} onChange={handleChange} error={formErrors.city} />

            <div className="flex gap-2">
              <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className="w-full border rounded-md p-2 text-sm" />
              <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className="w-full border rounded-md p-2 text-sm" />
            </div>

            <button type="submit" className="w-full py-2 mt-3 rounded-md bg-black text-white font-semibold hover:opacity-90 transition">
              Register
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account? <Link to="/" className="text-blue-500 hover:underline">Login here</Link>
          </p>
        </div>
      </div>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
};

const Input = ({ icon, error, ...props }) => (
  <div className="flex flex-col">
    <div className="flex items-center border rounded-md px-3 py-2 bg-white shadow-sm">
      <span className="text-gray-400 mr-2">{icon}</span>
      <input className="w-full outline-none text-sm" {...props} />
    </div>
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);

export default Register;
