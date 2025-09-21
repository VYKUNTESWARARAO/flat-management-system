// BackToTop.jsx
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ArrowUp } from "react-bootstrap-icons"; // bootstrap icon

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when user scrolls down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    const hero = document.getElementById("hero-section");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    isVisible && (
      <Button onClick={scrollToTop} className="back-to-top" variant="primary">
        <ArrowUp size={20} />
      </Button>
    )
  );
};

export default BackToTop;
