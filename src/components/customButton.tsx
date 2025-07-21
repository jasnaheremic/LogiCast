import { Button, CircularProgress } from '@mui/material';
import { grey } from '@mui/material/colors';
import { type SxProps } from '@mui/system';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import type { Theme } from '@mui/system';

interface CustomButtonProps {
  onClick?: () => void | Promise<void>;
  isDisabled?: boolean;
  variant?: 'text' | 'outlined' | 'contained' | undefined;

  color?: 'primary' | 'secondary';
  sx?: SxProps<Theme>;
  children: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  size?: 'small' | 'medium' | 'large';
}

const CustomButton = ({
  onClick,
  isDisabled,
  variant,
  color,
  sx = {},
  children,
  startIcon,
  endIcon,
  size
}: CustomButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const unloadRef = useRef(false);
  const MIN_LOADING_TIME = 300;

  useEffect(() => {
    const handleBeforeUnload = () => {
      unloadRef.current = true;
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const handleClick = async () => {
    if (!onClick) return;

    setIsLoading(true);
    const spinnerTimer = window.setTimeout(() => {
      setShowSpinner(true);
    }, MIN_LOADING_TIME);

    try {
      await Promise.resolve(onClick());
    } finally {
      clearTimeout(spinnerTimer);
      if (!unloadRef.current) {
        setIsLoading(false);
        setShowSpinner(false);
      }
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isDisabled || isLoading}
      variant={variant}
      color={color}
      startIcon={showSpinner ? <CircularProgress size={20} color="inherit" /> : startIcon}
      endIcon={endIcon}
      size={size}
      sx={{
        ...sx,
        '& .MuiButton-startIcon': {
          transition: 'opacity 0.3s ease'
        },
        backgroundColor: grey[900],
        color: grey[50]
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
