import { createSlice } from '@reduxjs/toolkit';

import { API_STATUS } from '../utils/constants';
import {
  createWarehouseThunk,
  deleteWarehouseThunk,
  fetchWarehouseById,
  fetchWarehouseCapacity,
  fetchWarehouses,
  updateWarehouseThunk
} from './api/warehouse';
import type { WarehouseCapacityData, WarehouseData } from '../interfaces/Warehouse';

interface WarehouseState {
  warehouses: WarehouseData[];
  warehouseCapacity?: WarehouseCapacityData[];
  status: string;
}

const initialState: WarehouseState = {
  warehouses: [],
  warehouseCapacity: [],
  status: API_STATUS.IDLE
};

const warehouseSlice = createSlice({
  name: 'warehouses',
  initialState,
  reducers: {
    clearWarehouseState: state => {
      state.warehouses = [];
    }
  },
  extraReducers: builder => {
    builder
      .addCase(createWarehouseThunk.pending, state => {
        state.status = API_STATUS.LOADING;
      })
      .addCase(createWarehouseThunk.fulfilled, (state, action) => {
        state.status = API_STATUS.SUCCEEDED;
        const newWarehouse = action.payload;
        state.warehouses.unshift(newWarehouse);
      })
      .addCase(createWarehouseThunk.rejected, state => {
        state.status = API_STATUS.FAILED;
      })
      .addCase(fetchWarehouses.pending, state => {
        state.status = API_STATUS.LOADING;
      })
      .addCase(fetchWarehouses.fulfilled, (state, action) => {
        state.status = API_STATUS.SUCCEEDED;
        state.warehouses = action.payload;
      })
      .addCase(fetchWarehouses.rejected, state => {
        state.status = API_STATUS.FAILED;
      });
    builder
      .addCase(fetchWarehouseById.pending, state => {
        state.status = API_STATUS.LOADING;
      })
      .addCase(fetchWarehouseById.fulfilled, (state, action) => {
        state.status = API_STATUS.SUCCEEDED;
        state.warehouses = action.payload;
      })
      .addCase(fetchWarehouseById.rejected, state => {
        state.status = API_STATUS.FAILED;
      });
    builder
      .addCase(fetchWarehouseCapacity.pending, state => {
        state.status = API_STATUS.LOADING;
      })
      .addCase(fetchWarehouseCapacity.fulfilled, (state, action) => {
        state.status = API_STATUS.SUCCEEDED;
        state.warehouseCapacity = action.payload;
      })
      .addCase(fetchWarehouseCapacity.rejected, state => {
        state.status = API_STATUS.FAILED;
      })
      .addCase(deleteWarehouseThunk.pending, state => {
        state.status = API_STATUS.LOADING;
      })
      .addCase(deleteWarehouseThunk.fulfilled, (state, action) => {
        state.status = API_STATUS.SUCCEEDED;
        const warehouseIdToDelete = action.payload;
        state.warehouses = state.warehouses.filter(warehouse => warehouse.id !== warehouseIdToDelete);
      })
      .addCase(deleteWarehouseThunk.rejected, state => {
        state.status = API_STATUS.FAILED;
      })
      .addCase(updateWarehouseThunk.pending, state => {
        state.status = API_STATUS.LOADING;
      })
      .addCase(updateWarehouseThunk.fulfilled, (state, action) => {
        state.status = API_STATUS.SUCCEEDED;
        const updateWarehouse = action.payload;
        const index = state.warehouses.findIndex(warehouse => warehouse.id === updateWarehouse.id);
        if (index !== -1) {
          state.warehouses[index] = updateWarehouse;
        }
      })
      .addCase(updateWarehouseThunk.rejected, state => {
        state.status = API_STATUS.FAILED;
      });
  }
});

export const { clearWarehouseState } = warehouseSlice.actions;
export default warehouseSlice.reducer;
