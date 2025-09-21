import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import anushaImage from "../../assets/users/anusha.png";
import muraliImage from "../../assets/users/murali.png";
import radhaImage from "../../assets/users/radha.png";
import "../../styles/TestimonialsSection.css";

const testimonials = [
  {
    name: "Anusha",
    location: "Perungudi",
    image: anushaImage,
    text: "Been living here since June 2021. Excellent ambience and the staff are incredibly helpful, safe and secure community. Perfect example of how a good hostel should be! Highly recommended!",
  },
  {
    name: "Murali",
    location: "Sholinganallur",
    image: muraliImage,
    text: "HSM is an amazing environment to live in. They have the best amenities. This has definitely become my second home in Chennai. Will definitely recommend it to my friends!",
  },
  {
    name: "Radha",
    location: "Sholinganallur",
    image: radhaImage,
    text: "HSM is an amazing environment to live in. They have the best amenities, a gym, great view and a secured - gated community living experience. This has definitely become my second home in Chennai. Will definitely recommend it to my friends!",
  },
];

const Testimonial = ({ testimonial }) => (
  <div className="tcard mx-3 mb-4">
    <img
      src={testimonial.image}
      className="tcard-img-top rounded-circle"
      alt={testimonial.name}
    />
    <div className="tcard-body text-center">
      <h5 className="tcard-title">{testimonial.name}</h5>
      <p className="tcard-location">
        <small>{testimonial.location}</small>
      </p>
      <p className="tcard-text">{testimonial.text}</p>
    </div>
  </div>
);

const TestimonialsSection = () => (
  <div className="testimonials-section">
    <h1 className="section-title mb-4">Kind Words From Happy Clients</h1>
    <p className="section-description mb-5">
      What other people thought about the service provided by Harini Smart Homes
    </p>
    <div className="testimonial-cards d-flex flex-wrap justify-content-center">
      {testimonials.map((testimonial, index) => (
        <Testimonial key={index} testimonial={testimonial} />
      ))}
    </div>
  </div>
);

export default TestimonialsSection;
