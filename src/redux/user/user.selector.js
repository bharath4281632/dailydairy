import { createSelector } from "reselect";

const userSelector = state => state.user;

export const deliveryInfoSelector = createSelector(
  [userSelector],
  user => user.deliveryInfo
);

export const currentUser = createSelector(
  [userSelector],
  user => user.currentUser
);
export const isAdminSelector = createSelector(
  [userSelector],
  user => user.isAdmin
);
