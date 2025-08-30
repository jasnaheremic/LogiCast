import { CardContent, Card, Typography, CardActions, Button, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { isFulfilled } from '@reduxjs/toolkit';

import { ROUTES } from '../../utils/constants';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { deleteWarehouseThunk, fetchWarehouses, updateWarehouseThunk } from '../../redux/api/warehouse';
import ConfirmDeleteDialog from '../../components/ConfirmDelete';
import AddEditWarehouseDialog from './AddEditWarehouseDialog';
import type { WarehouseData } from '../../interfaces/Warehouse';

interface WarehouseCardProps {
  warehouse: WarehouseData;
}

const WarehouseCard = ({ warehouse }: WarehouseCardProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<WarehouseData | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleViewMore = () => {
    const warehouseInventoryRoute = ROUTES.WAREHOUSE_INVENTORY.replace(':warehouseId', String(warehouse?.id));
    navigate(warehouseInventoryRoute);
  };

  const handleDeleteClick = (warehoues: WarehouseData) => {
    setSelectedWarehouse(warehoues);
    setIsDeleteDialogOpen(true);
  };

  const handleEditClick = (warehoues: WarehouseData) => {
    setSelectedWarehouse(warehoues);
    setIsEditDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedWarehouse(null);
  };

  const handleUpdateWarehouse = async (id: string, warehouseData: WarehouseData) => {
    const result = await dispatch(updateWarehouseThunk({ id, warehouseData }));
    if (isFulfilled(result)) {
      setIsEditDialogOpen(false);
    }

    dispatch(fetchWarehouses());
  };

  const handleConfirmDelete = async () => {
    if (selectedWarehouse?.id) {
      const result = await dispatch(deleteWarehouseThunk(selectedWarehouse.id));
      if (isFulfilled(result)) {
        handleCloseDeleteDialog();
        dispatch(fetchWarehouses());
      }
    }

    handleCloseDeleteDialog();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Card sx={{ borderRadius: 2, boxShadow: 1, height: '100%' }}>
        <CardContent sx={{ p: 1.5 }}>
          <Typography variant="h6" component="div" noWrap>
            {warehouse.name}
          </Typography>
          <Typography
            gutterBottom
            sx={{
              color: 'text.secondary',
              fontSize: 12,
              mb: 1
            }}
            noWrap
          >
            {warehouse.location}
          </Typography>
          <Box
            sx={{
              backgroundColor: 'grey.100',
              p: 1.2,
              borderRadius: 1,
              fontSize: 13
            }}
          >
            <Typography variant="body2" sx={{ fontSize: 'inherit' }}>
              <Box component="span" display="block">
                Veličina: {warehouse.maxCapacity}m2
              </Box>
            </Typography>
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end', p: 1 }}>
          <IconButton aria-label="edit" color="primary" onClick={() => handleEditClick(warehouse)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" color="error" onClick={() => handleDeleteClick(warehouse)}>
            <DeleteIcon />
          </IconButton>
          <Button onClick={handleViewMore} size="small" variant="text" sx={{ fontSize: 12 }}>
            Više detalja
          </Button>
        </CardActions>
      </Card>
      <ConfirmDeleteDialog
        isDialogOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        title={`Obriši skladište ${selectedWarehouse?.name}?`}
        onConfirm={handleConfirmDelete}
        name={selectedWarehouse?.name || ''}
        message={`Da li ste sigurni da želite obrisati ${selectedWarehouse?.name}?`}
      />
      <AddEditWarehouseDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        warehouseToEdit={warehouse}
        onWarehouseUpdate={handleUpdateWarehouse}
        onAddWarehouse={function (data: WarehouseData): void {
          throw new Error('Function not implemented.');
        }}
      />
    </Box>
  );
};

export default WarehouseCard;
