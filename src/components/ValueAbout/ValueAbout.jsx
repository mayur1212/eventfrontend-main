// src/components/ValueAbout/ValueAbout.jsx
import React from "react";
import { FaLightbulb, FaHandsHelping, FaRocket, FaSmile } from "react-icons/fa";
import { GiGearStick } from "react-icons/gi";
import { RiTeamFill } from "react-icons/ri";
import { motion } from "framer-motion";

const values = [
  {
    icon: <GiGearStick className="text-indigo-500 w-12 h-12 mb-4" />,
    title: "Discovery",
    desc: "We explore new skills and ideas.",
  },
  {
    icon: <FaLightbulb className="text-yellow-400 w-12 h-12 mb-4" />,
    title: "Innovation",
    desc: "We use creativity and persistence to solve problems.",
  },
  {
    icon: <FaRocket className="text-pink-500 w-12 h-12 mb-4" />,
    title: "Impact",
    desc: "We apply what we learn to improve our world.",
  },
  {
    icon: <FaHandsHelping className="text-green-400 w-12 h-12 mb-4" />,
    title: "Inclusion",
    desc: "We respect each other and embrace our differences.",
  },
  {
    icon: <RiTeamFill className="text-blue-500 w-12 h-12 mb-4" />,
    title: "Teamwork",
    desc: "We are stronger when we work together.",
  },
  {
    icon: <FaSmile className="text-yellow-300 w-12 h-12 mb-4" />,
    title: "Fun",
    desc: "We enjoy and celebrate what we do!",
  },
];

export default function ValueAbout() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900">
            Our Core Values
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            The <strong>FIRST</strong> Core Values are fundamental to FIRST and unique to its programs. 
            They emphasize friendly sportsmanship, respect for others’ contributions, teamwork, learning, 
            and community involvement and are part of our commitment to fostering, cultivating, and 
            preserving a culture of unity.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-500 text-center"
            >
              <div className="flex justify-center">
                <div className="animate-bounce">{value.icon}</div>
              </div>
              <h3 className="text-xl font-semibold mb-2 mt-2">{value.title}</h3>
              <p className="text-gray-600">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
