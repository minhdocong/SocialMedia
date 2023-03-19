import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostList } from "../../redux/reducers/postSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { PostType } from "../../types/PostType";
import Post from "./Post";

const PostList: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const postList = useSelector((state: RootState) => state.post.postList);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getPostList(user?._id || ""));
  }, []);

  return (
    <>
      <Stack spacing={2}>
        {postList.map((item: PostType) => (
          <Post key={item._id} post={item} />
        ))}
      </Stack>
    </>
  );
};

export default PostList;
