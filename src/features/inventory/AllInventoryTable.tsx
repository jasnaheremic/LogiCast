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

import { fetchAllInventory } from '../../redux/api/inventory';
import { fetchCategories } from '../../redux/api/category';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import ConfirmDeleteDialog from '../../components/ConfirmDelete';
import { deleteItemThunk, fetchItemById, updateItemThunk } from '../../redux/api/item';
import AddEditItemDialog from './AddEditItemDialog';
import type { InventoryItemsData } from '../../interfaces/Inventory';
import type { ItemData } from '../../interfaces/Item';

const AllInventoryTable = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItemsData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<ItemData | null>(null);
  const dispatch = useAppDispatch();
  const { allInventoryItems } = useAppSelector(state => state.inventories);
  const { categories } = useAppSelector(state => state.categories);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    dispatch(fetchAllInventory());

    if (!categories?.length) {
      dispatch(fetchCategories());
    }
  }, []);

  const handleDeleteClick = (item: InventoryItemsData) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };

  const handleUpdateItem = async (id: string, itemData: ItemData) => {
    const result = await dispatch(updateItemThunk({ id, itemData }));
    if (isFulfilled(result)) {
      setIsDialogOpen(false);
    }

    dispatch(fetchAllInventory());
  };

  const handleEditClickFromInventory = async (invItem: InventoryItemsData) => {
    const fullItem = await dispatch(fetchItemById(invItem.itemId)).unwrap();
    setItemToEdit(fullItem);
    setIsDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedItem(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedItem?.itemId) {
      const result = await dispatch(deleteItemThunk(selectedItem.itemId));
      if (isFulfilled(result)) {
        handleCloseDeleteDialog();
      }
    }

    dispatch(fetchAllInventory());
    handleCloseDeleteDialog();
  };

  const filteredItems = allInventoryItems?.filter(item =>
    selectedCategory === 'All' ? true : item.categoryName === selectedCategory
  );

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow sx={{ backgroundColor: 'white' }}>
              <TableCell colSpan={7}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6">Inventory</Typography>
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
              <TableCell>Total Quantity</TableCell>
              <TableCell>Total Price</TableCell>
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
              filteredItems.map((item: InventoryItemsData) => (
                <TableRow key={item.itemId}>
                  <TableCell>{item.barcode}</TableCell>
                  <TableCell>{item.itemName}</TableCell>
                  <TableCell>{item.categoryName}</TableCell>
                  <TableCell>{item.totalQuantity}</TableCell>
                  <TableCell>${item.totalPrice.toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <IconButton aria-label="edit" color="primary" onClick={() => handleEditClickFromInventory(item)}>
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
      <AddEditItemDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        itemToEdit={itemToEdit}
        onUpdateItem={handleUpdateItem}
        onAddItem={function (data: ItemData): void {
          throw new Error('Function not implemented.');
        }}
      />
    </Box>
  );
};

export default AllInventoryTable;
