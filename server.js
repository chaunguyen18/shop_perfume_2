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

// app.get("/api/cart", (req, res) => {
//   const sql = `
//     SELECT 
//       sp.SP_MA, sp.SP_TEN, sp.LSP_MA, sp.SP_DIENGIAI, 
//       dg.DG_GIANIEMYET, br.BRAND_TEN, 
//       kh.KH_MA, kh.KH_HOTEN, kh.KH_SDT, kh.KH_DIACHI
//     FROM sanpham sp
//     LEFT JOIN hinhanh ha ON sp.SP_MA = ha.SP_MA 
//     LEFT JOIN dongia dg ON sp.SP_MA = dg.SP_MA 
//     LEFT JOIN brand br ON sp.BRAND_ID = br.BRAND_ID
//     LEFT JOIN donhang dh ON sp.DH = dh.DH_ID
//     LEFT JOIN chitietdh ctdh ON chitietdh.SP_MA = dh.SP_MA
//     LEFT JOIN khachhang kh ON dh.KH_MA = kh.KH_MA
//     GROUP BY sp.SP_MA, kh.KH_MA
//   `;

//   db.query(sql, (err, results) => {
//     if (err) {
//       res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
//     } else {
//       res.json(results);
//     }
//   });
// });


/* API đặt hàng */

// app.post("/payment", (req, res) => {
//   const { KH_MA, DH_THANHTIEN, cartItems } = req.body;

//   // Lấy HD_MA lớn nhất hiện có trong bảng hoadon
//   const getMaxDHIDQuery = `SELECT MAX(DH_ID) AS maxDHID FROM donhang`;

//   db.query(getMaxDHIDQuery, (err, result) => {
//     if (err) {
//       console.error("Lỗi khi lấy DH_ID lớn nhất:", err);
//       return res.status(500).send("Lỗi máy chủ nội bộ");
//     }

    
//     const currentMaxDHID = result[0].maxDHID;
//     let newDHID;
//     if (!currentMaxDHID) {
//       newDHID = "DH001";
//     } else {
//       const currentNumber = parseInt(currentMaxDHID.slice(2));
//       newDHID = `DH${(currentNumber + 1).toString().padStart(3, "0")}`;
//     }

    
//     const DH_NGAYLAP = new Date(); 
//     const DH_GIOLAP = new Date().toLocaleTimeString("vi-VN"); 

//     const invoiceQuery = `
//       INSERT INTO donhang (DH_MA, DH_NGAYLAP, DH_GIOLAP DH_THANHTIEN, KH_MA) VALUES (?, ?, ?, ?)`;

//     db.query(
//       invoiceQuery,
//       [newDHID, DH_NGAYLAP, DH_GIOLAP, DH_THANHTIEN, KH_MA],
//       (err) => {
//         if (err) {
//           console.error("Lỗi khi tạo hóa đơn:", err);
//           return res.status(500).send("Lỗi máy chủ nội bộ");
//         }

 
//         const DH_ID = newDHID;

    
//         const detailsQuery = `
//         INSERT INTO chitietdh (DH_ID, SP_MA, CTDH_DVT, CTDH_SOLUONG, CTDH_DONGIA) VALUES ?`;

     
//         const values = cartItems.map((item) => [
//           DH_ID, 
//           item.SP_MA,
//           item.CTDH_DVT,
//           item.CTDH_SOLUONG,
//           item.CTDH_DONGIA,
//         ]);

//         db.query(detailsQuery, [values], (err) => {
//           if (err) {
//             console.error("Lỗi khi chèn chi tiết hóa đơn:", err);
//             return res.status(500).send("Lỗi máy chủ nội bộ");
//           }
//           const updateProductQuantityQuery = `
//           UPDATE chitietsp 
//           SET CTSP_SOLUONG = CTSP_SOLUONG - ?
//           WHERE SP_MA = ? AND CTSP_SOLUONG >= ?`;

//         const updatePromises = cartItems.map((item) => {
//           return new Promise((resolve, reject) => {
//             db.query(
//               updateProductQuantityQuery,
//               [item.CTDH_SOLUONG, item.SP_MA, item.CTDH_SOLUONG],
//               (err, result) => {
//                 if (err) {
//                   console.error(
//                     `Lỗi khi cập nhật số lượng chi tiết sản phẩm (${item.SP_MA}):`,
//                     err
//                   );
//                   return reject(err);
//                 }

//                 if (result.affectedRows === 0) {
//                   return reject(
//                     `Sản phẩm ${item.SP_MA} không đủ số lượng trong kho chi tiết`
//                   );
//                 }

//                 resolve();
//               }
//             );
//           });
//         });

//           res.status(201).send("Hóa đơn đã được tạo thành công");
//         });
//       }
//     );
//   });
// });

// CHẠY SERVER

app.listen(5000, () => {
  console.log("Server chạy trên cổng 5000");
});
