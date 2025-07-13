import { createAsyncThunk } from '@reduxjs/toolkit';

import { createWarehouse } from '../../services/warehouseService';
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
