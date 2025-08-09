import { Box } from '@mui/material';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchWarehouseCapacity } from '../../redux/api/warehouse';
import WarehouseDashboardCard from './warehouseDashboardCards';
import CategoriesChart from './categoriesChart';
import InventoryLowStockItemsTable from './inventoryLowStockItems';

const Dashboard = () => {
  const { warehouseCapacity } = useAppSelector(state => state.warehouses);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchWarehouseCapacity());
  }, []);

  return (
    <>
      <Box
        sx={{
          padding: 4,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'flex-start'
            }}
          >
            {warehouseCapacity?.map(warehouse => (
              <Box key={warehouse.id} sx={{ flex: '0 1 150px', minWidth: 320 }}>
                <WarehouseDashboardCard warehouse={warehouse} />
              </Box>
            ))}
          </Box>
          <CategoriesChart />
          <InventoryLowStockItemsTable />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
