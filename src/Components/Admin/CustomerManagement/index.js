import axios from "axios";
import React, { useEffect, useState } from "react";

const CustomerManagement = () => {
  const [clients, setClients] = useState([]); // Lưu danh sách khách hàng

  useEffect(() => {
    fetchClientData();
  }, []);

  const fetchClientData = () => {
    axios
      .get("http://localhost:5000/api/client")
      .then((response) => setClients(response.data)) // Lưu danh sách khách hàng
      .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
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
            <button className="btn btn-success mx-2 mt-3">Thêm khách hàng</button>
            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th style={{ width: "50px"}}>Mã KH</th>
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
                {clients.map((client) => (
                  <tr key={client.KH_MA}>
                    <td style={{ width: "50px"}}>{client.KH_MA}</td>
                    <td>{client.KH_HOTEN}</td>
                    <td>{client.KH_NGAYSINH}</td>
                    <td>{client.KH_SDT}</td>
                    <td>{client.KH_GIOI}</td>
                    <td>{client.KH_DIACHI}</td>
                    <td>{client.role}</td>
                    <td>
                      <button className="btn btn-warning mx-2">Cập nhật</button>
                      <button className="btn btn-danger mx-2">Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerManagement;
