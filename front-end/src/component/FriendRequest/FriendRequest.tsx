import { Box, Stack } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import HandshakeIcon from '../../assets/icons/hand-shake.svg';
import { RootState } from '../../redux/store';
import {
    CustomCard,
    CustomDivider,
    RowStack,
    Title,
    ViewAllButton,
} from '../common/styled';
import FriendRequestItem from '../FriendRequestItem/FriendRequestItem';

const FriendRequest: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    return (
        <CustomCard
            sx={{
                width: 300,
            }}
        >
            <RowStack justifyContent='center'>
                <img src={HandshakeIcon} alt='Hand shake' />
                <Title sx={{ textTransform: 'uppercase', ml: 1 }}>
                    Follow up request
                </Title>
            </RowStack>

            <CustomDivider />

            <Box
                sx={{
                    overflowY:
                        user?.requestFollowers &&
                        user?.requestFollowers?.length > 4
                            ? 'scroll'
                            : 'auto',
                    height:
                        user?.requestFollowers &&
                        user?.requestFollowers?.length > 4
                            ? 280
                            : 'auto',
                }}
            >
                {user?.requestFollowers?.map((item) => (
                    <FriendRequestItem key={item} id={item} />
                ))}
            </Box>

            {user?.requestFollowers && user?.requestFollowers?.length > 3 && (
                <Stack alignItems='center'>
                    <ViewAllButton size='small'>View All</ViewAllButton>
                </Stack>
            )}
        </CustomCard>
    );
};

export default FriendRequest;