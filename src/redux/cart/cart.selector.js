import { createSelector } from "reselect";

const cartSelector = state => state.cart;

export const cartItemsSelector = createSelector(
  [cartSelector],
  cart => cart.items
);

export const totolSelector = createSelector(
  [cartSelector],
  cart => cart.total
);
