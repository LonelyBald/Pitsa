import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../axios';

interface PizzaListThunkTypes {
  currentPage: number;
  category: string;
  sortBy: string;
  order: boolean;
  search: string;
}

export const getPizzaListThunk = createAsyncThunk(
  'menu/getPizzaList',
  async ({
    currentPage = 0,
    category = '',
    sortBy = '',
    order = false,
    search = '',
  }: PizzaListThunkTypes) => {
    const response = await instance.get(
      `/pitsa/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return response.data;
  }
);
