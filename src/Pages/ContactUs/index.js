import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    subject: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Dữ liệu form:", formData);
  };

  return (
    <div className="mt-3 mb-3 container contact">
      <div className="d-flex flex-column">
        <h1>Liên Hệ</h1>
        <div className="contact-infor mt-2 row d-flex flex-nowrap">
          <div className="col-md-4">
            <b>Hotline</b>
            <p>
              Gọi ngay tới tổng đài chăm sóc khách hàng của chúng tôi 1900 xxxx
              (9h – 21h) 7 ngày trong tuần nếu bạn cần bất cứ thông tin hay sự
              hỗ trợ nào từ FADE.
            </p>
          </div>
          <div className="col-md-4">
            <b>Fanpage</b>
            <p>
              Quý khách có thể like <a href="https://www.facebook.com/">facebook</a> để tham gia cộng
              đồng nước hoa với chúng tôi để theo dõi tốt nhất, nhanh nhất những
              chương trình khuyến mãi hấp dẫn cùng những sản phẩm mới, hot nhất
              nhé.
            </p>
          </div>
          <div className="col-md-4">
            <b>Email</b>
            <p>
              Gửi email tới địa chỉ fade@gmail.com để nhận được sự hỗ trợ từ
              FADE (email trả lời trong 24h).
            </p>
          </div>
        </div>
        <div className="contact-form mt-2 mb-2">
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Tiêu đề"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Họ và Tên"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Số điện thoại"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Nội dung"
              name="message"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
              margin="normal"
              required
            />
            <div className="d-flex justify-content-center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Gửi
            </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
