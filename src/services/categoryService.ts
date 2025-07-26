import { getHeaders } from '../utils/apitUtils';
import { BACKEND_ROUTES } from '../utils/constants';

export const getCategories = async () => {
  const response = await fetch(`${BACKEND_ROUTES.CATEGORIES}`, {
    method: 'GET',
    headers: getHeaders()
  });

  return response.json();
};
