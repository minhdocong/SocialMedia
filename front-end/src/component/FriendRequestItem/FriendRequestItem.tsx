import { Cancel, CheckCircle } from '@mui/icons-material';
import { Avatar, Box, IconButton, Stack, SvgIcon } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axiosClient from '../../api/axiosClient';
import AvaImg from '../../assets/images/noAvatar.svg';
import { deleteFollowUser, followUser } from '../../redux/reducers/authSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { User } from '../../types/UserType';
import { RowStack, Title } from '../common/styled';

interface FriendRequestItemProps {
    id?: string;
}

const FriendRequestItem: React.FC<FriendRequestItemProps> = ({ id }) => {
    const [userRequest, setUserRequest] = useState<User | null>(null);
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axiosClient.get(`/users?userId=${id}`);
            setUserRequest(res.data);
        };
        fetchUser();
    }, []);

    const handleFollowUser = async (id: string) => {
        try {
            const follow = {
                userIdFollowing: id,
                userIdFollowed: user?._id || '',
            };
            dispatch(followUser(follow));
            toast.success("You've followed this user");
        } catch (error: any) {
            toast.error(error?.message);
        }
    };

    const handleDeleteFollowUser = async (id: string) => {
        try {
            dispatch(
                deleteFollowUser({
                    friendId: id,
                    currentUserId: user?._id || '',
                })
            );
            toast.success("You've deleted request of this user ");
        } catch (error: any) {
            toast.error(error?.message);
        }
    };

    return (
        <Stack
            direction='row'
            alignItems='center'
            sx={{
                mb: 3,
            }}
        >
            <Avatar
                sx={{
                    width: 51,
                    height: 51,
                }}
                src={userRequest?.avatar?.url || AvaImg}
                alt='avatar'
            />
            <Box ml={1}>
                <Title>
                    {userRequest?.name || userRequest?.email.split('@')[0]}
                </Title>
                <RowStack>
                    <IconButton
                        size='small'
                        onClick={() => handleFollowUser(userRequest?._id || '')}
                    >
                        <SvgIcon
                            sx={{
                                color: '#4edf9a',
                            }}
                            component={CheckCircle}
                        />
                    </IconButton>
                    <IconButton
                        size='small'
                        onClick={() =>
                            handleDeleteFollowUser(userRequest?._id || '')
                        }
                    >
                        <SvgIcon
                            sx={{
                                color: '#fe6f82',
                            }}
                            component={Cancel}
                        />
                    </IconButton>
                </RowStack>
            </Box>
        </Stack>
    );
};

export default FriendRequestItem;