import React from "react";
import UnearthedImg from "../../assets/unearthed.png"; // <-- update path to your image file

const UnearthedPrograms = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        {/* Left Section */}
        <div className="text-left max-w-xl">
          <p className="uppercase text-sm font-semibold text-gray-500 tracking-wider">
            <span className="italic text-blue-700">FIRST</span>® AGE™ presented by Qualcomm
          </p>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mt-3 mb-6 leading-tight">
            Game & Season Info
          </h1>

          <p className="text-gray-700 mb-4 leading-relaxed">
            In the <strong>UNEARTHED™</strong> challenge,{" "}
            <span className="italic">FIRST</span>® LEGO® League teams will uncover
            the past to discover the future.
          </p>

          <p className="text-gray-700 mb-8 leading-relaxed">
            Every artifact we uncover holds a story. Each tool, each innovation,
            each work of art connects us to the people and ideas that came before
            us. Using STEM skills and teamwork, today we can dig deeper into
            discoveries than ever before.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all">
              Explore <span className="italic">FIRST AGE</span>
            </button>
            <button className="text-blue-700 font-semibold flex items-center gap-2 hover:underline">
              Season Materials →
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative w-full lg:w-1/2 flex justify-center">
          {/* Red Background Card */}
          <div className="absolute -bottom-6 -right-6 bg-red-600 rounded-lg w-[90%] h-[90%]"></div>

          {/* Yellow Foreground Card */}
          <div className="relative z-10 bg-yellow-500 border-8 border-black rounded-lg shadow-xl p-6">
            <img
              src={UnearthedImg}
              alt="Unearthed Logo"
              className="w-full h-auto rounded-md object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnearthedPrograms;
