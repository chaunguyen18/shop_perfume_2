import React, { useState, useEffect} from "react";
import {
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import userAvatar from "../../assets/images/user.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfileCustomer = () => {
  const [customer, setCustomer] = useState({
    KH_MA: "",
    KH_HOTEN: "",
    KH_TENDANGNHAP: "",
    email: "",
    KH_SDT: "",
    KH_GIOITINH: "male",
  });

  const navigate = useNavigate();

  const [gender, setGender] = useState("male");
  const [avatar, setAvatar] = useState(userAvatar);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatar(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const userId = localStorage.getItem("KH_MA"); 

  useEffect(() => {
    if (!userId) {
      toast.error("Vui lòng đăng nhập!");
      navigate("/");
      return;
    }

    const fetchCustomer = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/customer/${userId}`);
        setCustomer(res.data);
      } catch (error) {
        console.error("Lỗi lấy thông tin khách hàng:", error);
        toast.error("Không thể lấy thông tin khách hàng!");
      }
    };

    fetchCustomer();
  }, [userId, navigate]);


  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-2 p-4 border rounded bg-white">
      <h3>Hồ Sơ Của Tôi</h3>
      <p>Quản lý thông tin hồ sơ</p>     

      <div className="row">
        <div className="col-md-8 profile-content">
          <div className="mb-2">
            <label className="fw-bold mb-2">Tên đăng nhập:</label>
            <TextField fullWidth value={customer.KH_TENDANGNHAP} disabled />
          </div>
          <div className="mb-2">
            <label className="fw-bold mb-2">Họ và tên:</label>
            <TextField
              fullWidth
              name="KH_HOTEN"
              value={customer.KH_HOTEN}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label className="fw-bold mb-2">Email:</label>
            <TextField fullWidth value={customer.email} disabled />
          </div>
          <div className="mb-2">
            <label className="fw-bold mb-2">Số điện thoại:</label>
            <TextField
              fullWidth
              name="KH_SDT"
              value={customer.KH_SDT}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label className="fw-bold mb-2">Giới tính:</label>
            <FormControl>
              <RadioGroup
                row
                name="KH_GIOITINH"
                value={customer.KH_GIOITINH}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Nam"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Nữ"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Khác"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <Button>Lưu</Button>
        </div>
        <div className="col-md-4 text-center avatar-container">
          <img
            src={userAvatar}
            alt="Avatar"
            className="rounded-circle mb-3"
            style={{ width: "120px", height: "120px" }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: "none" }}
            id="upload-avatar"
          />
          <label htmlFor="upload-avatar">
            <Button variant="outlined" component="span" className="uploadBtn">
              Chọn Ảnh
            </Button>
          </label>
          <p className="text-muted mt-2">
            Dung lượng file tối đa 1MB, định dạng: JPEG, PNG
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCustomer;
