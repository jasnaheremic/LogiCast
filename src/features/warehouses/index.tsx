import { Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

import CustomButton from '../../components/customButton';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { createWarehouseThunk } from '../../redux/api/warehouse';
import AddEditWarehouseDialog from './AddEditWarehouseDialog';
import type { WarehouseData } from '../../interfaces/Warehouse';

const Warehouse = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleAddWarehouse = async (data: WarehouseData) => {
    console.log('New warehouse added:', data);
    await dispatch(createWarehouseThunk(data));
  };

  return (
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
      <AddEditWarehouseDialog isOpen={isDialogOpen} onClose={handleDialogClose} onAdd={handleAddWarehouse} />
    </Box>
  );
};

export default Warehouse;
