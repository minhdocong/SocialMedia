import {
  AppBar,
  InputBase,
  Stack,
  styled,
  Toolbar,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Subtitle } from '../common/styled';

export const NavText = styled(Subtitle)({
  marginLeft: 8,
  transition: 'color 0.3s ease',
  '&:hover': {
    color: '#8954C2',
  },
});

export const NavItem = styled(Stack)({
  flexDirection: 'row',
  alignItems: 'center',
});

export const NavItemLink = styled(Link)({
  ':not(:last-child)': {
    marginRight: 45,
  },
});

export const HeaderContainer = styled(AppBar)({
  backgroundColor: '#fff',
  height: '90px',
  boxShadow: 'none',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

export const Search = styled(InputBase)({
  marginLeft: '19px',
  padding: '4px 16px',
  border: '1px solid #eaeaea',
  borderRadius: '20px',
  fontSize: '14px',
});

export const NavBar = styled(Toolbar)({
  justifyContent: 'space-between',
});