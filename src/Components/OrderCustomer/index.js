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

  const filteredOrders = orders.filter(order =>
    order.DH_ID.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (order.SP_TEN && order.SP_TEN.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // const fetchDetailsOrderData = (orderId) => {
  //   axios
  //     .get(`http://localhost:5000/api/account/order-details/${orderId}`)
  //     .then((response) => {
  //       console.log("Dữ liệu chi tiết đơn hàng:", response.data);

  //       setSelectedOrder((prev) => ({ ...prev, details: response.data }));
  //     })
  //     .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
  // };

  return (
    <div className="container order-cus mt-3 p-4 border rounded bg-white">
      <div>
        <h3>Đơn hàng của bạn</h3>
        <div className="search-box">
          <input
            className=""
            type="text"
            placeholder="Nhập tên sản phẩm hoặc mã đơn để tìm kiếm..."
            
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
    </div>
  );
};

export default OrderCustomer;

