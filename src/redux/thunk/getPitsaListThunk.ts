import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../axios';

interface PitsaListThunkTypes {
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
    const response = await instance.get(
      `/pitsa/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return response.data;
  }
);
