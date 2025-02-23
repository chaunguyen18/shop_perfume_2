import React, { useState } from "react";
import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";

const QuantityBox = () => {
  const [inputVal, setInputVal] = useState(1);

  const minus = () => {
    if (inputVal > 0 && inputVal !== 1) {
      setInputVal(inputVal - 1);
    }
  };

  const plus = () => {
    setInputVal(inputVal + 1);
  };

  return (
    <div className="quantityDrop d-flex align-items-center">
      <Button onClick={minus}>
        <FaMinus />
      </Button>
      <input type="text" value={inputVal} />
      <Button onClick={plus}>
        <FaPlus />
      </Button>
    </div>
  );
};

export default QuantityBox;
