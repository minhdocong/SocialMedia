import { CancelOutlined, Lock, People, Public } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Dialog,
    IconButton,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../../api/axiosClient';
import GalleryIcon from '../../assets/icons/gallery.svg';
import VideoIcon from '../../assets/icons/video-square.svg';
import { SubmitBtn } from '../../page/Login/styled';
import { AppDispatch, RootState } from '../../redux/store';
import { ModalTitle, RowStack, Subtitle, Title } from '../common/styled';
import { Item as MenuItem } from '../Profile/styled';
import { Item, PostInput, SmallText } from './styled';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import AvaImg from '../../assets/images/noAvatar.svg';
import { createPost } from '../../redux/reducers/postSlice';

interface CreatePostModalProps {
    open: boolean;
    handleClose: any;
}

interface TypePostImage {
    public_id: string;
    url: string;
}

const CreatePostModal: React.FC<CreatePostModalProps> = (props) => {
    const [accessType, setAccessType] = useState<string>('public');
    const [content, setContent] = useState<string>('');
    const [postImage, setPostImage] = useState<TypePostImage>({
        public_id: '',
        url: '',
    });
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.auth.user);

    const handleChangeAccessType = (e: SelectChangeEvent) => {
        setAccessType(e.target.value as string);
    };

    const handleUpload = async (e: any) => {
        e.preventDefault();
        try {
            if (postImage.public_id) handleDestroy();
            const file = e.target.files[0];

            if (!file) return alert('File not exist.');

            // if (file.size > 1024 * 1024)
            //     // 1mb
            //     return alert('Size too large!');

            if (
                file.type !== 'image/jpeg' &&
                file.type !== 'image/png' &&
                file.type !== 'image/jpg'
            )
                // 1mb
                return alert('File format is incorrect.');

            let formData = new FormData();
            formData.append('file', file);
            formData.append('post', 'true');

            const res = await axiosClient.post('/upload', formData);
            setPostImage(res.data);
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleDestroy = async () => {
        try {
            await axiosClient.post('/destroy', {
                public_id: postImage.public_id,
            });
            setPostImage({ public_id: '', url: '' });
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const post = {
                userId: user?._id,
                content,
                img: postImage,
            };
            dispatch(createPost(post));
            setContent('');
            setPostImage({ public_id: '', url: '' });
            props.handleClose();
            toast.success('Create post successfully!');
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <Dialog
            sx={{
                '& .MuiDialog-paper': {
                    minWidth: 800,
                    bgcolor: '#fff',
                    borderRadius: 5,
                    padding: '32px 42px 34px 42px',
                },
            }}
            open={props.open}
            onClose={props.handleClose}
        >
            <IconButton
                sx={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                }}
                size='small'
                onClick={props.handleClose}
            >
                <CancelOutlined />
            </IconButton>
            <ModalTitle>Create Post</ModalTitle>

            <RowStack>
                <Avatar
                    sx={{
                        width: 67,
                        height: 67,
                    }}
                    src={user?.avatar?.url || AvaImg}
                />
                <Box ml={2}>
                    <Title
                        sx={{
                            lineHeight: '24px',
                        }}
                    >
                        {user?.name || user?.email.split('@')[0]}
                    </Title>
                    <Select
                        size='small'
                        fullWidth
                        value={accessType}
                        onChange={handleChangeAccessType}
                        sx={{
                            mt: 1,
                            borderRadius: '6px',
                            '& .MuiSelect-select': {
                                padding: '7px 12px',
                                fontSize: 14,
                                fontWeight: 500,
                                bgcolor: '#f5f5f5',
                            },
                            '& fieldset': {
                                border: '0 !important',
                            },
                        }}
                    >
                        <MenuItem value='public'>
                            <RowStack>
                                <Public fontSize='small' />
                                <SmallText>Public</SmallText>
                            </RowStack>
                        </MenuItem>
                        <MenuItem value='friend'>
                            <RowStack>
                                <People fontSize='small' />
                                <SmallText>Friend</SmallText>
                            </RowStack>
                        </MenuItem>
                        <MenuItem value='onlyme'>
                            <RowStack>
                                <Lock fontSize='small' />
                                <SmallText>Only Me</SmallText>
                            </RowStack>
                        </MenuItem>
                    </Select>
                </Box>
            </RowStack>

            <Box mt={3} height='144px'>
                <PostInput
                    fullWidth
                    multiline
                    maxRows={4}
                    placeholder="What's on you mind?"
                    autoFocus
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </Box>
            {postImage.url && (
                <RowStack
                    style={{
                        margin: '18px auto',
                        position: 'relative',
                    }}
                >
                    <img
                        width={500}
                        height={300}
                        src={postImage.url}
                        alt='gallery'
                        style={{ objectFit: 'cover' }}
                    />
                    <CloseIcon
                        onClick={handleDestroy}
                        style={{ position: 'absolute', top: 0, right: 0 }}
                    />
                </RowStack>
            )}
            <RowStack
                justifyContent='space-between'
                sx={{
                    padding: '18px 24px',
                    border: '1px solid #c8c8c8',
                    borderRadius: '10px',
                }}
            >
                <RowStack>
                    <Subtitle
                        sx={{
                            lineHeight: '24px',
                        }}
                    >
                        Add to your post
                    </Subtitle>
                </RowStack>
                <RowStack>
                    <input
                        id='postImg'
                        accept='image/*'
                        type='file'
                        hidden
                        onChange={(e) => handleUpload(e)}
                    />
                    <label
                        className='form-label'
                        htmlFor='postImg'
                        style={{ marginRight: '10px' }}
                    >
                        <Item>
                            <img
                                width={20}
                                height={20}
                                src={GalleryIcon}
                                alt='gallery'
                            />
                            <Subtitle ml={1}>Image</Subtitle>
                        </Item>
                    </label>
                    <Item>
                        <img
                            width={20}
                            height={20}
                            src={VideoIcon}
                            alt='gallery'
                        />
                        <Subtitle ml={1}>Video</Subtitle>
                    </Item>
                </RowStack>
            </RowStack>

            <SubmitBtn onClick={handleSubmit}>Post</SubmitBtn>
        </Dialog>
    );
};

export default CreatePostModal;