import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderCustomer = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      toast.error("Vui lòng đăng nhập!");
      navigate("/");
      return;
    }
  
    const fetchOrderCustomer = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/account/orders/${userId}`);
        console.log("Dữ liệu đơn hàng từ server:", JSON.stringify(res.data, null, 2));

        setOrders(res.data); 
      } catch (error) {
        console.error("Lỗi lấy thông tin đơn hàng:", error);
        toast.error("Không thể lấy thông tin đơn hàng!");
      }
    };

    
    fetchOrderCustomer();
  }, [userId, navigate]);

  const fetchDetailsOrderData = async (orderId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/account/order-details/${orderId}`
      );
      console.log("Dữ liệu chi tiết đơn hàng:", response.data);
      
      setSelectedOrder((prev) => ({
        ...prev,
        details: response.data, // Lưu danh sách sản phẩm của đơn hàng
      }));
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };
  

  const filteredOrders = orders.filter(order =>
    order.DH_ID.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (order.SP_TEN && order.SP_TEN.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  

  return (
    <div className="container order-cus mt-3 p-4 border rounded bg-white">
      <div>
        <h3>Đơn hàng của bạn</h3>
        <div className="search-box">
          <input
            className=""
            type="text"
            placeholder="Nhập mã đơn để tìm kiếm..."
            
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch />
        </div>
        <div className="table-container">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Ngày đặt</th>
                <th>Giờ đặt</th>                
                <th>Trạng thái</th>
                <th>Thành tiền</th>
                <th>Hành động</th>
              </tr>
            </thead>
            {/* <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.DH_ID}>
                    <td style={{ width: "50px" }}>{order.DH_ID}</td>
                    <td>
                      {new Date(order.DH_NGAYLAP).toLocaleDateString("vi-VN")}
                    </td>
                    <td>{order.DH_GIOLAP}</td>
                    <td>{order.TT_TEN}</td>
                    <td>{order.DH_THANHTIEN.toLocaleString("vi-VN")}</td>
                    <td>
                      <button
                        className="btn btn-success mx-2"
                        onClick={() => {
                          setSelectedOrder(order);
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
                  <td colSpan="6" className="text-center">
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody> */}
            <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.DH_ID}>
                  <td>{order.DH_ID}</td>
                  <td>{new Date(order.DH_NGAYLAP).toLocaleDateString("vi-VN")}</td>
                  <td>{order.DH_GIOLAP}</td>
                
                  <td>{order.TT_TEN}</td>
                  <td>{order.DH_THANHTIEN.toLocaleString("vi-VN")}</td>
                  <td>
                    <button
                      className="btn btn-success mx-2"
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowModal("showdetails");
                        fetchDetailsOrderData(order.DH_ID);
                      }}
                    >
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">Không tìm thấy đơn hàng</td>
              </tr>
            )}
          </tbody>
          </table>
        </div>
      </div>
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
                        <th >Hình ảnh</th>
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
                                  width: "100px",
                                  height: "100px",
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

                <div className="text-start mt-3">
                  <strong
                    style={{
                      fontSize: "20px",
                      color: "red",
                      textTransform: "uppercase",
                    }}
                  >
                    Tổng tiền:
                    <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {selectedOrder?.DH_THANHTIEN?.toLocaleString()} VNĐ
                  </p>
                  </strong>
                  
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
    </div>
  );
};

export default OrderCustomer;

