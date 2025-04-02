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
            <h2 className="text-align-center">Danh sách phiếu nhập</h2>
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
                     
                      <td>
                        {new Date(index.PN_NGAY).toLocaleDateString(
                          "vi-VN"
                        )}
                      </td>
                      <td>{index.PN_THANHTIEN.toLocaleString("vi-VN")}</td>
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

      {/* {showAddModal && (
        <div className="modal fade show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thêm số lượng sản phẩm</h5>
                
              </div>
              <div className="modal-body">
                <p>
                  Sản phẩm: <strong>{selectedProduct?.SP_TEN}</strong>
                </p>
                <input
                  type="number"
                  className="form-control"
                  value={newQuantity}
                  onChange={(e) =>
                    setNewQuantity(parseInt(e.target.value) || 0)
                  }
                  placeholder="Nhập số lượng muốn thêm"
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Hủy
                </button>
                <button className="btn btn-primary" onClick={handleAddQuantity}>
                  Thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showUpdateModal && (
        <div className="modal fade show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Cập nhật số lượng sản phẩm</h5>
                
              </div>
              <div className="modal-body">
                <p>
                  Sản phẩm: <strong>{selectedProduct?.SP_TEN}</strong>
                </p>
                <input
                  type="number"
                  className="form-control"
                  value={newQuantity}
                  onChange={(e) =>
                    setNewQuantity(parseInt(e.target.value) || 0)
                  }
                  placeholder="Nhập số lượng muốn cập nhật"
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowUpdateModal(false)}
                >
                  Hủy
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleUpdateQuantity}
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default WarehouseImport;
