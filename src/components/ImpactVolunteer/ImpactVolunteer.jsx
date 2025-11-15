import React, { useRef, useEffect } from "react";
import impactVideo from "../../assets/Coaching and Mentoring with FIRST.mp4";

const ImpactVolunteer = () => {
  const bgVideoRef = useRef(null);

  useEffect(() => {
    if (bgVideoRef.current) {
      bgVideoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="bg-white text-gray-900 font-sans">
      {/* Volunteer With Purpose Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Text Content */}
        <div className="flex-1 space-y-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Join the Mission
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Volunteer With Purpose
          </h1>
          <p className="text-gray-700 leading-relaxed">
            <strong>FIRST®</strong> volunteers are part of a global robotics
            community preparing young people for the future.{" "}
            <strong>FIRST</strong> competitions and events are made possible by
            volunteers, including employees of corporate sponsors, teachers,
            parents, community leaders, and others. From a few hours to events
            all year long, every role helps students grow, learn, and thrive.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition">
              Explore Event Volunteer Roles
            </button>
            <button className="border border-black px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition">
              Register to Volunteer
            </button>
          </div>
        </div>

        {/* Local Video Section */}
        <div className="flex-1 flex justify-center">
          <div className="relative bg-blue-500 p-4 rounded-xl overflow-hidden">
            <video
              className="rounded-md shadow-lg w-[340px] sm:w-[480px] lg:w-[560px] h-[200px] sm:h-[280px] lg:h-[315px] object-cover"
              src={impactVideo}
              autoPlay
              loop
              muted
              playsInline
              controls
            />
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="relative bg-gray-900 text-white py-16 px-6 md:px-12 rounded-t-3xl overflow-hidden">
        {/* 🎥 Background Video */}
        <video
          ref={bgVideoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={impactVideo}
          muted
          loop
          playsInline
        ></video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Text + Stats */}
        <div className="relative max-w-6xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="italic">FIRST</span> Volunteers Make an Impact
          </h2>
          <p className="max-w-2xl mx-auto text-gray-200">
            Across the globe, the transformative power of hands-on STEM lessons
            and engineering activities for kids are made possible by{" "}
            <span className="italic">FIRST</span> volunteers.
          </p>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "430K", label: "volunteer opportunities each season" },
              { number: "33M", label: "hours volunteered last season at thousands of events" },
              { number: "3.6M", label: "youth participants impacted since 1989" },
              { number: "111", label: "countries where FIRST volunteers serve" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white text-gray-900 rounded-md shadow-lg p-6 hover:-translate-y-1 hover:shadow-xl transition-transform duration-300 border-b-4 border-blue-600"
              >
                <h3 className="text-3xl md:text-4xl font-bold mb-2">
                  {item.number}
                </h3>
                <p className="text-sm text-gray-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactVolunteer;
