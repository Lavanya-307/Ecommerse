import React, { useState } from "react";
import Navbar from "./Components/Nav";
import ProductList from "./Components/ProductList";
import Cart from "./Components/Cart";
import Login from "./Components/Login";
import Register from "./Components/Register";
import image from "./Asserts/ecommerse.png";

function App() {
  const [page, setPage] = useState("Register");

  return (
    <>
      <Navbar setPage={setPage} />
      {page === "" && <img src={image} alt="my pic" width="100%" />}
      {page === "login" && <Login setPage={setPage} />}
      {page === "products" && <ProductList setPage={setPage} />}
      {page === "cart" && <Cart setPage={setPage} />}
      {page === "Register" && <Register setPage={setPage} />}
    </>
  );
}

export default App;