import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import { AiOutlineFullscreen } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import Button from "@mui/material/Button";
import ProductModal from "../ProductModal";

const ProductItem = () => {
  const [isOpenProductModal, setIsOpenProductModal] = useState(false);

  const viewProductModal = () => {
    setIsOpenProductModal(true);
  };

  const closeProductModal = () => {
    setIsOpenProductModal(false);
  };

  return (
    <div>
      <div className="item productItem">
        <div className="imgWrapper">
          <img
            src="https://product.hstatic.net/1000340570/product/versace-eros-for-men_e21f596ba1f6467eb39ace8813943882_master.jpg"
            className="w-100"
            alt="product1"
          />
          <span className="badge">-50%</span>
          <div className="action">
            <Button onClick={viewProductModal}>
              <AiOutlineFullscreen />
            </Button>
            <Button>
              <FaRegHeart />
            </Button>
          </div>
        </div>
        <div className="info">
          <h4>Versace Eros For Men</h4>
          <span className="text-success block">Còn hàng</span>
          <Rating className="mt-2 mb-2" name="read-only" value={5} readOnly size="small" />
          <div className="d-flex">
            <span className="oldPrice">$20</span>
            <span className="newPrice text-danger">$10</span>
          </div>
        </div>
      </div>

      {/* Chỉ hiển thị modal khi isOpenProductModal = true */}
      {isOpenProductModal && <ProductModal open={isOpenProductModal} closeProductModal={closeProductModal} />}
    </div>
  );
};

export default ProductItem;
