import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

// import "./styles.css";
import Kitchen from "../images/kitchen.jpg";
import Walking from "../images/walking.jpg";
import Paperwork from "../images/paperwork.jpeg";

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  function handleChange(index) {
    setCurrentIndex(index);
  }

  //   Images Array
  const imageData = [
    { label: "Image1", alt: "image1", src: Kitchen },
    { label: "Image2", alt: "image2", src: Walking },
    { label: "Image2", alt: "image2", src: Paperwork },
  ];

  const renderSlides = imageData.map((image) => (
    <div key={image.alt}>
      <img
        src={image.src}
        alt={image.alt}
        className="h-[500px] object-contain"
      />
      {/* <p className="legend">{image.label}</p> */}
    </div>
  ));

  return (
    <div className="carousel-container">
      <Carousel
        showArrows={false}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        selectedItem={imageData[currentIndex]}
        onChange={handleChange}
        status={false}
        // className="carousel-container h-[500px]"
        responsive={responsive}
      >
        {renderSlides}
      </Carousel>
    </div>
  );
}
export default Slider;
