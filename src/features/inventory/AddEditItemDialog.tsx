import { useForm, Controller } from 'react-hook-form';
import { Autocomplete, Box, TextField } from '@mui/material';

import { useEffect } from 'react';
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
  onUpdateItem: (id: string, data: ItemData) => void;
  itemToEdit?: ItemData | null;
}

const AddEditItemDialog = ({ isOpen, onClose, onAddItem, onUpdateItem, itemToEdit }: AddEditItemDialogProps) => {
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

  useEffect(() => {
    if (itemToEdit) {
      reset({
        barcode: itemToEdit.barcode,
        name: itemToEdit.name,
        categoryId: itemToEdit.categoryId,
        unit: itemToEdit.unit,
        price: itemToEdit.price
      });
    } else {
      reset({
        barcode: '',
        name: '',
        categoryId: '',
        unit: '',
        price: 100
      });
    }
  }, [itemToEdit, reset]);

  const handleFormSubmit = (data: ItemData) => {
    if (itemToEdit?.id) {
      onUpdateItem(itemToEdit.id, data);
    } else {
      onAddItem(data);
    }

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
      title="Dodaj Artikal"
      secondaryButton={{ buttonText: 'Poništi' }}
      primaryButton={{
        buttonText: itemToEdit ? 'Uredi' : 'Dodaj',
        onAction: handleSubmit(handleFormSubmit)
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        <Controller
          name="barcode"
          control={control}
          rules={{
            required: 'Barkod je obavezan',
            pattern: {
              value: /^\d{10}$/,
              message: 'Barkod mora sadržavati tačno 10 cifara'
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Barkod"
              fullWidth
              error={!!errors.barcode}
              helperText={errors.barcode?.message}
            />
          )}
        />
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Nazi artikla je obavezan' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Naziv Artikla"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            />
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
                  label="Kategorija"
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
          rules={{ required: 'Mjerna jedinica je obavezna' }}
          render={({ field }) => (
            <Autocomplete
              {...field}
              disablePortal
              options={UNIT}
              getOptionLabel={(option: unknown) => option as string}
              value={UNIT.find(unit => unit === field.value) || null}
              onChange={(_, value) => field.onChange(value)}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Mjerna jedinica"
                  error={!!errors.unit}
                  helperText={errors.unit?.message}
                />
              )}
            />
          )}
        />
        <Controller
          name="price"
          control={control}
          rules={{
            required: 'Cijena je obavezna',
            pattern: {
              value: /^[0-9]*[.,]?[0-9]+$/,
              message: 'Cijena mora biti pozitivan broj'
            }
          }}
          render={({ field }) => (
            <TextField {...field} label="Cijena" fullWidth error={!!errors.price} helperText={errors.price?.message} />
          )}
        />
      </Box>
    </CustomDialog>
  );
};

export default AddEditItemDialog;
