import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export interface PitsaListThunkTypes {
  currentPage: number;
  category: string;
  sortBy: string;
  order: boolean;
  search: string;
}

export const getPitsaListThunk = createAsyncThunk(
  'menu/getPitsaList',
  async ({
    currentPage = 0,
    category = '',
    sortBy = '',
    order = false,
    search = '',
  }: PitsaListThunkTypes) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}pitsa/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return response.data;
  }
);
