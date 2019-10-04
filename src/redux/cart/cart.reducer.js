import { cartActionTypes } from "./cart.types";

const INIT_STATE = {
  items: [],
  total: 0
};

const cartReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case cartActionTypes.ADD_CART_ITEM: {
      let total = state.total + action.payload.rate;
      let items = [...state.items, action.payload];
      return {
        ...state,
        items,
        total
      };
    }
    case cartActionTypes.REMOVE_CART_ITEM: {
      let total = state.total - action.payload.rate;
      let items = state.items.filter(val => val.name !== action.payload.name);
      return {
        ...state,
        items,
        total
      };
    }
    case cartActionTypes.ADD_STOCK: {
      let total = state.total;
      let items = [...state.items];
      if (action.payload.purchase <= action.payload.stock) {
        let index = state.items.indexOf(action.payload);
        total = state.total + action.payload.rate;
        items[index] = {
          ...items[index],
          purchase: action.payload.purchase + 1
        };
      }
      return {
        ...state,
        items,
        total
      };
    }
    case cartActionTypes.REMOVE_STOCK: {
      let total = state.total;
      let items = [...state.items];
      if (action.payload.purchase >= 0) {
        let index = state.items.indexOf(action.payload);
        total = state.total - action.payload.rate;
        items[index] = {
          ...items[index],
          purchase: action.payload.purchase - 1
        };
      }
      return {
        ...state,
        items,
        total
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
