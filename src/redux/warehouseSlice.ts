import { createSlice } from '@reduxjs/toolkit';

import { API_STATUS } from '../utils/constants';
import { createWarehouseThunk, fetchWarehouseById, fetchWarehouses } from './api/warehouse';
import type { WarehouseData } from '../interfaces/Warehouse';

interface WarehouseState {
  warehouses: WarehouseData[];
  status: string;
}

const initialState: WarehouseState = {
  warehouses: [],
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
  }
});

export const { clearWarehouseState } = warehouseSlice.actions;
export default warehouseSlice.reducer;
