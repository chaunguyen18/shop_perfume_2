import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";

const Authentication = () => {
  return (
    <div className="container mb-4">
      <div className="auth d-flex vh-100 flex-column justify-content-center align-items-center">
        <div className="auth-data">
        <h1>Xác thực đăng nhập/đăng ký</h1>
        <div className=" d-flex flex-column justify-content-center">
          <input type="text" placeholder="Nhập username hoặc số điện thoại..." />          
          <Button className="sendBtn">Gửi</Button>
          <input type="text" placeholder="Nhập mã OTP vào đây..." />
          <div className="d-flex mt-3 justify-content-center">
            <Link to="../"><FaLongArrowAltLeft />Trở về trang đăng nhập</Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
