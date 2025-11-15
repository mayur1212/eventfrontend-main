import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate hook
import rebuildImg from "../../assets/frc_getstarted_1260hero12.png";

const RebuildProgram = () => {
  const navigate = useNavigate(); // ✅ define navigate

  return (
    <section className="bg-white text-gray-900 font-sans">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Text Content */}
        <div className="flex-1 space-y-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            FIRST® AGE™ Presented by Qualcomm
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Game & Season Info
          </h1>
          <p className="text-gray-700 leading-relaxed">
            In <strong>REBUILT™ presented by Haas</strong>, a new challenge
            releasing <strong>January 10, 2026</strong>, FIRST® Robotics
            Competition teams will use engineering skills and re-imagine the past.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Every artifact we uncover holds a story. Each tool, each innovation,
            each work of art connects us to the people and ideas that came before
            us. Using STEM skills and teamwork, today we can dig deeper into
            discoveries than ever before.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition">
              Get Kickoff Details
            </button>
            <button className="text-blue-600 font-semibold hover:underline flex items-center gap-1">
              Season Materials →
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 flex justify-center">
          <div className="relative bg-blue-500 p-4 rounded-xl">
            <img
              src={rebuildImg}
              alt="Rebuilt"
              className="rounded-md shadow-lg max-w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Registration Section */}
      <div className="bg-blue-700 text-white py-12 px-6 md:px-12 rounded-t-3xl mt-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Registration is now open</h2>
          <p className="max-w-2xl mx-auto text-blue-100">
            Still need to register? Register for the REBUILT season in the FIRST Dashboard
            or sign up to learn more about FIRST Robotics Competition.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => navigate("/register")}
              className="bg-black px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition"
            >
              Register Now
            </button>
            <button className="text-white font-semibold border border-white px-6 py-3 rounded-md hover:bg-white hover:text-blue-700 transition">
              Learn More →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RebuildProgram;
