import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Banner from '../../components/Banner/Banner1';

import Support from "../../components/Support/Support";
import Global from "../../components/Global/Global";       // ✅ exact folder/file casing
import Programs from "../../components/Programs/Programs";
import Partner from "../../components/Partner/Partner";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div>
      <Banner />
      <Navbar />
      <Support />
      <Global />
      <Programs />
      <Partner />
      <Footer />
    </div>
  );
};

export default Home;
