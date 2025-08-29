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

  const formatCurrency = (value: number) => `${value.toFixed(2)} KM`;

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
            label: 'Ukupan Broj Artikala',
            value: `${inventoryDashboardInfo?.totalItemsCount ?? 0} Artikala`,
            subtext: 'Ukupan broj artikala u skladištu'
          },
          { label: 'Artikli ispod minimalne vrijednoti', value: inventoryDashboardInfo?.lowStockItemsCount ?? 0 },
          {
            label: 'Ukupna vrijednost inventara',
            value: formatCurrency(inventoryDashboardInfo?.totalInventoryValue ?? 0)
          },
          { label: 'Kategorije', value: `${inventoryDashboardInfo?.totalCategoriesCount ?? 0} kategorija` }
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
