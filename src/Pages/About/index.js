import React from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const About = () => {
  return (
    <>
    <Header />
    
    <div className="container mt-3 mb-3 about">
      <div className="d-flex flex-column">
        <h1>Giới thiệu</h1>
        <div className="row d-flex align-items-center">
          <div className="row mt-2 about-content">
            <div className="col-md-6">
              <img
                src="https://i.pinimg.com/736x/21/68/93/21689370d6441c6f8806c2340c5dbcd2.jpg"
                alt="about-1"
                className="w-100"
              />
            </div>
            <div className="col-md-6">
              <h2>FADE – Nơi Khơi Nguồn Đam Mê Nước Hoa</h2>
              <p>
                FADE không chỉ là một thương hiệu nước hoa – chúng tôi là{" "}
                <strong>
                  hành trình khám phá bản thân qua từng tầng hương.
                </strong>{" "}
                Với sứ mệnh trở thành start-up nước hoa tiên phong tại Việt Nam,
                FADE xây dựng một hệ sinh thái nơi Cộng đồng - Dịch vụ - Chất
                lượng hòa quyện, giúp mỗi người tìm thấy dấu ấn mùi hương riêng
                biệt của mình.
                <br></br>
                Tại FADE, chúng tôi tin rằng{" "}
                <strong>
                  nước hoa không chỉ là mùi hương – đó là cảm xúc, là cá tính,
                  là những khoảnh khắc đáng nhớ.
                </strong>{" "}
                Vì thế, chúng tôi không ngừng mở rộng một cộng đồng những người
                yêu nước hoa, nơi bạn có thể trải nghiệm, chia sẻ và trở thành
                chuyên gia hương thơm của chính mình.
              </p>
            </div>
          </div>
          <div className="row mt-2 about-content">
            <div className="col-md-6">
              <h2>
                Dịch Vụ Hoàn Hảo – Trải Nghiệm Mua Sắm Đơn Giản & Tiện Lợi
              </h2>
              <p>
                FADE mang đến một hành trình mua sắm thông minh, tinh tế và
                thuận tiện, từ hệ thống showroom hiện đại đến các nền tảng
                online như website, Facebook, Instagram. Mọi thao tác được tối
                ưu hóa để đơn giản – nhanh chóng – cá nhân hóa, giúp bạn dễ dàng
                tìm thấy mùi hương hoàn hảo mà không mất quá nhiều thời gian.
              </p>
            </div>
            <div className="col-md-6">
              <img
                src="https://i.pinimg.com/736x/47/3e/55/473e5552e8eb97ebb303a4fbac29974c.jpg"
                alt="about-2"
                className="w-100"
              />
            </div>
          </div>
          <div className="row mt-2 mb-2 about-content">
            <div className="col-md-6 ">
              <img
                src="https://i.pinimg.com/736x/82/be/e8/82bee8bd8eeb8101595e367bc930b2d3.jpg"
                alt="about-3"
                className="w-100"
              />
            </div>
            <div className="col-md-6">
              <h2>Chất Lượng Là Cam Kết – Uy Tín Tạo Nên Thương Hiệu</h2>
              <p>
                Với hơn 6 năm đồng hành cùng những tín đồ nước hoa, FADE tự hào
                là thương hiệu luôn đặt chất lượng và uy tín lên hàng đầu. 100%
                sản phẩm tại FADE đều là hàng chính hãng, với cam kết hoàn tiền
                200% nếu phát hiện hàng giả. Chúng tôi tin rằng sự hài lòng của
                khách hàng chính là thành công lớn nhất của FADE.
              </p>
              <p>
                FADE luôn sẵn sàng lắng nghe những đóng góp, phản hồi và sự tin
                tưởng từ quý khách hàng để không ngừng hoàn thiện, nâng cao trải
                nghiệm và mang đến những giá trị tốt nhất.
              </p>
              <p>
                <strong>
                  FADE – Hành trình mùi hương, đẳng cấp vượt thời gian.
                </strong>
              </p>
              <p>
                Trân trọng,
                <br></br>
                <b className="fs-3">FADE Team</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default About;
