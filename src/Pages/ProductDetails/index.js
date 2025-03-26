import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import ProductZoom from "../../Components/ProductZoom";
import { FaCartShopping } from "react-icons/fa6";
import QuantityBox from "../../Components/QuantityBox";
import { MdCompareArrows } from "react-icons/md";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { FaRegHeart } from "react-icons/fa6";
import TabContentPD from "../../Components/TabContentPD";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = (props) => {

  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  const [activeSize, setActiveSize] = useState(null);
  const isActive = (index) => {
    setActiveSize(index);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/product/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Đang tải...</p>;

  return (
    <div>
      <Header />
      <div className="product-detail">
        <div className="container">
          <div className="row mb-2 mt-3">
            <div className="col-md-6 mb-3">
              <ProductZoom productId={id}/>
            </div>
            <div className="col-md-6 p-3 pd-part2">
              <div className="d-flex align-items-center">
                <h2 className="text-capitalize">{product.SP_TEN}</h2>
                <span className="badge2 ms-4 mb-3">Còn hàng</span>
              </div>

              <ul className="list-inline-item d-flex align-items-center">
                <li className="list-inline-item">
                  <div className="d-flex align-items-center">
                    <span className="text-dark my-2">Brands:</span>
                    <span className="ms-2">{product.BRAND_TEN}</span>
                  </div>
                </li>
                {/* <li className="list-inline-item">
                  <div className="d-flex align-items-center ms-2">
                    <Rating
                      name="half-rating"
                      defaultValue={2.5}
                      precision={0.5}
                      size="small"
                    />
                    <span className="ms-2">1 đánh giá</span>
                  </div>
                </li> */}
                <li className="list-inline-item">
                  <div className="d-flex align-items-center ms-2">
                    <span className="ms-2 text-dark">Mã:</span>
                    <span className="ms-2">{product.SP_MA}</span>
                  </div>
                </li>
                <li className="list-inline-item">
                  <div className="d-flex align-items-center ms-2">
                    <span className="ms-2 text-dark">Loại sản phẩm:</span>
                    <span className="ms-2">{product.LSP_TEN}</span>
                  </div>
                </li>
              </ul>

              <div className="d-flex ">
                <span className="text-dark">Giá:</span>
                <span className="newPrice text-danger ms-2">{(product.DG_GIANIEMYET * 0.5).toLocaleString()}đ</span>
                <span className="oldPrice ms-2 me-1">{product.DG_GIANIEMYET.toLocaleString()}₫</span>
                <span className="badge1 ms-3 pd-sale-price">-50%</span>
              </div>

              <p className="mt-3 mb-3">Mô tả</p>

              <div className="product-size d-flex align-items-center">
                <span className="text-dark me-3">Size:</span>
                <ul className="list-inline-item mb-0">
                  <li className="list-inline-item">
                    <a
                      href="#"
                      className={`tag ${activeSize === 0 ? "active" : ""}`}
                      onClick={() => isActive(0)}
                    >
                      5ml
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="#"
                      className={`tag ${activeSize === 1 ? "active" : ""}`}
                      onClick={() => isActive(1)}
                    >
                      30ml
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="#"
                      className={`tag ${activeSize === 2 ? "active" : ""}`}
                      onClick={() => isActive(2)}
                    >
                      100ml
                    </a>
                  </li>
                </ul>
              </div>
              <div className="d-flex align-items-center mb-3">
                <QuantityBox />
                <Button className="addToCartBtn ms-2">
                  <FaCartShopping />
                  Thêm vào giỏ
                </Button>

                <Tooltip title="Yêu thích" placement="top">
                  <Button className="btn-blue btn-circle btn-big ms-2 me-2 ">
                    <FaRegHeart />
                  </Button>
                </Tooltip>
                <Tooltip title="So sánh" placement="top">
                  <Button className="btn-blue btn-circle btn-big me-2">
                    <MdCompareArrows />
                  </Button>
                </Tooltip>
              </div>
            </div>

            {/* Tabs hiển thị nội dung */}

            <div className="tab-content">
              <TabContentPD />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
