import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Box } from '@mui/material';

import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { createInventoryThunk, fetchAllInventoryByWarehouseId } from '../../../redux/api/inventory';
import CustomButton from '../../../components/customButton';
import { getWarehouseInventoryPdf } from '../../../services/warehouseService';
import AddEditInventoryDialog from './AddEditInventoryDialog';
import WarehouseInventoryTable from './WarehouseInventoryTable';
import type { InventoryData, WarehouseInventoryItemsData } from '../../../interfaces/Inventory';

const WarehouseInventory = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { warehouseId } = useParams<{ warehouseId: string }>();
  const dispatch = useAppDispatch();

  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handlePDFButtonClick = async () => {
    try {
      const blob = await getWarehouseInventoryPdf(warehouseId!);

      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;

      link.setAttribute('download', `Inventory_${warehouseId}.pdf`);

      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
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
            marginBottom: 4,
            gap: 2
          }}
        >
          <CustomButton
            onClick={handlePDFButtonClick}
            variant="contained"
            color="primary"
            startIcon={<PictureAsPdfIcon />}
          >
            Generiši Inventurnu Listu
          </CustomButton>
          <CustomButton onClick={handleButtonClick} variant="contained" color="primary" startIcon={<AddIcon />}>
            Dodaj inventar
          </CustomButton>
        </Box>
        <AddEditInventoryDialog
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
          onAddInventory={handleAddInventory}
          onUpdateInventory={function (warehouseId: string, itemId: string, data: WarehouseInventoryItemsData): void {}}
        />
        {warehouseId && <WarehouseInventoryTable warehouseId={warehouseId} />}
      </Box>
    </>
  );
};

export default WarehouseInventory;
