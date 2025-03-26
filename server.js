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
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng nhập đầy đủ thông tin!" });
  }

  const sql = "INSERT INTO login (NAME, PASSWORD, role) VALUES (?, ?, ?)";
  db.query(sql, [name, password, role], (err, result) => {
    if (err) {
      console.error("Lỗi đăng ký:", err);
      return res
        .status(500)
        .json({ success: false, message: "Đăng ký thất bại!" });
    }
    res.status(201).json({ success: true, message: "Đăng ký thành công!" });
  });
});

/* API LẤY DANH SÁCH SẢN PHẨM */

app.get("/api/product", (req, res) => {
  const sql = `
    SELECT 
      sanpham.SP_MA, 
      sanpham.SP_TEN, 
      sanpham.LSP_MA, 
      sanpham.SP_DIENGIAI, 
      MIN(sanpham.SP_DIENGIAI) AS image, 
      dongia.DG_GIANIEMYET,
      brand.BRAND_TEN
    FROM sanpham
    LEFT JOIN hinhanh ON sanpham.SP_MA = hinhanh.SP_MA
    LEFT JOIN dongia ON sanpham.SP_MA = dongia.SP_MA
    LEFT JOIN brand ON sanpham.BRAND_ID = brand.BRAND_ID
    GROUP BY sanpham.SP_MA
  `;

  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
    } else {
      res.json(results);
    }
  });
});

/* API LẤY DANH SÁCH SẢN PHẨM THEO LOẠI */

app.get("/api/product/:id", async (req, res) => {
  const productId = req.params.id;
  const query = `SELECT 
      sanpham.SP_MA, sanpham.SP_TEN, sanpham.LSP_MA, sanpham.SP_DIENGIAI, 
      dongia.DG_GIANIEMYET, brand.BRAND_TEN, 
      loaisp.LSP_TEN,
      GROUP_CONCAT(hinhanh.HA_PATH ORDER BY hinhanh.HA_MA SEPARATOR '|') AS HA_PATHS 
      FROM sanpham 
      LEFT JOIN hinhanh ON sanpham.SP_MA = hinhanh.SP_MA 
      LEFT JOIN dongia ON sanpham.SP_MA = dongia.SP_MA 
      LEFT JOIN brand ON sanpham.BRAND_ID = brand.BRAND_ID 
      LEFT JOIN loaisp ON sanpham.LSP_MA = loaisp.LSP_MA
      WHERE sanpham.SP_MA = ? 
      GROUP BY sanpham.SP_MA`;

  db.query(query, [productId], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      if (result.length > 0) {
          let product = result[0];
          product.HA_PATHS = product.HA_PATHS ? product.HA_PATHS.split("|") : []; 
          res.json(product);
      } else {
          res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      }
  });
});

/* API render ra giỏ hàng */

app.get("/api/cart", (req, res) => {
  const sql = `
    SELECT 
      sanpham.SP_MA, sanpham.SP_TEN, sanpham.LSP_MA, sanpham.SP_DIENGIAI, 
      dongia.DG_GIANIEMYET, brand.BRAND_TEN, 
      GROUP_CONCAT(hinhanh.HA_PATH ORDER BY hinhanh.HA_MA SEPARATOR '|') AS HA_PATHS 
      FROM sanpham 
      LEFT JOIN hinhanh ON sanpham.SP_MA = hinhanh.SP_MA 
      LEFT JOIN dongia ON sanpham.SP_MA = dongia.SP_MA 
      LEFT JOIN brand ON sanpham.BRAND_ID = brand.BRAND_ID 
      WHERE sanpham.SP_MA = ? 
      GROUP BY sanpham.SP_MA
  `;

  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
    } else {
      res.json(results);
    }
  });
});


// CHẠY SERVER

app.listen(5000, () => {
  console.log("Server chạy trên cổng 5000");
});
