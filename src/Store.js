import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Features/ProductFetch";
import cartReducer from "./Features/CartDetails";
import authReducer from "./Features/Autherisation";
import userReducer from "./Features/UserRegister";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    users:userReducer,
  },
});