import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import { useSelector } from "react-redux";
import { Box, useMediaQuery } from "@mui/material";

const HomePage = () => {

  const isNonMobileScreens = useMediaQuery("(min-width:1000px")
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <div>
      <Navbar/>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
        >
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            <UserWidget userId={_id} picturePath={picturePath}/>
          </Box>
          <Box
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}>
              <PostsWidget userId={_id}/>
          </Box>
      </Box>
    </div>
  )
}

export default HomePage;