const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",   
  password: "",   
  database: "db_perfumeshop", 
});

// API ĐĂNG NHẬP

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM login WHERE NAME = ? AND PASSWORD = ?";
  
  db.query(sql, [username, password], (err, result) => {
    if (err) return res.json({ success: false, message: "Lỗi server!" });

    if (result.length > 0) {
      const user = result[0];
      res.json({ success: true, user });
    } else {
      res.json({ success: false, message: "Sai tài khoản hoặc mật khẩu!" });
    }
  });
});

// API ĐĂNG KÝ

app.post("/register", (req, res) => {
  const { name, password } = req.body;
  const role = "customer";

  if (!name || !password) {
    return res.status(400).json({ success: false, message: "Vui lòng nhập đầy đủ thông tin!" });
  }

  const sql = "INSERT INTO login (NAME, PASSWORD, role) VALUES (?, ?, ?)";
  db.query(sql, [name, password, role], (err, result) => {
    if (err) {
      console.error("Lỗi đăng ký:", err);
      return res.status(500).json({ success: false, message: "Đăng ký thất bại!" });
    }
    res.status(201).json({ success: true, message: "Đăng ký thành công!" });
  });
});

// CHẠY SERVER

app.listen(5000, () => {
  console.log("Server chạy trên cổng 5000");
});
