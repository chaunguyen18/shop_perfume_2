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

/* API thanh toán */

app.get("/api/checkout/:id", (req, res) => {
  const { id } = req.params;
  const sql =
    "SELECT KH_HOTEN, KH_SDT, KH_DIACHI FROM khachhang WHERE KH_MA = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn cơ sở dữ liệu:", err);
      return res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy khách hàng" });
    }

    res.json(results[0]); // Trả về một object thay vì array
  });
});

/* API đặt hàng */

app.post("/api/checkout", async (req, res) => {
  const { KH_MA, cart, PTTT_ID } = req.body;

  if (!KH_MA || !cart || cart.length === 0 || !PTTT_ID) {
    return res.status(400).json({ error: "Thông tin đơn hàng không hợp lệ" });
  }

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // 1️⃣ Tạo đơn hàng mới
    const [orderResult] = await conn.query(
      "INSERT INTO donhang (KH_MA, DH_NGAYLAP, DH_GIOLAP, DH_THANHTIEN, TT_ID, PTTT_ID) VALUES (?, NOW(), NOW(), ?, 1, ?)",
      [KH_MA, totalPrice, PTTT_ID]
    );
    const DH_ID = orderResult.insertId;

    // 2️⃣ Thêm chi tiết đơn hàng
    const orderDetails = cart.map((item) => [
      DH_ID,
      item.SP_MA,
      item.size,
      item.quantity,
      item.price,
    ]);

    await conn.query(
      "INSERT INTO chitietdh (DH_ID, SP_MA, CTDH_DVT, CTDH_SOLUONG, CTDH_DONGIA) VALUES ?",
      [orderDetails]
    );

    await conn.commit();
    res.status(201).json({ message: "Đặt hàng thành công!", DH_ID });
  } catch (error) {
    await conn.rollback();
    console.error("Lỗi đặt hàng:", error);
    res.status(500).json({ error: "Lỗi đặt hàng", details: error.message });
  } finally {
    conn.release();
  }
});

// ADMIN

/* API DANH SÁCH LOẠI SẢN PHẨM */
app.get("/api/type-product", (req, res) => {
  const sql = "SELECT * FROM loaisp";

  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
    } else {
      res.json(results);
    }
  });
});

app.post("/api/type-product", (req, res) => {
  const { LSP_MA, LSP_TEN } = req.body;
  const sql = "INSERT INTO loaisp (LSP_MA, LSP_TEN) VALUES (?, ?)";
  db.query(sql, [LSP_MA, LSP_TEN], (err, results) => {
    if (err)
      return res.status(500).json({ error: "Lỗi khi thêm loại sản phẩm" });
    res.json({ message: "Thêm thành công" });
  });
});

app.get("/api/type-product/max-code", (req, res) => {
  const sql = "SELECT MAX(LSP_MA) as maxCode FROM loaisp";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Lỗi lấy mã loại" });

    const maxCode = results[0].maxCode || "L000";
    res.json({ maxCode });
  });
});

app.delete("/api/type-product/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM loaisp WHERE LSP_MA = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Lỗi khi xóa:", err);
      return res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Loại sản phẩm không tồn tại!" });
    }

    res.json({ message: "Xóa thành công!", data: results });
  });
});

app.put("/api/type-product/:id", (req, res) => {
  const { id } = req.params;
  const { LSP_TEN } = req.body;

  if (!LSP_TEN) {
    return res
      .status(400)
      .json({ error: "Vui lòng nhập tên loại sản phẩm mới!" });
  }

  const sql = "UPDATE loaisp SET LSP_TEN = ? WHERE LSP_MA = ?";

  db.query(sql, [LSP_TEN, id], (err, results) => {
    if (err) {
      console.error("Lỗi cập nhật:", err);
      return res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Loại sản phẩm không tồn tại!" });
    }

    res.json({ message: "Cập nhật thành công!", data: results });
  });
});

/* API DANH SÁCH SẢN PHẨM */

app.get("/api/product-management/max-code", (req, res) => {
  const sql = "SELECT MAX(SP_MA) as maxCode FROM sanpham";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Lỗi lấy mã loại" });

    const maxCode = results[0].maxCode || "SP00";
    res.json({ maxCode });
  });
});

