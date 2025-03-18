import React from 'react'
import Logo from '../../assets/images/logo.png'
import { FaUserAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { GrSort } from "react-icons/gr";
import { BiSolidReport } from "react-icons/bi";
import { TbReportAnalytics } from "react-icons/tb";
import { GrStorage } from "react-icons/gr";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaCopyright } from "react-icons/fa6";

const SidebarAdmin = () => {
  return (
    <div>
        <div className='sidebar-admin'>
            <h1>Quản lý</h1>
            <FaBars />
            <IoClose />
            {/* <img src={Logo} 
            alt="login-ava"
            className="img-fluid rounded-circle mb-3"
            style={{ maxWidth: "120px", height: "auto" }}/> */}
            <div className='row sidebar-admin-content'>
              <div className='sidebar-admin-content-action'>
                <FaUserAlt className='mx-3 mb-1'/>Quản lý tài khoản
              </div>
              <div className='sidebar-admin-content-action'>
                <FaUsers className='mx-3 mb-1'/>Quản lý khách hàng
              </div>
              <div className='sidebar-admin-content-action'>
                <FaBox className='mx-3 mb-1'/>Quản lý sản phẩm
              </div>
              <div className='sidebar-admin-content-action'>
                <GrSort className='mx-3 mb-1'/>Quản lý loại sản phẩm
              </div>
              <div className='sidebar-admin-content-action'>
                <FaTruck className='mx-3 mb-1'/>Quản lý đơn hàng
              </div>
              <div className='sidebar-admin-content-action'>
                <GrStorage className='mx-3 mb-1'/>Quản lý kho hàng
              </div>
              <div className='sidebar-admin-content-action'>
                <BiSolidReport className='mx-3 mb-1'/>Thống kê
              </div>
              <div className='sidebar-admin-content-action'>
                <TbReportAnalytics className='mx-3 mb-1'/>Báo cáo
              </div>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
              <h5><FaCopyright className='mx-2 mb-1'/>Bản quyền thuộc về FADE Perfume 2025</h5>
            </div>
        </div>
    </div>
  )
}

export default SidebarAdmin