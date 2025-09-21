import React from "react";
import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer.jsx";
import Hero from "../components/home/Hero.jsx";
import BackToTop from "../components/common/BackToTop.jsx";

const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      <BackToTop />
      <Footer />
    </>
  );
};

export default HomePage;
