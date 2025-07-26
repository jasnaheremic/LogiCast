import { createSlice } from '@reduxjs/toolkit';

import { API_STATUS } from '../utils/constants';
import { fetchCategories } from './api/category';
import type { CategoryData } from '../interfaces/Category';

interface CategoryState {
  categories: CategoryData[];
  status: string;
}

const initialState: CategoryState = {
  categories: [],
  status: API_STATUS.IDLE
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.status = API_STATUS.LOADING;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = API_STATUS.SUCCEEDED;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, state => {
        state.status = API_STATUS.FAILED;
      });
  }
});

export default categorySlice.reducer;
