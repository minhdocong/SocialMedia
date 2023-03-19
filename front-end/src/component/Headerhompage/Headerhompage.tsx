import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import {
    Avatar,
    Container,
    Divider,
    ListItemIcon,
    Menu,
    MenuItem,
    SvgIcon,
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CartIcon from '../../assets/icons/cart.svg';
import GroupIcon from '../../assets/icons/group.svg';
import HomeIcon from '../../assets/icons/home.svg';
import PlayCircleIcon from '../../assets/icons/play-circle.svg';
import AvaImg from '../../assets/images/noAvatar.svg';
import Logo from '../../assets/images/logo.svg';
import { logout, selectUser } from '../../redux/reducers/authSlice';
import { RowStack, Title } from '../common/styled';
import {
    HeaderContainer,
    NavBar,
    NavItem,
    NavItemLink,
    NavText,
    Search,
} from './styled';

const Header: React.FC = () => {
    const user = useSelector(selectUser);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        dispatch(logout());
        navigate('/login');
    };

    return (
        <HeaderContainer position='fixed'>
            <Container disableGutters maxWidth='lg'>
                <NavBar disableGutters>
                    <NavItem>
                        <Link to='/'>
                            <img src={Logo} alt='Logo' />
                        </Link>
                        <Search size='small' placeholder='Search' />
                    </NavItem>

                    <RowStack>
                        <NavItemLink to='/'>
                            <NavItem>
                                <img src={HomeIcon} alt='Home icon' />
                                <NavText>Homepage</NavText>
                            </NavItem>
                        </NavItemLink>
                        <NavItemLink to='/'>
                            <NavItem>
                                <img src={PlayCircleIcon} alt='Play icon' />
                                <NavText>Watch</NavText>
                            </NavItem>
                        </NavItemLink>
                        <NavItemLink to='/'>
                            <NavItem>
                                <img src={CartIcon} alt='Shopping cart icon' />
                                <NavText>Martketplace</NavText>
                            </NavItem>
                        </NavItemLink>
                        <NavItemLink to='/'>
                            <NavItem>
                                <img src={GroupIcon} alt='Group icon' />
                                <NavText>Groups</NavText>x
                            </NavItem>
                        </NavItemLink>
                    </RowStack>

                    <NavItem
                        onClick={handleClick}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? 'true' : undefined}
                        sx={{
                            cursor: 'pointer',
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 32,
                                height: 32,
                                fontSize: 14,
                                bgcolor: deepPurple[500],
                            }}
                            src={user?.avatar?.url || AvaImg}
                        />
                        <Title
                            ml={1.25}
                            sx={{
                                '&:hover': {
                                    color: '#8954C2',
                                },
                            }}
                        >
                            {user?.name || user?.email.split('@')[0]}
                        </Title>
                    </NavItem>
                </NavBar>
            </Container>

            <Menu
                anchorEl={anchorEl}
                id='account-menu'
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={() => navigate('/my-post')}>
                    <Avatar /> My post
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <SvgIcon
                            sx={{
                                color: '#8954C2',
                            }}
                        >
                            <PersonAdd fontSize='small' />
                        </SvgIcon>
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <SvgIcon
                            sx={{
                                color: '#8954C2',
                            }}
                        >
                            <Settings fontSize='small' />
                        </SvgIcon>
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <SvgIcon
                            sx={{
                                color: '#8954C2',
                            }}
                        >
                            <Logout fontSize='small' />
                        </SvgIcon>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </HeaderContainer>
    );
};

export default Header;