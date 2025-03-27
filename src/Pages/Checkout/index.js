import React from "react";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import { FaPencilAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../../Components/CartContext/CartContext";
import axios from "axios";

const Checkout = () => {
  const { cart, setCart, removeFromCart } = useCart();
  
  return (
    <div>
      <Header />
      <div className="container p-4">
        <div className="row checkout-content">
          <div className="row d-flex flex-column">
            <div className="checkout-sale mb-3">
              <h3>Mã giảm giá</h3>
              <div className="d-flex justify-content-space-between">
                <input type="text" placeholder="Nhập mã giảm giá" />
                <button type="button" className="btn btnSale">
                  Áp dụng
                </button>
              </div>
            </div>

            <div className="checkout-address">
              <h3>
                Địa chỉ nhận hàng <FaPencilAlt />
              </h3>
              <div className="checkout-address-edit">
                <p>Tên người nhận: 123 Street</p>
                <p>Số điện thoại: HCM</p>
                <p>Địa chỉ nhận hàng: Vietnam</p>
              </div>
            </div>

            <div className="checkout-payment">
              <h3>Phương thức thanh toán</h3>
              {/* <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="cod"
                />
                <label className="form-check-label" htmlFor="cod">
                  Thanh toán khi nhận hàng (COD)
                </label>
              </div> */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="qr"
                />
                <label className="form-check-label" htmlFor="qr">
                  Thanh toán bằng mã QR
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="momo"
                />
                <label className="form-check-label" htmlFor="momo">
                  Thanh toán qua MoMo
                </label>
              </div>
            </div>

            <div className="checkout-bill">
              <h3>Tổng tiền</h3>
              <p>
                Tổng tiền hàng:{" "}
                {cart
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toLocaleString()}{" "}
                đ
              </p>
              <p className="checkout-ship">Phí vận chuyển: Freeship</p>
            </div>

            <div className="d-flex justify-content-space-between row">
              <div className="col-md-8 checkout-terms d-flex align-items-center justify-content-center">
                <p>
                  Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo{" "}
                  <a href="http://localhost:3000/terms/">Điều khoản FADE</a>
                </p>
              </div>
              <div className="col-md-4">
                <div className="d-block">
                  <button type="button" className="btn btnOrder">
                    Đặt hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
