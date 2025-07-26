import { combineReducers, type Reducer } from '@reduxjs/toolkit';
import warehouseReducer from './warehouseSlice';
import categoryReducer from './categorySlice';
import itemReducer from './itemSlice';

const appReducer = combineReducers({
  warehouses: warehouseReducer,
  categories: categoryReducer,
  items: itemReducer
});

export type AppState = ReturnType<typeof appReducer>;

export const rootReducer: Reducer<AppState> = (state: AppState | undefined, action: { type: string }) => {
  return appReducer(state, action);
};
