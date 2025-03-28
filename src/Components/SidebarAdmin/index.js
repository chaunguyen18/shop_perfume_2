import React, { useState } from 'react'
import { FaUserAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { GrSort } from "react-icons/gr";
import { FaChartSimple } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";
import { GrStorage } from "react-icons/gr";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaCopyright } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const SidebarAdmin = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
    {/* {!isOpen && <FaBars className='icon-menu' onClick={toggleSidebar} />} */}
    
    <div className={`sidebar-admin ${isOpen ? 'show' : 'hide'}`}>
      {isOpen ? (
        <div>
          <IoClose className='sidebar-icon-close' onClick={toggleSidebar} />
          <h1 className='sidebar-title'>Quản lý</h1>
          <div className='row sidebar-admin-content'>
            <div className='sidebar-admin-content-action'><FaUserAlt className='mx-3 mb-1' />Quản lý tài khoản</div>
            <div className='sidebar-admin-content-action'><FaUsers className='mx-3 mb-1' />Quản lý khách hàng</div>
            <div className='sidebar-admin-content-action'><FaBox className='mx-3 mb-1' />Quản lý sản phẩm</div>
            <div className='sidebar-admin-content-action'><GrSort className='mx-3 mb-1' />Quản lý loại sản phẩm</div>
            <div className='sidebar-admin-content-action'><FaTruck className='mx-3 mb-1' />Quản lý đơn hàng</div>
            <div className='sidebar-admin-content-action'><GrStorage className='mx-3 mb-1' />Quản lý kho hàng</div>
            <div className='sidebar-admin-content-action'><FaChartSimple className='mx-3 mb-1' />Thống kê</div>
            <div className='sidebar-admin-content-action'><TbReportAnalytics className='mx-3 mb-1' />Báo cáo</div>
            <div className='sidebar-admin-content-action' onClick={handleLogout}><IoLogOut className='mx-3 mb-1' />Đăng xuất</div>
          </div>
          <div className='sidebar-admin-footer'>
            <h5><FaCopyright className='mx-2 mb-1' />Bản quyền thuộc về FADE Perfume 2025</h5>
          </div>
        </div>
      ) : (
        <FaBars className='sidebar-icon-menu' onClick={toggleSidebar} />
      )}
    </div>

    </>
  );
};

export default SidebarAdmin;
