const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

const ROUTES = {
  BASE_ROUTE: '/',
  DASHBOARD: '/dashboard',
  INVENTORY: '/inventory',
  WAREHOUSES: '/warehouses',
  WAREHOUSE_INVENTORY: `/warehouses/:warehouseId`
};

const BACKEND_ROUTES = {
  WAREHOUSES: '/api/warehouse',
  WAREHOUSE_INVENTORY: (warehouseId: string) => `/api/inventory/${warehouseId}`,
  CATEGORIES: '/api/category',
  ITEMS: '/api/item',
  INVENTORIES: '/api/inventory'
};

const API_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed'
};

export { BACKEND_URL, FRONTEND_URL, ROUTES, API_STATUS, BACKEND_ROUTES };
