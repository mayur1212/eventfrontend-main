import React from "react";
import donateHero from "../../assets/workplace-giving-fll-coach.png"; // replace with your top image path
import payrollImg from "../../assets/frc_getstarted_1260hero12.png"; // replace with your own images
import employerImg from "../../assets/coaches-mentors-frc.png"; // replace with your own images

const DonateC = () => {
  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-16 gap-10 bg-gradient-to-br from-blue-50 to-white">
        <div className="md:w-1/2 space-y-6">
          <p className="text-sm text-gray-600 uppercase tracking-wide">
            Workplace Giving & Company Matching
          </p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Support <span className="text-blue-700">FIRST®</span> While You Work
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Explore employer matching, payroll deduction, and workplace funding opportunities to
            give even more with your donation.
          </p>
          <div className="flex gap-4 flex-wrap">
            <button className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow hover:bg-blue-800 transition">
              Make a Donation
            </button>
            <button className="px-6 py-3 border border-blue-700 text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition">
              Explore Other Ways to Give
            </button>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <img
            src={donateHero}
            alt="Support FIRST"
            className="rounded-xl shadow-xl w-full md:w-4/5"
          />
        </div>
      </section>

      {/* Matching Gifts Section */}
      <section className="text-center py-20 px-6 md:px-16 bg-gray-50">
        <h2 className="text-3xl font-bold mb-4">Explore Matching Gifts</h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-10">
          Employer matching programs allow you to team up and combine your volunteer time and
          donations to make a greater impact in just a few simple steps.
        </p>

        <button className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow hover:bg-blue-800 transition mb-12">
          Make a Donation
        </button>

        {/* 3 Steps */}
        <div className="grid md:grid-cols-3 gap-10 text-left max-w-5xl mx-auto">
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="font-bold text-lg mb-2 text-blue-700">Step 1</h3>
            <p className="text-gray-600">
              Check your eligibility — search for your company’s workplace matching program to see if
              it matches gifts to <strong>FIRST</strong>.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="font-bold text-lg mb-2 text-blue-700">Step 2</h3>
            <p className="text-gray-600">
              Review instructions — after locating your company, follow the specific details to
              submit your match.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="font-bold text-lg mb-2 text-blue-700">Step 3</h3>
            <p className="text-gray-600">
              Submit your match request — follow your company’s matching gift instructions and
              contact your employer or volunteer manager to finalize.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-20 px-6 md:px-20 bg-white text-center border-t border-gray-200">
        <h3 className="text-2xl font-bold mb-4">Search for Your Company</h3>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          See if your employer will match your volunteer time, donations, or offer payroll giving.
        </p>
        <div className="max-w-2xl mx-auto flex flex-col md:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Search for company..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-700"
          />
          <button className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition w-full md:w-auto">
            Let’s Check
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          All information provided by Double the Donation.
        </p>
      </section>

      {/* Payroll Deductions Section */}
      <section className="grid md:grid-cols-2 gap-10 items-center py-20 px-6 md:px-16 bg-gray-50">
        <div>
          <h2 className="text-3xl font-bold mb-4">Payroll Deductions</h2>
          <p className="text-gray-600 mb-4">
            Many companies allow payroll contributions to <strong>FIRST</strong> as part of their
            workplace giving program. This makes donating simple and convenient by deducting a small
            amount each pay period.
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src={payrollImg}
            alt="Payroll Deductions"
            className="rounded-xl shadow-lg w-full md:w-4/5"
          />
        </div>
      </section>

      {/* Employer’s Cause Portal Section */}
      <section className="grid md:grid-cols-2 gap-10 items-center py-20 px-6 md:px-16">
        <div className="flex justify-center md:order-2">
          <img
            src={employerImg}
            alt="Employer’s Cause Portal"
            className="rounded-xl shadow-lg w-full md:w-4/5"
          />
        </div>
        <div className="md:order-1">
          <h2 className="text-3xl font-bold mb-4">Employer’s Cause Portal</h2>
          <p className="text-gray-600 mb-4">
            Find a workplace fundraising tool or Employee Giving Portal that allows employees to
            make payroll deductions or one-time gifts. Activities can include matching donations,
            promoting volunteer opportunities, or hosting company-wide giving campaigns.
          </p>
          <p className="text-gray-600">
            Encourage your colleagues to get involved and make a greater impact together.
          </p>
        </div>
      </section>
    </div>
  );
};

export default DonateC;
