import React, { useRef } from "react";
import Slider from "react-slick";
import { motion, useScroll, useTransform } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import partner logos
import fedex from "../../assets/fedex-270-2.png";
import novelis from "../../assets/apple.jpg";
import caterpillar from "../../assets/disney.jpg";
import systems from "../../assets/dow-270-2.png";

// Import kids photo
import kids1 from "../../assets/footerllbaNNER .jpg";

const Partner = () => {
  // Top partners slider settings
  const partnerSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  // Ref for parallax
  const kidsRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: kidsRef,
    offset: ["start end", "end start"],
  });

  // Kids parallax movement
  const kidsY = useTransform(scrollYProgress, [0, 1], ["-40px", "40px"]);

  // Different parallax speeds for partner logos
  const logoY1 = useTransform(scrollYProgress, [0, 1], ["-20px", "20px"]);
  const logoY2 = useTransform(scrollYProgress, [0, 1], ["-10px", "10px"]);
  const logoY3 = useTransform(scrollYProgress, [0, 1], ["-15px", "15px"]);
  const logoY4 = useTransform(scrollYProgress, [0, 1], ["-5px", "5px"]);

  return (
    <div className="bg-white">
      {/* ==== Partner Section with Parallax Logos ==== */}
      <motion.div
        className="py-10 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-lg md:text-xl font-semibold italic">
          FIRST{" "}
          <span className="not-italic font-normal">Strategic Partners</span>
        </h2>

        <div className="max-w-5xl mx-auto mt-6">
          <Slider {...partnerSettings}>
            <motion.div
              style={{ y: logoY1 }}
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.3 }}
            >
              <img src={systems} alt="Systems" className="h-16 mx-auto" />
            </motion.div>
            <motion.div
              style={{ y: logoY2 }}
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.3 }}
            >
              <img src={fedex} alt="FedEx" className="h-16 mx-auto" />
            </motion.div>
            <motion.div
              style={{ y: logoY3 }}
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.3 }}
            >
              <img src={novelis} alt="Novelis" className="h-16 mx-auto" />
            </motion.div>
            <motion.div
              style={{ y: logoY4 }}
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.3 }}
            >
              <img src={caterpillar} alt="Caterpillar" className="h-16 mx-auto" />
            </motion.div>
          </Slider>
        </div>
      </motion.div>

      {/* ==== Kids Photo (Scroll Fade + Parallax + Hover Zoom) ==== */}
      <motion.div
        ref={kidsRef}
        className="w-full"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ overflow: "hidden" }}
      >
        <motion.img
          src={kids1}
          alt="Kids Activity"
          className="w-full object-cover object-top shadow-xl rounded-lg"
          style={{
            height: "30vh",
            y: kidsY, // 👈 parallax effect
          }}
          whileHover={{ scale: 1.1 }} // 👈 zoom on hover
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </motion.div>
    </div>
  );
};

export default Partner;
