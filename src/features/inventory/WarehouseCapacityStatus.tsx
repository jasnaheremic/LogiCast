import React, { useEffect } from 'react';
import { Box, Typography, LinearProgress, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchWarehouseCapacity } from '../../redux/api/warehouse';
import { ROUTES } from '../../utils/constants';

const colorMap = ['#42A5F5', '#EF6C00', '#66BB6A'];

export const WarehouseCapacityStatus: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { warehouseCapacity } = useAppSelector(state => state.warehouses);

  useEffect(() => {
    dispatch(fetchWarehouseCapacity());
  }, [dispatch]);

  const handleViewMore = () => {
    const warehouseInventoryRoute = ROUTES.WAREHOUSES;
    navigate(warehouseInventoryRoute);
  };

  return (
    <Box sx={{ p: 4, borderRadius: 2 }}>
      <Box
        sx={{
          backgroundColor: '#fff',
          p: 3,
          borderRadius: 2,
          boxShadow: '0px 2px 6px rgba(0,0,0,0.1)'
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Warehouse Status</Typography>
          <Button onClick={handleViewMore} size="small" variant="text" sx={{ fontSize: 12 }}>
            VIEW ALL
          </Button>
        </Stack>
        {warehouseCapacity?.slice(0, 3).map((warehouse, index) => (
          <Box key={warehouse.id} mb={3}>
            <Typography variant="subtitle2" mb={0.5}>
              {warehouse.name}
            </Typography>
            <Box display="flex" alignItems="center">
              <Box flex={1} mr={2}>
                <LinearProgress
                  variant="determinate"
                  value={warehouse.capacityUsagePercent}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: colorMap[index % colorMap.length]
                    }
                  }}
                />
              </Box>
              <Typography variant="body2" sx={{ minWidth: 60 }}>
                {warehouse.capacityUsagePercent}% capacity
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default WarehouseCapacityStatus;
