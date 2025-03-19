import React from 'react'
import SidebarAdmin from '../../Components/SidebarAdmin'

const Admin = () => {
  return (
    <div>
      <div className='container-fluid'>
        <div className='row admin'>
          <div className='col-md-3'>
            <SidebarAdmin />
          </div>
          <div className='col-md-9 admin-content mt-5 d-flex justify-content-center align-items-center'>
            <h1>Chào mừng đến với trang admin</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin