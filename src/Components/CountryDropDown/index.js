import Button from "@mui/material/Button";
import { FaAngleDown } from "react-icons/fa";
import Dialog from "@mui/material/Dialog";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useState, useEffect } from "react";
import axios from "axios";

const CountryDropDown = () => {
  const [isOpenModal, setisOpenModal] = useState(false);
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("Chọn quốc gia");

  useEffect(() => {
    if (isOpenModal) {
      setLoading(true);
      axios
        .get("https://restcountries.com/v3.1/all") // API lấy danh sách quốc gia
        .then((response) => {
          setCountries(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError("Không thể tải danh sách quốc gia");
          setLoading(false);
        });
    }
  }, [isOpenModal]);

  const filteredCountries = countries
    .filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    ) // Lọc theo từ khóa
    .sort((a, b) => a.name.common.localeCompare(b.name.common));

  const handleCountrySelect = (countryName) => {
    setSelectedCountry(countryName);
    setisOpenModal(false);
  };

  return (
    <>
      <Button className="countryDrop" onClick={() => setisOpenModal(true)}>
        <div className="info d-flex flex-column">
          <span className="label">Địa chỉ của bạn</span>
          <span className="name">{selectedCountry}</span>
        </div>
        <span className="ml-auto">
          <FaAngleDown />
        </span>
      </Button>

      <Dialog open={isOpenModal} className="locationModal">
        <h5>Chọn địa điểm của bạn</h5>
        <Button
          className="close_countrylist"
          onClick={() => setisOpenModal(false)}
        >
          <IoMdClose />
        </Button>
        <div className="headerSearch w-100">
          <input
            type="text"
            placeholder="Tìm kiếm địa chỉ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
          <Button>
            <FaSearch />
          </Button>
        </div>

        {/* Kiểm tra trạng thái loading */}
        {loading && <p>Đang tải danh sách quốc gia...</p>}
        {error && <p>{error}</p>}

        <ul className="countryList mt-2">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <li key={country.cca3}>
                <Button onClick={() => handleCountrySelect(country.name.common)}>{country.name.common}</Button>
              </li>
            ))
          ) : (
            <p>Không có quốc gia nào khớp với từ khóa tìm kiếm.</p>
          )}
        </ul>
      </Dialog>
    </>
  );
};

export default CountryDropDown;
