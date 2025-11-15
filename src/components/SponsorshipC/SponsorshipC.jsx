import React from "react";
import sponsorImg1 from "../../assets/become-a-sponsor-hero-molex.png"; // replace with your image
import sponsorImg2 from "../../assets/event-experience.jpg"; // replace with your image
import qualcommLogo from "../../assets/disney.jpg"; // testimonial logo
import partner1 from "../../assets/dow-270-2.png";
import partner2 from "../../assets/logo4.jpg";
import partner3 from "../../assets/logo5.jpg";
import partner4 from "../../assets/logo4.jpg";
import partner5 from "../../assets/apple.jpg";
import partner6 from "../../assets/fedex-270-2.png"; // charity navigator

const SponsorshipC = () => {
  return (
    <>
      {/* 🖤 Small black space below header */}
      <div className="bg h-12"></div>

      <div className="bg-white text-gray-800 font-sans">
        {/* Section 1 - Invest in STEM Leaders */}
        <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-16">
          <div className="md:w-1/2 space-y-5">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
              Become a FIRST Sponsor
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Invest in Tomorrow’s <span className="text-blue-700">STEM Leaders</span>
            </h2>
            <p className="text-gray-600">
              An extensive network of Fortune 500 corporations, educational and professional institutions,
              foundations, and individuals support <strong>FIRST</strong>. Through the resources they provide,
              our supporters are helping <strong>FIRST</strong> inspire young people to become the next generation
              of science, technology, engineering, and math professionals.
            </p>
            <button className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition">
              Contact FIRST Development Team
            </button>
          </div>

          <div className="md:w-1/2 mt-10 md:mt-0 md:pl-10">
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute -top-6 -right-6 w-full h-full bg-blue-200 rounded-lg"></div>
              <img
                src={sponsorImg1}
                alt="STEM Sponsorship"
                className="relative rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Section 2 - Support Innovators */}
        <section className="bg-gray-50 py-16 px-6 md:px-16 rounded-lg">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
            Sponsorship Opportunities
          </p>
          <h2 className="text-3xl font-bold mb-6">
            Support the Next Generation of Innovators
          </h2>
          <p className="text-gray-600 mb-10 max-w-2xl">
            <strong>FIRST</strong> sponsors provide critical support such as event and team funding, mentorship,
            employee volunteerism, and access to technology and equipment. Explore our many opportunities.
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <div className="flex flex-col space-y-3">
                <button className="bg-blue-700 text-white px-5 py-2 rounded-md text-left font-semibold hover:bg-blue-800 transition">
                  Financial Sponsorship
                </button>
                <button className="bg-white border border-gray-300 px-5 py-2 rounded-md text-left font-semibold hover:bg-gray-100 transition">
                  Employee Engagement
                </button>
                <button className="bg-white border border-gray-300 px-5 py-2 rounded-md text-left font-semibold hover:bg-gray-100 transition">
                  In-Kind Donations
                </button>
                <button className="bg-white border border-gray-300 px-5 py-2 rounded-md text-left font-semibold hover:bg-gray-100 transition">
                  Cause Marketing
                </button>
                <button className="bg-white border border-gray-300 px-5 py-2 rounded-md text-left font-semibold hover:bg-gray-100 transition">
                  Scholarship & Internships
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">Financial Sponsorship</h3>
              <p className="text-gray-600">
                Your cash support helps us deliver inspiring events, support team participation,
                key initiatives, and expand our reach to communities worldwide.
              </p>
              <img
                src={sponsorImg2}
                alt="Financial Sponsorship"
                className="rounded-lg shadow-md w-full md:w-4/5"
              />
            </div>
          </div>
        </section>

        {/* Section 3 - Impact Benefits */}
        <section className="py-16 px-6 md:px-16">
          <h2 className="text-3xl font-bold mb-4">Your Impact Has Benefits</h2>
          <p className="text-gray-600 mb-6 max-w-2xl">
            <strong>FIRST</strong> sponsors help prepare young people for the world of tomorrow.
            With participation growing beyond 800,000 students in 100+ countries, your organization
            can expand its global reach and recognition.
          </p>
          <button className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition mb-8">
            Contact the Development Team
          </button>

          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Strengthen your company’s image</li>
            <li>Build business relationships</li>
            <li>Boost brand awareness and recognition</li>
            <li>Create a pipeline for interns and future employees</li>
            <li>Foster unique employee volunteer opportunities</li>
            <li>Integrate into thought leadership and media opportunities</li>
          </ul>
        </section>

        {/* 🔵 New Section - Hear From Supporters */}
        <section className="bg-blue-50 py-20 text-center px-6 md:px-16">
          <h2 className="text-3xl font-bold mb-10">Hear From Our Supporters</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10">
            <img
              src={qualcommLogo}
              alt="Qualcomm"
              className="w-60 bg-white shadow-md p-6 rounded-lg"
            />
            <div className="bg-white p-6 rounded-lg shadow-md max-w-lg text-left">
              <p className="text-gray-600 italic">
                “Qualcomm has supported <strong>FIRST</strong> for the last two decades because we know passion for
                invention starts at a young age, and today we have many <strong>FIRST</strong> alumni driving
                innovation at our company. We’re proud to support them.”
              </p>
              <p className="mt-4 font-semibold text-gray-800">Angela Baker</p>
              <p className="text-sm text-gray-500">Vice President, Chief Sustainability Officer at Qualcomm, Inc.</p>
            </div>
          </div>
        </section>

        {/* 🤝 Partner Logos */}
        <section className="text-center py-20 px-6 md:px-16">
          <h2 className="text-3xl font-bold mb-4">
            Supported by <span className="text-blue-700">FIRST</span> Strategic Partners
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-10">
            Leading companies across global industries trust <strong>FIRST</strong>. Our sponsors recognize
            the critical role of <strong>FIRST</strong> programs in building STEM interest and fortifying talent pipelines.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-10">
            <img src={partner1} alt="Caterpillar" className="h-10 object-contain" />
            <img src={partner2} alt="Deka" className="h-10 object-contain" />
            <img src={partner3} alt="DoD STEM" className="h-10 object-contain" />
            <img src={partner4} alt="Dow" className="h-10 object-contain" />
            <img src={partner5} alt="FedEx" className="h-10 object-contain" />
            <img src={partner6} alt="Charity Navigator" className="h-12 object-contain" />
          </div>
        </section>

        {/* 🔵 Final CTA Section */}
        <section className="bg-blue-900 text-white py-16 px-6 md:px-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Invest in Tomorrow’s STEM Leaders</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Contact the <strong>FIRST</strong> Development team to learn more about our impactful sponsorship opportunities.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <button className="px-6 py-3 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-100 transition">
              Contact Development Team
            </button>
            <button className="px-6 py-3 bg-transparent border border-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition">
              Explore Other Ways to Give
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default SponsorshipC;
