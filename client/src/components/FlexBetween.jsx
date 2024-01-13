import { Box } from "@mui/material";
import { styled } from "@mui/system"

// this weird syntax is just define some CSS
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
})

export default FlexBetween;