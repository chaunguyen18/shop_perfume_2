import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import { AiOutlineFullscreen } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import Button from "@mui/material/Button";
import ProductModal from "../ProductModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductItem = () => {
  const navigate = useNavigate(); // Hook điều hướng
  const [isOpenProductModal, setIsOpenProductModal] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/product")
      .then((response) => {
        console.log("Dữ liệu API:", response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
      });
  }, []);

  const viewProductModal = (e) => {
    e.stopPropagation(); 
    setIsOpenProductModal(true);
  };

  const closeProductModal = () => {
    setIsOpenProductModal(false);
  };

  // onClick={handleProductClick}

  const handleProductClick = () => {
    navigate("/product/:id"); 
  };

  return (
    <div className="product-list">
      {products.map((product) => (
      <div className="item productItem" key={product.SP_MA}
      onClick={() => navigate(`/product/${product.SP_MA}`)} >
       
        <div className="imgWrapper">
          <img
            src={product.image}
            className="w-100"
            alt="product.SP_TEN"
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
          <h4>{product.SP_TEN}</h4>
          <span className="text-success block">Còn hàng</span>
          <Rating className="mt-2 mb-2" name="read-only" value={5} readOnly size="small" />
          <div className="d-flex">
            <span className="oldPrice">{(product.DG_GIANIEMYET * 0.5).toLocaleString()}đ</span>
            <span className="newPrice text-danger">{product.DG_GIANIEMYET.toLocaleString()}đ</span>
          </div>
        </div>
      </div>
  ))}
     
      {isOpenProductModal && <ProductModal open={isOpenProductModal} closeProductModal={closeProductModal} />}
    </div>
  );
};

export default ProductItem;
