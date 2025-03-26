import React, { useEffect, useRef, useState } from 'react';
import Slider from "react-slick";
import InnerImageZoom from "react-inner-image-zoom";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductZoom = () => {

  const [product, setProduct] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/product/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Đang tải...</p>;

    useEffect(() => {
        window.zoomSliderBig = zoomSliderBig; 
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
                  src={product.HA_PATHS[0]}
                  className="w-100"
                  alt="product1"
                />
              </div>
              <div className="item">
                <InnerImageZoom
                  zoomType="hover"
                  zoomScale={1}
                  src={product.HA_PATHS[1]}
                  className="w-100"
                  alt="product1"
                />
              </div>
              <div className="item">
                <InnerImageZoom
                  zoomType="hover"
                  zoomScale={1}
                  src={product.HA_PATHS[2]}
                  className="w-100"
                  alt="product1"
                />
              </div>
            </Slider>
          </div>
          <Slider {...settings} className="zoomSlider" ref={zoomSlider}>
            <div className="item">
              <img
                src={product.HA_PATHS[0]}
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
                src={product.HA_PATHS[1]}
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
                src={product.HA_PATHS[2]}
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