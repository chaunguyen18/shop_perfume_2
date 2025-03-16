import React from "react";
import { Link, useParams } from "react-router-dom";
import termsData from "./termsData";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const Terms = () => {
  const { policy } = useParams();
  const term = termsData[policy] || "Chọn một chính sách để xem nội dung";

  return (
    <div >
    <Header />
    <div className="container term">
      <div className="row d-flex">
        <div className="col-md-4 mt-2 ">
          <ul className="list-group">
            <li className="list-group-item">
              <Link to="/terms/chinh-sach-doi-tra">
                Chính sách đổi trả hàng
              </Link>
            </li>
            <li className="list-group-item">
              <Link to="/terms/chinh-sach-giao-hang">Chính sách giao hàng</Link>
            </li>
            <li className="list-group-item">
              <Link to="/terms/chinh-sach-khach-hang">
                Chính sách dành cho khách hàng
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-8 term-content mt-2 mb-3">
          {term ? (
            <>
              <h2>{term.title}</h2>
              <div className="term-content-children" dangerouslySetInnerHTML={{ __html: term.content }}></div>
            </>
          ) : (
            <h2>Chọn một chính sách để xem nội dung.</h2>
          )}
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default Terms;
