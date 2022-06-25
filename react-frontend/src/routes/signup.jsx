import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { styled } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import { Navigate } from "react-router-dom";

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import userService from "../services/user.service";

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
  const { wait } = useContext(UserContext);
  const [errMsg, setErrMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    surname: "",
    email: "",
    password: "",
    repeatPassword: "",
    city: "",
    country: "",
    role: "USER",
  });

  const classes = useStyles();

  const ColorButton = styled(Button)(({ theme }) => ({
    color: "#fff",
    backgroundColor: "#FF5D0C",
    "&:hover": {
      backgroundColor: "#FF5D0C",
    },
    marginBottom: "10px",
    marginTop: "10px",
  }));

  const onChangeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.repeatPassword) {
      setSuccessMsg(false);
      setErrMsg("Passwords don't match");
      return;
    }

    if (userService.createUser(formData)) {
      e.target.reset();
      setSuccessMsg("You have successfully signed-up.");
      setErrMsg(false);
      <Navigate to="/dashboard" replace={true} />;
    } else {
      setSuccessMsg(false);
      setErrMsg("User was not created");
    }
  };

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

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} onSubmit={submitForm}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="name"
                  label="First Name"
                  variant="standard"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={onChangeInput}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="surname"
                  label="Last Name"
                  variant="standard"
                  name="surname"
                  className="form-control"
                  value={formData.surname}
                  onChange={onChangeInput}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  placeholder="Email Address"
                  name="email"
                  label="Email"
                  variant="standard"
                  className="form-control"
                  value={formData.email}
                  onChange={onChangeInput}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="password"
                  name="password"
                  label="Password"
                  variant="standard"
                  className="form-control"
                  value={formData.password}
                  onChange={onChangeInput}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="password"
                  label="Repeat Password"
                  name="repeatPassword"
                  variant="standard"
                  className="form-control"
                  value={formData.repeatPassword}
                  onChange={onChangeInput}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  label="City"
                  name="city"
                  variant="standard"
                  className="form-control"
                  value={formData.city}
                  onChange={onChangeInput}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  label="Country"
                  name="country"
                  variant="standard"
                  className="form-control"
                  value={formData.country}
                  onChange={onChangeInput}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                {successMsg && (
                  <Alert severity="success" className="success-msg">
                    {successMsg}
                  </Alert>
                )}
                {errMsg && (
                  <Alert severity="warning" className="err-msg">
                    {errMsg}
                  </Alert>
                )}

                <ColorButton
                  type="submit"
                  disabled={wait}
                  variant="contained"
                  className="button"
                >
                  Sign Up
                </ColorButton>

                <Box className="bottom-link">
                  <Link to="/login" underline="none">
                    Login
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Box>
  );
};

export default Signup;
