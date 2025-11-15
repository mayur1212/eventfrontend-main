// src/components/CommunitySection.jsx
import React from "react";

// 🖼️ Import your local images here (make sure these paths exist in your project)
import teamImg from "../../assets/coaches-mentors-find-team.png";
import mentorImg from "../../assets/coaches-mentors-frc.png";
import youthImg from "../../assets/coaches-mentors-training.png";

const sections = [
  {
    id: 1,
    title: "Find A Team in Your Area",
    subtitle: "JOIN OR START A TEAM",
    text: "If you’re starting your own team or looking to join an existing one, there’s a place for you in the FIRST Community. Teams can be supported by many mentors, each providing subject matter expertise in one or more areas, such as fundraising, robot programming and software engineering, travel planning, project management, machining, and more.",
    button: "Find Local Teams",
    image: teamImg,
    reverse: false,
  },
  {
    id: 2,
    title: "Equipping Mentors To Make an Impact",
    subtitle: "MENTOR READY",
    text: "FIRST offers multiple layers of mentor training to create an aligned onboarding experience for all mentors, so you feel prepared, meet safety requirements, and are ready to lead and inspire teams.",
    button: "Learn More",
    secondaryButton: "Create an Account →",
    image: mentorImg,
    reverse: true,
  },
  {
    id: 3,
    title: "Creating a Safe, Supportive Experience",
    subtitle: "YOUTH PROTECTION PROGRAM",
    text: "FIRST mentors help shape a positive, respectful environment for every student. Through our Youth Protection Program, all coaches and mentors are trained to maintain safe and welcoming spaces where students thrive.",
    button: "Learn More",
    image: youthImg,
    reverse: false,
  },
];

const CommunitySection = () => {
  return (
    <div className="flex flex-col space-y-20 px-6 md:px-12 lg:px-24 py-16 bg-white">
      {sections.map((section) => (
        <div
          key={section.id}
          className={`flex flex-col ${
            section.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
          } items-center gap-10`}
        >
          {/* Text Section */}
          <div className="flex-1 space-y-4">
            <p className="text-xs font-semibold uppercase text-blue-600">
              {section.subtitle}
            </p>
            <h2 className="text-3xl font-bold text-gray-900">
              {section.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">{section.text}</p>
            <div className="flex flex-wrap gap-3">
              <button className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                {section.button}
              </button>
              {section.secondaryButton && (
                <button className="px-5 py-2 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-100 transition">
                  {section.secondaryButton}
                </button>
              )}
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-1">
            <img
              src={section.image}
              alt={section.title}
              className="rounded-xl shadow-lg w-full object-cover"
            />
          </div>
        </div>
      ))}

      {/* Volunteer Section */}
      <div className="bg-blue-800 text-white rounded-xl p-10 text-center space-y-4">
        <h3 className="text-2xl font-semibold">Volunteer at an Event</h3>
        <p className="max-w-2xl mx-auto text-gray-200">
          Want to experience an event before you start a FIRST team? Volunteer
          for one of our many event volunteer roles to learn more about the
          thrill of the FIRST program.
        </p>
        <button className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-gray-100 transition">
          Explore Event Volunteer Roles
        </button>
      </div>
    </div>
  );
};

export default CommunitySection;
