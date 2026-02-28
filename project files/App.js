import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import ForgotPassword from "./pages/ForgotPassword";
import RestaurantMenu from "./pages/RestaurantMenu";
import OrderSuccess from "./pages/OrderSuccess";

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  return (
    <Layout cart={cart} search={search} setSearch={setSearch}>
      <Routes>
        <Route
          path="/"
          element={<Home cart={cart} setCart={setCart} search={search} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/cart"
          element={<Cart cart={cart} setCart={setCart} />}
        />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/restaurant/:id" element={<RestaurantMenu cart={cart}setCart={setCart} />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>
    </Layout>
  );
}

export default App;