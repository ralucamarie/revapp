import * as React from "react";
import Box from "@mui/material/Box";
import AddUser from "../components/users/add-user/add-user.component";

const Signup = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      sx={{ marginTop: 10 }}
    >
      Signup page
      <AddUser></AddUser>
    </Box>
  );
};

export default Signup;
