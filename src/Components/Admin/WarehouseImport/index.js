import axios from "axios";
import React, { useEffect, useState } from "react";

const WarehouseImport = () => {
  const [phieunhap, setPhieuNhap] = useState([]);
  const [selectedPN, setSelectedPN] = useState("null");
  const [newPNNgay, setNewPNNgay] = useState("");
  const [newPNThanhTien, setNewPNThanhTien] = useState("");
  const [newNCC, setNewNCC] = useState("");
  const [newSPTen, setNewSPTen] = useState("");
  const [newCTPNSL, setNewCTPNSL] = useState("");
  const [newCTPNDG, setNewCTPNDG] = useState("");
  const [newCTPNThue, setNewCTPNThue] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    fetchWHImportData();
  }, []);

  const fetchWHImportData = () => {
    axios
      .get("http://localhost:5000/api/warehouse-import")
      .then((response) => setPhieuNhap(response.data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="whimport ">
          <div className="whimport-header">
            <h2>Danh sách phiếu nhập</h2>
          </div>
          <div className="whimport-content ">
            <button
              className="btn btn-success mx-2"
              onClick={() => {setShowAddModal("add");
              }}
            >
              Thêm phiếu nhập
            </button>
            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th style={{ width: "50px" }}>Mã phiếu</th>
                  <th>Ngày lập</th>
                  <th>Thành tiền</th>
                  <th>Nhà cung cấp</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {phieunhap.length > 0 ? (
                  phieunhap.map((index) => (
                    <tr key={index.PN_ID}>
                      <td style={{ width: "50px" }}>{index.PN_ID}</td>
                      <td>{index.PN_NGAY}</td>
                      <td>
                        {new Date(index.KH_NGAYSINH).toLocaleDateString(
                          "vi-VN"
                        )}
                      </td>
                      <td>{index.PN_THANHTIEN}</td>
                      <td>{index.NCC_TEN}</td>
                      <td>
                        <button
                          className="btn btn-warning mx-2"
                          onClick={() => {
                            setSelectedPN(index);

                            setShowUpdateModal("edit");
                          }}
                        >
                          Cập nhật
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">
                      Không có dữ liệu
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseImport;
