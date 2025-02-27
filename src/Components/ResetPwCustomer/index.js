import React from "react";
import { Button } from "@mui/material";

const ResetPwCustomer = () => {
  return (
    <div className="container mt-3 p-4 border rounded bg-white reset-pw-cus">
      <h3>Đổi mật khẩu</h3>
      <input
        type="password"
        placeholder="Mật khẩu cũ"
        className="form-control mb-2"
      />
      <input
        type="password"
        placeholder="Mật khẩu mới"
        className="form-control mb-2"
      />
      <Button className="updateBtn">Cập nhật</Button>
    </div>
  );
};

export default ResetPwCustomer;
