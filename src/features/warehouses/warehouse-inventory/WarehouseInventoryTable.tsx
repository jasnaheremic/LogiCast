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

import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { fetchAllInventoryByWarehouseId } from '../../../redux/api/inventory';
import { fetchCategories } from '../../../redux/api/category';
import type { WarehouseInventoryItemsData } from '../../../interfaces/Inventory';

interface WarehouseInventoryTableProps {
  warehouseId: string;
  onEdit?: (item: WarehouseInventoryItemsData) => void;
  onDelete?: (itemId: string) => void;
}

const WarehouseInventoryTable = ({ warehouseId, onEdit, onDelete }: WarehouseInventoryTableProps) => {
  const dispatch = useAppDispatch();
  const { warehouseInventoryItems } = useAppSelector(state => state.inventories);
  const { categories } = useAppSelector(state => state.categories);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    if (warehouseId) {
      dispatch(fetchAllInventoryByWarehouseId(warehouseId));
    }

    dispatch(fetchCategories());
  }, [warehouseId]);

  const filteredItems = warehouseInventoryItems?.filter(item =>
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

export default WarehouseInventoryTable;
