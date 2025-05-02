import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import LandingPage from "./pages/LandingPage";
import ProductForm from "./pages/ProductForm";
import EditProductPage from "./pages/EditProductPage";
import NavBar from "./pages/NavBar";
import ProductInfoPage from "./pages/ProductInfoPage";
import CartPage from "./pages/CartPage";
import Profile from "./pages/Profile";
import SelectAddress from "./pages/SelectAddress";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import PaymentOptions from "./pages/PaymentOptions";
import FirstPage from "./pages/FirstPage";

function App() {
  return (
    <BrowserRouter>
      <LocationWrapper />
    </BrowserRouter>
  );
}

function LocationWrapper() {
  const location = useLocation();
  return (
    <div className="min-h-screen">
  {location.pathname !== "/" && location.pathname !== "/login" && <NavBar />}
  <div className="min-h-screen">
        <Routes>
          <Route path="/product/:id" element={<ProductInfoPage />} />
          <Route path="/add-product" element={<ProductForm />} />
          <Route path="/edit-product/:id" element={<EditProductPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/" element={<FirstPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart-page" element={<CartPage />} />
          <Route path="/select-address" element={<SelectAddress />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/payment-options" element={<PaymentOptions />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/my-orders" element={<MyOrders/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
