import * as React from "react";
import SignIn from "../components/users/sign-in/sign-in.component";
import { Box } from "@mui/material";

const Login = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      sx={{ marginTop: 10 }}
    >
     
      <SignIn />
    </Box>
  );
};

export default Login;
