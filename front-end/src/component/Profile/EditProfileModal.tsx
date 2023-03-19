import { CancelOutlined } from '@mui/icons-material';
import {
    Badge,
    Box,
    Button,
    Grid,
    IconButton,
    SelectChangeEvent,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axiosClient from '../../api/axiosClient';
import AddIcon from '../../assets/icons/add-circle.svg';
import CameraIcon from '../../assets/icons/camera.svg';
import EditIcon from '../../assets/icons/edit.svg';
import InstagramIcon from '../../assets/icons/instagram.svg';
import LinkedinIcon from '../../assets/icons/linkedin.svg';
import FacebookIcon from '../../assets/icons/facebook.svg';
import { updateUser } from '../../redux/reducers/authSlice';
import { AppDispatch, RootState } from '../../redux/store';
import {
    Avatar36,
    Avatar96,
    CustomDivider,
    ModalTitle,
    RowStack,
} from '../common/styled';
import {
    CancelButton,
    ChangeAvatar,
    CloseButton,
    CustomInput,
    EditText,
    InputPage,
    Item,
    Modal,
    PageUsernameModal,
    SaveButton,
    SelectPage,
    TextContent,
    Title,
} from './styled';
import AvaImg from '../../assets/images/noAvatar.svg';

interface EditProfileModalProps {
    open: boolean;
    handleClose: any;
}

interface FormValues {
    file?: any;
    name?: string;
    location?: string;
    bio?: string;
}

const EditProfileModal: React.FC<EditProfileModalProps> = (props) => {
    const user = useSelector((state: RootState) => state?.auth?.user);
    const { register, handleSubmit, reset, watch } = useForm<FormValues>();
    const dispatch = useDispatch<AppDispatch>();
    const [isEditName, setIsEditName] = useState<boolean>(false);
    const [isEditLocation, setIsEditLocation] = useState<boolean>(false);
    const [isEditBio, setIsEditBio] = useState<boolean>(false);
    const [isAddSocial, setIsAddSocial] = useState<boolean>(false);
    const [socialType, setSocialType] = useState<string>('facebook');
    const [nameLoading, setNameLoading] = useState<boolean>(false);
    const [locationLoading, setLocationLoading] = useState<boolean>(false);
    const [bioLoading, setBioLoading] = useState<boolean>(false);
    const [imgSrc, setImgSrc] = useState<string>(user?.avatar?.url || '');
    const [socialUsername, setSocialUsername] = useState<string>('');

    const handleEditName = () => setIsEditName(true);

    const handleSaveName = async (data: FormValues) => {
        setNameLoading(true);
        try {
            await dispatch(
                updateUser({
                    id: user?._id || '',
                    info: { userId: user?._id, name: data.name },
                })
            );
            toast.success('Update name successfully!');
            reset({ name: data.name });
            setIsEditName(false);
        } catch (error: any) {
            reset({ name: user?.name });
            toast.error(error?.message);
        } finally {
            setNameLoading(false);
        }
    };

    const handleCancelName = () => {
        setIsEditName(false);
        reset({ name: user?.name });
    };

    const handleEditLocation = () => setIsEditLocation(true);

    const handleSaveLocation = async (data: FormValues) => {
        setLocationLoading(true);
        try {
            await dispatch(
                updateUser({
                    id: user?._id || '',
                    info: { userId: user?._id, location: data.location },
                })
            );
            toast.success('Update location successfully!');
            reset({ location: data.location });
            setIsEditLocation(false);
        } catch (error: any) {
            reset({ location: user?.location });
            toast.error(error?.message);
        } finally {
            setLocationLoading(false);
        }
    };

    const handleCancelLocation = () => {
        setIsEditLocation(false);
        reset({ location: user?.location });
    };

    const handleEditBio = () => {
        setIsEditBio(true);
    };

    const handleSaveBio = async (data: FormValues) => {
        setBioLoading(true);
        try {
            await dispatch(
                updateUser({
                    id: user?._id || '',
                    info: { userId: user?._id, bio: data.bio },
                })
            );
            toast.success('Update bio successfully!');
            reset({ bio: data.bio });
            setIsEditBio(false);
        } catch (error: any) {
            reset({ bio: user?.bio });
            toast.error(error?.message);
        } finally {
            setBioLoading(false);
        }
    };

    const handleCancelBio = () => {
        setIsEditBio(false);
        reset({ bio: user?.bio });
    };

    const handleAddSocial = () => {
        setIsAddSocial(true);
    };

    const handleChangeSocialType = (e: SelectChangeEvent<any>) => {
        setSocialType(e.target.value as string);
    };

    const handleSaveNewSocial = async () => {
        try {
            await dispatch(
                updateUser({
                    id: user?._id || '',
                    info: {
                        userId: user?._id,
                        website: {
                            ...user?.website,
                            [socialType]: socialUsername,
                        },
                    },
                })
            );
            setSocialUsername('');
            setSocialType('facebook');
            toast.success('Add social successfully!');
            setIsAddSocial(false);
        } catch (error: any) {
            reset({ bio: user?.bio });
            toast.error(error?.message);
        } finally {
            setBioLoading(false);
        }
    };

    const handleCancelSocial = () => {
        setIsAddSocial(false);
    };

    const handleDestroy = async () => {
        try {
            await axiosClient.post('/destroy', {
                public_id: user?.avatar?.public_id,
            });
        } catch (err: any) {
            alert(err.message);
        }
    };

    const updateAvatar = async (file: any) => {
        try {
            if (user?.avatar?.public_id) {
                handleDestroy();
            }
            if (!file) return toast.error('File not exist.');

            // if (file.size > 1024 * 1024)
            //     // 1mb
            //     return toast.error('Size too large!');

            if (
                file.type !== 'image/jpeg' &&
                file.type !== 'image/png' &&
                file.type !== 'image/jpg'
            )
                // 1mb
                return toast.error('File format is incorrect.');

            let formData = new FormData();
            formData.append('file', file);
            const res = await axiosClient.post('/upload', formData);
            await dispatch(
                updateUser({
                    id: user?._id || '',
                    info: {
                        userId: user?._id,
                        avatar: {
                            public_id: res.data.public_id,
                            url: res.data.url,
                        },
                    },
                })
            );
            toast.success('Update avatar successfully!');
            reset({ file: null });
        } catch (error: any) {
            console.log(error);
            toast.error(error?.message);
        }
    };

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'file') {
                const newUrl = URL.createObjectURL(value['file'][0]);
                if (newUrl !== imgSrc) {
                    setImgSrc(newUrl);
                }
                updateAvatar(value['file'][0]);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    return (
        <Modal open={props.open} onClose={props.handleClose}>
            <CloseButton size='small' onClick={props.handleClose}>
                <CancelOutlined />
            </CloseButton>
            <ModalTitle>Edit Profile</ModalTitle>
            <input
                id='avatar'
                accept='image/*'
                type='file'
                hidden
                {...register('file')}
            />

            <RowStack>
                <label className='form-label' htmlFor='avatar'>
                    <Badge
                        overlap='circular'
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        badgeContent={
                            <ChangeAvatar>
                                <img src={CameraIcon} alt='camera' />
                            </ChangeAvatar>
                        }
                    >
                        <Avatar96
                            sx={{
                                width: 51,
                                height: 51,
                            }}
                            src={imgSrc || AvaImg}
                            alt='avatar'
                        />
                    </Badge>
                </label>
                {isEditName ? (
                    <Box flexGrow={1} ml={2.5}>
                        <EditText
                            size='small'
                            fullWidth
                            multiline
                            rows={2}
                            type='text'
                            defaultValue={
                                user?.name || user?.email.split('@')[0]
                            }
                            {...register('name')}
                        />
                    </Box>
                ) : (
                    <Title ml={2.25}>
                        {user?.name || user?.email.split('@')[0]}
                    </Title>
                )}
                {!isEditName && (
                    <IconButton size='small' onClick={handleEditName}>
                        <img src={EditIcon} alt='edit' />
                    </IconButton>
                )}
            </RowStack>
            {isEditName && (
                <>
                    <RowStack mt={1.5} justifyContent='flex-end'>
                        <CancelButton onClick={handleCancelName}>
                            Cancel
                        </CancelButton>
                        <SaveButton
                            loading={nameLoading}
                            loadingIndicator='Loading...'
                            onClick={handleSubmit(handleSaveName)}
                        >
                            Save
                        </SaveButton>
                    </RowStack>
                    <CustomDivider />
                </>
            )}

            <Box
                sx={{
                    marginTop: isEditName ? 0 : 3,
                }}
            >
                <Box>
                    <RowStack mb={1}>
                        <Title>Location</Title>
                        <IconButton size='small' onClick={handleEditLocation}>
                            <img src={EditIcon} alt='edit' />
                        </IconButton>
                    </RowStack>
                    {isEditLocation ? (
                        <>
                            <CustomInput
                                fullWidth
                                type='text'
                                size='small'
                                defaultValue={user?.location}
                                {...register('location')}
                            />
                            <RowStack mt={1.5} justifyContent='flex-end'>
                                <CancelButton onClick={handleCancelLocation}>
                                    Cancel
                                </CancelButton>
                                <SaveButton
                                    loading={locationLoading}
                                    loadingIndicator='Loading...'
                                    onClick={handleSubmit(handleSaveLocation)}
                                >
                                    Save
                                </SaveButton>
                            </RowStack>
                        </>
                    ) : (
                        <TextContent>{user?.location}</TextContent>
                    )}
                </Box>

                <CustomDivider />

                <Box>
                    <RowStack mb={1}>
                        <Title>Bio</Title>
                        <IconButton size='small' onClick={handleEditBio}>
                            <img src={EditIcon} alt='edit' />
                        </IconButton>
                    </RowStack>
                    {isEditBio ? (
                        <>
                            <CustomInput
                                fullWidth
                                multiline
                                type='text'
                                size='small'
                                defaultValue={user?.bio}
                                {...register('bio')}
                            />
                            <RowStack mt={1.5} justifyContent='flex-end'>
                                <CancelButton onClick={handleCancelBio}>
                                    Cancel
                                </CancelButton>
                                <SaveButton
                                    loading={bioLoading}
                                    loadingIndicator='Loading...'
                                    onClick={handleSubmit(handleSaveBio)}
                                >
                                    Save
                                </SaveButton>
                            </RowStack>
                        </>
                    ) : (
                        <TextContent>{user?.bio}</TextContent>
                    )}
                </Box>

                <CustomDivider />

                <Box>
                    <Title>My pages</Title>
                    {user?.website?.facebook && (
                        <RowStack mt={2}>
                            <Avatar36 src={FacebookIcon} alt='' />
                            <PageUsernameModal>
                                {user?.website?.facebook}
                            </PageUsernameModal>
                            <IconButton size='small'>
                                <img src={EditIcon} alt='edit' />
                            </IconButton>
                        </RowStack>
                    )}
                    {user?.website?.instagram && (
                        <RowStack mt={1}>
                            <Avatar36 src={InstagramIcon} alt='' />
                            <PageUsernameModal>
                                {user?.website?.instagram}
                            </PageUsernameModal>
                            <IconButton size='small'>
                                <img src={EditIcon} alt='edit' />
                            </IconButton>
                        </RowStack>
                    )}
                    {user?.website?.linkedIn && (
                        <RowStack mt={1}>
                            <Avatar36 src={LinkedinIcon} alt='' />
                            <PageUsernameModal>
                                {user?.website?.linkedIn}
                            </PageUsernameModal>
                            <IconButton size='small'>
                                <img src={EditIcon} alt='edit' />
                            </IconButton>
                        </RowStack>
                    )}
                    {isAddSocial && (
                        <Grid container spacing={2} mt={2}>
                            <Grid item xs={9}>
                                <InputPage
                                    fullWidth
                                    type='text'
                                    placeholder='Enter username'
                                    value={socialUsername}
                                    onChange={(e) =>
                                        setSocialUsername(e.target.value)
                                    }
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <SelectPage
                                    fullWidth
                                    value={socialType}
                                    onChange={handleChangeSocialType}
                                >
                                    <Item value='facebook'>Facebook</Item>
                                    <Item value='instagram'>Instagram</Item>
                                    <Item value='linkedIn'>LinkedIn</Item>
                                </SelectPage>
                            </Grid>
                        </Grid>
                    )}

                    <RowStack
                        mt={isAddSocial ? 4 : 3}
                        justifyContent='space-between'
                    >
                        <Button
                            startIcon={<img src={AddIcon} alt='' />}
                            size='small'
                            sx={{
                                textTransform: 'none',
                                color: '#8954C2',
                                fontSize: 16,
                                fontWeight: 500,
                            }}
                            onClick={handleAddSocial}
                        >
                            Add a website
                        </Button>
                        {isAddSocial && (
                            <RowStack justifyContent='flex-end'>
                                <CancelButton onClick={handleCancelSocial}>
                                    Cancel
                                </CancelButton>
                                <SaveButton onClick={handleSaveNewSocial}>
                                    Save
                                </SaveButton>
                            </RowStack>
                        )}
                    </RowStack>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditProfileModal;