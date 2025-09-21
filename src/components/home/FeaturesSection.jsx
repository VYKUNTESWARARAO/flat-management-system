// FeaturesSection.jsx
import React from "react";
import { FaShieldAlt, FaUsers, FaHandshake, FaLaptop } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/FeaturesSection.css";

const featuresData = [
  {
    icon: <FaShieldAlt size={40} />,
    title: "Easy Booking Process",
    desc: "Book your rooms quickly with our seamless booking system and instant confirmation.",
  },
  {
    icon: <FaUsers size={40} />,
    title: "Flexible Room Sharing",
    desc: "Share rooms with compatible roommates for maximum comfort and convenience.",
  },
  {
    icon: <FaHandshake size={40} />,
    title: "Friendly Community",
    desc: "Meet new people, make friends, and enjoy a welcoming environment.",
  },
  {
    icon: <FaLaptop size={40} />,
    title: "Work-Friendly Rooms",
    desc: "Focus on your work with rooms designed for productivity and comfort.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="feature-section bg-dark text-white py-4">
      <div className="main-container text-center mb-4">
        <h2 className="h3 fw-bold mb-2">Why Choose HSM</h2>
        <p className="lead mb-0">
          We make your home-seeking process easy with our top-notch features and
          facilities.
        </p>
      </div>

      <div className="container">
        <div className="row g-3">
          {featuresData.map((feature, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-3">
              <div className="feature-card card text-center h-100 border-0 shadow-sm">
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <div className="mb-3">{feature.icon}</div>
                  <h5 className="card-title mb-2">{feature.title}</h5>
                  <p className="card-text">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
