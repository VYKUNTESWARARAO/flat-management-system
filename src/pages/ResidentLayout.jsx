import React from "react";
import { Outlet } from "react-router-dom";
import ResidentHeader from "../components/resident/ResidentHeader.jsx";
import HomePage from "../Pages/HomePage.jsx";

const ResidentLayout = () => {
  return (
    <>
      <ResidentHeader />
      {/* Main content of resident pages */}
      <div className="resident-content">
        <Outlet />
        <HomePage />
        {/* Nested routes for resident pages */}
      </div>
    </>
  );
};

export default ResidentLayout;
