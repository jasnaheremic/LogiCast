import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createInventory,
  getAllInventory,
  getAllInventoryByWarehouseId,
  getInventoryDashboardInfo
} from '../../services/inventoryService';
import type { InventoryData } from '../../interfaces/Inventory';

export const createInventoryThunk = createAsyncThunk(
  'inventories/createInventory',
  async (inventoryData: InventoryData, { rejectWithValue }) => {
    try {
      const response = await createInventory(inventoryData);
      if (!response.ok) {
        return rejectWithValue(response.status);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchAllInventoryByWarehouseId = createAsyncThunk(
  'inventories/fetchById',
  async (warehouseId: string, { rejectWithValue }) => {
    try {
      const data = await getAllInventoryByWarehouseId(warehouseId);

      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchAllInventory = createAsyncThunk(
  'inventories/fetchAllInventory',
  async (_: void, { rejectWithValue }) => {
    try {
      const data = await getAllInventory();

      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchInventoryDashboardInfo = createAsyncThunk(
  'inventories/fetchInventoryDashboardInfo',
  async (_: void, { rejectWithValue }) => {
    try {
      const data = await getInventoryDashboardInfo();

      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
