import { Box, Container, Grid } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreatePost from '../../component/CreatePost';
import CreatePostModal from '../../component/CreatePost/CreatepostModal';
import FriendRequest from '../../component/FriendRequest/FriendRequest';
import ListFriend from '../../component/ListFriend/ListFriend';
import PostList from '../../component/Post';
import EditProfileModal from '../../component/Profile/EditProfileModal';
import Profile from '../../component/Profile/Profile';
import SuggestFriend from '../../component/SuggestFriend/SuggestFriend';
import { getUser } from '../../redux/reducers/authSlice';
import { AppDispatch, RootState } from '../../redux/store';

const Home: React.FC = () => {
    const [openEditProfile, setOpenEditProfile] = useState<boolean>(false);
    const [openCreatePost, setOpenCreatePost] = useState<boolean>(false);
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch<AppDispatch>();
    const handleEditProfileOpen = () => {
        setOpenEditProfile(true);
    };

    const handleEditProfileClose = () => {
        setOpenEditProfile(false);
    };

    const handleCreatePostOpen = () => {
        setOpenCreatePost(true);
    };

    const handleCreatePostClose = () => {
        setOpenCreatePost(false);
    };

    useEffect(() => {
        dispatch(getUser(user?._id || ''));
    }, []);

    return (
        <Box
            sx={{
                bgcolor: '#f6f6f6',
                minHeight: '100vh',
                mt: '90px',
            }}
        >
            <Container sx={{ pt: 4 }} disableGutters maxWidth='lg'>
                <Grid container spacing={4}>
                    <Grid item xs={3}>
                        <Profile openModal={handleEditProfileOpen} />
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={4}>
                            <CreatePost handleOpen={handleCreatePostOpen} />
                            <PostList />
                        </Stack>
                    </Grid>
                    <Grid item xs={3}>
                        <Stack spacing={4}>
                            <FriendRequest />
                            <SuggestFriend />
                            <ListFriend />
                        </Stack>
                    </Grid>
                </Grid>
            </Container>

            <EditProfileModal
                open={openEditProfile}
                handleClose={handleEditProfileClose}
            />
            <CreatePostModal
                open={openCreatePost}
                handleClose={handleCreatePostClose}
            />
        </Box>
    );
};

export default Home;
