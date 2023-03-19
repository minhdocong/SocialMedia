import { styled, Typography, InputBase } from '@mui/material';
import { RowStack } from '../common/styled';

export const PostImage = styled('img')({
    width: '100%',
    borderRadius: '10px',
});

export const Item = styled(RowStack)({
    '&:not(:last-child)': {
        marginRight: '24px',
    },
});

export const SmallText = styled(Typography)({
    fontSize: 14,
    fontWeight: 500,
    color: '#29282b',
    marginLeft: 8,
});

export const PostInput = styled(InputBase)({
    fontSize: 24,
    fontWeight: 400,
    lineHeight: '36px',
});