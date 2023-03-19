import {
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  styled,
  Typography,
} from '@mui/material';

export const CustomText = styled(Typography)({
  color: '#29282b',
});

export const TimeLocationText = styled(Typography)({
  fontWeight: 400,
  color: '#acacac',
});

export const Title = styled(CustomText)({
  fontWeight: 600,
});

export const Subtitle = styled(CustomText)({
  fontWeight: 500,
});

export const CustomDivider = styled(Divider)({
  margin: '16px 0',
  borderColor: '#f1f1f1',
});

export const CustomCard = styled(Box)({
  backgroundColor: '#fff',
  borderRadius: '20px',
  padding: '24px',
});

export const ViewAllButton = styled(Button)({
  textTransform: 'none',
  color: '#8954c2',
  fontWeight: 600,
});

export const RowStack = styled(Stack)({
  flexDirection: 'row',
  alignItems: 'center',
});

export const ModalTitle = styled(CustomText)({
  fontSize: 28,
  fontWeight: 700,
  textAlign: 'center',
});

export const Avatar24 = styled(Avatar)({
  width: 24,
  height: 24,
});

export const Avatar36 = styled(Avatar)({
  width: 36,
  height: 36,
});

export const Avatar44 = styled(Avatar)({
  width: 44,
  height: 44,
});

export const Avatar96 = styled(Avatar)({
  width: 96,
  height: 96,
});