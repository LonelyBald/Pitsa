import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPitsaListThunk = createAsyncThunk(
  'menu/getPitsaList',
  async ({
    currentPage = '',
    category = '',
    sortBy = '',
    order = '',
    search = '',
  }) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}pitsa/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return response.data;
  }
);
