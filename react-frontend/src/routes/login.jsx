import * as React from "react";
import SignIn from "../components/users/sign-in/sign-in.component";
import { Box } from "@mui/material";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import { Typography } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

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

const Login = () => {
  const { loginUser, wait, loggedInCheck } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const classes = useStyles();

  const [formErrors, setFormErrors] = useState({
    email: "",
  });

  const onChangeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!Object.values(formData).every((val) => val.trim() !== "")) {
      setErrMsg("Please Fill in all Required Fields!");
      return;
    }

    const data = await loginUser(formData);
    if (data.success) {
      e.target.reset();
      setRedirect(true);

      await loggedInCheck();
      return;
    }
    setErrMsg(data.message);
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: "#fff",
    backgroundColor: "#FF5D0C",
    "&:hover": {
      backgroundColor: "#FF5D0C",
    },
    marginRight: "10px",
  }));

  if (redirect) return <Navigate to="/home" replace={true} />;
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
        Sign In
      </Typography>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} onSubmit={submitForm} noValidate>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12}>
                <TextField
                  placeholder="Email Address"
                  type="email"
                  name="email"
                  label="Email"
                  variant="standard"
                  className="form-control"
                  value={formData.email}
                  onChange={onChangeInput}
                  required
                />
              </Grid>

              <Grid item xs={12}>
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

              <Grid item xs={12}>
                <ColorButton
                  variant="contained"
                  className="button"
                  type="submit"
                >
                  Sign-in
                </ColorButton>
              </Grid>

              {/*  */}
            </Grid>
          </form>
          <div className="bottom-link">
            <Link to="/user-profile">Sign Up</Link>
          </div>
        </div>
      </Container>

      {/* <SignIn /> */}
      {/* <div className="myform">
        <h2>Login</h2>
        <form onSubmit={submitForm}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            onChange={onChangeInput}
            placeholder="Your email"
            id="email"
            value={formData.email}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            onChange={onChangeInput}
            placeholder="New password"
            id="password"
            value={formData.password}
            required
          />
          {errMsg && <div className="err-msg">{errMsg}</div>}
          {redirect ? redirect : <button type="submit">Login</button>}
          <div className="bottom-link">
            <Link to="/user-profile">Sign Up</Link>
          </div>
        </form>
      </div> */}
    </Box>
  );
};

export default Login;
