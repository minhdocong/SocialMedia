import { Avatar, Box, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import AvaImg from '../../assets/images/noAvatar.svg';
import { User } from '../../types/UserType';
import { Title } from '../common/styled';

interface ListFriendItemProps {
    id?: string;
}

const ListFriendItem: React.FC<ListFriendItemProps> = ({ id }) => {
    const [friend, setFriend] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axiosClient.get(`/users?userId=${id}`);
            setFriend(res.data);
        };
        fetchUser();
    });
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
                src={friend?.avatar?.url || AvaImg}
                alt='avatar'
            />
            <Box ml={1}>
                <Title>{friend?.name || friend?.email.split('@')[0]}</Title>
            </Box>
        </Stack>
    );
};

export default ListFriendItem;