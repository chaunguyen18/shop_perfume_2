import React from "react";
import { FaSearch } from "react-icons/fa";

const OrderCustomer = () => {
  const orders = [
    {
      id: "001",
      product: "Nước hoa Chanel",
      status: "Đang giao",
      date: "2024-02-20",
    },
    {
      id: "002",
      product: "Nước hoa Dior",
      status: "Hoàn thành",
      date: "2024-02-18",
    },
    {
        id: "002",
        product: "Nước hoa Dior",
        status: "Hoàn thành",
        date: "2024-02-18",
      },
      {
        id: "002",
        product: "Nước hoa Dior",
        status: "Hoàn thành",
        date: "2024-02-18",
      },

  ];

  return (
    <div className="container order-cus mt-3 p-4 border rounded bg-white">
      <div>
        <h3>Đơn hàng của bạn</h3>
        <div className="search-box">
          <input
            className=""
            type="text"
            placeholder="Nhập tên sản phẩm hoặc mã đơn để tìm kiếm..."
          />
          <FaSearch />
        </div>
        <div className="table-container">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Sản phẩm</th>
                <th>Trạng thái</th>
                <th>Ngày đặt</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.product}</td>
                  <td>{order.status}</td>
                  <td>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderCustomer;
