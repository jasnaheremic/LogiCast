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
  WAREHOUSE_CAPACITY: '/api/warehouse/top-capacity',
  CATEGORIES: '/api/category',
  ITEMS: '/api/item',
  INVENTORIES: '/api/inventory',
  INVENTORY_OVERVIEW: '/api/inventory/overview',
  TOP_THREE_CATEGORIES: '/api/inventory/top-three-categories',
  INVENTORY_LOW_STOCK_ITEMS: '/api/inventory/low-stock'
};

const API_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed'
};

export { BACKEND_URL, FRONTEND_URL, ROUTES, API_STATUS, BACKEND_ROUTES };
