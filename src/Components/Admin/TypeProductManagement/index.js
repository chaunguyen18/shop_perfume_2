import axios from "axios";
import React, { useEffect, useState } from "react";

const TypeProductManagement = () => {
  const [typeProducts, setTypeProducts] = useState([]);
  const [showModal, setShowModal] = useState(null); // 'add', 'edit', 'delete'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProductName, setNewProductName] = useState("");
  const [newProductCode, setNewProductCode] = useState("");

  useEffect(() => {
    fetchTypeProducts();
  }, []);

  const fetchTypeProducts = () => {
    axios
      .get("http://localhost:5000/api/type-product")
      .then((response) => setTypeProducts(response.data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
  };

  const generateProductCode = () => {
    axios
      .get("http://localhost:5000/api/type-product/max-code")
      .then((response) => {
        const maxCode = response.data.maxCode || "L000"; 
        const newCodeNumber = parseInt(maxCode.slice(1)) + 1; 
        const newCode = `L${String(newCodeNumber).padStart(3, "0")}`; 
        setNewProductCode(newCode);
      })
      .catch((error) => console.error("Lỗi khi tạo mã:", error));
  };

  const handleAddProduct = () => {
    axios
      .post("http://localhost:5000/api/type-product", {
        LSP_MA: newProductCode,
        LSP_TEN: newProductName,
      })
      .then(() => {
        setNewProductName("");
        setShowModal(null);
        fetchTypeProducts();
      })
      .catch((error) => console.error("Lỗi khi thêm:", error));
  };

  const handleEditProduct = () => {
    axios
      .put(`http://localhost:5000/api/type-product/${selectedProduct.LSP_MA}`, {
        LSP_TEN: newProductName,
      })
      .then(() => {
        setShowModal(null);
        fetchTypeProducts();
      })
      .catch((error) => console.error("Lỗi khi sửa:", error));
  };

  const handleDeleteProduct = () => {
    axios
      .delete(
        `http://localhost:5000/api/type-product/${selectedProduct.LSP_MA}`
      )
      .then(() => {
        setShowModal(null);
        fetchTypeProducts();
      })
      .catch((error) => console.error("Lỗi khi xóa:", error));
  };

  return (
    <div className="container-fluid">
      <div className="type-product-management">
        <h1 className="text-center">Quản lý loại sản phẩm</h1>
        <button
          className="btn btn-success mb-3"
          onClick={() => {
            generateProductCode();
            setNewProductName("");
            setShowModal("add");
          }}
        >
          Thêm loại sản phẩm
        </button>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Mã loại</th>
              <th>Tên loại sản phẩm</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {typeProducts.length > 0 ? (
              typeProducts.map((item) => (
                <tr key={item.LSP_MA}>
                  <td>{item.LSP_MA}</td>
                  <td>{item.LSP_TEN}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-2"
                      onClick={() => {
                        setSelectedProduct(item);
                        setNewProductCode(item.LSP_MA); 
                        setNewProductName(item.LSP_TEN);
                        setShowModal("edit");
                      }}
                    >
                      Sửa
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => {
                        setSelectedProduct(item);
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

      
      {showModal === "add" && (
        <div className="modal fade show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thêm loại sản phẩm</h5>
                <button className="close" onClick={() => setShowModal(null)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <label>Mã loại sản phẩm:</label>
                <input type="text" className="form-control" value={newProductCode} readOnly />
                <label className="mt-2">Tên loại sản phẩm:</label>
                <input
                  type="text"
                  className="form-control"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  placeholder="Nhập tên loại sản phẩm"
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(null)}>
                  Đóng
                </button>
                <button className="btn btn-primary" onClick={handleAddProduct}>
                  Thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      
      {showModal === "edit" && (
        <div className="modal fade show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Sửa loại sản phẩm</h5>
                <button className="close" onClick={() => setShowModal(null)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <label>Mã loại sản phẩm:</label>
                <input type="text" className="form-control" value={newProductCode} readOnly />
                <label className="mt-2">Tên loại sản phẩm:</label>
                <input
                  type="text"
                  className="form-control"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  placeholder="Nhập tên loại sản phẩm"
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(null)}>
                  Hủy
                </button>
                <button className="btn btn-primary" onClick={handleEditProduct}>
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      
      {showModal === "delete" && (
        <div className="modal fade show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Xóa loại sản phẩm</h5>
                <button className="close" onClick={() => setShowModal(null)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Bạn có chắc muốn xóa loại sản phẩm{" "}
                <strong>{selectedProduct?.LSP_TEN}</strong> không?
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(null)}
                >
                  Hủy
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleDeleteProduct}
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Nền tối khi mở modal */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default TypeProductManagement;
