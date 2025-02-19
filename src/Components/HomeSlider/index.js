import React from "react";
import Slider from "react-slick";
//import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const HomeSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="homeSlider">
    <Slider {...settings}>
    {/* <span className="span span-left">
          <FaAngleLeft />
        </span>
        <span className="span span-right">
          <FaAngleRight />
        </span> */}
    
        <div className="slider-item">
          <img
            src="https://theme.hstatic.net/1000340570/1000964732/14/slideshow_1.jpg?v=6851"
            className="w-100" alt="slider1"
          />
        </div>
        <div>
        <img
            src="https://theme.hstatic.net/1000340570/1000964732/14/slideshow_2.jpg?v=6851"
            className="w-100" alt="slider2"
          />
        </div>
        <div>
        <img
            src="https://theme.hstatic.net/1000340570/1000964732/14/slideshow_3.jpg?v=6851"
            className="w-100" alt="slider3"
          />
        </div>
        <div>
        <img
            src="https://theme.hstatic.net/1000340570/1000964732/14/slideshow_4.jpg?v=6851"
            className="w-100" alt="slider4"
          />
        </div>

      </Slider>
      </div>
    
  );
};

export default HomeSlider;
