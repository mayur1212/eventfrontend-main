import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Banner from '../../components/Banner/Banner1';

import Support from "../../components/Support/Support";
import Global from "../../components/Global/Global";
import Programs from "../../components/Programs/Programs";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div>
      <Navbar /> 
      <Banner />
      <Support />
      <Global />
      <Programs />
      <Footer />
    </div>
  );
};

export default Home;

