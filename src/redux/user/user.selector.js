import { createSelector } from "reselect";

const userSelector = state => state.user;

export const deliveryInfoSelector = createSelector(
  [userSelector],
  user => user.deliveryInfo
);
