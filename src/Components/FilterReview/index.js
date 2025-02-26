import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const FilterReview = () => {
  const [timeAnchorEl, setTimeAnchorEl] = useState(null);
  const [selectedTime, setSelectedTime] = useState("Lọc theo thời gian");

  // State cho bộ lọc theo số sao
  const [starAnchorEl, setStarAnchorEl] = useState(null);
  const [selectedStars, setSelectedStars] = useState("Lọc theo số sao");

  const handleTimeClick = (event) => {
    setTimeAnchorEl(event.currentTarget);
  };

  const handleTimeClose = (option) => {
    if (option) setSelectedTime(option);
    setTimeAnchorEl(null);
  };

  const openTime = Boolean(timeAnchorEl);

  const handleStarClick = (event) => {
    setStarAnchorEl(event.currentTarget);
  };

  const handleStarClose = (stars) => {
    if (stars) setSelectedStars(stars);
    setStarAnchorEl(null);
  };

  const openStar = Boolean(starAnchorEl);

  return (
    <div className="review-fliter">
      <Button className="filter-by-time" onClick={handleTimeClick}>
        {selectedTime}
      </Button>
      <Menu
        anchorEl={timeAnchorEl}
        open={openTime}
        onClose={() => handleTimeClose(null)}
      >
        <MenuItem onClick={() => handleTimeClose("Mới nhất")}>
          Mới nhất
        </MenuItem>
        <MenuItem onClick={() => handleTimeClose("Cũ nhất")}>Cũ nhất</MenuItem>
        <MenuItem onClick={() => handleTimeClose("Được đánh giá cao")}>
          Được đánh giá cao
        </MenuItem>
      </Menu>

      <Button className="filter-by-star" onClick={handleStarClick}>
        {selectedStars}
      </Button>
      <Menu
        anchorEl={starAnchorEl}
        open={openStar}
        onClose={() => handleStarClose(null)}
      >
        <MenuItem onClick={() => handleStarClose("5 sao")}>5 sao</MenuItem>
        <MenuItem onClick={() => handleStarClose("4 sao")}>4 sao</MenuItem>
        <MenuItem onClick={() => handleStarClose("3 sao")}>3 sao</MenuItem>
        <MenuItem onClick={() => handleStarClose("2 sao")}>2 sao</MenuItem>
        <MenuItem onClick={() => handleStarClose("1 sao")}>1 sao</MenuItem>
      </Menu>
    </div>
  );
};

export default FilterReview;
