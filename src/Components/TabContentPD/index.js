import React, { useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import RatingBar from "../../Components/RatingBar";
import { FaAngleRight } from "react-icons/fa";
import FilterReview from "../../Components/FilterReview";
import { AiOutlineLike } from "react-icons/ai";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ReviewModal from "../ReviewModal";

function CustomTabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

const TabContentPD = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [isOpenProductModal, setIsOpenProductModal] = useState(false);

  const viewProductModal = (e) => {
    setIsOpenProductModal(true);
  };

  const closeProductModal = () => {
    setIsOpenProductModal(false);
  };

  return (
    <div>
      <div className="card row mt-3 p-2 tab-content mb-3">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            className="custom-tabs"
          >
            <Tab label="Chi tiết sản phẩm" />
            <Tab label="Sử dụng bảo quản" />
            <Tab label="Đánh giá" />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <CustomTabPanel value={value} index={0}>
            <table className="table">
              <tbody>
                <tr>
                  <td>
                    <strong>Mã hàng</strong>
                  </td>
                  <td>110100204231</td>
                </tr>
                <tr>
                  <td>
                    <strong>Thương hiệu</strong>
                  </td>
                  <td>Welch's</td>
                </tr>
                <tr>
                  <td>
                    <strong>Xuất xứ</strong>
                  </td>
                  <td>Anh, Đức, Pháp</td>
                </tr>
                <tr>
                  <td>
                    <strong>Năm phát hành</strong>
                  </td>
                  <td>2023</td>
                </tr>
                <tr>
                  <td>
                    <strong>Nhóm hương</strong>
                  </td>
                  <td>Hương quả mâm xôi, Hương hoa mộc lan, Hương trái dừa</td>
                </tr>
                <tr>
                  <td>
                    <strong>Phong cách</strong>
                  </td>
                  <td>Tươi mới, Thanh lịch, Tinh tế</td>
                </tr>
                <tr>
                  <td>
                    <strong>Hương đầu</strong>
                  </td>
                  <td>Quả mâm xôi, Dừa</td>
                </tr>
                <tr>
                  <td>
                    <strong>Hương giữa</strong>
                  </td>
                  <td>Hoa mộc lan, Hoa nhài, Xô thơm</td>
                </tr>
                <tr>
                  <td>
                    <strong>Hương cuối</strong>
                  </td>
                  <td>Xạ hương, Hoắc hương, Hương gỗ</td>
                </tr>
                <tr>
                  <td>
                    <strong>Mô tả</strong>
                  </td>
                  <td>123456789</td>
                </tr>
              </tbody>
            </table>
          </CustomTabPanel>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <div className="row ms-2 mt-2">
            <h4>Cách sử dụng được namperfume đề xuất dành cho bạn:</h4>
            <ul>
              <li>
                Nước hoa mang lại mùi hương cho cơ thể bạn thông qua việc tiếp
                xúc lên da và phản ứng với hơi ấm trên cơ thể của bạn. Việc được
                tiếp xúc với các bộ phận như cổ tay, khuỷu tay, sau tai, gáy, cổ
                trước là những vị trí được ưu tiên hàng đầu trong việc sử dụng
                nước hoa bởi sự kín đáo và thuận lợi trong việc tỏa mùi hương.
              </li>
              <li>
                Sau khi sử dụng, xịt nước hoa lên cơ thể, tránh dùng tay chà xát
                hoặc làm khô da bằng những vật dụng khác, điều này phá vỡ các
                tầng hương trong nước hoa, khiến nó có thể thay đổi mùi hương
                hoặc bay mùi nhanh hơn. Để chai nước hoa cách vị trí cần dùng
                nước hoa trong khoảng 15-20cm và xịt mạnh, dứt khoát để mật đổ
                phủ của nước hoa được rộng nhất, tăng độ bám tỏa trên da của
                bạn.
              </li>
              <li>
                Phần cổ tay được xịt nước hoa thường có nhiều tác động như lúc
                rửa tay, đeo vòng, đồng hồ, do đó để đảm bảo mùi hương được duy
                trì, bạn nên sử dụng nước hoa ở cổ tay ở tần suất nhiều hơn lúc
                cần thiết.
              </li>
              <li>
                Nước hoa có thể bám tốt hay không tốt tùy thuộc vào thời gian,
                không gian, cơ địa, chế độ sinh hoạt, ăn uống của bạn, việc sử
                dụng một loại nước hoa trong thời gian dài có thể khiến bạn bị
                quen mùi, dẫn đến hiện tượng không nhận biết được mùi hương.
                Mang theo nước hoa bên mình hoặc trang bị những mẫu mini tiện
                dụng để giúp bản thân luôn tự tin mọi lúc mọi nơi.
              </li>
            </ul>
          </div>
          <div className="row ms-2 mt-2">
            <h4>Bảo quản nước hoa:</h4>
            <ul>
              <li>
                Nước hoa phổ thông (Designer) thường không có hạn sử dụng, ở một
                số Quốc gia, việc ghi chú hạn sử dụng là điều bắt buộc để hàng
                hóa được bán ra trên thị trường. Hạn sử dụng ở một số dòng nước
                hoa được chú thích từ 24 đến 36 tháng, và tính từ ngày bạn mở
                sản phẩm và sử dụng lần đầu tiên.
              </li>
              <li>
                Nước hoa là tổng hợp của nhiều thành phần hương liệu tự nhiên và
                tổng hợp, nên bảo quản nước hoa ở những nơi khô thoáng, mát mẻ,
                tránh nắng, nóng hoặc quá lạnh, lưu ý không để nước hoa trong
                cốp xe, những nơi có nhiệt độ nóng lạnh thất thường...
              </li>
            </ul>
          </div>
        </CustomTabPanel>
        
        <CustomTabPanel value={value} index={2}>
          <div className="row review">
            <div className="review-part1 d-flex align-items-center mb-3">
              <h4 className="mb-0">Đánh giá và nhận xét (3)</h4>
              <Button className="" onClick={viewProductModal}>
                <FaPencil />
                Viết đánh giá 
              </Button>
            </div>
            <div className="row review-part2 mt-3 mb-3 ms-2">
              <div className="col-3 d-flex align-items-center flex-column justify-content-center">
                <h1>
                  5.0
                  <FaStar />
                </h1>
                <h6>3 lượt đánh giá</h6>
              </div>
              <div className="col-9 rating-bar">
                <RatingBar />
              </div>
            </div>
            <div className="review-part3 mt-3 mb-3 ms-2 d-flex flex-column">
              <div className="d-flex align-items-center">
                <h3>Hình ảnh thực tế</h3>
                <Button className="ms-auto">
                  Xem tất cả hình ảnh
                  <FaAngleRight />
                </Button>
              </div>
              <div className="review-picture mt-3">Hình ảnh</div>
            </div>
            <div className="row review-part4 mt-3 mb-3 ms-2">
              <div className="review-fliter">
                <FilterReview />
              </div>
              <div className="customer-review mt-3 d-flex flex-column">
                <div className="d-flex align-items-center">
                  <img src="" alt="" />
                  <h5>Ten nguoi dung</h5>
                </div>
                <div className="time-review">time</div>
                <div className="mt-2">San pham dung rat tot</div>
                <div className="mt-2 mb-2 ">anh</div>
                <div className="like-review">
                  <AiOutlineLike />
                  Hữu ích (0)
                </div>
              </div>
              <Button className="">
                Xem thêm
                <FaAngleDown />
              </Button>
            </div>
          </div>
        </CustomTabPanel>
      </div>
      {isOpenProductModal && <ReviewModal open={isOpenProductModal} closeProductModal={closeProductModal} />}
    </div>
  );
};

export default TabContentPD;
