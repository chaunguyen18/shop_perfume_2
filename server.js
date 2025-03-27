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
      loaisp.LSP_TEN, ctsp.CTSP_SOLUONG,
      GROUP_CONCAT(hinhanh.HA_PATH ORDER BY hinhanh.HA_MA SEPARATOR '|') AS HA_PATHS 
      FROM sanpham 
      LEFT JOIN hinhanh ON sanpham.SP_MA = hinhanh.SP_MA 
      LEFT JOIN dongia ON sanpham.SP_MA = dongia.SP_MA 
      LEFT JOIN brand ON sanpham.BRAND_ID = brand.BRAND_ID 
      LEFT JOIN loaisp ON sanpham.LSP_MA = loaisp.LSP_MA
      LEFT JOIN chitietsp ctsp ON sanpham.SP_MA = ctsp.SP_MA
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

/* API LẤY DANH SÁCH SẢN PHẨM THEO LOẠI TRONG MODAL */

app.get("/api/cat/:id", async (req, res) => {
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
      dongia.DG_GIANIEMYET, brand.BRAND_TEN
      
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


app.get("/api/cart/:KH_MA", (req, res) => {
  const { KH_MA } = req.params;
  const sql = `
    SELECT 
      gh.SP_MA, 
      sp.SP_TEN, 
      sp.SP_DVT, 
      sp.SP_GIA, 
      gh.SOLUONG, 
      (sp.SP_GIA * gh.SOLUONG) AS THANH_TIEN
    FROM giohang gh
    JOIN sanpham sp ON gh.SP_MA = sp.SP_MA
    WHERE gh.KH_MA = ?
  `;

  db.query(sql, [KH_MA], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Lỗi lấy giỏ hàng" });
    } else {
      // Tính tổng tiền của giỏ hàng
      const tongTien = results.reduce((sum, item) => sum + item.THANH_TIEN, 0);
      res.json({ items: results, tongTien });
    }
  });
});



/* API đặt hàng */

app.post("/api/order", (req, res) => {
  const { KH_MA, cart, totalPrice, paymentMethod } = req.body;

  if (!KH_MA || !cart || cart.length === 0) {
    return res.status(400).json({ error: "Dữ liệu đơn hàng không hợp lệ!" });
  }

  // Lấy ID trạng thái "Chờ xác nhận"
  const TT_ID_DEFAULT = 1; 

  const sqlDonHang = `INSERT INTO donhang (KH_MA, DH_TONGTIEN, DH_NGAYDAT, TT_ID, DH_THANHTOAN) VALUES (?, ?, NOW(), ?, ?)`;

  db.query(sqlDonHang, [KH_MA, totalPrice, TT_ID_DEFAULT, paymentMethod], (err, result) => {
    if (err) return res.status(500).json({ error: "Lỗi khi tạo đơn hàng!" });

    const DH_ID = result.insertId;

    const sqlChiTietDH = `INSERT INTO chitietdh (DH_ID, SP_MA, CT_SOLUONG, CT_GIA) VALUES ?`;
    const values = cart.map((item) => [DH_ID, item.product.SP_MA, item.quantity, item.product.DG_GIANIEMYET]);

    db.query(sqlChiTietDH, [values], (err) => {
      if (err) return res.status(500).json({ error: "Lỗi khi lưu chi tiết đơn hàng!" });

      db.query(`DELETE FROM giohang WHERE KH_MA = ?`, [KH_MA], (err) => {
        if (err) console.error("Lỗi khi xóa giỏ hàng:", err);
        res.json({ message: "Đặt hàng thành công!", DH_ID });
      });
    });
  });
});


// CHẠY SERVER

app.listen(5000, () => {
  console.log("Server chạy trên cổng 5000");
});
