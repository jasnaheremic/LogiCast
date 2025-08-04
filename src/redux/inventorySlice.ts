import { createSlice } from '@reduxjs/toolkit';

import { API_STATUS } from '../utils/constants';
import { createInventoryThunk, fetchAllInventory, fetchAllInventoryByWarehouseId } from './api/inventory';
import type { InventoryData, InventoryItemsData, WarehouseInventoryItemsData } from '../interfaces/Inventory';

interface InventoryState {
  inventories: InventoryData[];
  warehouseInventoryItems?: WarehouseInventoryItemsData[];
  allInventoryItems?: InventoryItemsData[];
  status: string;
}

const initialState: InventoryState = {
  inventories: [],
  warehouseInventoryItems: [],
  allInventoryItems: [],
  status: API_STATUS.IDLE
};

const inventorySlice = createSlice({
  name: 'inventories',
  initialState,
  reducers: {
    clearInventoryState: state => {
      state.inventories = [];
    }
  },
  extraReducers: builder => {
    builder
      .addCase(createInventoryThunk.pending, state => {
        state.status = API_STATUS.LOADING;
      })
      .addCase(createInventoryThunk.fulfilled, (state, action) => {
        state.status = API_STATUS.SUCCEEDED;
        const newInventory = action.payload;
        state.inventories.unshift(newInventory);
      })
      .addCase(createInventoryThunk.rejected, state => {
        state.status = API_STATUS.FAILED;
      });
    builder
      .addCase(fetchAllInventoryByWarehouseId.pending, state => {
        state.status = API_STATUS.LOADING;
      })
      .addCase(fetchAllInventoryByWarehouseId.fulfilled, (state, action) => {
        state.status = API_STATUS.SUCCEEDED;
        state.warehouseInventoryItems = action.payload;
      })
      .addCase(fetchAllInventoryByWarehouseId.rejected, state => {
        state.status = API_STATUS.FAILED;
      });
    builder
      .addCase(fetchAllInventory.pending, state => {
        state.status = API_STATUS.LOADING;
      })
      .addCase(fetchAllInventory.fulfilled, (state, action) => {
        state.status = API_STATUS.SUCCEEDED;
        state.allInventoryItems = action.payload;
      })
      .addCase(fetchAllInventory.rejected, state => {
        state.status = API_STATUS.FAILED;
      });
  }
});

export default inventorySlice.reducer;
