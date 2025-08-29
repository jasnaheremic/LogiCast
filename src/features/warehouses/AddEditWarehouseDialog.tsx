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
      title="Dodaj Skladište"
      secondaryButton={{ buttonText: 'Poništi' }}
      primaryButton={{
        buttonText: warehouseToEdit ? 'Uredi' : 'Dodaj',
        onAction: handleSubmit(handleFormSubmit)
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Ime Skladista je obavezno' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Ime Skladišta"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="location"
          control={control}
          rules={{ required: 'Adresa je obavezna' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Adresa"
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
            required: 'Maksimalna kapacitet je obavezna',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Maksimalna kapacitet mora biti pozitivan broj'
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Maksimalna Kapacitet (m2)"
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
