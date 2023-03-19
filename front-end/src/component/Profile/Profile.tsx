import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import LikeIcon from '../../assets/icons/heart.svg';
import InstagramIcon from '../../assets/icons/instagram.svg';
import FacebookIcon from '../../assets/icons/facebook.svg';
import LinkedinIcon from '../../assets/icons/linkedin.svg';
import ViewIcon from '../../assets/icons/view.svg';
import AvaImg from '../../assets/images/noAvatar.svg';
import { selectUser } from '../../redux/reducers/authSlice';
import {
    Avatar24,
    CustomCard,
    CustomDivider,
    RowStack,
    TimeLocationText,
    Title,
} from '../common/styled';
import {
    BioText,
    EditButton,
    FollowText,
    MyPage,
    PageUsername,
    ProfileAvatar,
} from './styled';

interface ProfileProps {
    openModal: () => void;
}

const Profile: React.FC<ProfileProps> = (props: ProfileProps) => {
    const user = useSelector(selectUser);

    return (
        <CustomCard
            sx={{
                width: 276,
            }}
        >
            <RowStack>
                <ProfileAvatar src={user?.avatar?.url || AvaImg} />
                <Box>
                    <Title>{user?.name || user?.email.split('@')[0]}</Title>
                    <TimeLocationText>{user?.location || ''}</TimeLocationText>
                </Box>
            </RowStack>

            <CustomDivider />

            <Box>
                <RowStack>
                    <img src={LikeIcon} alt='Heart icon' />
                    <Title ml={1.25}>{user?.followers?.length}</Title>
                    <FollowText ml={0.5}>Followers</FollowText>
                </RowStack>
                <RowStack>
                    <img src={ViewIcon} alt='Heart icon' />
                    <Title ml={1.25}>{user?.followings?.length}</Title>
                    <FollowText ml={0.5}>Followings</FollowText>
                </RowStack>
                <BioText>{user?.bio || ''}</BioText>
            </Box>

            <CustomDivider />

            <Box>
                <MyPage>My pages</MyPage>
                <Box mt={1.25}>
                    {user?.website?.facebook && (
                        <RowStack>
                            <Avatar24 src={FacebookIcon} alt='Instagram icon' />
                            <PageUsername>
                                {user?.website?.facebook}
                            </PageUsername>
                        </RowStack>
                    )}
                    {user?.website?.instagram && (
                        <RowStack mt={1.25}>
                            <Avatar24
                                src={InstagramIcon}
                                alt='Instagram icon'
                            />
                            <PageUsername>
                                {user?.website?.instagram}
                            </PageUsername>
                        </RowStack>
                    )}
                    {user?.website?.linkedIn && (
                        <RowStack mt={1.25}>
                            <Avatar24 src={LinkedinIcon} alt='Linkedin Icon' />
                            <PageUsername>
                                {user?.website?.linkedIn}
                            </PageUsername>
                        </RowStack>
                    )}
                </Box>
            </Box>
            <EditButton
                onClick={props.openModal}
                fullWidth
                size='small'
                variant='outlined'
            >
                Edit
            </EditButton>
        </CustomCard>
    );
};

export default Profile;
