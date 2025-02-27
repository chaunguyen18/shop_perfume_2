import { Button } from "@mui/material";
import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

const AddressCustomer = () => {
  return (
    <div className="container mt-3 p-4 border rounded bg-white address-cus">
      <div className="d-flex align-items-center justify-content-center address-action">
        <h3>Địa chỉ giao hàng</h3>
        <Button className="ms-auto edit-btn">
          <FaPencilAlt />
          Thay đổi
        </Button>
      </div>
      <p>
        <FaHome /> 123 Đường ABC, Quận 1, TP.HCM
      </p>
      <p>
        <FaHome />
        456 Đường XYZ, Quận 2, TP.HCM
      </p>
    </div>
  );
};

export default AddressCustomer;
