import React from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Cart = () => {

    // const updateQuantity = (id, newQuantity) => {
    //     const qty = Math.max(1, parseInt(newQuantity) || 1); // Không cho phép nhỏ hơn 1
    //     setCartItems(
    //       cartItems.map((item) =>
    //         item.id === id ? { ...item, quantity: qty } : item
    //       )
    //     );
    //   };

      
  return (
    <div>
      <Header />
      <div className="container-fluid p-4">
        <div className="cart">
          <div className="row gx-3">
            <div className="col-md-8 d-flex flex-column">
              <div className="cart-header">
                <h1>Giỏ hàng</h1>
              </div>
              <div className="cart-content mt-3">
                <div className="cart-item row pb-2  d-flex justify-content-center">
                  <div className="col-md-2">Sản phẩm</div>
                  <div className="col-md-2">Giá</div>
                  <div className="col-md-2">Số lượng</div>
                  <div className="col-md-2">Tổng</div>
                  <div className="col-md-2">Xóa</div>
                </div>

                
                <div className="row align-items-center  d-flex justify-content-center py-2">
                  <div className="col-md-2">
                    <img
                      src="product.jpg"
                      alt="cart-item"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-2">500.000 VNĐ</div>
                  <div className="col-md-2">
                    <input
                      type="number"
                      
                      className="form-control w-50"
                      //value={item.quantity}
                      //onChange={(e) => updateQuantity(item.id, e.target.value)}
                      min="1"
                    />
                  </div>
                  <div className="col-md-2">500.000 VNĐ</div>
                  <div className="col-md-2">
                    <MdDelete className="text-danger btnDeleteCartItem" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 cart-infor mt-2">
              <div className="row d-flex flex-column">
                <div className="cart-sale mb-3">
                  <h3>Mã giảm giá</h3>
                  <div className=" d-flex justify-content-space-between">
                    <input type="text" placeholder="Nhập mã giảm giá" />
                    <button type="button" class="btn btnSale">
                      Áp dụng
                    </button>
                  </div>
                </div>
                <div className="cart-address">
                  <h3>
                    Địa chỉ nhận hàng <FaPencilAlt />
                  </h3>
                  <div className="cart-address-edit">
                    <p>Tên người nhận: 123 Street</p>
                    <p>Số điện thoại: HCM</p>
                    <p>Địa chỉ nhận hàng: Vietnam</p>
                  </div>
                </div>
                <div className="cart-checkout">
                  <h3>Tổng tiền</h3>
                  <div className="">
                    <p>Tổng tiền hàng: 700.000 VNĐ</p>
                    <p>Tổng tiền phí vận chuyển: Freeship</p>
                    <p>Tổng thanh toán: 700.000 VNĐ</p>
                  </div>
                </div>
                <div className="cart-payment">
                  <h3>Phương thức thanh toán</h3>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                    />
                    <label class="form-check-label" for="flexRadioDefault2">
                      Thanh toán khi nhận hàng (COD)
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label class="form-check-label" for="flexRadioDefault1">
                      Thanh toán bằng mã QR
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label class="form-check-label" for="flexRadioDefault1">
                      Thanh toán qua MoMo
                    </label>
                  </div>
                </div>
                <div className="d-block mt-3">
                  <button type="button" class="btn btnCheckout">
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

export default Cart;
