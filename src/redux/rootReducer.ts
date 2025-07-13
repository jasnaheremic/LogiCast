import { combineReducers, type Reducer } from '@reduxjs/toolkit';
import warehouseReducer from './warehouseSlice';

const appReducer = combineReducers({
  warehouses: warehouseReducer
});

export type AppState = ReturnType<typeof appReducer>;

export const rootReducer: Reducer<AppState> = (state: AppState | undefined, action: { type: string }) => {
  return appReducer(state, action);
};
