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
      const newPitsa = action.payload;
      const findItem = state.items.find(
        (obj) =>
          obj.id === newPitsa.id &&
          obj.size === newPitsa.size &&
          obj.type === newPitsa.type
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
      const deletePitsa = action.payload;
      const findItem = state.items.find(
        (obj) =>
          obj.id === deletePitsa.id &&
          obj.size === deletePitsa.size &&
          obj.type === deletePitsa.type
      );
      if (findItem && findItem.count === 1) {
        state.items = state.items.filter(
          (obj) =>
            obj.id !== deletePitsa.id ||
            obj.size !== deletePitsa.size ||
            obj.type !== deletePitsa.type
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
      const currentPitsa = action.payload;
      state.items = state.items.filter(
        (obj) =>
          obj.id !== currentPitsa.id ||
          obj.size !== currentPitsa.size ||
          obj.type !== currentPitsa.type
      );
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, minusItem, clearCart, removeItem } =
  cartSlice.actions;

export default cartSlice.reducer;
