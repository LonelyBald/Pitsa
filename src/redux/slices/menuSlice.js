import { createSlice } from '@reduxjs/toolkit';
import { getPitsaListThunk } from '../thunk/getPitsaListThunk';

const initialState = {
  items: [],
  isLoading: false,
  isError: false,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getPitsaListThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getPitsaListThunk.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(getPitsaListThunk.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export const { setItems, setIsLoading } = menuSlice.actions;

export default menuSlice.reducer;
