import { getHeaders } from '../utils/apitUtils';
import { BACKEND_ROUTES } from '../utils/constants';
import type { WarehouseData } from '../interfaces/Warehouse';

export const createWarehouse = async (warehouseData: WarehouseData) => {
  const response = await fetch(`${BACKEND_ROUTES.WAREHOUSES}`, {
    method: 'POST',
    headers: {
      ...getHeaders()
    },
    body: JSON.stringify(warehouseData)
  });

  return response.json();
};
