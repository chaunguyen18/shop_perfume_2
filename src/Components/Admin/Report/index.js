import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Report = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [phieuNhap, setPhieuNhap] = useState([]);

  const fetchData = async () => {
    if (!selectedMonth) {
      alert("Vui lòng chọn tháng!");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/warehouse-import/${selectedMonth}`
      );
      setPhieuNhap(response.data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
  };

  const exportToExcel = () => {
    if (phieuNhap.length === 0) {
      alert("Không có dữ liệu để xuất!");
      return;
    }

    const today = new Date();
    const ngayXuat = today.toLocaleDateString("vi-VN");
    const gioXuat = today.toLocaleTimeString("vi-VN");

    let data = [
      [`BÁO CÁO THÁNG ${selectedMonth}`],
      [`Ngày xuất: ${ngayXuat}`],
      [`Giờ xuất: ${gioXuat}`],
      [],
      [
        "STT",
        "Mã phiếu nhập",
        "Nhà cung cấp",
        "Tên sản phẩm",
        "Số lượng",
        "Thuế (%)",
        "Đơn giá (VNĐ)",
        "Thành tiền (VNĐ)",
      ],
    ];

    let totalAmount = 0;
    phieuNhap.forEach((item, index) => {
      const thanhTien =
        item.CTPN_SOLUONG * item.CTPN_DONGIA * (1 + item.CTPN_THUE / 100);
      data.push([
        index + 1,
        item.PN_ID,
        item.NCC_TEN,
        item.SP_TEN,
        item.CTPN_SOLUONG,
        item.CTPN_THUE,
        item.CTPN_DONGIA.toLocaleString("vi-VN"),
        thanhTien.toLocaleString("vi-VN"),
      ]);
      totalAmount += thanhTien;
    });

    // Thêm dòng tổng tiền
    data.push([]);
    data.push([
      "",
      "",
      "",
      "",
      "",
      "",
      "Tổng tiền",
      totalAmount.toLocaleString("vi-VN"),
    ]);

    const ws = XLSX.utils.aoa_to_sheet(data);

    
    const wscols = [
      { wch: 5 }, 
      { wch: 15 },
      { wch: 20 }, 
      { wch: 20 }, 
      { wch: 10 }, 
      { wch: 10 }, 
      { wch: 15 }, 
      { wch: 15 }, 
    ];

    ws["!cols"] = wscols;

    const range = XLSX.utils.decode_range(ws["!ref"]);
    for (let row = range.s.r; row <= range.e.r; row++) {
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cell = ws[XLSX.utils.encode_cell({ r: row, c: col })];
        if (!cell) continue;
        cell.s = {
          border: {
            top: { style: "bold" },
            left: { style: "bold" },
            bottom: { style: "bold" },
            right: { style: "bold" },
          },
          alignment: {
            horizontal: "center",
            vertical: "center",
          },
        };
      }
    }

    const firstThreeRows = [0, 1, 2];
    firstThreeRows.forEach((rowIndex) => {
      for (let col = 0; col < data[rowIndex].length; col++) {
        const cell = ws[XLSX.utils.encode_cell({ r: rowIndex, c: col })];
        if (!cell) continue;
        cell.s = {
          alignment: {
            horizontal: "center",
            vertical: "center",
          },
        };
      }
    });



    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Báo cáo");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const excelFile = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(excelFile, `BaoCao_Thang_${selectedMonth}.xlsx`);
  };

  return (
    <div className="container mt-4">
      <h2>Báo cáo phiếu nhập</h2>
      <div className="d-flex">
        <select
          className="form-select w-25"
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">Chọn tháng</option>
          {[...Array(12).keys()].map((m) => (
            <option key={m + 1} value={m + 1}>
              Tháng {m + 1}
            </option>
          ))}
        </select>
        <button className="btn btn-primary mx-2" onClick={fetchData}>
          Lấy dữ liệu
        </button>
        <button className="btn btn-success" onClick={exportToExcel}>
          Xuất Excel
        </button>
      </div>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã phiếu nhập</th>
            <th>Nhà cung cấp</th>
            <th>Tên sản phẩm</th>
            <th>Số lượng</th>
            <th>Thuế (%)</th>
            <th>Đơn giá (VNĐ)</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {phieuNhap.length > 0 ? (
            phieuNhap.map((pn, index) => {
              const thanhTien =
                pn.CTPN_SOLUONG * pn.CTPN_DONGIA * (1 + pn.CTPN_THUE / 100);
              return (
                <tr key={pn.PN_ID}>
                  <td>{index + 1}</td>
                  <td>{pn.PN_ID}</td>
                  <td>{pn.NCC_TEN}</td>
                  <td>{pn.SP_TEN}</td>
                  <td>{pn.CTPN_SOLUONG}</td>
                  <td>{pn.CTPN_THUE}</td>
                  <td>{pn.CTPN_DONGIA.toLocaleString("vi-VN")}</td>
                  <td>{thanhTien.toLocaleString("vi-VN")}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
