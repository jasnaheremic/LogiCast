import { Inventory, Warehouse, SpaceDashboard } from '@mui/icons-material';
import { ROUTES } from '.';

export const SIDEBAR_ITEMS = [
  { text: 'DASHBOARD', icon: SpaceDashboard, path: ROUTES.DASHBOARD },
  { text: 'INVENTORY', icon: Inventory, path: ROUTES.INVENTORY },
  { text: 'WAREHOUSES', icon: Warehouse, path: ROUTES.WAREHOUSES }
];
