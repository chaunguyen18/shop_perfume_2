import React from 'react'
import HeaderAdmin from '../../Components/HeaderAdmin'
import FooterAdmin from '../../Components/FooterAdmin'
import SidebarAdmin from '../../Components/SidebarAdmin'

const Admin = () => {
  return (
    <div>
      <HeaderAdmin />
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-5'>
            <SidebarAdmin />
          </div>
          <div className='col-md-7 admin-content'>
            Admin content
          </div>
        </div>
      </div>
      <FooterAdmin />
    </div>
  )
}

export default Admin