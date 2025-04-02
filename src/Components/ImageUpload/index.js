import { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      console.error("Không có file nào được chọn");
      return;
    }

    setSelectedFile(file);

    // Xem trước ảnh
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Vui lòng chọn một ảnh!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    console.log("FormData:", formData.get("image")); // Kiểm tra dữ liệu

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Upload thành công:", response.data);
      alert("Ảnh đã được tải lên!");
    } catch (error) {
      console.error("Lỗi upload:", error);
      alert("Upload thất bại!");
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imagePreview && <img src={imagePreview} alt="Xem trước ảnh" width="200" />}
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
};

export default ImageUpload;
