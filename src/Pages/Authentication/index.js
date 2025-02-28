import { Button } from "@mui/material";
import React from "react";

const Authentication = () => {
  return (
    <div className="container mb-4">
      <div className="auth d-flex justify-content-center flex-column align-items-center">
        <h1>Xác thực đăng nhập/đăng ký</h1>
        <div className="auth-data d-flex flex-column">
          <input type="text" placeholder="Nhập mã OTP vào đây..." />
          <Button className="sendBtn">Gửi</Button>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
