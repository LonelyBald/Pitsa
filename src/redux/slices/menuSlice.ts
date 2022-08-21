import { createSlice } from '@reduxjs/toolkit';
import { getPitsaListThunk } from '../thunk/getPitsaListThunk';
import { PitsaType } from '../../types/pitsaType';

interface InitialStateTypes {
  items: Array<PitsaType>;
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
    builder.addCase(getPitsaListThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPitsaListThunk.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(getPitsaListThunk.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export default menuSlice.reducer;
