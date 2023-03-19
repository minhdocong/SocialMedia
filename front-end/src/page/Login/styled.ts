import { Button, styled, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export const SubmitBtn = styled(LoadingButton)({
  textTransform: 'none',
  backgroundColor: '#9854df',
  width: '100%',
  color: '#fff',
  fontWeight: 700,
  display: 'block',
  padding: '16px',
  borderRadius: '10px',
  marginTop: '20px',
  '&:hover': {
    backgroundColor: '#b772ff',
  },
});

export const CustomButton = styled(Button)({
  textTransform: 'none',
  padding: '0',
  color: '#a753ff',
  fontWeight: 700,
  '&:hover': { backgroundColor: 'transparent' },
});

export const Label = styled(Typography)({
  fontSize: '13px',
  marginBottom: '5px',
  color: '#4d4d4d',
  fontWeight: 600,
  '&:not(:first-of-type)': {
    marginTop: '12px',
  },
});

export const Input = styled(TextField)({
  borderRadius: '10px',
  '& label.Mui-focused': {
    color: '#b772ff',
  },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: '#9854df',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#b772ff',
    },
  },
});