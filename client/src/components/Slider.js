import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
// import "./styles.css";
import Kitchen from "../images/kitchen.jpg";
// import Walking from "../images/walking.jpg";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";

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
  const imageData = [{ label: "", alt: "image1", src: Kitchen }];
  const renderSlides = imageData.map((image) => (
    <div key={image.alt}>
      <img src={image.src} alt={image.alt} />
      <p className="legend">{image.label}</p>
    </div>
  ));
  return (
    <div className="carousel-container">
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        selectedItem={imageData[currentIndex]}
        onChange={handleChange}
        className="carousel-container"
        responsive={responsive}
      >
        {renderSlides}
      </Carousel>
    </div>
  );
}
export default Slider;
