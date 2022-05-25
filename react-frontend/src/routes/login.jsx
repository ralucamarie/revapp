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
      <h5>Login Page</h5>
      <SignIn />
    </Box>
  );
};

export default Login;
