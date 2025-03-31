import React, { useEffect, useState } from "react";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import { FaPencilAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../../Components/CartContext/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, setCart, resetCart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const userId = localStorage.getItem("userId");

  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleCheckout = async () => {
    if (!selectedPayment) {
      toast.error("Vui lòng chọn phương thức thanh toán!");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/checkout", {
        KH_MA: userId,
        PTTT_ID: selectedPayment,
        items: cart.map((item) => ({
          SP_MA: item.product.SP_MA, 
          size: item.size, 
          quantity: item.quantity, 
          price: item.price, 
          totalPrice: item.price * item.quantity, 
        })),
      });
  
      if (response.status === 201) {
        toast.success(`Đặt hàng thành công!`);
        setCart([]); 
        navigate("/customer-home");
      }
    } catch (error) {
      console.error("Lỗi thanh toán:", error);
      toast.error("Thanh toán thất bại!");
    }
  };
  

  useEffect(() => {
    if (!userId) {
      toast.error("Vui lòng đăng nhập!");
      navigate("/");
      return;
    }

    const fetchCustomer = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/checkout/${userId}`);
        setCustomer(res.data);
      } catch (error) {
        console.error("Lỗi lấy thông tin khách hàng:", error);
        toast.error("Không thể lấy thông tin khách hàng!");
      }
    };

    fetchCustomer();
  }, [userId, navigate]);
  

  
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
              {customer ? (
                <div className="checkout-address-edit">
                  <p>Tên người nhận: {customer.KH_HOTEN}</p>
                  <p>Số điện thoại: {customer.KH_SDT}</p>
                  <p>Địa chỉ nhận hàng: {customer.KH_DIACHI}</p>
                </div>
              ) : (
                <p>Đang tải...</p>
              )}
            </div>

            <div className="checkout-payment">
              <h3>Phương thức thanh toán</h3>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="cod"
                  value="3"
                  onChange={(e) => setSelectedPayment(e.target.value)}
                />
                <label className="form-check-label" htmlFor="cod">
                  Thanh toán khi nhận hàng (COD)
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="qr"
                  value="1"
                  onChange={(e) => setSelectedPayment(e.target.value)}

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
                  value="2"
                  onChange={(e) => setSelectedPayment(e.target.value)}
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
                  <button type="button" className="btn btnOrder" onClick={ handleCheckout}>
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
