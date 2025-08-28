import { useForm, Controller } from 'react-hook-form';
import { Autocomplete, Box, TextField } from '@mui/material';

import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import CustomDialog from '../../../components/customDialog';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { fetchItems } from '../../../redux/api/item';
import type { InventoryData, WarehouseInventoryItemsData } from '../../../interfaces/Inventory';
import type { ItemData } from '../../../interfaces/Item';

interface AddInventoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddInventory: (data: InventoryData) => void;
  onUpdateInventory: (warehouseId: string, itemId: string, data: WarehouseInventoryItemsData) => void;
  inventoryItemToEdit?: WarehouseInventoryItemsData | null;
}

const AddEditInventoryDialog = ({
  isOpen,
  onClose,
  onAddInventory,
  onUpdateInventory,
  inventoryItemToEdit
}: AddInventoryDialogProps) => {
  const { warehouseId } = useParams<{ warehouseId: string }>();
  const { items } = useAppSelector(state => state.items);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<InventoryData>({
    defaultValues: {
      warehouseId: warehouseId || '',
      itemId: '',
      quantity: 0,
      maxValue: 100,
      minValue: 100
    }
  });

  useEffect(() => {
    if (inventoryItemToEdit) {
      reset({
        quantity: inventoryItemToEdit.quantity,
        maxValue: inventoryItemToEdit.maxValue,
        minValue: inventoryItemToEdit.minValue
      });
    } else {
      reset({
        quantity: 0,
        maxValue: 100,
        minValue: 100
      });
    }
  }, [inventoryItemToEdit, reset]);

  const handleFormSubmit = (data: InventoryData) => {
    if (inventoryItemToEdit && warehouseId) {
      onUpdateInventory(warehouseId, inventoryItemToEdit.itemId, {
        ...inventoryItemToEdit,
        ...data
      });
    } else {
      onAddInventory({ ...data, warehouseId: warehouseId || '' });
    }

    reset();
    onClose();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  if (!items?.length) {
    dispatch(fetchItems());
  }

  return (
    <CustomDialog
      isDialogOpen={isOpen}
      onClose={handleCancel}
      title={inventoryItemToEdit ? 'Edit Inventory Item' : 'Add Inventory Item'}
      secondaryButton={{ buttonText: 'Cancel' }}
      primaryButton={{
        buttonText: inventoryItemToEdit ? 'Update' : 'Add',
        onAction: handleSubmit(handleFormSubmit)
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        {!inventoryItemToEdit && (
          <Controller
            name="itemId"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                disablePortal
                options={items}
                getOptionLabel={(option: unknown) => (option as ItemData).name}
                value={items.find(option => option.id === field.value) || null}
                onChange={(_, value) => field.onChange(value?.id)}
                renderInput={params => (
                  <TextField {...params} label="Item" error={!!errors.itemId} helperText={errors.itemId?.message} />
                )}
              />
            )}
          />
        )}
        <Controller
          name="quantity"
          control={control}
          rules={{
            required: 'Quantity is required',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Quantity must be a number'
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Quantity"
              fullWidth
              error={!!errors.quantity}
              helperText={errors.quantity?.message}
            />
          )}
        />
        <Controller
          name="maxValue"
          control={control}
          rules={{
            required: 'Max capacity is required',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Max capacity must be a number'
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Max Capacity"
              fullWidth
              error={!!errors.maxValue}
              helperText={errors.maxValue?.message}
            />
          )}
        />
        <Controller
          name="minValue"
          control={control}
          rules={{
            required: 'Min value is required',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Min value must be a number'
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Min Value"
              fullWidth
              error={!!errors.minValue}
              helperText={errors.minValue?.message}
            />
          )}
        />
      </Box>
    </CustomDialog>
  );
};

export default AddEditInventoryDialog;
