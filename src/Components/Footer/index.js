import React from "react";
import { Link } from "react-router-dom";
import { IoMail } from "react-icons/io5";
import { Button } from "@mui/material";
import { FaPhone } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footerWrapper">
      <div className="container">
        <div className="row d-flex">
          <div className="newsLetter mb-3 col-md-6">
            <Link to="/">
              <h1>FADE</h1>
            </Link>
            <h4 className="text-white">Nơi mùi hương là bạn đồng hành</h4>
            <p className="text-light mb-1">
              Đăng ký nhận tin để nhận thông tin mới nhất từ FADE
            </p>
            <form className="mt-3 mb-3">
              <IoMail />
              <input type="email" placeholder="Email của bạn..." />
              <Button>Gửi</Button>
            </form>
            <p className="text-light mt-2">
              GỌI ĐẶT MUA: <FaPhone /> 1900 xxxx (9:00 - 21:00)
            </p>
          </div>
          <div className="footer-address col-md-6 p-3">
            <div className="row p-3">
              <div className="col-md-3">
                <h4>Địa chỉ</h4>
                <span className="mb-3 flex-column d-flex justify-content-left">Khu II DHCT</span>
              </div>
              <div className="col-md-3">
                <h4>Liên hệ</h4>
                <div className="flex-column d-flex justify-content-left">
                  <span>
                    <FaFacebook />
                    FADE
                  </span>
                  <span>
                    <FaInstagram />
                    FADE
                  </span>
                  <span className="mb-3">
                    <FaTiktok />
                    FADE
                  </span>
                </div>
              </div>
              <div className="col-md-6">
                <h4>Chính sách</h4>
                <div className="d-flex justify-content-left flex-column">
                  <Link to="/terms/chinh-sach-doi-tra">Chính sách đổi trả hàng</Link>
                  <Link to="/terms/chinh-sach-giao-hang">Chính sách giao hàng</Link>
                  <Link to="/terms/chinh-sach-khach-hang">Chính sách dành cho khách hàng</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-white mb-2">
          Copyright 2024-2025 © FADE. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
