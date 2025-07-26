import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCategories } from '../../services/categoryService';

export const fetchCategories = createAsyncThunk('categories/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const data = await getCategories();

    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
