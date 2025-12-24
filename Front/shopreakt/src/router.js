import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MainPage from "./routes/Main";
import { UserProvider } from "./context/UserContext";
import ProductPage from "./routes/ProductP";
import AccountPage from "./routes/Account";
import CartPage from "./routes/Cart";
import { CartProvider } from "./context/CartContext";
import OrderSuccess from "./routes/Order";

const AppRouter = () => {
  return (
    <Router>
      <UserProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/order" element={<OrderSuccess />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </CartProvider>
      </UserProvider>
    </Router>
  );
};

export default AppRouter;
