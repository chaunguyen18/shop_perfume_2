import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { MdSms } from "react-icons/md";
import axios from "axios";

const Register = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/register", { name: username, password });
      
      if (response.data.success) {
        alert("Đăng ký thành công! Đang chuyển hướng...");
        navigate("/"); 
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Lỗi hệ thống! Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="container register mt-3 ">
      <div className="d-flex flex-column p-4 border rounded bg-white">
        <h1>Đăng ký</h1>
        <div className="register-data d-flex flex-column align-items-center">
          <img
            src="https://i.pinimg.com/736x/3c/ae/07/3cae079ca0b9e55ec6bfc1b358c9b1e2.jpg"
            alt="login-ava"
            className="rounded-circle mb-3"
            style={{ width: "120px", height: "120px" }}
          />
          <input type="text" placeholder="Username" value={username}
            onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button className="registerBtn" onClick={handleRegister}>Đăng ký</Button>
        <div className="register-link d-flex">
          <Link to="../">Đã có tài khoản?</Link>
        </div>
        <div className="register-other">
                  <Button>
                    <FaFacebookF />
                  </Button>
                  <Button>
                  <FaGoogle />
                  </Button>
                  <Button>
                    <Link to="../authentication"><MdSms /></Link>
                  </Button>
                </div>
      </div>
    </div>
  );
};

export default Register;
