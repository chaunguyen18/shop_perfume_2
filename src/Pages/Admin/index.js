import React, { useState } from 'react'
import SidebarAdmin from '../../Components/SidebarAdmin'
import { FaBars } from "react-icons/fa";

const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className='container-fluid'>
      <div className='row admin'>
   
        <div className={isSidebarOpen ? 'col-md-3' : 'd-none'}>
          <SidebarAdmin isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        </div>

        
        <div className={isSidebarOpen ? 'col-md-9' : 'col-md-12'} 
          style={{ transition: 'all 0.3s ease-in-out' }}>
         
          {!isSidebarOpen && <FaBars className='sidebar-icon-menu' onClick={() => setIsSidebarOpen(true)} />}
          
          <div className='admin-content mt-5 d-flex justify-content-center align-items-center'>
            <h1>Chào mừng đến với trang admin</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;