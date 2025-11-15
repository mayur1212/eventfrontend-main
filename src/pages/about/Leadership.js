import React from "react";
import Navbar from "../../components/navbar/Navbar";
import MissionLeader from "../../components/MissionLeader/MissionLeader"; // ✅ Capitalized import
import Footer from "../../components/Footer/Footer";

const Leadership = () => {
  return (
    <div>
      <Navbar />
      <MissionLeader /> {/* ✅ Capitalized component */}
      <Footer />
    </div>
  );
};

export default Leadership;
