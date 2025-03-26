import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { IoMdClose } from "react-icons/io";
import Rating from "@mui/material/Rating";
import ProductZoom from "../ProductZoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { FaPlus } from "react-icons/fa6";
import QuantityBox from "../QuantityBox";
import { CiBookmark } from "react-icons/ci";
import { MdCompareArrows } from "react-icons/md";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../../Components/CartContext/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductModal = ({ open, closeProductModal, productId }) => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const newPrice = product ? product.DG_GIANIEMYET * 0.5 : 0;


  useEffect(() => {
    const fetchProduct = async () => {
      if (productId && open) {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/product/${productId}`
          );
          console.log("Dữ liệu sản phẩm:", res.data);
          setProduct(res.data);
        } catch (error) {
          console.error("Lỗi lấy dữ liệu:", error);
        }
      }
    };
    fetchProduct();
  }, [productId, open]);

  const handleAddToCart = () => {
    console.log("Gọi handleAddToCart");
    console.log("addToCart:", addToCart); // Kiểm tra addToCart có tồn tại không
    console.log("Sản phẩm thêm vào:", product);
    console.log("Số lượng:", quantity);

    if (product) {
      addToCart(product, activeSize, quantity);

      toast.success(`🛒 Đã thêm ${quantity} sản phẩm vào giỏ hàng!`, {
        position: "bottom-right",
        autoClose: 3000, // Tự động tắt sau 3 giây
      });

      closeProductModal();
    }
  };

  const [activeSize, setActiveSize] = useState(null);
  const isActive = (size) => {
    setActiveSize(size);
  };

  return (
    <Dialog open={open} className="productModal" onClose={closeProductModal}>
      <Button className="close_" onClick={closeProductModal}>
        <IoMdClose />
      </Button>

      {product ? (
        <>
          <h4 className="mb-2 font-weight-bold ">{product.SP_TEN}</h4>
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              <span>Thương hiệu:</span>
              <span className="ms-2 me-2">
                <b>{product.BRAND_TEN}</b>
              </span>
              <span className="ms-2 text-dark">Loại sản phẩm:</span>
              <span className="ms-2">
                <strong>{product.LSP_TEN}</strong>
              </span>
            </div>
            {/* <Rating
              name="read-only"
              value={5}
              size="small"
              precision={0.5}
              readOnly
            /> */}
          </div>
          <hr />
          <div className="row mt-2 productDetailModal">
            <div className="col-md-6">
              {/* <ProductZoom product={product} /> */}
              <img
                src={product.SP_DIENGIAI}
                alt={product.SP_TEN}
                className="img-fluid"
              />
            </div>
            <div className="col-md-6 product-detail-info">
              <div className="d-flex mb-2 align-items-center">
                <span className="old-Price">
                  {product.DG_GIANIEMYET.toLocaleString()} VND
                </span>
                <span className="new-Price">
                  {newPrice.toLocaleString()} VND
                </span>
              </div>
              <span className="badge">Còn hàng</span>
              {/* <p className="mt-3 mb-3">{product.SP_DIENGIAI}</p> */}

              <div className="product-size d-flex align-items-center">
                <span className="text-dark me-3">Size:</span>
                <ul className="list-inline-item mb-0">
                  {["5ml", "30ml", "100ml"].map((size) => (
                    <li key={size} className="list-inline-item">
                      <a
                        href="#"
                        className={`tag ${activeSize === size ? "active" : ""}`}
                        onClick={() => isActive(size)}
                      >
                        {size}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="d-flex align-items-center mb-3 mt-3">
                <QuantityBox onQuantityChange={setQuantity} />
                <Button
                  className="addToCartBtn"
                  onClick={handleAddToCart}
                  style={{ marginLeft: "50px" }}
                >
                  <FaPlus />
                  Thêm vào giỏ
                </Button>
              </div>
              <div className="d-flex align-items-center">
                <Button
                  className="addToWishlistBtn"
                  style={{ marginRight: "20px" }}
                >
                  <CiBookmark />
                  Yêu thích
                </Button>
                <Button className="compareBtn">
                  <MdCompareArrows />
                  So sánh
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Đang tải dữ liệu...</p>
      )}
    </Dialog>
  );
};

export default ProductModal;
