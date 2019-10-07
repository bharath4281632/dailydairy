import { UserActionTypes } from "./user.types";

export const setCurrentUser = userInfo => {
  return { type: UserActionTypes.SET_CURRENT_USER, payload: userInfo };
};

export const setAnonymous = status => {
  return { type: UserActionTypes.SET_ANONYMOUS, payload: status };
};
export const setAdmin = status => {
  return { type: UserActionTypes.SET_ADMIN, payload: status };
};

export const setDelivery = info => {
  return { type: UserActionTypes.SET_DELIVERY_INFO, payload: info };
};
