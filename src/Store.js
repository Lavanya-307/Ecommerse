import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Features/ProductSlice";
import cartReducer from "./Features/CartSlice";
import authReducer from "./Features/AuthSlice";
import userReducer from "./Features/UserSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    users:userReducer,
  },
});