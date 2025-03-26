import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import InnerImageZoom from "react-inner-image-zoom";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductZoom = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  const zoomSliderBig = useRef();
  const zoomSlider = useRef();

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

  const goto = (index) => {
    if (zoomSliderBig.current) {
      zoomSliderBig.current.slickGoTo(index);
    }
  };

  useEffect(() => {
    window.zoomSliderBig = zoomSliderBig;
  }, []);

  if (!product) return <p>Đang tải...</p>;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    fade: false,
    arrows: true,
  };

  const settings2 = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    arrows: false,
  };

  return (
    <div className="productZoom">
      <div className="productZoom">
        <Slider {...settings2} ref={zoomSliderBig}>
          {product.HA_PATHS.map((img, index) => (
            <div className="item" key={index}>
              <InnerImageZoom zoomType="hover" zoomScale={1} src={img} className="w-100" alt={`product-${index}`} />
            </div>
          ))}
        </Slider>
      </div>

      <Slider {...settings} className="zoomSlider" ref={zoomSlider}>
        {product.HA_PATHS.map((img, index) => (
          <div className="item" key={index}>
            <img src={img} className="w-100" alt={`product-${index}`} onClick={() => goto(index)} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductZoom;
