import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Sidebar = ({ priceRange, setPriceRange, selectedBrands, setSelectedBrands, selectedTProducts, setSelectedTProducts }) => {
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  // const [value, setValue] = useState([100000, 5000000]);
  // const [value2, setValue2] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/brand") 
      .then((response) => {
        setBrands(response.data); 
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách thương hiệu:", error);
      });

      axios
      .get("http://localhost:5000/api/type-product") 
      .then((response) => setTypes(response.data))
      .catch((error) => console.error("Lỗi khi lấy danh sách loại sản phẩm:", error));


  }, []);

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleTypeChange = (type) => {
    setSelectedTProducts((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="pd-sidebar mb-3 mt-1 ">
      <div className="sticky">
        <div className="filter-box p-3">
          <h1>Loại sản phẩm</h1>
          {types.length === 0 ? (
            <p>Đang tải...</p>
          ) : (
            types.map((type) => (
              <div key={type.LSP_MA} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selectedTProducts.includes(type.LSP_TEN)}
                  onChange={() => handleTypeChange(type.LSP_TEN)}
                />
                <label className="form-check-label">{type.LSP_TEN}</label>
              </div>
            ))
          )}
        </div>

        <div className="filter-box p-3">
          <h1>Lọc theo giá</h1>
          <RangeSlider
            value={priceRange}
            onInput={(val) => {
              console.log("Cập nhật priceRange:", val);
              setPriceRange(val);
            }}
            min={100000}
            max={5000000}
            step={100000}
            className="mt-3 mb-2"
          />
          <div className="d-flex pt-2 pb-2 priceRange mb-3">
            <span className="price1">
              Từ:{" "}
              <strong className="text-blue ms-2">
                {priceRange[0].toLocaleString()}đ
              </strong>
            </span>
            <span className="price2">
              Đến:{" "}
              <strong className="text-blue ms-2">
                {priceRange[1].toLocaleString()}đ
              </strong>
            </span>
          </div>
        </div>

        <div className="filter-box p-3">
          <h1>Thương hiệu</h1>
          {brands.length === 0 ? (
            <p>Đang tải...</p>
          ) : (
            brands.map((brand) => (
              <div key={brand.BRAND_ID} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selectedBrands.includes(brand.BRAND_TEN)}
                  onChange={() => handleBrandChange(brand.BRAND_TEN)}
                />
                <label className="form-check-label">{brand.BRAND_TEN}</label>
              </div>
            ))
          )}
        </div>

        {/* <div className="filter-box p-3">
          <h1>Tình trạng</h1>
          <div className="scroll">
            <ul>
              <li>
                <FormControlLabel
                  className="w-100"
                  label={<span style={{ color: "#04a0ac" }}>Còn hàng</span>}
                  control={
                    <Checkbox
                      sx={{
                        color: "#04a0ac",
                        "&.Mui-checked": {
                          color: "#04a0ac",
                        },
                      }}
                    />
                  }
                />
              </li>
              <li>
                <FormControlLabel
                  className="w-100"
                  label={
                    <span style={{ color: "#04a0ac" }}>Đang giảm giá</span>
                  }
                  control={
                    <Checkbox
                      sx={{
                        color: "#04a0ac",
                        "&.Mui-checked": {
                          color: "#04a0ac",
                        },
                      }}
                    />
                  }
                />
              </li>
              <li>
                <FormControlLabel
                  className="w-100"
                  label={<span style={{ color: "#04a0ac" }}>Bestsellers</span>}
                  control={
                    <Checkbox
                      sx={{
                        color: "#04a0ac",
                        "&.Mui-checked": {
                          color: "#04a0ac",
                        },
                      }}
                    />
                  }
                />
              </li>
              <li>
                <FormControlLabel
                  className="w-100"
                  label={<span style={{ color: "#04a0ac" }}>Hàng mới về</span>}
                  control={
                    <Checkbox
                      sx={{
                        color: "#04a0ac",
                        "&.Mui-checked": {
                          color: "#04a0ac",
                        },
                      }}
                    />
                  }
                />
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
