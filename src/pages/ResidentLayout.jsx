import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Hero from "../components/home/Hero.jsx";
import ResidentHeader from "../components/resident/ResidentHeader.jsx";

const ResidentLayout = () => {
  // State to track if user clicked profile or flats

  return (
<>
        <ResidentHeader />
          <Hero />

    </>
  );
};

export default ResidentLayout;
