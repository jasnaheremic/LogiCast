import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Select,
  MenuItem,
  IconButton,
  Box,
  FormControl,
  InputLabel
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { isFulfilled } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import {
  deleteWarehouseInventoryItemThunk,
  fetchAllInventoryByWarehouseId,
  updateWarehouseInventoryItemThunk
} from '../../../redux/api/inventory';
import { fetchCategories } from '../../../redux/api/category';
import ConfirmDeleteDialog from '../../../components/ConfirmDelete';
import AddEditInventoryDialog from './AddEditInventoryDialog';
import type { InventoryData, WarehouseInventoryItemsData } from '../../../interfaces/Inventory';

interface WarehouseInventoryTableProps {
  warehouseId: string;
}

const WarehouseInventoryTable = ({ warehouseId }: WarehouseInventoryTableProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<WarehouseInventoryItemsData | null>(null);
  const dispatch = useAppDispatch();
  const { warehouseInventoryItems } = useAppSelector(state => state.inventories);
  const { categories } = useAppSelector(state => state.categories);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    if (warehouseId) {
      dispatch(fetchAllInventoryByWarehouseId(warehouseId));
    }
  }, [warehouseId]);

  const handleConfirmDelete = async () => {
    if (selectedItem?.itemId) {
      const result = await dispatch(
        deleteWarehouseInventoryItemThunk({
          warehouseId: warehouseId,
          itemId: selectedItem.itemId
        })
      );
      if (isFulfilled(result)) {
        handleCloseDeleteDialog();
        dispatch(fetchAllInventoryByWarehouseId(warehouseId));
      }
    }

    handleCloseDeleteDialog();
  };

  const handleEditClick = (item: WarehouseInventoryItemsData) => {
    setSelectedItem(item);
    setIsEditDialogOpen(true);
  };

  const handleUpdateInventoryItem = async (warehouseId: string, itemId: string, data: WarehouseInventoryItemsData) => {
    const result = await dispatch(updateWarehouseInventoryItemThunk({ warehouseId, itemId, inventoryData: data }));
    if (isFulfilled(result)) {
      setIsEditDialogOpen(false);
    }

    dispatch(fetchAllInventoryByWarehouseId(warehouseId));
  };

  if (!categories?.length) {
    dispatch(fetchCategories());
  }

  const filteredItems = warehouseInventoryItems?.filter(item =>
    selectedCategory === 'All' ? true : item.categoryName === selectedCategory
  );

  const handleDeleteClick = (item: WarehouseInventoryItemsData) => {
    setSelectedItem(item);

    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedItem(null);
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow sx={{ backgroundColor: 'white' }}>
              <TableCell colSpan={7}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6">Warehouse Inventory</Typography>
                  <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={selectedCategory}
                      onChange={e => setSelectedCategory(e.target.value as string)}
                      label="Category"
                    >
                      <MenuItem value="All">All</MenuItem>
                      {categories.map(category => (
                        <MenuItem key={category.id} value={category.name}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Barcode</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Price</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!filteredItems || filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <Typography align="center">No inventory found for this warehouse.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((item: WarehouseInventoryItemsData) => (
                <TableRow key={item.itemId}>
                  <TableCell>{item.barcode}</TableCell>
                  <TableCell>{item.itemName}</TableCell>
                  <TableCell>{item.categoryName}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <IconButton aria-label="edit" color="primary" onClick={() => handleEditClick(item)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" color="error" onClick={() => handleDeleteClick(item)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmDeleteDialog
        isDialogOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        title={`Delete item ${selectedItem?.itemName}?`}
        onConfirm={handleConfirmDelete}
        name={selectedItem?.itemName || ''}
        message={`Are you sure you want to delete ${selectedItem?.itemName}?`}
      />
      <AddEditInventoryDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onUpdateInventory={handleUpdateInventoryItem}
        inventoryItemToEdit={selectedItem}
        onAddInventory={function (data: InventoryData): void {
          throw new Error('Function not implemented.');
        }}
      />
    </Box>
  );
};

export default WarehouseInventoryTable;
