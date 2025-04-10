import Button from "@mui/material/Button";
import { MdOutlineMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Navigation = () => {
  const [isOpenSidebarNav, setIsOpenSidebarNav] = useState(false); 
  const [isOpen, setIsOpen] = useState(true); 

  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className=" header-customer">
      {isOpen ? (
        <div className="container">
          <div className="row">
            <div className="col-sm-3 navPart1">
              <Button
                className="allCatTab align-items-center"
                onClick={() => setIsOpenSidebarNav(!isOpenSidebarNav)}
              >
                <span className="menu">
                  <MdOutlineMenu />
                </span>
                <span className="text">Tất cả sản phẩm</span>
              </Button>
              <div className={`sidebarNav ${isOpenSidebarNav ? "open" : "closed"}`}>
                <ul>
                  <li><Link to="/nam">Nước hoa nam</Link></li>
                  <li><Link to="/nu">Nước hoa nữ</Link></li>
                  <li><Link to="/brand">Thương hiệu</Link></li>
                  <li><Link to="/giftset">Giftset</Link></li>
                  <li><Link to="/mini">Mini</Link></li>
                </ul>
              </div>
            </div>

            
            
              <div className="col-sm-9 navPart2 d-flex ml-auto">
                <IoClose className="icon-close" onClick={() => setIsOpen(false)} />
                <ul className="list list-inline w-100">
                  <li className="list-inline-item">
                    <Link to="/customer-home">Trang chủ</Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="/cat">
                      Sản phẩm
                      <span className="product-angledown"><FaAngleDown /></span>
                    </Link>
                    <div className="submenu shadow">
                      <Link to="/nam">Nước hoa nam</Link>
                      <Link to="/nu">Nước hoa nữ</Link>
                      <div className="submenu-item">
                        <Link to="/brand">Thương hiệu</Link>
                        <ul className="submenu-list">
                          <li><Link to="/brand/gucci">Gucci</Link></li>
                          <li><Link to="/brand/tomford">Tom Ford</Link></li>
                          <li><Link to="/brand/channel">Channel</Link></li>
                          <li><Link to="/brand/versace">Versace</Link></li>
                          <li><Link to="/brand/burberry">Burberry</Link></li>
                        </ul>
                      </div>
                      <Link to="/giftset">Giftset</Link>
                      <Link to="/mini">Mini</Link>
                    </div>
                  </li>
                  <li className="list-inline-item"><Link to="/blog">Blog</Link></li>
                  <li className="list-inline-item"><Link to="/about">About</Link></li>
                  <li className="list-inline-item"><Link to="/contactus">Contact Us</Link></li>
                  <li className="list-inline-item"><Link to="/comingsoon">Sắp ra mắt</Link></li>
                </ul>
              </div>
            
          </div>
        </div>

        ) : (
          <FaBars className="icon-menu" onClick={() => setIsOpen(true)} />
      )}
      </nav>
    </>
  );
};

export default Navigation;
