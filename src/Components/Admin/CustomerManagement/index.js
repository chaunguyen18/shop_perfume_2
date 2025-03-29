import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerManagement = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [newClientRole, setNewClientRole] = useState("");
  const [showModal, setShowModal] = useState(null);

  useEffect(() => {
    fetchClientData();
  }, []);

  const fetchClientData = () => {
    axios
      .get("http://localhost:5000/api/client")
      .then((response) => setClients(response.data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
  };

  const handleEditClient = () => {
    if (!selectedClient || !newClientRole) {
      toast.error("Vui lòng chọn khách hàng và vai trò mới!");
      return;
    }
  
    axios
      .put(`http://localhost:5000/api/client/${selectedClient.KH_MA}`, {
        role: newClientRole,
      })
      .then(() => {
        setShowModal(null);
        fetchClientData();
        toast.success("Cập nhật vai trò thành công!");
      })
      .catch((error) => {
        console.error("Lỗi khi sửa:", error);
        toast.error("Cập nhật thất bại!");
      });
  };
  

  return (
    <div>
      <div className="container-fluid">
        <div className="customer-management">
          <div className="customer-management-header">
            <h2 className="customer-management-title text-center">
              Quản lý khách hàng
            </h2>
          </div>
          <div className="customer-management-content">
            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th style={{ width: "50px" }}>Mã KH</th>
                  <th>Tên khách hàng</th>
                  <th>Ngày sinh</th>
                  <th>Số điện thoại</th>
                  <th>Giới tính</th>
                  <th>Địa chỉ</th>
                  <th>Vai trò</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {clients.length > 0 ? (
                  clients.map((client) => (
                    <tr key={client.KH_MA}>
                      <td style={{ width: "50px" }}>{client.KH_MA}</td>
                      <td>{client.KH_HOTEN}</td>
                      <td>
                        {new Date(client.KH_NGAYSINH).toLocaleDateString(
                          "vi-VN"
                        )}
                      </td>
                      <td>{client.KH_SDT}</td>
                      <td>{client.KH_GIOI}</td>
                      <td>{client.KH_DIACHI}</td>
                      <td>{client.role}</td>
                      <td>
                        <button
                          className="btn btn-warning mx-2"
                          onClick={() => {
                            setSelectedClient(client);
                            setNewClientRole(client.role);
                            setShowModal("edit");
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

      {showModal === "edit" && (
        <div className="modal fade show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thay đổi vai trò</h5>
                <button className="close" onClick={() => setShowModal(null)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <label>Mã khách hàng:</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedClient?.KH_MA || ""}
                  readOnly
                />
                <label className="mt-2">Vai trò:</label>
                <select
                  className="form-select"
                  value={newClientRole}
                  onChange={(e) => setNewClientRole(e.target.value)}
                >
                  <option value="">Chọn vai trò</option>
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(null)}
                >
                  Hủy
                </button>
                <button className="btn btn-primary" onClick={handleEditClient}>
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Nền tối khi mở modal */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default CustomerManagement;
