import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { MdSms } from "react-icons/md";


const Login = () => {
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
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
        </div>

        <Button className="loginBtn">Đăng nhập</Button>
        <div className="login-link d-flex">
          <Link to="../register">Quên mật khẩu</Link>
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
