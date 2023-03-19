import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  IconButton,
  MenuItem,
  Select,
  styled,
  Typography,
} from '@mui/material';
import { Input } from '../../page/Login/styled';
import { Avatar44, CustomText, Subtitle } from '../common/styled';

export const Modal = styled(Dialog)({
  '& .MuiDialog-paper': {
    minWidth: 800,
    bgcolor: '#fff',
    borderRadius: 5,
    padding: '32px 47px 34px 59px',
  },
});

export const FollowText = styled(Typography)({
  fontSize: 12,
  fontWeight: 500,
  color: '#acacac',
});

export const EditButton = styled(Button)({
  textTransform: 'none',
  marginTop: '20px',
  fontSize: 14,
  fontWeight: 500,
  borderColor: '#c8c8c8',
  color: '#6f6f6f',
  paddingTop: '6px',
  paddingBottom: '6px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: 'transparent',
    borderColor: '#8954c2',
    color: '#8954c2',
  },
});

export const Title = styled(CustomText)({
  fontSize: 24,
  fontWeight: 600,
  flexGrow: 1,
});

export const TextContent = styled(CustomText)({
  fontSize: 14,
});

export const CustomButton = styled(Button)({
  fontSize: 12,
  fontWeight: 500,
  textTransform: 'none',
  borderRadius: 6,
  padding: '12px 32px 10px',
});

export const SaveButton = styled(LoadingButton)({
  fontSize: 12,
  fontWeight: 500,
  textTransform: 'none',
  borderRadius: 6,
  padding: '12px 32px 10px',
  color: '#fff',
  backgroundColor: '#8954C2',
  '&:hover': {
    backgroundColor: '#8954C2',
  },
});

export const CancelButton = styled(CustomButton)({
  color: '#181818',
  backgroundColor: '#F5F5F5',
  marginRight: 16,
  '&:hover': {
    backgroundColor: '#F5F5F5',
  },
});

export const CustomInput = styled(Input)({
  '& .MuiInputBase-input': {
    fontSize: 14,
    fontWeight: 400,
    color: '#29282b',
    lineHeight: '21px',
  },
});

export const Item = styled(MenuItem)({
  fontSize: 14,
  fontWeight: 400,
  color: '#29282b',
});

export const ProfileAvatar = styled(Avatar44)({
  marginRight: '10px',
});

export const ChangeAvatar = styled(IconButton)({
  width: 32,
  height: 32,
  backgroundColor: '#c8c8c8',
  '&:hover': {
    backgroundColor: '#c8c8c8',
  },
});

export const CloseButton = styled(IconButton)({
  position: 'absolute',
  top: 20,
  right: 20,
});

export const BioText = styled(Typography)({
  fontSize: 12,
  color: '#6f6f6f',
  marginTop: '12px',
});

export const MyPage = styled(Subtitle)({
  textTransform: 'uppercase',
  color: '#6f6f6f',
});

export const PageUsername = styled(Typography)({
  fontSize: 12,
  fontWeight: 500,
  color: '#3f3f3f',
  marginLeft: '8px',
});

export const EditText = styled(Input)({
  '& .MuiInputBase-input': {
    fontSize: 24,
    fontWeight: 600,
    color: '#29282b',
    lineHeight: '36px',
  },
});

export const PageUsernameModal = styled(Subtitle)({
  flexGrow: 1,
  marginLeft: '12px',
});

export const InputPage = styled(CustomInput)({
  '& .MuiInputBase-input': {
    padding: '12px 20px 12px 25px',
    fontSize: 16,
  },
});

export const SelectPage = styled(Select)({
  borderRadius: '6px',
  '& .MuiSelect-select': {
    padding: '12px 20px 12px 25px',
    fontSize: 14,
    fontWeight: 500,
    backgroundColor: '#f5f5f5',
  },
  '& fieldset': {
    border: '0 !important',
  },
});