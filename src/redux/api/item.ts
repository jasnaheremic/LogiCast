import { createAsyncThunk } from '@reduxjs/toolkit';
import { createItem, deleteItem, getItemById, getItems, updateItem } from '../../services/itemService';
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

export const deleteItemThunk = createAsyncThunk('items/deleteItem', async (id: string, { rejectWithValue }) => {
  try {
    const reseult = await deleteItem(id);
    if (!reseult.ok) {
      return rejectWithValue(reseult.status);
    }

    return id;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const updateItemThunk = createAsyncThunk(
  'items/updateItem',
  async ({ id, itemData }: { id: string; itemData: ItemData }, { rejectWithValue }) => {
    try {
      const response = await updateItem(id, itemData);
      if (!response.ok) {
        return rejectWithValue(response.status);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
