import { Box, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';
import CustomDialog from '../../components/customDialog';
import type { WarehouseData } from '../../interfaces/Warehouse';

interface AddWarehouseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWarehouse: (data: WarehouseData) => void;
  onWarehouseUpdate: (id: string, data: WarehouseData) => void;
  warehouseToEdit?: WarehouseData | null;
}

const AddEditWarehouseDialog = ({
  isOpen,
  onClose,
  onAddWarehouse,
  onWarehouseUpdate,
  warehouseToEdit
}: AddWarehouseDialogProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<WarehouseData>({
    defaultValues: {
      name: '',
      location: '',
      maxCapacity: 100
    }
  });

  useEffect(() => {
    if (warehouseToEdit) {
      reset({
        name: warehouseToEdit.name,
        location: warehouseToEdit.location,
        maxCapacity: warehouseToEdit.maxCapacity
      });
    } else {
      reset({
        name: '',
        location: '',
        maxCapacity: 100
      });
    }
  }, [warehouseToEdit, reset]);

  const handleFormSubmit = (data: WarehouseData) => {
    if (warehouseToEdit?.id) {
      onWarehouseUpdate(warehouseToEdit.id, data);
    } else {
      onAddWarehouse(data);
    }

    reset();
    onClose();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <CustomDialog
      isDialogOpen={isOpen}
      onClose={handleCancel}
      title="Add Warehouse"
      secondaryButton={{ buttonText: 'Cancel' }}
      primaryButton={{
        buttonText: warehouseToEdit ? 'Update' : 'Add',
        onAction: handleSubmit(handleFormSubmit)
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Warehouse name is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Warehouse Name"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="location"
          control={control}
          rules={{ required: 'Location is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Location"
              fullWidth
              error={!!errors.location}
              helperText={errors.location?.message}
            />
          )}
        />
        <Controller
          name="maxCapacity"
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
              error={!!errors.maxCapacity}
              helperText={errors.maxCapacity?.message}
            />
          )}
        />
      </Box>
    </CustomDialog>
  );
};

export default AddEditWarehouseDialog;
