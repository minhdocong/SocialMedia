import DeleteIcon from '@mui/icons-material/Delete';
import {
  ChatBubbleOutline,
  Favorite,
  FavoriteBorder,
  MoreHoriz,
  Settings,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Modal,
  Stack,
  SvgIcon,
  TextField,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import {
  CustomCard,
  RowStack,
  TimeLocationText,
  Title,
  CustomText,
  Subtitle,
} from '../common/styled';
import AvaImg from '../../assets/images/noAvatar.svg';
import { PostImage } from './styled';
import { PostType } from '../../types/PostType';
import { format } from 'timeago.js';
import axiosClient from '../../api/axiosClient';
import { User } from '../../types/UserType';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import Comment from './Comment';
import SendIcon from '@mui/icons-material/Send';
import { CommentType } from '../../types/CommentType';
import { toast } from 'react-toastify';
import EditPostModal from './EditpostModal';
import { deletePost } from '../../redux/reducers/postSlice';

interface PostProps {
  post: PostType;
}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Post: React.FC<PostProps> = ({ post }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [like, setLike] = useState<number>(post?.likes?.length || 0);
  const [userPost, setUserPost] = useState<User | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [contentComment, setContentComment] = useState<string>('');
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (e: React.MouseEvent<HTMLElement>) =>
      setAnchorEl(e.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleLike = async () => {
      setIsLiked(!isLiked);
      setLike(isLiked ? like - 1 : like + 1);
      try {
          await axiosClient.put('/posts/' + post._id + '/like', {
              userId: user?._id,
          });
      } catch (err) {}
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
  };

  useEffect(() => {
      const fetchUser = async () => {
          try {
              const res = await axiosClient.get(
                  `/users?userId=${post.userId}`
              );
              setUserPost(res.data);
          } catch (error: any) {
              toast.error(error?.message);
          }
      };
      fetchUser();
  }, []);

  useEffect(() => {
      const fetchComments = async () => {
          try {
              const res = await axiosClient.get(`/posts/comment/${post._id}`);
              setComments(res.data);
          } catch (error: any) {
              toast.error(error?.message);
          }
      };
      fetchComments();
  }, []);

  const handleCommentPost = async () => {
      try {
          const res = await axiosClient.post(`/posts/comment/${post._id}`, {
              userId: user?._id,
              content: contentComment,
              time: Date.now(),
          });
          setComments([
              ...comments,
              {
                  content: contentComment,
                  user: {
                      _id: user?._id || '',
                      email: user?.email || '',
                      name: user?.name || '',
                      avatar: user?.avatar || { public_id: '', url: '' },
                  },
              },
          ]);
          setContentComment('');
      } catch (error: any) {
          toast.error(error?.message);
      }
  };

  const handleDeletePost = async (e: any) => {
      if (window.confirm('Are you sure you want to delete this post?')) {
          try {
              e.preventDefault();
              dispatch(
                  deletePost({
                      postId: post._id || '',
                      userId: user?._id || '',
                  })
              );
          } catch (error: any) {
              toast.error(error?.message);
          }
      }
  };

  return (
      <>
          <CustomCard>
              <RowStack>
                  <Avatar
                      sx={{ width: 44, height: 44 }}
                      src={userPost?.avatar?.url || AvaImg}
                  />
                  <Box ml={1} flexGrow={1}>
                      <Title>
                          {userPost?.name || userPost?.email.split('@')[0]}
                      </Title>
                      <TimeLocationText>
                          {format(post?.createdAt || new Date())}
                      </TimeLocationText>
                  </Box>
                  {user?._id === post.userId && (
                      <IconButton
                          size='small'
                          onClick={(e) => {
                              handleClick(e);
                          }}
                      >
                          <MoreHoriz />
                      </IconButton>
                  )}
              </RowStack>
              <Menu
                  anchorEl={anchorEl}
                  id='account-menu'
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                      elevation: 0,
                      sx: {
                          overflow: 'visible',
                          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                          mt: 1.5,
                          '& .MuiAvatar-root': {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                          },
                          '&:before': {
                              content: '""',
                              display: 'block',
                              position: 'absolute',
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: 'background.paper',
                              transform: 'translateY(-50%) rotate(45deg)',
                              zIndex: 0,
                          },
                      },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                  <MenuItem>
                      <ListItemIcon
                          onClick={() => {
                              handleOpenEdit();
                          }}
                      >
                          <SvgIcon
                              sx={{
                                  color: '#8954C2',
                              }}
                          >
                              <Settings fontSize='small' />
                          </SvgIcon>
                    </ListItemIcon>
                      Edit
                  </MenuItem>
                  <MenuItem onClick={handleDeletePost}>
                      <ListItemIcon>
                          <SvgIcon
                              sx={{
                                  color: '#8954C2',
                              }}
                          >
                              <DeleteIcon fontSize='small'/>
                          </SvgIcon>
                      </ListItemIcon>
                      Delete
                  </MenuItem>
              </Menu>

              <CustomText my={2.5}>{post?.content}</CustomText>
              {post?.img?.url && (
                  <PostImage src={post?.img?.url} alt='Post image' />
              )}
              <RowStack mt={2.5}>
                  <RowStack mr={1}>
                      <IconButton size='small' onClick={handleLike}>
                          <SvgIcon
                              component={isLiked ? Favorite : FavoriteBorder}
                              sx={{
                                  color: '#e3707f',
                              }}
                          />
                      </IconButton>
                      <Subtitle>{like}</Subtitle>
                  </RowStack>
                  <RowStack>
                      <IconButton
                          size='small'
                          onClick={() => setExpanded(!expanded)}
                      >
                          <ChatBubbleOutline />
                      </IconButton>
                      <Subtitle>{comments.length}</Subtitle>
                  </RowStack>
              </RowStack>
              <Accordion
                  elevation={0}
                  expanded={expanded}
                  sx={{
                      '&:before': {
                          display: 'none',
                      },
                  }}
              >
                  <AccordionSummary
                      sx={{ display: 'none' }}
                  ></AccordionSummary>
                  <AccordionDetails>
                      <Stack
                          direction='column'
                          spacing='20px'
                          sx={{ overflowY: 'scroll' }}
                          height='150px'
                      >
                          {comments.map((comment, index) => (
                              <Comment comment={comment} key={index} />
                          ))}
                      </Stack>
                      <Stack
                          direction='row'
                          alignItems='center'
                          borderTop='1px solid #e3e3e3'
                          borderBottom='1px solid #e3e3e3'
                          mt='20px'
                          py='10px'
                          justifyContent='space-between'
                      >
                          <Stack direction='column' alignItems='center'>
                              <Avatar
                                  sx={{ width: 44, height: 44 }}
                                  src={user?.avatar?.url || AvaImg}
                              />
                          </Stack>
                          <Box>
                              <TextField
                                  placeholder='comment here'
                                  fullWidth
                                  sx={{
                                      '& fieldset': { borderRadius: '0' },
                                      '& .Mui-focused .MuiOutlinedInput-notchedOutline':
                                          {
                                              border: '1px solid #000',
                                              borderRadius: '0',
                                          },
                                      width: '350px',
                                  }}
                                  value={contentComment}
                                  onChange={(e) =>
                                      setContentComment(e.target.value)
                                  }
                              />
                          </Box>
                          <IconButton
                              size='large'
                              onClick={handleCommentPost}
                          >
                              <SendIcon fontSize='large' />
                          </IconButton>
                      </Stack>
                  </AccordionDetails>
              </Accordion>
          </CustomCard>
          <Modal
              open={openEdit}
              onClose={handleCloseEdit}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
          >
              <Box sx={style}>
                  <EditPostModal onCLose={handleCloseEdit} post={post} />
              </Box>
          </Modal>
      </>
  );
};

export default Post;