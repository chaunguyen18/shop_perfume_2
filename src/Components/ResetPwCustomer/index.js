import React, { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPwCustomer = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleUpdatePassword = async () => {
    if (!oldPassword || !newPassword) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
  
    try {
      const res = await axios.put(`http://localhost:5000/api/account/update-password/${userId}`, {
        oldPassword,
        newPassword,
      });
  
      
      toast.success(res.data.message);
  
      
      setTimeout(() => {
        localStorage.removeItem("userId");
        navigate("/");
      }, 2000); 
    } catch (error) {
      toast.error(error.response?.data?.error || "Lỗi cập nhật mật khẩu!");
    }
  };
  

  return (
    <div className="container mt-3 p-4 border rounded bg-white reset-pw-cus">
      <h3>Đổi mật khẩu</h3>
      <input
        type="password"
        placeholder="Mật khẩu cũ"
        className="form-control mb-2"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mật khẩu mới"
        className="form-control mb-2"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Button className="updateBtn" onClick={handleUpdatePassword}>
        Cập nhật
      </Button>
    </div>
  );
};

export default ResetPwCustomer;
