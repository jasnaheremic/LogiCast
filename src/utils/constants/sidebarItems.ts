import {
  Inventory,
  TrendingUp,
  Warehouse,
  SpaceDashboard
} from '@mui/icons-material';
import { ROUTES } from '.';

   export const SIDEBAR_ITEMS = [
  { text: 'DASHBOARD', icon: SpaceDashboard, path: ROUTES.DASHBOARD},
  { text: 'INVENTORY', icon: Inventory, path: ROUTES.INVENTORY},
  { text: 'DEMAND PREDICITON', icon: TrendingUp, path: ROUTES.DEMAND_PREDICTION},
  { text: 'WAREHOUSES', icon: Warehouse, path: ROUTES.WAREHOUSES}
];
