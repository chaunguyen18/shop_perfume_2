import React from 'react';
import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className='footerWrapper'>
        <div className='container'>
        <div className='row'>
            <div className='logoWrapper col-sm-3 d-flex align-items-center'>
            <Link to="/">
                {/* <img src={Logo} alt="logo"></img> */}
                <h1>FADE</h1>
              </Link>
            </div>
            <div className='col-3'>
                <h4>Address</h4>
                <span className='row'>Khu II DHCT</span>
            </div>
            <div className='col-3'>
            <h4>Contact</h4>
            <span className='row'>Facebook</span>
            <span className='row'>Tiktok</span>
            <span className='row'>Instagram</span></div>
            <div className='col-3'>
            <h4>Terms</h4>
            <span className='row'>Chinh sach doi tra hang</span>
            <span className='row'>Chinh sach giao hang</span>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Footer;