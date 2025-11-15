import React from "react";
import Navbar from "../../components/navbar/Navbar";
import AnimatiAbout from "../../components/AnimatiAbout/AnimatiAbout";
import ValueAbout from "../../components/ValueAbout/ValueAbout"; // <-- Import new component
import Footer from "../../components/Footer/Footer";

const AboutFirst = () => {
  return (
    <div>
      <Navbar />
      <AnimatiAbout />
      <ValueAbout /> {/* Add your modern Core Values here */}
      <Footer />
    </div>
  );
};

export default AboutFirst;
