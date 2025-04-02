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
  const [loaiSPList, setLoaiSPList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [dvtList, setDVTList] = useState([]);
  const [newDVTName, setNewDVTName] = useState("");
  const [newPDQuantity, setNewPDQuantity] = useState("");
  const [newPDContent, setNewPDContent] = useState("");
  const [newPDPreserve, setNewPDPreserve] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const [price, setPrice] = useState(0);

  useEffect(() => {
    fetchProductData();
    fetchTProduct();
    fetchBrand();
    fetchUnit();
  }, []);

  const fetchProductData = () => {
    axios
      .get("http://localhost:5000/api/product-management")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
  };
 
  const fetchTProduct = () => {
    axios
      .get("http://localhost:5000/api/type-product")
      .then((response) => setLoaiSPList(response.data))
      .catch((error) => console.error("Lỗi khi lấy loại sản phẩm:", error));
  };

  const fetchBrand = () => {
    axios
      .get("http://localhost:5000/api/brand")
      .then((response) => {
        setBrandList(response.data);
      })
      .catch((error) => console.error("Lỗi khi lấy thương hiệu:", error));
  };

  const fetchUnit = () => {
    axios
      .get("http://localhost:5000/api/unit")
      .then((response) => setDVTList(response.data))
      .catch((error) => console.error("Lỗi khi lấy thương hiệu:", error));
  };

  const generateProductCode = () => {
    axios
      .get("http://localhost:5000/api/product-management/max-code")
      .then((response) => {
        setNewProductCode(response.data.maxCode);
      })
      .catch((error) => console.error("Lỗi khi tạo mã:", error));
  };

  const handleAddProduct = () => {
    axios.post("http://localhost:5000/api/product-management", {
      SP_MA: newProductCode,
      SP_TEN: newProductName,
      LSP_MA: newTPName,
      SP_DIENGIAI: newProductImage,
      BRAND_ID: newBrandName,
      DVT_ID: newDVTName, 
      DG_GIANIEMYET: newDG,
      

    })
      .then(() => {
        setNewProductName("");
        setShowModal(null);
        fetchProductData();
        toast.success("Thêm sản phẩm thành công!", {
          position: "top-right",
          autoClose: 3000,
        });
      })
      .catch((error) => console.error("Lỗi khi thêm:", error));
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

  const handleDeleteProduct = () => {
    axios
      .delete(
        `http://localhost:5000/api/product-management/${selectedProduct.SP_MA}`
      )
      .then(() => {
        setShowModal(null);
        fetchProductData();
        toast.success("Xóa sản phẩm thành công!", {
          position: "top-right",
          autoClose: 3000,
        });
      })
      .catch((error) => console.error("Lỗi khi xóa:", error));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0]; // Kiểm tra files trước khi truy cập
    if (!file) {
      console.error("Không có tệp nào được chọn.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // Hiển thị ảnh xem trước
    };
    reader.readAsDataURL(file);
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
                      <td>
                        <img
                          src={item.SP_DIENGIAI}
                          alt={item.SP_TEN}
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                            display: "block",
                            zIndex: 1000,
                          }}
                        />
                      </td>
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
                          className="btn btn-danger mt-2 mx-2"
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

        {showModal === "add" && (
          <div className="modal fade show d-block">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Thêm sản phẩm mới</h5>
                </div>
                <div className="modal-body">
                  <label>Mã sản phẩm:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newProductCode}
                    onChange={(e) => setNewProductCode(e.target.value)}
                    readOnly
                  />

                  <label>Tên sản phẩm:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                  />

                  <label>Loại sản phẩm:</label>
                  <select
                    className="form-control"
                    value={newTPName}
                    onChange={(e) => setNewTPName(e.target.value)}
                  >
                    <option value="">-- Chọn loại sản phẩm --</option>
                    {loaiSPList.map((loai) => (
                      <option key={loai.LSP_MA} value={loai.LSP_MA}>
                        {loai.LSP_TEN}
                      </option>
                    ))}
                  </select>

                  <label>Thương hiệu:</label>
                  <select
                    className="form-control"
                    value={newBrandName}
                    onChange={(e) => setNewBrandName(e.target.value)}
                  >
                    <option value="">-- Chọn thương hiệu --</option>
                    {brandList.map((index) => (
                      <option key={index.BRAND_ID} value={index.BRAND_ID}>
                        {index.BRAND_TEN || "Không có tên"}
                      </option>
                    ))}
                  </select>

                  <label>Ảnh sản phẩm:</label>
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    accept="image/*"
                  />

                  <label>Giá niêm yết:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={newDG}
                    onChange={(e) => setNewDG(e.target.value)}
                  />

                  <label>Đơn vị tính:</label>
                  <select
                    className="form-control"
                    value={newDVTName}
                    onChange={(e) => {
                      setNewDVTName(e.target.value);
                    }}
                  >
                    <option value="">-- Chọn đơn vị --</option>
                    {dvtList.map((dvt) => (
                      <option key={dvt.DVT_ID} value={dvt.DVT_ID}>
                        {dvt.DVT_TEN}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(null)}
                  >
                    Đóng
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={handleAddProduct}
                  >
                    Thêm
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
                  <h5 className="modal-title">Xóa sản phẩm</h5>
                  <button className="close" onClick={() => setShowModal(null)}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  Bạn có chắc muốn xóa sản phẩm{" "}
                  <strong>{selectedProduct?.SP_TEN}</strong> không?
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
    </div>
  );
};

export default ProductManagement;
