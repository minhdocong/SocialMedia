import { Cancel, CheckCircle } from '@mui/icons-material';
import { Avatar, Box, IconButton, Stack, SvgIcon } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axiosClient from '../../api/axiosClient';
import HandshakeIcon from '../../assets/icons/hand-shake.svg';
import AvaImg from '../../assets/images/noAvatar.svg';
import { addRequestFriend } from '../../redux/reducers/authSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { User } from '../../types/UserType';
import { CustomCard, CustomDivider, RowStack, Title } from '../common/styled';

const SuggestFriend: React.FC = () => {
    const [listSuggestFriend, setListSuggestFriend] = useState<User[]>([]);
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const getSuggestFriend = async () => {
            try {
                let idArr: string[] = [];
                if (user?.requestFollowers)
                    idArr.push(...user?.requestFollowers);
                if (user?.requestFollowings)
                    idArr.push(...user?.requestFollowings);
                if (user?.followings) idArr.push(...user?.followings);

                const res = await axiosClient.post('/users', {
                    idArr: [...idArr, user?._id || ''],
                });
                setListSuggestFriend(res.data);
            } catch (error: any) {
                toast.error(error.message);
            }
        };
        getSuggestFriend();
    }, []);

    const handleDeleteSuggestFriend = async (id: string) => {
        const newListSuggestFriend = listSuggestFriend.filter(
            (item) => item._id !== id
        );
        setListSuggestFriend(newListSuggestFriend);
    };

    const handleAddFriend = async (friend: User) => {
        try {
            dispatch(
                addRequestFriend({
                    friendId: friend._id,
                    userIdRequesting: user?._id || '',
                })
            );
            toast.success(
                `You has been send request follow ${
                    friend?.name || friend?.email.split('@')[0]
                }`
            );
        } catch (error: any) {
            toast.error(error.message);
        }

        handleDeleteSuggestFriend(friend._id);
    };

    return (
        <CustomCard
            sx={{
                width: 300,
            }}
        >
            <RowStack justifyContent='center'>
                <img src={HandshakeIcon} alt='Hand shake' />
                <Title sx={{ textTransform: 'uppercase', ml: 1 }}>
                    Maybe you know?
                </Title>
            </RowStack>

            <CustomDivider />

            <Box
                sx={{
                    overflowY: listSuggestFriend.length > 4 ? 'scroll' : 'auto',
                    height: 200,
                }}
            >
                {listSuggestFriend?.map((item) => (
                    <Stack
                        key={item._id}
                        direction='row'
                        alignItems='center'
                        sx={{
                            mb: 3,
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 50,
                                height: 50,
                            }}
                            src={item?.avatar?.url || AvaImg}
                            alt='avatar'
                        />
                        <Box ml={1}>
                            <Title>
                                {item?.name || item?.email.split('@')[0]}
                            </Title>
                            <RowStack>
                                <IconButton
                                    size='small'
                                    onClick={() => handleAddFriend(item)}
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
                                        handleDeleteSuggestFriend(item._id)
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
                ))}
            </Box>
        </CustomCard>
    );
};

export default SuggestFriend;