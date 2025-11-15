import React from "react";
import { motion } from "framer-motion";

// ✅ Import local images
import FreeContentImg from "../../assets/connect21.jpg";
import BlogImg from "../../assets/connect22.jpg";
import SocialImg from "../../assets/connect23.jpg";

// ✅ Import local video
import UnearthedVideo from "../../assets/UNEARTHED Discover Set Video.mp4";

// ✅ Animation config
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const RtxFtc = () => {
  return (
    <div className="bg-gray-50 py-16 px-6 md:px-20 space-y-20">
      {/* --- Section 1: Stay Connected --- */}
      <motion.section
        className="text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Stay Connected This Season
        </h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          In between team meetings this season, stay connected to the FIRST Tech
          Challenge community with the latest updates, team resources, and next
          steps for the future.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Follow Us on Social",
              desc: "Follow us on Facebook and YouTube for the latest FIRST Tech Challenge updates, team stories, highlights, and more.",
              link: "Facebook →",
              img: FreeContentImg,
            },
            {
              title: "Get Inspired",
              desc: "Watch inspiring FIRST Tech Challenge stories and share your team's innovations.",
              link: "Read the Latest →",
              img: BlogImg,
            },
            {
              title: "Dig Into DECODE",
              desc: "Download challenge guides, event updates, and more from FIRST Tech Challenge.",
              link: "View Resources →",
              img: SocialImg,
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              className="bg-white shadow-lg rounded-2xl p-4 hover:shadow-2xl hover:-translate-y-1 transition-transform"
              variants={fadeInUp}
            >
              <img
                src={card.img}
                alt={card.title}
                className="rounded-xl mb-4 w-full object-cover"
              />
              <h3 className="font-bold mb-2">{card.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{card.desc}</p>
              <a
                href="#"
                className="text-blue-600 font-semibold hover:underline"
              >
                {card.link}
              </a>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* --- Section 2: Prepare for Life --- */}
      <motion.section
        className="bg-blue-800 text-white text-center rounded-2xl py-14 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h4 className="uppercase tracking-wider text-sm font-semibold mb-3">
          FIRST Alumni
        </h4>
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Prepare for Life Beyond High School
        </h2>
        <p className="max-w-2xl mx-auto mb-6 text-blue-100">
          The FIRST experience doesn’t end with high school! Education and
          career opportunities open up to you as a FIRST participant and alum.
        </p>
        <button className="px-5 py-2 bg-white text-blue-800 font-semibold rounded-md hover:bg-gray-200 transition">
          Explore FIRST Alumni Resources
        </button>
      </motion.section>

      {/* --- Section 3: Decode by RTX --- */}
      <motion.section
        className="text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">
          Unearth the Possibilities with RTX
        </h4>
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          DECODE presented by RTX
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          RTX is committed to developing STEM talent pipelines that prepare
          students to tackle global challenges. Through mentorship,
          sponsorship, and team support, RTX empowers innovators to shape the
          future.
        </p>

        {/* ✅ Local video section */}
        {/* ✅ Local video section */}
<div className="flex justify-center mb-10">
  <video
    src={UnearthedVideo}
    width="450"
    height="250"
    autoPlay
    muted
    loop
    playsInline
    className="rounded-xl shadow-lg"
  />
</div>


       
      </motion.section>
    </div>
  );
};

export default RtxFtc;
