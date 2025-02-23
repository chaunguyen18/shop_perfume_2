import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaAngleRight } from "react-icons/fa6";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const HomeBrand = () => {
  return (
    <div className="container">
      <div className="homeBrand ">
        <h2 className="mb-0">Thương hiệu<FaAngleRight /></h2>
        <Swiper
          slidesPerView={5}
          spaceBetween={20}
         pagination={true}
        //   slidesPerGroup={1}
          modules={[Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="item text-center">
                <img src="https://theme.hstatic.net/1000340570/1000964732/14/logo-brand-gucci.png?v=6851" alt="Gucci" className="w-100"/>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item text-center">
                <img src="https://theme.hstatic.net/1000340570/1000964732/14/logo-brand-paco-rabanne.png?v=6851" alt="Paco Rabanne" className="w-100"/>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item text-center">
                <img src="https://theme.hstatic.net/1000340570/1000964732/14/logo-brand-prada.png?v=6851" alt="Prada" className="w-100"/>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item text-center">
                <img src="https://theme.hstatic.net/1000340570/1000964732/14/logo-brand-gucci.png?v=6851" alt="Gucci" className="w-100"/>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item text-center">
                <img src="https://theme.hstatic.net/1000340570/1000964732/14/logo-brand-gucci.png?v=6851" alt="Gucci" className="w-100"/>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item text-center">
                <img src="https://theme.hstatic.net/1000340570/1000964732/14/logo-brand-gucci.png?v=6851" alt="Gucci" className="w-100"/>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HomeBrand;
