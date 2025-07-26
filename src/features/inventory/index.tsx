import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Box, Typography } from '@mui/material';

import CustomButton from '../../components/customButton';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { createItemThunk, fetchItems } from '../../redux/api/item';
import AddEditItemDialog from './AddEditItemDialog';
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
            <Typography variant="h5">Inventory Management</Typography>
            <Typography >Manage and track all warehouse inventory items</Typography>
          </Box>
          <CustomButton onClick={handleButtonClick} variant="contained" color="primary" startIcon={<AddIcon />}>
            Add Item
          </CustomButton>
        </Box>
        <AddEditItemDialog isOpen={isDialogOpen} onClose={handleDialogClose} onAddItem={handleAddItem} />
      </Box>
    </>
  );
};

export default Item;
