import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider } from "@mui/material"
import UserImage from 'components/UserImage'
import FlexBetween from "components/FlexBetween"
import WidgetWrapper from "components/WidgetWrapper"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const UserWidget = ({ userId, picturePath }) => {

  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const token = useSelector((state) => state.token)

  const getUser = async () => {
    let response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await response.json()
    setUser(data)
  }

  useEffect(() => {
    getUser()
  }, [])

  if (!user) {
    return null
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends
  } = user

  return (
    <WidgetWrapper>
      {/* First Row */}
      <FlexBetween gap="1rem">
        <UserImage image={picturePath} />
        <Box>
          <Typography
            variant="h4"
            fontWeight={500}
            sx={{
              "&:hover": {
                cursor: "pointer"
              }
            }}
            >{firstName} {lastName}</Typography>
        </Box>
        <ManageAccountsOutlined/>
      </FlexBetween>

      <Divider/>

      {/* Second Row */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large"/>
          <Typography> { location } </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large"/>
          <Typography> { occupation } </Typography>
        </Box>
      </Box>

      <Divider/>

      {/* Third Row */}
      <Box p="1rem 0">
        <FlexBetween>
          <Typography>Who's viewed your profile?</Typography>
          <Typography fontWeight="500">{viewedProfile}</Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography>Impressions of your post</Typography>
          <Typography fontWeight="500">{impressions}</Typography>
        </FlexBetween>
      </Box>

      <Divider/>

      {/* Fourth Row */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography fontWeight="500">
                Twitter
              </Typography>
              <Typography>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography fontWeight="500">
                Linkedin
              </Typography>
              <Typography>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined />
        </FlexBetween>
      </Box>


    </WidgetWrapper>
  )
}

export default UserWidget