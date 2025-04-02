import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [products, setProducts] = useState([]); 
  const navigate = useNavigate(); 

  
  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/search?name=${e.target.value}`
        );
        setProducts(response.data); 
      } catch (error) {
        console.error("Lỗi tìm kiếm sản phẩm:", error);
      }
    } else {
      setProducts([]); 
    }
  };

  
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); 
  };

  return (
    <div className="headerSearch ml-3 mr-3">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Tìm kiếm sản phẩm..."
      />
      <Button>
        <FaSearch />
      </Button>

      {products.length > 0 && (
        <div className="search-results">
          <ul>
            {products.map((product) => (
              <li key={product.SP_MA} onClick={() => handleProductClick(product.SP_MA)}>
                <img
                    className="product-results-image"
                    src={product.SP_DIENGIAI}
                    alt={product.SP_TEN}
                  />
                  <div className="product-info">
                    <strong>{product.SP_TEN}</strong>
                    <p>{product.DG_GIANIEMYET ? `${product.DG_GIANIEMYET.toLocaleString()} VNĐ` : "Liên hệ"}</p>
                  </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBox;