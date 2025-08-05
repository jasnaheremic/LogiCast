export interface InventoryData {
  id?: string;
  itemId: string;
  name: string;
  status: string;
  warehouseId: string;
  quantity: number;
  maxValue: number;
  minValue: number;
}

export interface WarehouseInventoryItemsData {
  itemId: string;
  barcode: string;
  itemName: string;
  categoryName: string;
  quantity: number;
  status: string;
  price: number;
}

export interface InventoryItemsData {
  itemId: string;
  barcode: string;
  itemName: string;
  categoryName: string;
  totalQuantity: number;
  totalPrice: number;
}

export interface InventoryDashboardData {
  totalInventoryValue: number;
  lowStockItemsCount: number;
  totalCategoriesCount: number;
  totalItemsCount: number;
}
