import { createSlice } from '@reduxjs/toolkit';
import { getPizzaListThunk } from '../thunk/getPizzaListThunk';
import { PizzaType } from '../../types/pizzaType';

interface InitialStateTypes {
  items: Array<PizzaType>;
  isLoading: boolean;
  isError: boolean;
}
const initialState = {
  items: [],
  isLoading: false,
  isError: false,
} as InitialStateTypes;

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPizzaListThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPizzaListThunk.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(getPizzaListThunk.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export default menuSlice.reducer;
