import React from "react";
import { motion } from "framer-motion";

// ✅ Import all images
import socialImg from "../../assets/connect1.jpg";
import inspireImg from "../../assets/connct3.jpg";
import unearthedImg from "../../assets/connect2.jpg";

// ✅ Import videos (if you have local mp4 files)
// If they’re hosted on YouTube, just keep the URLs below.
import discoverVideo from "../../assets/UNEARTHED Discover Set Video.mp4";
import expertVideo from "../../assets/Dr. Chris Wakefield, Archaeologist, Cambridge Archaeological Unit.mp4";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ChallengeLegoFirst = () => {
  return (
    <div className="bg-gray-50 py-16 px-6 md:px-20 space-y-20">

      {/* --- Section 1: Challenge Details --- */}
      <motion.section
        className="text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2 tracking-wide">
          Unearthed Materials
        </h3>
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          View the Challenge Details
        </h1>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Watch the UNEARTHED season videos for Discover, Explore, and Challenge
          then download the materials you need to get started here or at
          <a href="#" className="text-blue-600 ml-1 hover:underline">
            firstlegoleague.org
          </a>
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {[
            "FIRST LEGO League Discover",
            "FIRST LEGO League Explore",
            "FIRST LEGO League Challenge",
          ].map((label, i) => (
            <motion.button
              key={i}
              className="px-5 py-2 rounded-md bg-white border border-gray-200 shadow hover:bg-blue-50 hover:shadow-md transition"
              whileHover={{ scale: 1.05 }}
            >
              {label}
            </motion.button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <motion.div
            className="max-w-md text-left"
            variants={fadeInUp}
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-bold text-lg mb-2">
              FIRST LEGO League Discover
            </h2>
            <p className="text-gray-600 mb-3">
              For children ages 4–6, FIRST LEGO League Discover builds
              foundations early through fun, hands-on STEM learning and creative play.
            </p>
            <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
              View & Download Materials
            </button>
          </motion.div>

          <motion.div
            className="shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition"
            variants={fadeInUp}
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* ✅ Use local or YouTube video */}
            {/* ✅ UNEARTHED Discover Video */}
<video
  width="400"
  height="225"
  autoPlay
  muted
  loop
  playsInline
  controls
  className="rounded-lg"
  src={discoverVideo}
>
  Your browser does not support the video tag.
</video>

          </motion.div>
        </div>
      </motion.section>

      {/* --- Section 2: Experts --- */}
      <motion.section
        className="flex flex-col md:flex-row items-center justify-between gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="max-w-md">
          <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">
            Career Connection
          </h4>
          <h2 className="text-2xl font-bold mb-3">Dig In with the Experts</h2>
          <p className="text-gray-600 mb-4">
            Watch the UNEARTHED Career Connections video on our YouTube page to
            explore archaeology experts, make their mark, and dig deeper than
            ever before.
          </p>
          <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
            Hear from Archaeology Experts
          </button>
        </div>

        <motion.div
          className="shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition"
          whileHover={{ scale: 1.03 }}
        >
          {/* ✅ Local video example */}
          {/* ✅ Archaeology Expert Video */}
<video
  width="450"
  height="250"
  autoPlay
  muted
  loop
  playsInline
  controls
  className="rounded-lg"
  src={expertVideo}
>
  Your browser does not support the video tag.
</video>

        </motion.div>
      </motion.section>

      {/* --- Section 3: Stay Connected --- */}
      <motion.section
        className="text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="text-2xl font-bold mb-3">Stay Connected This Season</h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Stay connected to the FIRST LEGO League community with the latest
          updates, team resources, and next steps for the future.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Follow Us on Social",
              desc: "Follow us on Facebook or YouTube for team stories, updates, and inspiration.",
              link: "Facebook →",
              img: socialImg,
            },
            {
              title: "Get Inspired",
              desc: "Watch inspiring FIRST LEGO League videos and share your creations.",
              link: "Read the Latest →",
              img: inspireImg,
            },
            {
              title: "Dig Into UNEARTHED",
              desc: "Download challenge guides, team updates, and more from FIRST LEGO League.",
              link: "View Resources →",
              img: unearthedImg,
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              className="bg-white shadow-lg rounded-2xl p-4 hover:shadow-2xl hover:-translate-y-1 transition-transform"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <img
                src={card.img}
                alt={card.title}
                className="rounded-xl mb-4 w-full object-cover"
              />
              <h3 className="font-bold mb-2">{card.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{card.desc}</p>
              <a href="#" className="text-blue-600 font-semibold hover:underline">
                {card.link}
              </a>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default ChallengeLegoFirst;
