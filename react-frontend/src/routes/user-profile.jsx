import * as React from "react";
import Box from "@mui/material/Box";
import ViewUser from "../components/users/view-user/view-user.component";

const UserProfile = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      sx={{ marginTop: 10 }}
    >
      <ViewUser />
    </Box>
  );
};

export default UserProfile;
