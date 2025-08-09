import { useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchInventoryLowStockItems } from '../../redux/api/inventory';

const InventoryLowStockItemsTable = () => {
  const dispatch = useAppDispatch();
  const { inventoryLowStockItemsData, status } = useAppSelector(state => state.inventories);

  useEffect(() => {
    dispatch(fetchInventoryLowStockItems());
  }, [dispatch]);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Low Stock Items
        </Typography>
      </Box>

      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2, boxShadow: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Warehouse</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Current Stock</TableCell>
              <TableCell>Reorder Level</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventoryLowStockItemsData?.map(item => (
              <TableRow key={`${item.warehouseId}-${item.itemId}`}>
                <TableCell>{item.warehouseName}</TableCell>
                <TableCell>{item.itemName}</TableCell>
                <TableCell>{item.currentStock} units</TableCell>
                <TableCell>{item.reorderQuantity} units</TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    sx={{ color: 'primary.main', fontWeight: 500 }}
                    onClick={() => console.log('Reorder', item)}
                  >
                    Reorder
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {inventoryLowStockItemsData?.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  {status === 'loading' ? 'Loading...' : 'No low stock items found'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InventoryLowStockItemsTable;
