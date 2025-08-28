import { Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

import CustomDialog from './customDialog';

interface ConfirmDeleteDialogProps {
  isDialogOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  name: string;
  title?: string;
  message: string;
  isDeleteButtonVisible?: boolean;
}

const ConfirmDeleteDialog = ({
  isDialogOpen,
  onClose,
  onConfirm,
  name,
  title,
  message,
  isDeleteButtonVisible = true
}: ConfirmDeleteDialogProps) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <CustomDialog
      isDialogOpen={isDialogOpen}
      onClose={onClose}
      title={title || t('confirmDeleteDialog.title', { name })}
      textColor={theme.palette.error.main}
      secondaryButton={{ buttonText: t('CANCEL') }}
      {...(isDeleteButtonVisible && {
        primaryButton: {
          onAction: onConfirm,
          buttonText: t('DELETE'),
          buttonVariant: 'contained'
        }
      })}
    >
      <Typography>{t(message, { name })}</Typography>
    </CustomDialog>
  );
};

export default ConfirmDeleteDialog;
