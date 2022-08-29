import { createSlice } from '@reduxjs/toolkit';
import { CartItemType } from '../../types/cartItemType';

interface InitialStateType {
  totalPrice: number;
  items: Array<CartItemType>;
}
const initialState = {
  totalPrice: 0,
  items: [],
} as InitialStateType;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const newPizza = action.payload;
      const findItem = state.items.find(
        (obj) =>
          obj.id === newPizza.id &&
          obj.size === newPizza.size &&
          obj.type === newPizza.type
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    minusItem(state, action) {
      const deletePizza = action.payload;
      const findItem = state.items.find(
        (obj) =>
          obj.id === deletePizza.id &&
          obj.size === deletePizza.size &&
          obj.type === deletePizza.type
      );
      if (findItem && findItem.count === 1) {
        state.items = state.items.filter(
          (obj) =>
            obj.id !== deletePizza.id ||
            obj.size !== deletePizza.size ||
            obj.type !== deletePizza.type
        );
      }
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    removeItem(state, action) {
      const currentPizza = action.payload;
      state.items = state.items.filter(
        (obj) =>
          obj.id !== currentPizza.id ||
          obj.size !== currentPizza.size ||
          obj.type !== currentPizza.type
      );
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    updateCart (state, action) {
      state.items = action.payload
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0)
    }
  },
});

export const { addItem, minusItem, clearCart, removeItem, updateCart } =
  cartSlice.actions;

export default cartSlice.reducer;
