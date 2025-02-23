import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [value, setValue] = useState([100000, 5000000]);
  const [value2, setValue2] = useState(0);

  return (
    <div className="pd-sidebar mb-3 mt-1 ">
        <div className="sticky">
      <div className="filter-box p-3">
        <h1>Loại sản phẩm</h1>
        <div className="scroll">
          <ul>
            <li>
              <FormControlLabel
                className="w-100"
                label={<span style={{ color: "#04a0ac" }}>Nước hoa nam</span>}
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
                label={<span style={{ color: "#04a0ac" }}>Nước hoa nữ</span>}
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
                label={<span style={{ color: "#04a0ac" }}>Thương hiệu</span>}
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
                label={<span style={{ color: "#04a0ac" }}>Giftset</span>}
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
                label={<span style={{ color: "#04a0ac" }}>Mini</span>}
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
      </div>

      <div className="filter-box p-3">
        <h1>Lọc theo giá</h1>
        <RangeSlider value={value} onInput={setValue} min={100000} max={5000000} step={10000} className="mt-3 mb-2"/>
      <div className="d-flex pt-2 pb-2 priceRange mb-3">
        <span className="price1">Từ: <strong className="text-blue ms-2">{value[0]}</strong></span>
        <span className="price2">Đến: <strong className="text-blue ms-2">{value[1]}</strong></span>
      </div>
      </div>

      <div className="filter-box p-3">
        <h1>Thương hiệu</h1>
        <div className="scroll">
          <ul>
            <li>
              <FormControlLabel
                className="w-100"
                label={<span style={{ color: "#04a0ac" }}>Gucci</span>}
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
                label={<span style={{ color: "#04a0ac" }}>Versace</span>}
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
                label={<span style={{ color: "#04a0ac" }}>Buberry</span>}
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
                label={<span style={{ color: "#04a0ac" }}>Salvatore Ferragamo</span>}
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
                label={<span style={{ color: "#04a0ac" }}>Moschino</span>}
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
      </div>

      <div className="filter-box p-3">
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
                label={<span style={{ color: "#04a0ac" }}>Đang giảm giá</span>}
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
      </div>


      </div>
    </div>
  );
};

export default Sidebar;
