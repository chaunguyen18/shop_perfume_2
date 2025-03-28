import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Listing from "./Pages/Listing";
import ProductDetails from "./Pages/ProductDetails";
import GoToTop from "./Components/GoToTop";
import ContactUs from "./Pages/ContactUs";
import About from "./Pages/About";
import Terms from "./Pages/Terms";
import Account from "./Pages/Account";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Authentication from "./Pages/Authentication";
import Customer from "./Pages/Customer";
import Admin from "./Pages/Admin";
import Cart from "./Pages/Cart";
import { CartProvider } from "./Components/CartContext/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkout from "./Pages/Checkout";


function App() {
  return (

    <CartProvider>

<ToastContainer />


    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/terms/:policy" element={<Terms />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/:option" element={<Account />} />
        <Route path="/customer-home" element={<Customer />} />
        <Route path="/admin-home" element={<Admin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cat" element={<Listing />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/product/:id" element={<ProductDetails/>} />
      </Routes>
      <GoToTop />
      

    </BrowserRouter>

    </CartProvider>
  );
}

export default App;
