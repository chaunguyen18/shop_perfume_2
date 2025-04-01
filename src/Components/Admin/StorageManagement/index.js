import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StorageManagement = () => {
  const [storageData, setStorageData] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newQuantity, setNewQuantity] = useState(0);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [warnedProducts, setWarnedProducts] = useState(new Set());

  useEffect(() => {
    fetchStorageData();
  }, []);

  useEffect(() => {
    const newWarnings = new Set(warnedProducts);
    storageData.forEach((item) => {
      if (item.CTSP_SOLUONG <= 5 && !warnedProducts.has(item.SP_MA)) {
        toast.warning(
          `Sản phẩm mã ${item.SP_MA} sắp hết, vui lòng nhập hàng thêm!`,
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
        newWarnings.add(item.SP_MA);
      }
    });
    setWarnedProducts(newWarnings);
  }, [storageData]);

  const fetchStorageData = () => {
    axios
      .get("http://localhost:5000/api/storage")
      .then((response) => {
        setStorageData(response.data);
        const total = response.data.reduce(
          (sum, item) => sum + (item.CTSP_SOLUONG || 0),
          0
        );
        setTotalProducts(total);
      })
      .catch((error) => console.error("Lỗi khi lấy dữ liệu kho hàng:", error));
  };

  const handleAddQuantity = () => {
    if (!selectedProduct || newQuantity <= 0) return;
    axios
      .put(`http://localhost:5000/api/storage/${selectedProduct.SP_MA}`, {
        CTSP_SOLUONG: newQuantity,
      })
      .then(() => {
        setShowAddModal(null);
        fetchStorageData();
      })
      .catch((error) => console.error("Lỗi khi sửa:", error));
  };

  const handleUpdateQuantity = () => {
    if (!selectedProduct) return;

    if (newQuantity === 0) {
      toast.error("Không được cập nhật số lượng là 0!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    axios
      .put(
        `http://localhost:5000/api/storage/update/${selectedProduct.SP_MA}`,
        {
          CTSP_SOLUONG: newQuantity,
        }
      )
      .then(() => {
        setShowUpdateModal(false);
        fetchStorageData();
        toast.success("Cập nhật số lượng thành công!", {
          position: "top-right",
          autoClose: 3000,
        });
      })
      .catch((error) => {
        console.error("Lỗi khi sửa:", error);
        toast.error("Lỗi khi cập nhật số lượng!", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="container-fluid">
      <div className="storage-management">
        <div className="storage-management-header">
          <h1>Quản lý kho hàng</h1>
        </div>

        <div className="total-products">
          <h3>Tổng số sản phẩm trong kho: {totalProducts}</h3>
        </div>

        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Mã sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {storageData.map((item) => (
              <tr key={item.SP_MA}>
                <td>{item.SP_MA}</td>
                <td>{item.SP_TEN}</td>
                <td>{item.CTSP_SOLUONG || 0}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setSelectedProduct(item);
                      setShowAddModal(true);
                    }}
                  >
                    Thêm số lượng
                  </button>
                  <button
                    className="btn btn-warning mx-2"
                    onClick={() => {
                      setSelectedProduct(item);
                      setShowUpdateModal(true);
                    }}
                  >
                    Cập nhật
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="modal fade show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thêm số lượng sản phẩm</h5>
                
              </div>
              <div className="modal-body">
                <p>
                  Sản phẩm: <strong>{selectedProduct?.SP_TEN}</strong>
                </p>
                <input
                  type="number"
                  className="form-control"
                  value={newQuantity}
                  onChange={(e) =>
                    setNewQuantity(parseInt(e.target.value) || 0)
                  }
                  placeholder="Nhập số lượng muốn thêm"
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Hủy
                </button>
                <button className="btn btn-primary" onClick={handleAddQuantity}>
                  Thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showUpdateModal && (
        <div className="modal fade show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Cập nhật số lượng sản phẩm</h5>
                
              </div>
              <div className="modal-body">
                <p>
                  Sản phẩm: <strong>{selectedProduct?.SP_TEN}</strong>
                </p>
                <input
                  type="number"
                  className="form-control"
                  value={newQuantity}
                  onChange={(e) =>
                    setNewQuantity(parseInt(e.target.value) || 0)
                  }
                  placeholder="Nhập số lượng muốn cập nhật"
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowUpdateModal(false)}
                >
                  Hủy
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleUpdateQuantity}
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StorageManagement;
