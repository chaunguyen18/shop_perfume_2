import React, { useState } from "react";
import {
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import userAvatar from "../../assets/images/user.jpg";

const ProfileCustomer = () => {
  const [name, setName] = useState("Nguyễn Văn A");
  const [username, setUsername] = useState("chau123");
  const [email, setEmail] = useState("nguyenvana@example.com");
  const [phone, setPhone] = useState("0123 456 789");
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

  return (
    <div className="container mt-2 p-4 border rounded bg-white">
      <h3>Hồ Sơ Của Tôi</h3>
      <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      <div className="row">
        {/* Thông tin cá nhân */}
        <div className="col-md-8 profile-content">
          <div className="mb-2">
            <label className="fw-bold mb-2">Tên đăng nhập:</label>
            <TextField
              fullWidth
              value={username}
              disabled
            />
          </div>
          <div className="mb-2">
            <label className="fw-bold mb-2">Họ và tên:</label>
            <TextField
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="fw-bold mb-2">Email:</label>
            <TextField fullWidth value={email} disabled />
          </div>
          <div className="mb-2">
            <label className="fw-bold mb-2">Số điện thoại:</label>
            <TextField
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="fw-bold mb-2">Giới tính:</label>
            <FormControl>
              <RadioGroup
                row
                value={gender}
                onChange={(e) => setGender(e.target.value)}
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
          <Button>
            Lưu
          </Button>
        </div>

        <div className="col-md-4 text-center avatar-container">
          <img
            src={avatar}
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
