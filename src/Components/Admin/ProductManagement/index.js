import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProductCode, setNewProductCode] = useState("");
  const [newProductName, setNewProductName] = useState("");
  const [newTPName, setNewTPName] = useState("");
  const [newBrandName, setNewBrandName] = useState("");
  const [newDG, setNewDG] = useState("");
  const [newProductImage, setNewProductImage] = useState("");
  const [showModal, setShowModal] = useState(null);

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = () => {
    axios
      .get("http://localhost:5000/api/product-management")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
  };

  const generateProductCode = () => {
    axios
      .get("http://localhost:5000/api/product-management/max-code")
      .then((response) => {
        const maxCode = response.data.maxCode || "SP00"; 
        const newCodeNumber = parseInt(maxCode.slice(1)) + 1; 
        const newCode = `SP${String(newCodeNumber).padStart(2, "0")}`; 
        setNewProductCode(newCode);
      })
      .catch((error) => console.error("Lỗi khi tạo mã:", error));
  };

  const handleEditProduct = () => {
    if (!selectedProduct) {
      toast.error("Vui lòng chọn sản phẩm!");
      return;
    }

    axios
      .put(
        `http://localhost:5000/api/product-management/${selectedProduct.SP_MA}`,
        {
          SP_MA: newProductCode, 
          SP_TEN: newProductName,
          LSP_TEN: newTPName,
          BRAND_TEN: newBrandName,
          DG_GIANIEMYET: newDG,
          SP_DIENGIAI: newProductImage,
        }
      )
      .then(() => {
        setShowModal(null);
        fetchProductData();
        toast.success("Cập nhật sản phẩm thành công!");
      })
      .catch((error) => {
        console.error("Lỗi khi sửa:", error);
        toast.error("Cập nhật thất bại!");
      });
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="product-management">
          <div className="product-management-header">
            <h2 className="product-management-title text-center">
              Quản lý sản phẩm
            </h2>
          </div>
          <div className="product-management-content">
            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th>Hình ảnh</th>
                  <th style={{ width: "50px" }}>Mã SP</th>
                  <th>Tên SP</th>
                  <th>Loại</th>
                  <th>Thương hiệu</th>
                  <th>Đơn giá niêm yết</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((item) => (
                    <tr key={item.SP_MA}>
                      <td>{item.SP_DIENGIAI}</td>
                      <td style={{ width: "50px" }}>{item.SP_MA}</td>
                      <td>{item.SP_TEN}</td>
                      <td>{item.LSP_TEN}</td>
                      <td>{item.BRAND_TEN}</td>
                      <td>{item.DG_GIANIEMYET}</td>
                      <td>
                        <button
                          className="btn btn-warning mx-2"
                          onClick={() => {
                            setSelectedProduct(item);
                            setNewProductCode(item.SP_MA);
                            setNewProductName(item.SP_TEN);
                            setNewTPName(item.LSP_TEN);
                            setNewBrandName(item.BRAND_TEN);
                            setNewDG(item.DG_GIANIEMYET);
                            setNewProductImage(item.SP_DIENGIAI);
                            setShowModal("edit");

                            setShowModal("edit");
                          }}
                        >
                          Cập nhật
                        </button>
                        <button
                          className="btn btn-warning mx-2"
                          onClick={() => {
                            setSelectedProduct(item);
                            setNewProductCode(item.SP_MA);
                            setNewProductName(item.SP_TEN);
                            setNewTPName(item.LSP_TEN);
                            setNewBrandName(item.BRAND_TEN);
                            setNewDG(item.DG_GIANIEMYET);
                            setNewProductImage(item.SP_DIENGIAI);
                            setShowModal("edit");

                            setShowModal("delete");
                          }}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">
                      Không có dữ liệu
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showModal === "edit" && (
          <div className="modal fade show d-block">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Thay đổi vai trò</h5>
                  <button className="close" onClick={() => setShowModal(null)}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <label>Mã khách hàng:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedProduct?.SP_MA || ""}
                    readOnly
                  />

                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(null)}
                  >
                    Hủy
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleEditProduct}
                  >
                    Lưu thay đổi
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Nền tối khi mở modal */}
        {showModal && <div className="modal-backdrop fade show"></div>}
      </div>
    </div>
  );
};

export default ProductManagement;
