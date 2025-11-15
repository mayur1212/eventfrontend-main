import React from "react";
import aboutVideo from "../../assets/About FIRST.mp4"; 

// ==============================
// Modern About Section Component
// ==============================
export default function AboutSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 overflow-hidden">
      
      {/* Content Wrapper */}
      <div className="relative z-10 w-full max-w-7xl px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Left Text Section */}
        <div className="text-white">
          <h4 className="uppercase text-sm font-semibold tracking-widest text-white/80 mb-3">
            About <span className="text-yellow-300">FIRST</span>
          </h4>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Our Mission, Purpose <br /> & Values
          </h1>
          <p className="text-white/90 text-lg leading-relaxed mb-6">
            <em>FIRST</em>® is the world’s leading youth robotics community,
            delivering competitions that inspire innovation, build confidence,
            and prepare young people for life. Discover what drives our global
            movement.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition-all">
              See our Impact
            </button>
            <button className="px-6 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all">
              Explore our Programs →
            </button>
          </div>
        </div>

        {/* Right Video Section */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-lg aspect-video rounded-2xl overflow-hidden shadow-2xl bg-white">
            <video
              className="w-full h-full object-cover"
              src={aboutVideo}
              autoPlay
              loop
              muted
              playsInline
            ></video>

            {/* Decorative Accent */}
            <div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 bg-yellow-400 rounded-2xl -z-10 opacity-40"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
