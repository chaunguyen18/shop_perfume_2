import React, { useState, useEffect } from "react";
import { AiOutlineFullscreen } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import Button from "@mui/material/Button";
import ProductModal from "../ProductModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductItem = ({ priceRange, selectedBrands, selectedTProducts }) => {
  const navigate = useNavigate(); 
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



  const closeProductModal = () => {
    setIsOpenProductModal(false);
  };

  const [selectedProductId, setSelectedProductId] = useState(null);

  const viewProductModal = (e, productId) => {
    e.stopPropagation();
    setSelectedProductId(productId);
    setIsOpenProductModal(true);
  };

  const filteredProducts = products.filter((product) => {
    if (!Array.isArray(priceRange) || priceRange.length < 2) {
      console.error("priceRange bị lỗi:", priceRange);
      return true; 
    }
    return (
      product.DG_GIANIEMYET * 0.5 >= priceRange[0] &&
      product.DG_GIANIEMYET * 0.5 <= priceRange[1] &&
      (selectedBrands.length === 0 || selectedBrands.includes(product.BRAND_TEN)) &&
      (selectedTProducts.length === 0 || selectedTProducts.includes(product.LSP_TEN))
    );
  });
  
  

  return (
    <div className="product-list">
      {filteredProducts.map((product) => (
        <div
          className="item productItem"
          key={product.SP_MA}
          onClick={() => navigate(`/product/${product.SP_MA}`)}
        >
          <div className="imgWrapper">
            <img
              src={product.image}
              className="w-100 img-fluid"
              alt="product.SP_TEN"
            />
            <span className="badge">-50%</span>
            <div className="action">
              <Button onClick={(e) => viewProductModal(e, product.SP_MA)}>
                <AiOutlineFullscreen />
              </Button>
              <Button>
                <FaRegHeart />
              </Button>
            </div>
          </div>

          <div className="info">
            <h4>{product.SP_TEN}</h4>
            <h6 className="text-muted">{product.LSP_TEN}</h6>
            <span className="text-success block">Còn hàng</span>
            <div className="d-flex">
              <span className="oldPrice">
              {product.DG_GIANIEMYET.toLocaleString()}đ
              </span>
              <span className="newPrice text-danger">
              {(product.DG_GIANIEMYET * 0.5).toLocaleString()}đ
              </span>
            </div>
          </div>
        </div>
      ))}

      {isOpenProductModal && (
        <ProductModal
          open={isOpenProductModal}
          closeProductModal={closeProductModal}
          productId={selectedProductId}
        />
      )}
    </div>
  );
};

export default ProductItem;
