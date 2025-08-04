import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/material';

import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { createInventoryThunk, fetchAllInventoryByWarehouseId } from '../../../redux/api/inventory';
import CustomButton from '../../../components/customButton';
import AddEditInventoryDialog from './AddEditInventoryDialog';
import WarehouseInventoryTable from './WarehouseInventoryTable';
import type { InventoryData } from '../../../interfaces/Inventory';

const WarehouseInventory = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { warehouseId } = useParams<{ warehouseId: string }>();
  const dispatch = useAppDispatch();

  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleAddInventory = async (data: InventoryData) => {
    await dispatch(createInventoryThunk(data));
    await dispatch(fetchAllInventoryByWarehouseId(warehouseId!));
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
            Add Inventory Item
          </CustomButton>
        </Box>
        <AddEditInventoryDialog isOpen={isDialogOpen} onClose={handleDialogClose} onAddInventory={handleAddInventory} />
        {warehouseId && <WarehouseInventoryTable warehouseId={warehouseId} />}
      </Box>
    </>
  );
};

export default WarehouseInventory;
