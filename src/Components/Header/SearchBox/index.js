import { FaSearch } from "react-icons/fa";
import Button from "@mui/material/Button";

const SearchBox = () => {
  return (
    <>
      <div className="headerSearch ml-3 mr-3">
        <input type="text" placeholder="Tìm kiếm sản phẩm..."></input>
        <Button>
          <FaSearch />
        </Button>
      </div>
    </>
  );
};

export default SearchBox;
