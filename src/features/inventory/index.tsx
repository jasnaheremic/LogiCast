import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Box, Typography } from '@mui/material';

import CustomButton from '../../components/customButton';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { createItemThunk, fetchItems } from '../../redux/api/item';
import { fetchAllInventory } from '../../redux/api/inventory';
import AddEditItemDialog from './AddEditItemDialog';
import AllInventoryTable from './AllInventoryTable';
import InventoryDashboardOverview from './InventoryDashboardOverview';
import WarehouseCapacityStatus from './WarehouseCapacityStatus';
import type { ItemData } from '../../interfaces/Item';

const Item = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, []);

  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleAddItem = async (data: ItemData) => {
    await dispatch(createItemThunk(data));
    dispatch(fetchItems());
    dispatch(fetchAllInventory());
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
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 4
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5">Upravljanje Zalihama</Typography>
            <Typography>Upravljajte i pratite sve artikle skladišnog inventara</Typography>
          </Box>
          <CustomButton onClick={handleButtonClick} variant="contained" color="primary" startIcon={<AddIcon />}>
            Dodaj Artikal
          </CustomButton>
        </Box>
        <InventoryDashboardOverview />
        <AddEditItemDialog
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
          onAddItem={handleAddItem}
          onUpdateItem={function (id: string, data: ItemData): void {
            throw new Error('Function not implemented.');
          }}
        />
        <AllInventoryTable />
        <WarehouseCapacityStatus />
      </Box>
    </>
  );
};

export default Item;
