import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ResidentHeader from "../components/resident/ResidentHeader.jsx";
import Hero from "../components/home/Hero.jsx";

const ResidentLayout = () => {
  // State to track if user clicked profile or flats
  const [showMainHero, setShowMainHero] = useState(true);

  return (
    <>
      <ResidentHeader setShowMainHero={setShowMainHero} />

      {/* Conditional main content */}
      {showMainHero ? <Hero /> : <Outlet />}
    </>
  );
};

export default ResidentLayout;
