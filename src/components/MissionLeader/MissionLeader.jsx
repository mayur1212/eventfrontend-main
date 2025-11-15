// src/pages/about/MissionLeader.jsx
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import firstvideo from "../../assets/Dean Kamen_ A Legacy of Innovation.mp4"; // ✅ Local video

const MissionLeader = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="py-20 max-w-7xl mx-auto px-6 md:px-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.p
            className="text-blue-600 font-semibold uppercase mb-2 tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Leadership
          </motion.p>

          <motion.h2
            className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Meet the Leaders Behind the Mission
          </motion.h2>

          <motion.p
            className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            The <strong>FIRST®</strong> leadership team, boards, and advisors bring together
            experience, vision, and a shared belief in the power of STEM to change lives.
            Their guidance drives everything we do – from program design to long-term outcomes.
          </motion.p>
        </div>

        {/* Video + Founder Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Local Video */}
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] transition-all duration-500"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <video
              ref={videoRef}
              className="w-full h-64 md:h-96 object-cover rounded-2xl"
              src={firstvideo}
              muted
              loop
              autoPlay
              playsInline
            ></video>

            {/* Overlay Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
          </motion.div>

          {/* Founder Text */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-blue-600 font-semibold uppercase mb-2 tracking-wider">
              Our Founder
            </p>

            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              <strong>FIRST®</strong> Founder & History
            </h3>

            <p className="text-gray-700 mb-8 text-lg leading-relaxed">
              Prolific inventor Dean Kamen founded <strong>FIRST</strong> in 1989 to ignite
              young people’s interest in science and technology. His passion for hands-on
              learning and real-world impact remains at the heart of our mission to inspire
              the next generation of STEM innovators.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                See Our History
              </motion.button>

              <motion.button
                className="text-gray-800 border border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Learn More About <strong>FIRST</strong> →
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default MissionLeader;
