import React from "react";
import Slider from "react-slick";
import "../../styles/pgSection.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const pgData = [
  {
    id: 1,
    name: "PG 1",
    location: "Hyderabad",
    price: "₹5000/month",
    image:
      "https://media.gettyimages.com/id/184364283/photo/holiday-apartment-house.jpg?s=612x612&w=gi&k=20&c=TPnuibEkKX9KC13SfeZqDvZHBQH3QRmWEmdogm2m-SU=",
  },
  {
    id: 2,
    name: "PG 2",
    location: "Hyderabad",
    price: "₹6000/month",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToYkx4vCo8pSJk3POFq28Il8pD9ANqYjiIsA&s",
  },
  {
    id: 3,
    name: "PG 3",
    location: "Hyderabad",
    price: "₹4500/month",
    image:
      "https://i.pinimg.com/564x/2d/fc/d2/2dfcd279f503a611c44a06a811bd8902.jpg",
  },
  {
    id: 4,
    name: "PG 4",
    location: "Hyderabad",
    price: "₹5500/month",
    image:
      "https://imagecdn.99acres.com/media1/30440/16/608816173M-1750316137865.webp",
  },
  {
    id: 5,
    name: "PG 5",
    location: "Hyderabad",
    price: "₹5000/month",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdnC9of-uLPIqIkrGUoA4PX-WW1VVCgUinPQ&s",
  },
];

const PgList = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="pg-section">
      <h2>
        Explore Our <span className="highlight">Homely Apartments</span>
      </h2>
      <Slider {...settings} className="pg-carousel">
        {pgData.map((pg) => (
          <div key={pg.id} className="pg-card">
            <img src={pg.image} alt={pg.name} />
            <h3>{pg.name}</h3>
            <p>{pg.location}</p>
            <p>{pg.price}</p>
            <button>View Details</button>
          </div>
        ))}
      </Slider>
    </section>
  );
};

// Custom Arrows
function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div className="slick-next" onClick={onClick}>
      &#10095;
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="slick-prev" onClick={onClick}>
      &#10094;
    </div>
  );
}

export default PgList;
