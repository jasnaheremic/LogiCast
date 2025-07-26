import { createAsyncThunk } from '@reduxjs/toolkit';
import { createItem, getItemById, getItems } from '../../services/itemService';
import type { ItemData } from '../../interfaces/Item';

export const createItemThunk = createAsyncThunk('items/createItem', async (itemData: ItemData, { rejectWithValue }) => {
  try {
    const response = await createItem(itemData);
    if (!response.ok) {
      return rejectWithValue(response.status);
    }

    return response.data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const fetchItems = createAsyncThunk('items/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const data = await getItems();

    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const fetchItemById = createAsyncThunk('items/fetchById', async (id: string, { rejectWithValue }) => {
  try {
    const data = await getItemById(id);

    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
