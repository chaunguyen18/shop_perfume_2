import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { MdSms } from "react-icons/md";
import axios from "axios";


const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Dùng để chuyển hướng

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user)); // Lưu user vào localStorage

        if (res.data.user.role === "admin") {
          navigate("/admin-home"); // Chuyển đến trang admin
        } else {
          navigate("/customer-home"); // Chuyển đến trang customer
        }
      } else {
        alert("Sai tài khoản hoặc mật khẩu!");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <div className="container mt-3 login ">
      
      <div className="d-flex flex-column p-4 border rounded bg-white">
        <h1>Đăng nhập</h1>
        <div className="login-data d-flex flex-column align-items-center">
          <img
            src="https://i.pinimg.com/736x/3c/ae/07/3cae079ca0b9e55ec6bfc1b358c9b1e2.jpg"
            alt="login-ava"
            className="rounded-circle mb-3"
            style={{ width: "120px", height: "120px" }}
          />
          <input type="text" placeholder="Username" value={username}
            onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)}/>
        </div>

        <Button className="loginBtn" onClick={handleLogin}>Đăng nhập</Button>
        <div className="login-link d-flex">
          <Link to="../../authentication">Quên mật khẩu</Link>
          <Link to="../register" className="ms-auto">
            Bạn chưa có tài khoản?
          </Link>
        </div>
        <div className="login-other">
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

export default Login;
