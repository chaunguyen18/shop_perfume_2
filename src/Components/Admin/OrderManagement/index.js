import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState();
  const [showModal, setShowModal] = useState(null);

  useEffect(() => {
    fetchOrderData();
    fetchDetailsOrderData();
  }, []);

  const fetchOrderData = () => {
    axios
      .get("http://localhost:5000/api/order")
      .then((response) => {
        console.log("Dữ liệu đơn hàng:", response.data);
        setOrders(response.data);
      })
      .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
  };

  const fetchDetailsOrderData = (orderId) => {
    axios
      .get(`http://localhost:5000/api/order-details/${orderId}`)
      .then((response) => {
        console.log("Dữ liệu chi tiết đơn hàng:", response.data);
        // setOrders(response.data);
        setSelectedOrder((prev) => ({ ...prev, details: response.data }));
      })
      .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
  };

  const handleEditStatus = () => {
    if (!selectedOrder || !newStatus) {
      toast.error("Vui lòng chọn đơn hàng và trạng thái đơn hàng mới!");
      return;
    }

    axios
      .put(`http://localhost:5000/api/order/${selectedOrder.DH_ID}`, {
        TT_TEN: newStatus,
      })
      .then(() => {
        setShowModal(null);
        fetchOrderData();
        toast.success("Cập nhật trạng thái thành công!");
      })
      .catch((error) => {
        console.error("Lỗi khi sửa:", error);
        toast.error("Cập nhật thất bại!");
      });
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="order-management p-2">
          <div className="order-management-title text-center">
            <h2>Quản lý đơn hàng</h2>
          </div>
          <div className="order-management-content">
            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th style={{ width: "50px" }}>Mã ĐH</th>
                  <th>Mã KH</th>
                  <th>Ngày đặt</th>
                  <th>Giờ đặt</th>
                  <th>Thành tiền</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.DH_ID}>
                      <td style={{ width: "50px" }}>{order.DH_ID}</td>
                      <td>{order.KH_MA}</td>
                      <td>
                        {new Date(order.DH_NGAYLAP).toLocaleDateString("vi-VN")}
                      </td>
                      <td>{order.DH_GIOLAP}</td>
                      <td>{order.DH_THANHTIEN}</td>
                      <td>{order.TT_TEN}</td>
                      <td>
                        <button
                          className="btn btn-warning mx-2"
                          onClick={() => {
                            setSelectedOrder(order);
                            setNewStatus(order.TT_TEN);
                            setShowModal("edit");
                          }}
                        >
                          Cập nhật
                        </button>
                        <button
                          className="btn btn-success mx-2"
                          onClick={() => {
                            setSelectedOrder(order);
                            fetchDetailsOrderData(order.DH_ID);

                            setShowModal("showdetails");
                          }}
                        >
                          Xem chi tiết
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
                <h5 className="modal-title">Thay đổi trạng thái đơn hàng</h5>
                <button className="close" onClick={() => setShowModal(null)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <label>Mã đơn hàng:</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedOrder?.DH_ID || ""}
                  readOnly
                />
                <label className="mt-2">Trạng thái:</label>
                <select
                  className="form-select"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="">Chọn trạng thái</option>
                  <option value="Chờ xác nhận">Chờ xác nhận</option>
                  <option value="Đã xác nhận">Đã xác nhận</option>
                  <option value="Đang giao hàng">Đang giao hàng</option>
                  <option value="Đã giao hàng">Đã giao hàng</option>
                  <option value="Đã hủy">Đã hủy</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(null)}
                >
                  Hủy
                </button>
                <button className="btn btn-primary" onClick={handleEditStatus}>
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal === "showdetails" && (
        <div className="modal fade show d-block">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Chi tiết đơn hàng</h5>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-md-3">
                    <strong>Mã đơn hàng:</strong> {selectedOrder?.DH_ID || ""}
                  </div>
                  <div className="col-md-3">
                    <strong>Ngày đặt:</strong>
                    {selectedOrder?.DH_NGAYLAP
                      ? new Date(selectedOrder.DH_NGAYLAP).toLocaleDateString(
                          "vi-VN"
                        )
                      : ""}
                  </div>
                  <div className="col-md-3">
                    <strong>Giờ đặt:</strong> {selectedOrder?.DH_GIOLAP || ""}
                  </div>
                  <div className="col-md-3">
                    <strong>Trạng thái:</strong> {selectedOrder?.TT_TEN || ""}
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr className="table-primary">
                        <th>Hình ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Đơn vị tính</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder?.details &&
                      selectedOrder.details.length > 0 ? (
                        selectedOrder.details.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <img
                                src={item.SP_DIENGIAI}
                                alt={item.SP_TEN || "Sản phẩm"}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "cover",
                                }}
                              />
                            </td>
                            <td>{item.SP_TEN || "Không có tên"}</td>
                            <td>{item.CTDH_DVT || "N/A"}</td>
                            <td>{item.CTDH_SOLUONG || 0}</td>
                            <td>
                              {item.CTDH_DONGIA
                                ? `${item.CTDH_DONGIA.toLocaleString()} VNĐ`
                                : "N/A"}{" "}
                              VNĐ
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center">
                            Không có sản phẩm nào trong đơn hàng này.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="text-end mt-3">
                  <strong
                    style={{
                      fontSize: "20px",
                      color: "red",
                      textTransform: "uppercase",
                    }}
                  >
                    Tổng tiền:
                  </strong>{" "}
                  <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {selectedOrder?.DH_THANHTIEN?.toLocaleString()} VNĐ
                  </span>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(null)}
                >
                  Thoát
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

export default OrderManagement;
