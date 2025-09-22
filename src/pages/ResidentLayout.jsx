// ResidentLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import ResidentHeader from "../components/resident/ResidentHeader.jsx";
import Footer from "../components/common/Footer.jsx";
import Hero from "../components/home/Hero.jsx";
import BackToTop from "../components/common/BackToTop.jsx";

const ResidentLayout = () => {
  return (
    <>
      <ResidentHeader />
      <Hero />
      <BackToTop />
      <Footer />
    </>
  );
};

export default ResidentLayout;
