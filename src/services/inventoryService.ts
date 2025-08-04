import { getHeaders } from '../utils/apitUtils';
import { BACKEND_ROUTES } from '../utils/constants';
import type { InventoryData } from '../interfaces/Inventory';

export const createInventory = async (inventoryData: InventoryData) => {
  const response = await fetch(`${BACKEND_ROUTES.INVENTORIES}`, {
    method: 'POST',
    headers: {
      ...getHeaders()
    },
    body: JSON.stringify(inventoryData)
  });

  return response.json();
};

export const getAllInventoryByWarehouseId = async (warehouseId: string) => {
  const response = await fetch(`${BACKEND_ROUTES.WAREHOUSE_INVENTORY(warehouseId)}`, {
    method: 'GET',
    headers: getHeaders()
  });

  return response.json();
};

export const getAllInventory = async () => {
  const response = await fetch(`${BACKEND_ROUTES.INVENTORIES}`, {
    method: 'GET',
    headers: getHeaders()
  });

  return response.json();
};
