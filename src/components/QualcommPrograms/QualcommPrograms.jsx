// src/components/QualcommPrograms/QualcommPrograms.jsx
import React from "react";

// Import your images
import AiImage from "../../assets/qualcommprogram1.png";
import EngineeringImage from "../../assets/qualcommprogram2.png";
import RoboticsImage from "../../assets/qualcommprogram3.jpg";
import QualcommLogo from "../../assets/qualcomm_season_page.png";

const programs = [
  {
    id: 1,
    title: "On-Device Artificial Intelligence",
    description:
      "Explore how on-device AI fuels a more capable, cost-efficient, reliable, private, secure, and promising path forward.",
    buttonText: "Explore",
    image: AiImage,
  },
  {
    id: 2,
    title: "Engineering Human Progress",
    description:
      "Discover how Qualcomm is engineering progress to help make lives richer, businesses smarter, and society stronger.",
    buttonText: "Watch",
    image: EngineeringImage,
  },
  {
    id: 3,
    title: "The Future of Robotics",
    description:
      "Uncover how drones and robots will be integrated into our everyday life handling tasks once considered too time-consuming or tedious.",
    buttonText: "Uncover",
    image: RoboticsImage,
  },
];

const QualcommPrograms = () => {
  return (
    <section className="bg-blue-100 py-16 px-4 md:px-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <p className="text-sm text-gray-600 uppercase tracking-wide mb-2">
          Digging into Future Technologies
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          FIRST AGE presented by Qualcomm
        </h2>
        <p className="text-gray-700 text-sm md:text-base">
          The FIRST AGE season will mark 20 years of FIRST and Qualcomm working
          together to inspire you as young innovators. We are so proud to
          continue that partnership as you set out to make history. Just like
          iterations of your robots, at Qualcomm, every innovation, invention,
          and new technology – from 5G to AI, tells a story, guiding us to
          greater ingenuity.
        </p>
         <img
        src={QualcommLogo}
        alt="Qualcomm"
        className="mx-auto mt-6 w-32"
      />
    </div>

      <div className="grid gap-8 md:grid-cols-3">
        {programs.map((program) => (
          <div
            key={program.id}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-start hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={program.image}
              alt={program.title}
              className="rounded-md mb-4 w-full h-48 object-cover"
            />
            <h3 className="text-lg font-semibold mb-2">{program.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{program.description}</p>
            <button className="text-blue-600 font-medium flex items-center hover:underline">
              {program.buttonText} <span className="ml-1">→</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QualcommPrograms;
