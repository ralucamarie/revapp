import React from "react";
import "./header.styles.css";

import { styled } from "@mui/material/styles";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import MuiAppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import logo from "../../../static/images/logo_transparent.jpg";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(() => ({
  flexGrow: 1,
}));

const StyledLinks = styled("div")(() => ({
  marginRight: 10,
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
  return (
    <div>
      <AppBar position="fixed" sx={{ color: "grey" }}>
        <Toolbar>
          <Typography>
            <Link
              underline="none"
              href="/"
              //   sx={{
              //     fontSize: 16,
              //     color: "black",
              //     "&:hover": {
              //       color: "black",
              //     },
              //   }}
            >
              <Box
                sx={{}}
                component="img"
                width="100px"
                src={logo}
                // "/public/logo_transparent.jpg"
              />
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

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

          <StyledLinks>
            <Link underline="none" href="/users" sx={rightLink}>
              <div>Users</div>
            </Link>
          </StyledLinks>

          <StyledLinks>
            <Link underline="none" href="/user-profile" sx={rightLink}>
              <div className="avatar">
                <span>Profile</span>
                <Avatar
                  alt="Remy Sharp"
                  src="../../../static/images/avatar.jpg"
                  sx={{ width: 24, height: 24 }}
                />
              </div>
            </Link>
          </StyledLinks>
        </Toolbar>
      </AppBar>
    </div>
  );
}
