import { useForm, Controller } from 'react-hook-form';
import { Autocomplete, Box, TextField } from '@mui/material';

import CustomDialog from '../../components/customDialog';
import { UNIT } from '../../utils/constants/itemConstants';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchCategories } from '../../redux/api/category';
import type { ItemData } from '../../interfaces/Item';
import type { CategoryData } from '../../interfaces/Category';

interface AddEditItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (data: ItemData) => void;
}

const AddEditItemDialog = ({ isOpen, onClose, onAddItem }: AddEditItemDialogProps) => {
  const { categories } = useAppSelector(state => state.categories);
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ItemData>({
    defaultValues: {
      name: '',
      unit: '',
      barcode: '',
      price: 100
    }
  });

  const handleFormSubmit = (data: ItemData) => {
    onAddItem(data);
    reset();
    onClose();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  if (!categories?.length) {
    dispatch(fetchCategories());
  }

  return (
    <CustomDialog
      isDialogOpen={isOpen}
      onClose={handleCancel}
      title="Add Item"
      secondaryButton={{ buttonText: 'Cancel' }}
      primaryButton={{
        buttonText: 'Add',
        onAction: handleSubmit(handleFormSubmit)
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        <Controller
          name="barcode"
          control={control}
          rules={{
            required: 'Barcode is required'
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Barcode"
              fullWidth
              error={!!errors.barcode}
              helperText={errors.barcode?.message}
            />
          )}
        />
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Item name is required' }}
          render={({ field }) => (
            <TextField {...field} label="Item Name" fullWidth error={!!errors.name} helperText={errors.name?.message} />
          )}
        />
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              disablePortal
              options={categories}
              getOptionLabel={(option: unknown) => (option as CategoryData).name}
              value={categories.find(option => option.id === field.value) || null}
              onChange={(_, value) => field.onChange(value?.id)}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Category"
                  error={!!errors.categoryId}
                  helperText={errors.categoryId?.message}
                />
              )}
            />
          )}
        />
        <Controller
          name="unit"
          control={control}
          rules={{ required: 'Unit is required' }}
          render={({ field }) => (
            <Autocomplete
              {...field}
              disablePortal
              options={UNIT}
              getOptionLabel={(option: unknown) => option as string}
              value={UNIT.find(unit => unit === field.value) || null}
              onChange={(_, value) => field.onChange(value)}
              renderInput={params => (
                <TextField {...params} label="Unit" error={!!errors.unit} helperText={errors.unit?.message} />
              )}
            />
          )}
        />
        <Controller
          name="price"
          control={control}
          rules={{
            required: 'Price is required',
            pattern: {
              value: /^[0-9]*[.,]?[0-9]+$/,
              message: 'Price must be a valid number'
            }
          }}
          render={({ field }) => (
            <TextField {...field} label="Price" fullWidth error={!!errors.price} helperText={errors.price?.message} />
          )}
        />
      </Box>
    </CustomDialog>
  );
};

export default AddEditItemDialog;
