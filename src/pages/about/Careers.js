import React from "react";
import Navbar from "../../components/navbar/Navbar";
import FirstSupport from "../../components/firstsupport/firstsupport"; // ✅ Capitalized import
import Footer from "../../components/Footer/Footer";

const careers = () => {
  return (
    <div>
      <Navbar />
      <FirstSupport />  {/* ✅ Use capitalized component */}
      <Footer />
    </div>
  );
};

export default careers;
