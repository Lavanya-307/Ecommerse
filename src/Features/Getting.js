import { createSelector } from "@reduxjs/toolkit";
// import { fetchProducts } from "../Features/ProductSlice";

export const selectFilteredProducts = createSelector(
  [
    (state) => state.products.items,
    (state) => state.products.search
  ],
  (products, search) => {
    if (!search)
         return products;

    const term = search.toLowerCase();

    return products.filter((p) =>
      p.title.toLowerCase().includes(term)
);
  }
);