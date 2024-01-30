import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  PersonAddOutlined,
  PersonRemove
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react"
import UserImage from "components/UserImage"
import { useSelector } from "react-redux"


const PostWidget = ({
  postId,
  postUserId,
  firstName,
  lastName,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {

  const [showComments, setShowComments] = useState(false)
  const token = useSelector((state) => state.token)
  const { _id } = useSelector((state) => state.user);
  const userLikedPost = _id in likes
  const likeCount = Object.keys(likes).length;

  const changeLike = async () => {
    let response = await fetch(`http://localhost:3001/${postId}/like`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await response.json()
  }

  return (
    <div key={postId}>

      <Box 
        display="flex"
        >
        <UserImage image={userPicturePath}/>
        <div>
          <Typography>{firstName} {lastName}</Typography>
          <Typography>{location}</Typography>
        </div>
      </Box>
      <Typography>{description}</Typography>
      <img src={`http://localhost:3001/assets/${picturePath}`}/>
      <Box>
      <IconButton
        onClick={() => changeLike()}
        >
          {userLikedPost ? <FavoriteOutlined /> : <FavoriteBorderOutlined/>}
          <Typography>{likeCount}</Typography>
        </IconButton>
        <IconButton
          onClick={() => setShowComments(!showComments)}
          >
          <ChatBubbleOutlineOutlined/>
          <Typography>{comments.length}</Typography>
        </IconButton>
        <IconButton>
          <ShareOutlined/>
        </IconButton>
        

        {/* COMMENTS */}
        { showComments && (
          <>
          {
            comments.map((comment) => {
              return <div>
                {comment}
              </div>
            })
          }
           </>
        )}
       

      </Box>
    </div>
  )
}

export default PostWidget;