import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Listing from "./Pages/Listing";
import ProductDetails from "./Pages/ProductDetails";
import GoToTop from "./Components/GoToTop";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cat/:id" element={<Listing />} />
        <Route path="/product/:id" element={<ProductDetails/>} />
      </Routes>
      <GoToTop />
      <Footer />

    </BrowserRouter>
  );
}

export default App;
