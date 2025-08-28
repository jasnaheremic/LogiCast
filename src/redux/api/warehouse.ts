import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  createWarehouse,
  deleteWarehouse,
  getWarehouses,
  getWarehousesById,
  getWarehousesCapacity,
  updateWarehouse
} from '../../services/warehouseService';
import type { WarehouseData } from '../../interfaces/Warehouse';

export const createWarehouseThunk = createAsyncThunk(
  'warehouses/createWarehouse',
  async (warehouseData: WarehouseData, { rejectWithValue }) => {
    try {
      const response = await createWarehouse(warehouseData);
      if (!response.ok) {
        return rejectWithValue(response.status);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchWarehouses = createAsyncThunk('warehouses/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const data = await getWarehouses();

    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const fetchWarehouseById = createAsyncThunk('warehouses/fetchById', async (id: string, { rejectWithValue }) => {
  try {
    const data = await getWarehousesById(id);

    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const fetchWarehouseCapacity = createAsyncThunk(
  'warehouses/fetchWarehouseCapavity',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getWarehousesCapacity();

      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteWarehouseThunk = createAsyncThunk(
  'items/deleteWarehouse',
  async (id: string, { rejectWithValue }) => {
    try {
      const reseult = await deleteWarehouse(id);
      if (!reseult.ok) {
        return rejectWithValue(reseult.status);
      }

      return id;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateWarehouseThunk = createAsyncThunk(
  'items/updateItem',
  async ({ id, warehouseData }: { id: string; warehouseData: WarehouseData }, { rejectWithValue }) => {
    try {
      const response = await updateWarehouse(id, warehouseData);
      if (!response.ok) {
        return rejectWithValue(response.status);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
