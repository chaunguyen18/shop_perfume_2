import React, { useState } from "react";
import Button from "@mui/material/Button";
import { FaPlus, FaMinus } from "react-icons/fa";

const QuantityBox = ({ onQuantityChange }) => {
  const [inputVal, setInputVal] = useState(1);

  const minus = () => {
    if (inputVal > 1) {
      const newVal = inputVal - 1;
      setInputVal(newVal);
      onQuantityChange(newVal); 
    }
  };

  const plus = () => {
    const newVal = inputVal + 1;
    setInputVal(newVal);
    onQuantityChange(newVal);
  };

  return (
    <div className="quantityDrop d-flex align-items-center">
      <Button onClick={minus}>
        <FaMinus />
      </Button>
      <input type="text" value={inputVal} readOnly />
      <Button onClick={plus}>
        <FaPlus />
      </Button>
    </div>
  );
};

export default QuantityBox;
