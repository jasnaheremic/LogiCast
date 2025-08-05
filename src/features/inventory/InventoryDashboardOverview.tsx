import { useEffect } from 'react';
import Box from '@mui/material/Box';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import DashboardCard from '../../components/dashboardCard';
import { fetchInventoryDashboardInfo } from '../../redux/api/inventory';

const InventoryDashboardOverview = () => {
  const dispatch = useAppDispatch();
  const { inventoryDashboardInfo } = useAppSelector(state => state.inventories);

  useEffect(() => {
    if (!inventoryDashboardInfo) {
      dispatch(fetchInventoryDashboardInfo());
    }
  }, []);

  console.log('Inventory Dashboard Info:', inventoryDashboardInfo);

  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          alignItems: 'stretch'
        }}
      >
        {[
          {
            label: 'Total Items',
            value: `${inventoryDashboardInfo?.totalItemsCount ?? 0} Items`,
            subtext: 'Across All Warehouses'
          },
          { label: 'Low Stock Items', value: inventoryDashboardInfo?.lowStockItemsCount ?? 0 },
          { label: 'Inventory Value', value: formatCurrency(inventoryDashboardInfo?.totalInventoryValue ?? 0) },
          { label: 'Categories', value: `${inventoryDashboardInfo?.totalCategoriesCount ?? 0} categories` }
        ].map((cardProps, idx) => (
          <Box
            key={idx}
            sx={{
              flexBasis: 'calc(50% - theme.spacing(3))',
              flexGrow: 1,
              display: 'flex'
            }}
          >
            <DashboardCard {...cardProps} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default InventoryDashboardOverview;