app.get("/api/product-management", (req, res) => {
  const sql = `
     
      SELECT 
      sp.SP_MA, sp.SP_TEN, sp.SP_DIENGIAI, 
      dg.DG_GIANIEMYET, brand.BRAND_TEN, 
      lsp.LSP_TEN,
      GROUP_CONCAT(ha.HA_PATH ORDER BY ha.HA_MA SEPARATOR '|') AS HA_PATHS 
    FROM sanpham sp 
    LEFT JOIN hinhanh ha ON sp.SP_MA = ha.SP_MA 
    LEFT JOIN dongia dg ON sp.SP_MA = dg.SP_MA 
    LEFT JOIN brand ON sp.BRAND_ID = brand.BRAND_ID 
    LEFT JOIN loaisp lsp ON sp.LSP_MA = lsp.LSP_MA
    GROUP BY sp.SP_MA
  `;

  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
    } else {
      res.json(results);
    }
  });
});

app.put("/api/product-management/:id", (req, res) => {
  const { id } = req.params;
  const { SP_TEN, LSP_TEN, BRAND_TEN, DG_GIANIEMYET, SP_DIENGIAI } = req.body;

  const sql = `
    UPDATE sp
    SET SP_TEN = ?, LSP_MA = (SELECT LSP_MA FROM lsp WHERE LSP_TEN = ?), 
        BRAND_ID = (SELECT BRAND_ID FROM brand WHERE BRAND_TEN = ?), 
        DG_GIANIEMYET = ?, SP_DIENGIAI = ?
    WHERE SP_MA = ?
  `;

  db.query(
    sql,
    [SP_TEN, LSP_TEN, BRAND_TEN, DG_GIANIEMYET, SP_DIENGIAI, id],
    (err, results) => {
      if (err) {
        console.error("Lỗi cập nhật:", err);
        return res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Sản phẩm không tồn tại!" });
      }

      res.json({ message: "Cập nhật sản phẩm thành công!", data: results });
    }
  );
});

/* API KHO */

app.get("/api/storage", (req, res) => {
  const sql = `
    SELECT 
      sp.SP_MA,
      sp.SP_TEN,
      ctsp.CTSP_SOLUONG
      FROM sanpham sp
      LEFT JOIN chitietsp ctsp ON sp.SP_MA = ctsp.SP_MA
  `;

  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
    } else {
      res.json(results);
    }
  });
});

app.put("/api/storage/:id", (req, res) => {
  const { id } = req.params;
  const { CTSP_SOLUONG } = req.body;

  if (!CTSP_SOLUONG || CTSP_SOLUONG <= 0) {
    return res.status(400).json({ error: "Số lượng phải lớn hơn 0!" });
  }

  const sql =
    "UPDATE chitietsp SET CTSP_SOLUONG = CTSP_SOLUONG + ? WHERE SP_MA = ?";

  db.query(sql, [CTSP_SOLUONG, id], (err, results) => {
    if (err) {
      console.error("Lỗi cập nhật:", err);
      return res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
    }

    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Sản phẩm không tồn tại trong kho!" });
    }

    res.json({ message: `Đã thêm ${CTSP_SOLUONG} sản phẩm vào kho!` });
  });
});

app.put("/api/storage/update/:id", (req, res) => {
  const { id } = req.params;
  const { CTSP_SOLUONG } = req.body;

  if (!CTSP_SOLUONG || CTSP_SOLUONG <= 0) {
    return res.status(400).json({ error: "Số lượng phải lớn hơn 0!" });
  }

  const sql = "UPDATE chitietsp SET CTSP_SOLUONG = ? WHERE SP_MA = ?";

  db.query(sql, [CTSP_SOLUONG, id], (err, results) => {
    if (err) {
      console.error("Lỗi cập nhật:", err);
      return res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
    }

    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Sản phẩm không tồn tại trong kho!" });
    }

    res.json({ message: `Đã cập nhật ${CTSP_SOLUONG} sản phẩm vào kho!` });
  });
});

/* API CLIENT */

app.get("/api/client", (req, res) => {
  const sql = `
    SELECT 
      khachhang.KH_MA,
      khachhang.KH_SDT,
      khachhang.KH_GIOI,
      khachhang.KH_HOTEN,
      khachhang.KH_DIACHI,
      khachhang.KH_NGAYSINH,
      login.role
    FROM login
    LEFT JOIN khachhang ON khachhang.KH_MA = login.KH_MA
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy khách hàng nào!" });
    }
    res.json(results);
  });
});

app.put("/api/client/:id", (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({ error: "Vui lòng nhập thông tin mới!" });
  }

  const sql = "UPDATE login SET role = ? WHERE KH_MA = ?";

  db.query(sql, [role, id], (err, results) => {
    if (err) {
      console.error("Lỗi cập nhật:", err);
      return res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Khách hàng không tồn tại!" });
    }

    res.json({ message: "Cập nhật thành công!", data: results });
  });
});

// CHẠY SERVER

app.listen(5000, () => {
  console.log("Server chạy trên cổng 5000");
});
