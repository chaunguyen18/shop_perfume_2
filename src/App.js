import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Listing from "./Pages/Listing";
import ProductDetails from "./Pages/ProductDetails";
import GoToTop from "./Components/GoToTop";
import ContactUs from "./Pages/ContactUs";
import About from "./Pages/About";
import Terms from "./Pages/Terms";
import Account from "./Pages/Account";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/terms/:policy" element={<Terms />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/:option" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cat/:id" element={<Listing />} />
        <Route path="/product/:id" element={<ProductDetails/>} />
      </Routes>
      <GoToTop />
      <Footer />

    </BrowserRouter>
  );
}

export default App;
