import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { type SxProps, type Theme } from '@mui/system';

import CustomButton from './customButton';
import ErrorMessage from './errorMessage';
import type { ReactNode } from 'react';

interface ActionButtonProps {
  buttonVariant?: 'text' | 'outlined' | 'contained' | undefined;
  buttonText: string;
  onAction: () => void | Promise<void>;
  isDisabled?: boolean;
  sx?: SxProps<Theme>;
}

interface CustomDialogProps {
  isDialogOpen: boolean;
  onClose: () => void;
  title: string;
  textColor?: string;
  primaryButton?: ActionButtonProps;
  secondaryButton?: Omit<ActionButtonProps, 'onAction' | 'buttonVariant'>;
  errorMessage?: string;
  children: ReactNode;
}

const CustomDialog = ({
  isDialogOpen,
  onClose,
  title,
  textColor = '#000000',
  secondaryButton,
  primaryButton,
  errorMessage,
  children
}: CustomDialogProps) => {
  return (
    <Dialog open={isDialogOpen} onClose={onClose} fullWidth>
      <DialogTitle sx={{ color: textColor }}>{title}</DialogTitle>
      <DialogContent>
        {errorMessage && <ErrorMessage label={errorMessage} />}
        {children}
      </DialogContent>
      <DialogActions>
        {secondaryButton && (
          <CustomButton onClick={onClose} variant="contained">
            {secondaryButton.buttonText}
          </CustomButton>
        )}
        {primaryButton && (
          <CustomButton
            onClick={primaryButton.onAction}
            isDisabled={primaryButton.isDisabled || false}
            variant={primaryButton.buttonVariant || 'contained'}
            sx={primaryButton.sx}
          >
            {primaryButton.buttonText}
          </CustomButton>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
