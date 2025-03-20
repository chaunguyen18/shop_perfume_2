import { React, useState } from "react";
import Sidebar from "../../Components/Sidebar";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsGrid3X2GapFill } from "react-icons/bs";
import Button from "@mui/material/Button";
import { IoGrid } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ProductItem from "../../Components/ProductItem";
import Pagination from '@mui/material/Pagination';
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const Listing = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openDropdown = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [gridCols, setGridCols] = useState(3); // Mặc định 2 sản phẩm mỗi hàng

  return (
    <>
    <Header />
    
    <div className="pd-listing-page">
      <div className="container">
        <div className="row">
          <div className="sidebar col-md-4">
            <Sidebar />
            <Link to="/">
              <img
                src="https://theme.hstatic.net/1000340570/1000964732/14/brand-image.svg?v=6851"
                alt="ads1"
                className="w-100 mb-3 p-2"
              />
            </Link>
          </div>
          <div className="content-right col-md-8">
            <h1 className="mt-2 text-blue">
              tất cả sản phẩm
              <FaAngleRight />
            </h1>
            <img
              src="https://theme.hstatic.net/1000340570/1000964732/14/banner_brand_image_section_02.jpg?v=6851"
              alt="banner-pd"
              className="w-100 p-2"
            />
            <div className="showBy d-flex align-items-center mt-3 mb-3">
              <div className="d-flex align-items-center btnWrapper">
                <Button onClick={() => setGridCols(2)}>
                  <IoGrid />
                </Button>
                <Button onClick={() => setGridCols(3)}>
                <BsGrid3X2GapFill />
                </Button>
              </div>
              <div className="ms-auto showByFilter">
                <Button onClick={handleClick} className="">
                  Show 9<FaAngleDown />
                </Button>
                <Menu
                  className="w-100"
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openDropdown}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>10</MenuItem>
                  <MenuItem onClick={handleClose}>20</MenuItem>
                  <MenuItem onClick={handleClose}>30</MenuItem>
                </Menu>
              </div>
            </div>

            <div className={`pd-listing grid-cols-${gridCols}`}>
              <ProductItem />

            </div>

            <div className="d-flex align-items-center justify-content-center mt-4 mb-4">
            <Pagination count={10} color="primary" size="large"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
    </>
  );
};

export default Listing;
