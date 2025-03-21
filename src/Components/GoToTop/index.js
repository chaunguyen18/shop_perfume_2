import { React, useState, useEffect } from "react";
import { Button } from "@mui/material";
import { FaArrowUp } from "react-icons/fa";

const GoToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      {showButton && (
        <Button onClick={scrollToTop} className="gototop">
          <FaArrowUp />
        </Button>
      )}
    </>
  );
};

export default GoToTop;
