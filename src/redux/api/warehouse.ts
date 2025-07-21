import { createAsyncThunk } from '@reduxjs/toolkit';

import { createWarehouse, getWarehouses, getWarehousesById } from '../../services/warehouseService';
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
