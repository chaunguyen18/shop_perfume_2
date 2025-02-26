import React from "react";
import { IoClose } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ReviewModal = ({ open, closeProductModal }) => {
  return (
    <Dialog open={open} className="reviewModal" onClose={closeProductModal}>
      <div className="container d-flex flex-column p-4">
        <Button className="close_" onClick={closeProductModal}>
          <IoClose />
        </Button>
        <h3 className="">Đánh giá sản phẩm</h3>
        <div className="d-flex align-items-center row mb-3">
          <div className="col-3">
            <img
              src="https://product.hstatic.net/1000340570/product/gucci-flora-gorgeous-jasmine-mini-size_2dfddfdb0b734a1298e4542938354742_master.jpg"
              alt=""
              className="w-100 mb-3"
            />
          </div>
          <div className="col-9 ">
            <span className="ms-3">Ten sp</span>
            <span className="ms-3">Ten brand</span>
          </div>
        </div>

        <Rating name="size-large" value={5} size="large" precision={0.5} />
        <div className="row mt-3 mb-3">
          <h5>Tiêu đề</h5>
          <input type="text" placeholder="Nhập tiêu đề ở đây..." />
        </div>
        <div className="row">
          <h5>Mô tả</h5>
          <textarea type="text" placeholder="Nhập mô tả ở đây..." />
        </div>
        <div className="mt-3 mb-3">
          <h5>Hình ảnh</h5>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload files
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => console.log(event.target.files)}
              multiple
            />
          </Button>
        </div>
        <div className="reviewBtn">
          <Button className="">
            <IoIosSend />
            Gửi đánh giá
          </Button>
          <Button className="ms-3" onClick={closeProductModal}>
            <IoCloseCircleOutline />
            Hủy
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ReviewModal;
