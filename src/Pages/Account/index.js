import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaUserCog, FaBell, FaBox } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";
import { MdOutlineSell } from "react-icons/md";
import { Button } from "@mui/material";
import ProfileCustomer from "../../Components/ProfileCustomer";
import ResetPwCustomer from "../../Components/ResetPwCustomer";
import AddressCustomer from "../../Components/AddressCustomer";
import OrderCustomer from "../../Components/OrderCustomer";


const Account = () => {
  const navigate = useNavigate();
  const { option } = useParams(); // Lấy option từ URL
  
  const vouchers = [
    { code: "FADE10", discount: "10%", expiry: "2024-03-01" },
    { code: "FADE50", discount: "50%", expiry: "2024-04-15" },
  ];

  // Nội dung của từng trang
  const renderContent = () => {
    switch (option) {
      case "profile":
        return (
          <ProfileCustomer />
        );
      case "address":
        return (
          <AddressCustomer />
        );
      case "reset-password":
        return (
          <ResetPwCustomer />
        );
      case "orders":
        return (
          <OrderCustomer />
        );
      case "voucher":
        return (
          <div>
            <h3>Kho voucher</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Mã giảm giá</th>
                  <th>Giảm</th>
                  <th>Hạn sử dụng</th>
                </tr>
              </thead>
              <tbody>
                {vouchers.map((voucher) => (
                  <tr key={voucher.code}>
                    <td>{voucher.code}</td>
                    <td>{voucher.discount}</td>
                    <td>{voucher.expiry}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "noti":
        return (
          <div>
            <h3>Thông báo</h3>
            <ul>
              <li>Bạn có đơn hàng mới đang giao!</li>
              <li>Flash Sale hôm nay giảm giá 50%!</li>
            </ul>
          </div>
        );

      default:
        return <p>Chào mừng bạn đến với trang tài khoản.</p>;
    }
  };

  return (
    <div className="container account mb-3 mt-3">
      <div className="row">
        
        <div className="col-md-4 mt-3 mb-2 account-menu">
          <ul className="list-group">
            <li
              className="list-group-item"
              onClick={() => navigate("/cat/:id")}
            >
              <MdOutlineSell /> Siêu sale
            </li>
            <li
              className="list-group-item"
              onClick={() => navigate("/account/noti")}
            >
              <FaBell /> Thông báo
            </li>
            <div className="list-group-item my-account">
              <h3>
                <FaUserCog /> Tài khoản của tôi
              </h3>
              <li onClick={() => navigate("/account/profile")}>Hồ sơ</li>
              <li onClick={() => navigate("/account/address")}>Địa chỉ</li>
              <li onClick={() => navigate("/account/reset-password")}>
                Đổi mật khẩu
              </li>
            </div>
            <li
              className="list-group-item"
              onClick={() => navigate("/account/orders")}
            >
              <FaBox /> Đơn mua
            </li>
            <li
              className="list-group-item"
              onClick={() => navigate("/account/voucher")}
            >
              <IoTicket /> Kho voucher
            </li>
          </ul>
        </div>

        
        <div className="col-md-8 mb-2 account-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Account;
