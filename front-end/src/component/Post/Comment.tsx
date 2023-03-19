import React from 'react';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { CommentType } from '../../types/CommentType';
import AvaImg from '../../assets/images/noAvatar.svg';

interface CommentProps {
    comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
    return (
        <Stack direction='row' alignItems='center'>
            <Stack mr='20px' direction='column' alignItems='center'>
                <Avatar
                    sx={{ width: 44, height: 44 }}
                    src={comment?.user?.avatar?.url || AvaImg}
                />
            </Stack>
            <Box bgcolor='#e3e3e3' padding='10px' borderRadius='10px'>
                <Typography sx={{ fontWeight: 'bold' }}>
                    {comment?.user.name || comment?.user.email.split('@')[0]}
                </Typography>
                <Typography>{comment.content}</Typography>
            </Box>
        </Stack>
    );
};

export default Comment;