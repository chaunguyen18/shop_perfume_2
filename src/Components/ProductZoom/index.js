import React, { useEffect, useRef } from 'react';
import Slider from "react-slick";
import InnerImageZoom from "react-inner-image-zoom";

const ProductZoom = () => {

    useEffect(() => {
        window.zoomSliderBig = zoomSliderBig; // Gán ref vào window để debug
      }, []);
    
      var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        fade: false,
        arrows: true,
      };
    
      var settings2 = {
        dots: false,
        infinite: false,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: false,
        arrows: false,
      };
      
    
      const zoomSliderBig = useRef();
      const zoomSlider = useRef();
    
      const goto = (index) => {
        if (zoomSliderBig.current) {
          zoomSliderBig.current.slickGoTo(index);
        }
      };

  return (
    <div className='productZoom'>
                  <div className="productZoom">
          <Slider {...settings2} ref={(slider) => (zoomSliderBig.current = slider)} >

              <div className="item">
                <InnerImageZoom
                  zoomType="hover"
                  zoomScale={1}
                  src={`https://product.hstatic.net/1000340570/product/versace-eros-edt-200ml_8acc6bef0af0444c8c233e73a994be6c_master.jpg`}
                  className="w-100"
                  alt="product1"
                />
              </div>
              <div className="item">
                <InnerImageZoom
                  zoomType="hover"
                  zoomScale={1}
                  src={`https://product.hstatic.net/1000340570/product/versace-eros-for-men-1_3288f952b910477ba621b0ffee1e1e80_master.jpg`}
                  className="w-100"
                  alt="product1"
                />
              </div>
              <div className="item">
                <InnerImageZoom
                  zoomType="hover"
                  zoomScale={1}
                  src={`https://product.hstatic.net/1000340570/product/versace-eros-for-men-tester_64667f61adb14935b9bdce4dd9194320_master.jpg`}
                  className="w-100"
                  alt="product1"
                />
              </div>
            </Slider>
          </div>
          <Slider {...settings} className="zoomSlider" ref={zoomSlider}>
            <div className="item">
              <img
                src={`https://product.hstatic.net/1000340570/product/versace-eros-edt-200ml_8acc6bef0af0444c8c233e73a994be6c_master.jpg`}
                className="w-100"
                alt="product1"
                onClick={() => {
                  console.log("Đã nhấn vào ảnh nhỏ, index:", 0);
                  goto(0);
                }}
              />
            </div>
            <div className="item">
              <img
                src={`https://product.hstatic.net/1000340570/product/versace-eros-for-men-1_3288f952b910477ba621b0ffee1e1e80_master.jpg`}
                className="w-100"
                alt="product1"
                onClick={() => {
                  console.log("Đã nhấn vào ảnh nhỏ, index:", 1);
                  goto(1);
                }}
              />
            </div>
            <div className="item">
              <img
                src={`https://product.hstatic.net/1000340570/product/versace-eros-for-men-tester_64667f61adb14935b9bdce4dd9194320_master.jpg`}
                className="w-100"
                alt="product1"
                onClick={() => {
                  console.log("Đã nhấn vào ảnh nhỏ, index:", 2);
                  goto(2);
                }}
              />
            </div>
          </Slider>
        </div>

  )
}

export default ProductZoom