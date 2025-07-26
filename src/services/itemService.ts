import { getHeaders } from '../utils/apitUtils';
import { BACKEND_ROUTES } from '../utils/constants';
import type { ItemData } from '../interfaces/Item';

export const createItem = async (itemData: ItemData) => {
  const response = await fetch(`${BACKEND_ROUTES.ITEMS}`, {
    method: 'POST',
    headers: {
      ...getHeaders()
    },
    body: JSON.stringify(itemData)
  });

  return response.json();
};

export const getItems = async () => {
  const response = await fetch(`${BACKEND_ROUTES.ITEMS}`, {
    method: 'GET',
    headers: getHeaders()
  });

  return response.json();
};

export const getItemById = async (id: string) => {
  const response = await fetch(`${BACKEND_ROUTES.ITEMS}/${id}`, {
    method: 'GET',
    headers: getHeaders()
  });

  return response.json();
};
