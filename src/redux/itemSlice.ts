import { createSlice } from '@reduxjs/toolkit';

import { API_STATUS } from '../utils/constants';
import { createItemThunk, fetchItemById, fetchItems } from './api/item';
import type { ItemData } from '../interfaces/Item';

interface ItemState {
  items: ItemData[];
  status: string;
}

const initialState: ItemState = {
  items: [],
  status: API_STATUS.IDLE
};

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    clearItemState: state => {
      state.items = [];
    }
  },
  extraReducers: builder => {
    builder
      .addCase(createItemThunk.pending, state => {
        state.status = API_STATUS.LOADING;
      })
      .addCase(createItemThunk.fulfilled, (state, action) => {
        state.status = API_STATUS.SUCCEEDED;
        const newItem = action.payload;
        state.items.unshift(newItem);
      })
      .addCase(createItemThunk.rejected, state => {
        state.status = API_STATUS.FAILED;
      })
      .addCase(fetchItems.pending, state => {
        state.status = API_STATUS.LOADING;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = API_STATUS.SUCCEEDED;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, state => {
        state.status = API_STATUS.FAILED;
      });
    builder
      .addCase(fetchItemById.pending, state => {
        state.status = API_STATUS.LOADING;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.status = API_STATUS.SUCCEEDED;
        state.items = action.payload;
      })
      .addCase(fetchItemById.rejected, state => {
        state.status = API_STATUS.FAILED;
      });
  }
});

export default itemSlice.reducer;
