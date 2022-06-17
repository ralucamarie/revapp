import * as React from "react";
import Box from "@mui/material/Box";
import AddUser from "../components/users/add-user/add-user.component";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  palette: {
    secondary: {
      light: "#A08E95",
      main: "#A08E95",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00",
    },
  },
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },

    flexDirection: "column",
    alignItems: "center",
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signup = () => {
  const classes = useStyles();
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      sx={{ marginTop: 10 }}
      alignItems="center"
    >
      <Avatar className={classes.avatar} sx={{ bgcolor: "#FF5D0C" }}>
        <LockIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <AddUser></AddUser>
    </Box>
  );
};

export default Signup;
