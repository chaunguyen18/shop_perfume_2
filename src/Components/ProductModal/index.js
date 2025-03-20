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

const ProductModal = ({ open, closeProductModal, productId }) => {
  const [product, setProduct] = useState(null);

  // Gọi API để lấy thông tin sản phẩm theo productId
  useEffect(() => {
    if (productId && open) {
      axios
        .get(`/api/product/${productId}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
        });
    }
  }, [productId, open]);

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
            </div>
            <Rating
              name="read-only"
              value={5}
              size="small"
              precision={0.5}
              readOnly
            />
          </div>
          <hr />
          <div className="row mt-2 productDetailModal">
            <div className="col-md-6">
              <ProductZoom image={product.image} />
            </div>
            <div className="col-md-6 product-detail-info">
              <div className="d-flex mb-2 align-items-center">
                <span className="old-Price">$20</span>
                <span className="new-Price">${product.DG_GIANIEMYET}</span>
              </div>
              <span className="badge">Còn hàng</span>
              <p className="mt-3 mb-3">{product.SP_DIENGIAI}</p>
              <div className="d-flex align-items-center mb-3">
                <QuantityBox />
                <Button className="addToCartBtn" style={{ marginLeft: "50px" }}>
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
