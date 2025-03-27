import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useCart } from "../../Components/CartContext/CartContext";
import { FaSadCry } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const { cart, setCart, removeFromCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantities, setQuantities] = useState(() => {
    return cart.reduce((acc, item) => {
      acc[item.product.SP_MA] = item.quantity;
      return acc;
    }, {});
  });

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setQuantities((prev) => ({
      ...prev,
      [productId]: newQuantity,
    }));

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.SP_MA === productId
          ? { ...item, quantity: newQuantity, total: item.price * newQuantity }
          : item
      )
    );
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cart`);
        setProduct(res.data);
      } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error);
      }
    };
    fetchProduct();
  }, []);

  const handleRemoveItem = (product, size) => {
    removeFromCart(product.SP_MA, size);
    toast.success(`Đã xóa sản phẩm "${product.SP_TEN}" ra khỏi giỏ hàng!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  if (!product) return <p>Đang tải...</p>;

  return (
    <div>
      <Header />
      <div className="container-fluid p-4">
        <div className="cart">
          {cart.length === 0 ? (
            <div className="cart-empty-content text-center mt-4 d-flex flex-column justify-content-center align-items-center">
              <FaSadCry />
              <p>Giỏ hàng trống</p>

              <a href="http://localhost:3000/cat" className="btn btn-primary">
                Vào mua sắm ngay thôi
              </a>
            </div>
          ) : (
            <div className="row gx-3">
              <div className="col-md-12 d-flex flex-column">
                <div className="cart-header">
                  <h1>Giỏ hàng</h1>
                </div>

                <div className="cart-content mt-3">
                  <div className="cart-item row pb-2 d-flex justify-content-center">
                    <div className="col-md-2">Sản phẩm</div>
                    <div className="col-md-2">Tên sản phẩm</div>
                    <div className="col-md-1">Size</div>
                    <div className="col-md-2">Giá</div>
                    <div className="col-md-2">Số lượng</div>
                    <div className="col-md-2">Tổng</div>
                    <div className="col-md-1">Xóa</div>
                  </div>

                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="row align-items-center d-flex justify-content-center py-2"
                    >
                      <div className="col-md-2">
                        <img
                          src={item.product.SP_DIENGIAI}
                          alt={item.product.SP_TEN}
                          className="img-fluid"
                        />
                      </div>
                      <div className="col-md-2">{item.product.SP_TEN}</div>
                      <div className="col-md-1">{item.size}</div>
                      <div className="col-md-2">
                        {item.price.toLocaleString()}đ
                      </div>

                      <div className="col-md-2">
                        <input
                          type="number"
                          className="form-control w-50"
                          value={item.quantity}
                          min="1"
                          onChange={(e) =>
                            handleQuantityChange(
                              item.product.SP_MA,
                              parseInt(e.target.value, 10)
                            )
                          }
                        />
                      </div>
                      <div className="col-md-2">
                        {(
                          item.price *
                          (quantities[item.product.SP_MA] || item.quantity)
                        ).toLocaleString()}
                        đ
                      </div>
                      <div className="col-md-1">
                        <MdDelete
                          className="text-danger btnDeleteCartItem"
                          onClick={() =>
                            handleRemoveItem(item.product, item.size)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cart-footer mt-3 row">
                <div className="cart-sale mb-3 col-md-6">
                  <div className="d-flex justify-content-space-between">
                    <input type="text" placeholder="Nhập mã giảm giá" />
                    <button type="button" className="btn btnSale">
                      Áp dụng
                    </button>
                  </div>
                </div>
                <div className="d-block mt-3 col-md-6">
                  <button type="button" className="btn btnCheckout">
                    <a href="/checkout/:id">Thanh toán</a>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
