import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaPhone, FaMapMarkerAlt, FaCity } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer/Footer";

// Event Images
import michiana from "../../assets/eventlogo1.png";
import runrobots from "../../assets/eventrobetic.png";
import european from "../../assets/europeevent1.png";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    eventName: "",
    eventImage: "",
    clientName: "",
    contactNumber: "",
    email: "",
    password: "",
    venue: "",
    city: "",
    startDate: "",
    endDate: "",
  });

  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [eventPopup, setEventPopup] = useState(false);

  const events = [
    { name: "Michiana Premier Event", img: michiana },
    { name: "Run the Robots Premier Event", img: runrobots },
    { name: "European Premier Event", img: european },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Fixed validation (No ESLint warnings now)
  const validateForm = () => {
    const errors = {};
    let valid = true;

    const phonePattern = /^[0-9]{10}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.eventName) {
      errors.eventName = "Select an event";
      valid = false;
    }
    if (!form.clientName) {
      errors.clientName = "Client Name required";
      valid = false;
    }
    if (!phonePattern.test(form.contactNumber)) {
      errors.contactNumber = "Valid 10-digit number required";
      valid = false;
    }
    if (!emailPattern.test(form.email)) {
      errors.email = "Invalid email";
      valid = false;
    }
    if (!form.password || form.password.length < 6) {
      errors.password = "Min 6 characters";
      valid = false;
    }
    if (!form.venue) {
      errors.venue = "Venue required";
      valid = false;
    }
    if (!form.city) {
      errors.city = "City required";
      valid = false;
    }
    if (!form.startDate || !form.endDate) {
      errors.date = "Start and End dates required";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/register`, form);

      // ✅ Redirect to Payment & send form data
      navigate("/payment", { state: form });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow flex items-center justify-center bg-gradient-to-b to-white pt-40"
        style={{ backgroundImage: "linear-gradient(to bottom, rgb(111, 173, 255), #ffffff)" }}>

        <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-xl font-semibold text-center mb-2">Register for an Event</h2>

          {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-3">

            <div onClick={() => setEventPopup(true)}>
              <Input
                icon={<FaUser />}
                name="eventName"
                placeholder="Select Event"
                value={form.eventName}
                readOnly
                error={formErrors.eventName}
              />
            </div>

            <Input icon={<FaUser />} name="clientName" placeholder="Client Name"
              value={form.clientName} onChange={handleChange} error={formErrors.clientName} />

            <Input icon={<FaPhone />} name="contactNumber" placeholder="Contact Number"
              value={form.contactNumber} onChange={handleChange} error={formErrors.contactNumber} />

            <Input icon={<FaEnvelope />} type="email" name="email" placeholder="Email ID"
              value={form.email} onChange={handleChange} error={formErrors.email} />

            <Input icon={<FaLock />} type="password" name="password" placeholder="Password"
              value={form.password} onChange={handleChange} error={formErrors.password} />

            <Input icon={<FaMapMarkerAlt />} name="venue" placeholder="Venue"
              value={form.venue} onChange={handleChange} error={formErrors.venue} />

            <Input icon={<FaCity />} name="city" placeholder="City"
              value={form.city} onChange={handleChange} error={formErrors.city} />

            <div className="flex gap-2">
              <input type="date" name="startDate" value={form.startDate} onChange={handleChange}
                className="w-full border rounded-md p-2 text-sm" />
              <input type="date" name="endDate" value={form.endDate} onChange={handleChange}
                className="w-full border rounded-md p-2 text-sm" />
            </div>
            {formErrors.date && <p className="text-red-500 text-xs">{formErrors.date}</p>}

            <button type="submit"
              className="w-full py-2 mt-3 rounded-md bg-black text-white font-semibold hover:opacity-90 transition">
              Register
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>
          </p>
        </div>
      </div>

      {/* Select Event Popup */}
      {eventPopup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50">
          <div className="relative bg-white shadow-2xl rounded-2xl w-[95%] max-w-4xl p-8 border border-gray-200">
            <button onClick={() => setEventPopup(false)}
              className="absolute top-4 right-4 bg-white hover:bg-gray-200 text-gray-700 w-10 h-10 flex items-center justify-center rounded-full shadow-md">
              ✕
            </button>

            <h3 className="text-2xl font-bold text-center mb-8 uppercase text-[#0057ff] tracking-wide">
              Select Event
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {events.map((e, i) => (
                <div key={i}
                  onClick={() => {
                    setForm({ ...form, eventName: e.name, eventImage: e.img });
                    setEventPopup(false);
                  }}
                  className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-2 transition-all">
                  <div className="bg-[#0057ff] text-white text-sm font-bold text-center py-2 uppercase">
                    {e.name}
                  </div>
                  <img src={e.img} alt={e.name} className="w-full h-40 object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

const Input = ({ icon, error, ...props }) => (
  <div className="flex flex-col">
    <div className="flex items-center border rounded-md px-3 py-2 bg-white shadow-sm">
      <span className="text-gray-400 mr-2">{icon}</span>
      <input className="w-full outline-none text-sm bg-transparent" {...props} />
    </div>
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);

export default RegisterForm;
