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

import { fetchAllInventory } from '../../redux/api/inventory';
import { fetchCategories } from '../../redux/api/category';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import type { InventoryItemsData } from '../../interfaces/Inventory';

interface AllInventoryTableProps {
  onEdit?: (item: InventoryItemsData) => void;
  onDelete?: (itemId: string) => void;
}

const AllInventoryTable = ({ onEdit, onDelete }: AllInventoryTableProps) => {
  const dispatch = useAppDispatch();
  const { allInventoryItems } = useAppSelector(state => state.inventories);
  const { categories } = useAppSelector(state => state.categories);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    dispatch(fetchAllInventory());

    dispatch(fetchCategories());
  }, []);

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
                    <IconButton aria-label="edit" color="primary" onClick={() => onEdit?.(item)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" color="error" onClick={() => onDelete?.(item.itemId)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllInventoryTable;
