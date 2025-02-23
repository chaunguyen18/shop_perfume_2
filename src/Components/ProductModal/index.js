import React, { useRef } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { IoMdClose } from "react-icons/io";
import Rating from "@mui/material/Rating";
import Slider from "react-slick";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { FaPlus } from "react-icons/fa6";
import QuantityBox from "../QuantityBox";
import { CiBookmark } from "react-icons/ci";
import { MdCompareArrows } from "react-icons/md";

const ProductModal = ({ open, closeProductModal }) => {
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
    fade: true,
    arrows: false,
  };

  const zoomSliderBig = useRef();
  const zoomSlider = useRef();

  const goto = (index) => {
    if (zoomSliderBig.current) {
      zoomSliderBig.current.slickGoTo(index, true);
      setTimeout(() => zoomSliderBig.current.slickGoTo(index, true), 100); // Ép cập nhật lại
    }
    if (zoomSlider.current) {
      zoomSlider.current.slickGoTo(index, true);
      setTimeout(() => zoomSlider.current.slickGoTo(index, true), 100);
    }
  };

  return (
    <Dialog open={open} className="productModal" onClose={closeProductModal}>
      <Button className="close_" onClick={closeProductModal}>
        <IoMdClose />
      </Button>
      <h4 className="mb-2 font-weight-bold ">Versace Eros For Men</h4>
      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center">
          <span>Brands:</span>
          <span className="ml-2">
            <b>Versace</b>
          </span>
        </div>
        <Rating
          name="read-only"
          value={5}
          size="small"
          precision={0.5}
          readOnly
        />
      </div>
      <hr />
      <div className="row mt-2 productDetailModal">
        <div className="col-md-6">
          <div className="productZoom">
            <Slider
              {...settings2}
              className="zoomSliderBig"
              ref={zoomSliderBig}
            >
              <div className="item">
                <InnerImageZoom
                  zoomType="hover"
                  zoomScale={1}
                  src={`https://product.hstatic.net/1000340570/product/versace-eros-edt-200ml_8acc6bef0af0444c8c233e73a994be6c_master.jpg`}
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
                  console.log("Clicked image index:", 0);
                  goto(0);
                }}
              />
            </div>
            <div className="item">
              <img
                src={`https://product.hstatic.net/1000340570/product/versace-eros-for-men-1_3288f952b910477ba621b0ffee1e1e80_master.jpg`}
                className="w-100"
                alt="product1"
                onClick={() => goto(1)}
              />
            </div>
            <div className="item">
              <img
                src={`https://product.hstatic.net/1000340570/product/versace-eros-for-men-tester_64667f61adb14935b9bdce4dd9194320_master.jpg`}
                className="w-100"
                alt="product1"
                onClick={() => goto(2)}
              />
            </div>
          </Slider>
        </div>
        <div className="col-md-6 product-detail-info">
          <div className="d-flex mb-2 align-items-center">
            <span className="old-Price">$20</span>
            <span className="new-Price">$10</span>
          </div>
          <span className="badge">Còn hàng</span>
          <p className="mt-3 mb-3">Mô tả</p>
          <div className="d-flex align-items-center mb-3">
            <QuantityBox />
            <Button className="addToCartBtn" style={{ marginLeft: "50px" }}><FaPlus />Thêm vào giỏ</Button>
          </div>
          <div className="d-flex align-items-center" >
            <Button className="addToWishlistBtn" style={{ marginRight: "20px" }}><CiBookmark />Yêu thích</Button>
          <Button className="compareBtn"><MdCompareArrows/>So sánh</Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductModal;
