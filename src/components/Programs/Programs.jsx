import React, { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa"; // play icon
import AOS from "aos";
import "aos/dist/aos.css";

// ✅ Replace with your images
import legoImg from "../../assets/f1.jpeg";
import techImg from "../../assets/f3.jpeg";
import roboticsImg from "../../assets/f2.jpeg";

const Programs = () => {
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const programs = [
    {
      id: 1,
      title: "FIRST LEGO LEAGUE",
      grades: "PreK-8",
      ages: "4-16",
      desc: "FIRST® LEGO® League introduces STEM to children through fun, exciting hands-on learning...",
      img: legoImg,
      color: "bg-red-600",
      playColor: "border-red-500 text-red-500 hover:bg-red-100",
      button: "Learn More About FIRST LEGO League",
      video: "https://www.youtube.com/embed/YOUR_VIDEO_ID1",
    },
    {
      id: 2,
      title: "FIRST TECH CHALLENGE",
      grades: "7-12",
      ages: "12-18",
      desc: "FIRST® Tech Challenge students work together with their mentors to design and build robots...",
      img: techImg,
      color: "bg-orange-500",
      playColor: "border-orange-500 text-orange-500 hover:bg-orange-100",
      button: "Learn More About FIRST Tech Challenge",
      video: "https://www.youtube.com/embed/YOUR_VIDEO_ID2",
    },
    {
      id: 3,
      title: "FIRST ROBOTICS COMPETITION",
      grades: "9-12",
      ages: "14-18",
      desc: "Each January brings a new challenge for FIRST® Robotics Competition teams...",
      img: roboticsImg,
      color: "bg-blue-600",
      playColor: "border-blue-500 text-blue-500 hover:bg-blue-100",
      button: "Learn More About FIRST Robotics Competition",
      video: "https://www.youtube.com/embed/YOUR_VIDEO_ID3",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 relative">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:20px_20px] opacity-40 -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {programs.map((prog, index) => (
          <div
            key={prog.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col hover:shadow-2xl transition-transform transform hover:-translate-y-2"
            data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
          >
            {/* Header */}
            <div className={`${prog.color} p-5 text-center`}>
              <h2 className="text-white text-lg font-bold tracking-wide">
                {prog.title}
              </h2>
            </div>

            {/* Image */}
            <img
              src={prog.img}
              alt={prog.title}
              className="w-full h-56 object-cover"
            />

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-gray-500">GRADES</p>
                  <p className="font-bold">{prog.grades}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500">AGES</p>
                  <p className="font-bold">{prog.ages}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm flex-1">{prog.desc}</p>
            </div>

            {/* Video + CTA */}
            <div className="px-6 pb-6 flex flex-col items-center">
              {/* Video Play Button */}
              <button
                onClick={() => setVideoUrl(prog.video)}
                className={`w-12 h-12 flex items-center justify-center rounded-full border-2 mb-4 transition ${prog.playColor}`}
              >
                <FaPlay />
              </button>

              {/* Learn More Button */}
              <button
                className={`${prog.color} text-white w-full py-3 rounded-md font-semibold hover:opacity-90 transition`}
              >
                {prog.button}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {videoUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div
            className="bg-white p-4 rounded-lg max-w-3xl w-full relative animate-fadeIn"
            data-aos="zoom-in"
          >
            <button
              onClick={() => setVideoUrl(null)}
              className="absolute top-2 right-2 text-gray-600 font-bold text-xl"
            >
              ×
            </button>
            <iframe
              src={videoUrl}
              title="Program Video"
              className="w-full h-96 rounded-md"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

export default Programs;
