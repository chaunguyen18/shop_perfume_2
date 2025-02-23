import Button from "@mui/material/Button";
import HomeSlider from "../../Components/HomeSlider";
import { FaAngleRight } from "react-icons/fa6";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductItem from "../../Components/ProductItem";
import HomeBrand from "../../Components/HomeBrand";
import NewsItem from "../../Components/NewsItem";
import { FaClockRotateLeft } from "react-icons/fa6";
import { IoIosGift } from "react-icons/io";
import { MdLocalAtm } from "react-icons/md";
import { IoShieldCheckmark } from "react-icons/io5";

const Home = () => {
  return (
    <>
      <HomeSlider />
      <HomeBrand />
      <div className="container">
        <div className="homeProduct">
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className="info">
              <h2 className="mb-0">
                Bestsellers
                <FaAngleRight />
              </h2>
              <p>
                Những sản phẩm bán chạy nhất của <b>FADE</b>.
              </p>
            </div>

            <Button className="viewAllBtn">
              Xem tất cả <FaAngleRight />
            </Button>
          </div>
          <div className="product_row w-100 mt-4">
            <Swiper
              slidesPerView={5}
              spaceBetween={30}
              navigation={true}
              slidesPerGroup={3}
              modules={[Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>
                <ProductItem />
              </SwiperSlide>
              <SwiperSlide>
                <ProductItem />
              </SwiperSlide>
              <SwiperSlide>
                <ProductItem />
              </SwiperSlide>
              <SwiperSlide>
                <ProductItem />
              </SwiperSlide>
              <SwiperSlide>
                <ProductItem />
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="d-flex align-items-center justify-content-between w-100 mt-4 mb-4">
            <div className="info">
              <h2 className="mb-0">
                Hàng mới ra mắt
                <FaAngleRight />
              </h2>
              <p>
                Những sản phẩm mới ra mắt của <b>FADE</b>.
              </p>
            </div>

            <Button className="viewAllBtn">
              Xem tất cả <FaAngleRight />
            </Button>
          </div>
          <div className="productRow2 w-100 mt-4 d-flex">
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
          </div>
          <div className="homeNews mt-3">
            <div className="d-flex row align-items-center justify-content-between w-100">
              <h2 className="">
                Tin tức
                <FaAngleRight />
              </h2>
              <div className="product_row w-100 mt-3">
                <Swiper
                  slidesPerView={4}
                  spaceBetween={30}
                  navigation={true}
                  slidesPerGroup={3}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <NewsItem />
                  </SwiperSlide>
                  <SwiperSlide>
                    <NewsItem />
                  </SwiperSlide>
                  <SwiperSlide>
                    <NewsItem />
                  </SwiperSlide>
                  <SwiperSlide>
                    <NewsItem />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
          
        </div>
        <div className="homeTerms mt-3 p-4">
            <div className="row container justify-content-between w-100">
              <div className="col d-flex align-items-center">
                <span>
                  <FaClockRotateLeft />
                </span>
                <span>Đổi trả trong 24h</span>
              </div>
              <div className="col d-flex align-items-center">
                <span>
                  <IoShieldCheckmark />
                </span>
                <span>100% Chính hãng</span>
              </div>
              <div className="col d-flex align-items-center">
                <span>
                  <MdLocalAtm />
                </span>
                <span>Giao dịch an toàn</span>
              </div>
              <div className="col d-flex align-items-center">
                <span>
                  <IoIosGift />
                </span>
                <span>Ưu đãi độc quyền</span>
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default Home;
