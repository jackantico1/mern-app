import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPosts } from "state"
import PostWidget from "./PostWidget"
import { Box } from "@mui/material"


const PostsWidget = ({userId, isProfile = false }) => {

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);

  return (
    <Box
      sx={{  }}>
      {
        posts.map((post) => {
          return <PostWidget {...post}/>
        })
      }
    </Box>
  )

}

export default PostsWidget;