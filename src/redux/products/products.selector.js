import { createSelector } from "reselect";

const productSelector = state => state.products;

export const milkSelector = createSelector(
  [productSelector],
  products => products.milk
);
