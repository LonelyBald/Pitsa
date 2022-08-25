import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    Accept: 'application/json',
  },
});
