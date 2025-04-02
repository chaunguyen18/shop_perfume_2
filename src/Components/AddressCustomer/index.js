import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import { FaPencilAlt, FaHome } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddressCustomer = () => {
  const userId = localStorage.getItem("userId");
  const [address, setAddress] = useState("");
  const [newAddress, setNewAddress] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    fetchAddressCustomerData();
  }, []);

  const fetchAddressCustomerData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/account/address-customer/${userId}`
      );
      if (response.data.length > 0) {
        setAddress(response.data[0].KH_DIACHI);
        setNewAddress(response.data[0].KH_DIACHI); 
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const handleUpdateAddress = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/account/update-address/${userId}`,
        {
          address: newAddress, 
        }
      );

      toast.success("Cập nhật địa chỉ thành công!");
      setIsModalOpen(false); 
    } catch (error) {
      console.error("Lỗi khi cập nhật địa chỉ:", error);
    }
  };

  return (
    <div className="container mt-3 p-4 border rounded bg-white address-cus">
      <div className="d-flex align-items-center justify-content-center address-action">
        <h3>Địa chỉ giao hàng</h3>
        <button
          className="ms-auto edit-btn"
          onClick={() => {
            setIsModalOpen(true); // Mở modal khi nhấn "Thay đổi"
          }}
        >
          <FaPencilAlt /> Thay đổi
        </button>
      </div>
      <p>
        <FaHome /> {address || "Chưa có địa chỉ"}
      </p>

      {/* Modal chỉnh sửa địa chỉ */}
      {isModalOpen && (
        <div className="modal fade show d-block">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Chỉnh sửa địa chỉ</h5>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-md-12">
                    <strong>Địa chỉ cũ:</strong>
                    <p>{address}</p> {/* Hiển thị địa chỉ cũ */}
                  </div>
                  <div className="col-md-12">
                    <strong>Địa chỉ mới:</strong>
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={newAddress} 
                      onChange={(e) => setNewAddress(e.target.value)} 
                      multiline
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-warning"
                  onClick={handleUpdateAddress} 
                >
                  Cập nhật
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)} 
                >
                  Thoát
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressCustomer;
