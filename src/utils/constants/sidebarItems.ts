import { Inventory, Warehouse, SpaceDashboard } from '@mui/icons-material';
import { ROUTES } from '.';

export const SIDEBAR_ITEMS = [
  { text: 'KONTROLNA TABLA', icon: SpaceDashboard, path: ROUTES.DASHBOARD },
  { text: 'INVENTAR', icon: Inventory, path: ROUTES.INVENTORY },
  { text: 'SKLADIŠTA', icon: Warehouse, path: ROUTES.WAREHOUSES }
];
