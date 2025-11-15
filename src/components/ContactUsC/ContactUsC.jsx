import React, { useState } from "react";

const ContactUsC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    program: "",
    teamNumber: "",
    type: "",
    subject: "",
    description: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://your-api-endpoint.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("✅ Form submitted successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          role: "",
          email: "",
          program: "",
          teamNumber: "",
          type: "",
          subject: "",
          description: "",
          terms: false,
        });
      } else {
        alert("⚠️ Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("❌ Network error. Please check your connection.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-6 sm:px-10 lg:px-16 mt-20">

      <div className="grid lg:grid-cols-2 gap-10 max-w-7xl mx-auto items-start">
        {/* Left Section - Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-xl transition-transform hover:scale-[1.01]">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-blue-800">
            <span className="text-3xl">📞</span> Contact Support
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1 text-gray-700">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-gray-700">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Role *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="">Select an Option</option>
                <option>Student</option>
                <option>Mentor</option>
                <option>Coach</option>
                <option>Volunteer</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Program */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Program
              </label>
              <select
                name="program"
                value={formData.program}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="">Select an Option</option>
                <option>FIRST Robotics Competition</option>
                <option>FIRST Tech Challenge</option>
                <option>FIRST LEGO League</option>
              </select>
            </div>

            {/* Team Number */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Team Number
              </label>
              <input
                type="text"
                name="teamNumber"
                value={formData.teamNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="">Select an Option</option>
                <option>General Inquiry</option>
                <option>Technical Support</option>
                <option>Volunteer Help</option>
                <option>Event Registration</option>
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Description *
              </label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
              ></textarea>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="mt-1 accent-blue-600"
              />
              <label className="text-sm text-gray-700">
                I agree to the{" "}
                <span className="text-blue-700 font-semibold cursor-pointer hover:underline">
                  FIRST Customer Support Terms of Use
                </span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 active:scale-[0.98] transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          {/* Quick Links */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-3 text-blue-800">
              Need Answers Fast?
            </h3>
            <p className="text-gray-600 mb-4">
              Find what you need quickly from our popular FAQs.
            </p>
            <ul className="space-y-2 text-blue-700 font-medium list-disc list-inside">
              <li><a href="#" className="hover:underline">How do I apply to volunteer for an event?</a></li>
              <li><a href="#" className="hover:underline">How do I receive emails from FIRST?</a></li>
              <li><a href="#" className="hover:underline">How can I create a new team?</a></li>
              <li><a href="#" className="hover:underline">How do I invite youth members via Express Enrollment?</a></li>
              <li><a href="#" className="hover:underline">Procurement Policy for Canada teams?</a></li>
              <li><a href="#" className="hover:underline">Do I need extra clearances in California?</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-3 text-blue-800">
              Additional Support
            </h3>
            <p className="text-gray-700 leading-relaxed">
              <strong>📞 Phone Support:</strong><br />
              (603) 666-3906 or (800) 871-8326<br />
              <span className="text-sm text-gray-500">
                Mon–Fri 8:30am–5:00pm EST
              </span>
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              <strong>💬 Live Chat Support:</strong><br />
              Mon–Fri 9:00am–4:00pm EST
            </p>
          </div>

          {/* Report Concern */}
          <div className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 p-6 rounded-2xl shadow-md">
            <p className="text-gray-700 text-sm mb-3">
              Click “Report a Concern” to access the FIRST Reporting Portal — a confidential
              platform for reporting youth protection or medical incidents.
            </p>
            <button className="px-5 py-2.5 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition">
              Report a Concern
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsC;
