import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice';
import menuSlice from './slices/menuSlice';
import cartSlice from './slices/cartSlice';
import {
  TypedUseSelectorHook,
  useSelector,
  useDispatch,
} from 'react-redux';

export const store = configureStore({
  reducer: {
    filterSlice,
    menuSlice,
    cartSlice,
  },
});

type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
