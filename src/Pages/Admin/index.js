import React, { useState } from "react";
import SidebarAdmin from "../../Components/SidebarAdmin";
import { FaBars } from "react-icons/fa";
import AccountManagement from "../../Components/Admin/AccountManagement";
import CustomerManagement from "../../Components/Admin/AccountManagement";
import TypeProductManagement from "../../Components/Admin/TypeProductManagement";
import ProductManagement from "../../Components/Admin/ProductManagement";
import OrderManagement from "../../Components/Admin/OrderManagement";
import StorageManagement from "../../Components/Admin/StorageManagement";
import Statistic from "../../Components/Admin/Statistic";
import Report from "../../Components/Admin/Report";

const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [activeContent, setActiveContent] = useState("home"); // State lưu nội dung

  const renderContent = () => {
    switch (activeContent) {
      case "account":
        return <AccountManagement />;
      case "customer":
        return <CustomerManagement />;
      case "product":
        return <ProductManagement />;
      case "typeproduct":
        return <TypeProductManagement />;
      case "order":
        return <OrderManagement />;
      case "storage":
        return <StorageManagement />;
      case "statistic":
        return <Statistic />;
      case "report":
        return <Report />;
      default:
        return <h1>Chào mừng đến với trang admin</h1>;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row admin">
        <div className={isSidebarOpen ? "col-md-3" : "d-none"}>
          <SidebarAdmin
            isOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            setActiveContent={setActiveContent}
          />
        </div>

        <div
          className={isSidebarOpen ? "col-md-9" : "col-md-12"}
          style={{ transition: "all 0.3s ease-in-out" }}
        >
          {!isSidebarOpen && (
            <FaBars
              className="sidebar-icon-menu"
              onClick={() => setIsSidebarOpen(true)}
            />
          )}

          <div className="admin-content mt-5 d-flex justify-content-center align-items-center">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
