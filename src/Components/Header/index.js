import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import CountryDropDown from "../CountryDropDown";
import { FaUserAlt } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import SearchBox from "./SearchBox";
import Navigation from "./Navigation";

const Header = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <div className="headerWrapper">
        <div className="top-strip bg-black">
          <div className="container">
            <p className="mb-0 mt-0 text-center">
              <b></b>Freeship cho tất cả đơn hàng
            </p>
          </div>
        </div>
      </div>
      <header className="header">
        <div className="container">
          <div className="row">
            <div className="logoWrapper col-sm-2 d-flex align-items-center">
              <Link to="/customer-home">
                <img src={Logo} alt="logo"></img>
              </Link>
            </div>
            <div className="col-sm-10 d-flex align-items-center part2">
              <CountryDropDown />
              <SearchBox />
              <div className="part3 d-flex align-items-center ml-auto">
                <Button className="circle mr-3">
                  <Link to="/account">
                    <FaUserAlt />
                  </Link>
                </Button>
                <div className="ml-auto cartTab d-flex align-items-center">
                  <span className="price">{totalPrice}đ</span>

                  <div className="position-relative ml-2">
                    <Link to="/cart">
                      <Button className="circle">
                        <FaCartShopping />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="navWrapper">
        <Navigation />
      </div>
    </>
  );
};

export default Header;
