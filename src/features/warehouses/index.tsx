import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';

import CustomButton from '../../components/customButton';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { createWarehouseThunk, fetchWarehouses } from '../../redux/api/warehouse';
import AddEditWarehouseDialog from './AddEditWarehouseDialog';
import WarehouseCard from './warehouseCard';
import type { WarehouseData } from '../../interfaces/Warehouse';

const Warehouse = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { warehouses } = useAppSelector(state => state.warehouses);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchWarehouses());
  }, []);

  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleAddWarehouse = async (data: WarehouseData) => {
    await dispatch(createWarehouseThunk(data));
    dispatch(fetchWarehouses());
  };

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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom: 4
          }}
        >
          <CustomButton onClick={handleButtonClick} variant="contained" color="primary" startIcon={<AddIcon />}>
            Add Warehouse
          </CustomButton>
        </Box>
        <AddEditWarehouseDialog isOpen={isDialogOpen} onClose={handleDialogClose} onAddWarehouse={handleAddWarehouse} />
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'flex-start'
            }}
          >
            {warehouses.map(warehouse => (
              <Box key={warehouse.id} sx={{ flex: '0 1 150px', minWidth: 320 }}>
                <WarehouseCard warehouse={warehouse} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Warehouse;
