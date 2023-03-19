import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import HandshakeIcon from '../../assets/icons/hand-shake.svg';
import { RootState } from '../../redux/store';
import { CustomCard, CustomDivider, RowStack, Title } from '../common/styled';
import ListFriendtItem from './ListFriendItem';

const ListFriend: React.FC = () => {
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
                    List Follower
                </Title>
            </RowStack>
            <CustomDivider />
            <Box
                sx={{
                    overflowY:
                        user?.followers && user?.followers?.length > 3
                            ? 'scroll'
                            : 'auto',
                    height:
                        user?.followers && user?.followers?.length > 3
                            ? 280
                            : 'auto',
                }}
            >
                {user?.followers &&
                    user?.followers.map((item) => (
                        <ListFriendtItem key={item} id={item} />
                    ))}
            </Box>
        </CustomCard>
    );
};

export default ListFriend;