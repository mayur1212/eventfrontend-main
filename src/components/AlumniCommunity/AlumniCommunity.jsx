import React, { useState } from "react";
import { ChevronDown, ChevronUp, Users, GraduationCap, Building2, Sparkles } from "lucide-react";

const alumniSections = [
  {
    id: 1,
    title: "Regional Groups",
    icon: <Users className="w-6 h-6 text-blue-600" />,
    content: (
      <>
        <p className="mb-2">
          <strong>Regional Alumni Groups</strong> bring together graduates in the same area to stay
          connected to the <em>FIRST</em> community.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          <li>Mentor and support local teams</li>
          <li>Volunteer at local <em>FIRST</em> events</li>
          <li>Host networking and social gatherings</li>
        </ul>
      </>
    ),
  },
  {
    id: 2,
    title: "Collegiate Groups",
    icon: <GraduationCap className="w-6 h-6 text-indigo-600" />,
    content: (
      <>
        <p className="mb-2">
          <strong>Collegiate Groups</strong> help students continue their <em>FIRST</em> journey
          while in university.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          <li>Connect with other alumni on campus</li>
          <li>Volunteer at competitions and outreach programs</li>
          <li>Collaborate with engineering and robotics clubs</li>
        </ul>
      </>
    ),
  },
  {
    id: 3,
    title: "Corporate Groups",
    icon: <Building2 className="w-6 h-6 text-emerald-600" />,
    content: (
      <>
        <p className="mb-2">
          <strong>Corporate Alumni Groups</strong> unite professionals who share a <em>FIRST</em>{" "}
          background.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          <li>Mentor teams as a company initiative</li>
          <li>Host STEM workshops and events</li>
          <li>Offer sponsorship and technical support</li>
        </ul>
      </>
    ),
  },
  {
    id: 4,
    title: "Start a Group",
    icon: <Sparkles className="w-6 h-6 text-pink-600" />,
    content: (
      <>
        <p className="mb-2">
          Want to start your own alumni group? We’ll help you connect with local members and
          establish your presence.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          <li>Access official <em>FIRST</em> group resources</li>
          <li>Get listed in our alumni directory</li>
          <li>Receive ongoing mentorship and guidance</li>
        </ul>
      </>
    ),
  },
];

const AlumniCommunity = () => {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (id) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => setOpenItems(alumniSections.map((s) => s.id));
  const closeAll = () => setOpenItems([]);

  return (
    <div className="px-6 md:px-12 lg:px-24 py-16 bg-gradient-to-b from-white to-blue-50">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
          Find Local Alumni Organizations
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 italic drop-shadow-sm">
          FIRST <span className="not-italic text-blue-700">Alumni Groups</span>
        </h2>
        <p className="text-gray-600 leading-relaxed text-base md:text-lg">
          <em>FIRST</em> Alumni Groups provide a network for graduates to mentor, volunteer,
          and stay connected. These groups may be associated with a <em>FIRST</em> region,
          university, or corporation — empowering members to make an impact in STEM communities.
        </p>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3 mb-10">
        <button
          onClick={expandAll}
          className="px-5 py-2.5 border border-blue-500 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition"
        >
          Expand All
        </button>
        <button
          onClick={closeAll}
          className="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition"
        >
          Close All
        </button>
      </div>

      {/* Accordion */}
      <div className="space-y-5 max-w-3xl mx-auto">
        {alumniSections.map((section) => (
          <div
            key={section.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <button
              onClick={() => toggleItem(section.id)}
              className="w-full flex justify-between items-center p-5 text-left"
            >
              <div className="flex items-center gap-3">
                {section.icon}
                <span className="text-lg md:text-xl font-semibold text-gray-800">
                  {section.title}
                </span>
              </div>
              {openItems.includes(section.id) ? (
                <ChevronUp className="w-6 h-6 text-gray-500" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-500" />
              )}
            </button>

            <div
              className={`transition-all duration-300 overflow-hidden ${
                openItems.includes(section.id)
                  ? "max-h-96 opacity-100 p-5 pt-0 border-t border-gray-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {section.content}
            </div>
          </div>
        ))}
      </div>

      {/* Contact Banner */}
      <div className="mt-16 bg-gradient-to-r from-blue-800 to-blue-600 text-white rounded-2xl p-10 text-center shadow-lg">
        <h3 className="text-2xl md:text-3xl font-bold mb-3">
          Don’t see a group you’re looking for? <br /> Have questions?
        </h3>
        <button className="mt-4 px-8 py-3 bg-white text-blue-800 font-semibold rounded-lg shadow hover:bg-gray-100 transition">
          Email alumni@firstinspires.org
        </button>
      </div>
    </div>
  );
};

export default AlumniCommunity;
