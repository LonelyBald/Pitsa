import { createSlice } from '@reduxjs/toolkit';
interface InitialStateType {
  categoryId: number;
  sort: { name: string; sortProperty: string };
  currentPage: number;
}

const initialState = {
  categoryId: 0,
  sort: { name: 'популярности', sortProperty: 'rating' },
  currentPage: 1,
} as InitialStateType;

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.sort = action.payload.sort;
      state.currentPage = action.payload.currentPage;
      state.categoryId = action.payload.categoryId;
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
