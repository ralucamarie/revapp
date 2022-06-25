import React from "react";
import "./header.styles.css";

import { styled } from "@mui/material/styles";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import MuiAppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import logo from "../../../static/images/logo.png";
import userAvatar from "../../../static/images/avatar.jpg";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import Button from "@material-ui/core/Button";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(() => ({
  flexGrow: 1,
  backgroundColor: "#fff",
  textTransform: "uppercase",
  fontWeight: "medium",
}));

const StyledLinks = styled("div")(() => ({
  marginRight: 20,
}));

const rightLink = {
  fontSize: 16,
  color: "black",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.05)",
    color: "black",
  },
};

export default function Header() {
  const { user, logout } = useContext(UserContext);

  return (
    <div>
      <AppBar position="fixed" sx={{ color: "grey" }}>
        <Toolbar>
          <Typography>
            <Link underline="none" href="/">
              <Box sx={{}} component="img" width="150px" src={logo} />
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            className="avatar"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {!user ? (
              <>
                <StyledLinks>
                  <Link underline="none" href="/login" sx={rightLink}>
                    <div>Login</div>
                  </Link>
                </StyledLinks>
                <StyledLinks>
                  <Link underline="none" href="/signup" sx={rightLink}>
                    <div>Signup</div>
                  </Link>
                </StyledLinks>
              </>
            ) : (
              <>
                {user.role_ID === 3 && (
                  <StyledLinks sx={{}}>
                    <Link underline="none" href="/users" sx={rightLink}>
                      <div>Users</div>
                    </Link>
                  </StyledLinks>
                )}

                <StyledLinks>
                  <Link underline="none" href="/user-profile" sx={rightLink}>
                    <Box className="avatar" sx={{ display: "flex" }}>
                      <Box sx={{ pr: 0.5 }}>Profile</Box>
                      <Avatar
                        alt="Remy Sharp"
                        src={userAvatar}
                        sx={{ width: 24, height: 24 }}
                      />
                    </Box>
                  </Link>
                </StyledLinks>
                <Button onClick={logout}  variant="contained" color="primary">
                  Sign out
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
