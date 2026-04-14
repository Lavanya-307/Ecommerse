import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Nav";
import ProductList from "./Components/ProductList";
import Cart from "./Components/Cart";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ProductDetails from "./Features/ProductDetails"; // 


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        
        <Route path="/" element={<Register />} />

      
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;