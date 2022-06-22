import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { styled } from "@mui/material/styles";

let emptyForm = {
  email: "",
  password: "",
};

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

const SignIn = () => {
  const [userForm, setUserForm] = useState(emptyForm);

  const [formErrors, setFormErrors] = useState({
    email: "",
  });

  const [emailValid, setEmailValid] = useState(false);

  const [formValid, setFormValid] = useState(false);

  const classes = useStyles();

  const editField = (event) => {
    validateField(event.target.name, event.target.value);
    setUserForm({ ...userForm, [event.target.name]: event.target.value });
  };

  //TODO

  //add RepeatPass to object and compare after.

  const validateField = (fieldName, value) => {
    let fieldValidationErrors = formErrors;

    switch (fieldName) {
      case "email":
        const regex =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        setEmailValid(regex.test(value));
        fieldValidationErrors.email = emailValid ? "" : " Email is invalid";
        break;
      default:
        break;
    }
    setFormErrors(fieldValidationErrors);
    validateForm();
  };

  const validateForm = () => {
    setFormValid(emailValid);
  };

  const signIn = (e) => {
    e.preventDefault();

    if (formValid) {
      // onSave(dbCreateUser);
      // setUserToAdd(emptyUser);
    }
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: "#fff",
    backgroundColor: "#FF5D0C",
    "&:hover": {
      backgroundColor: "#FF5D0C",
    },
    marginRight: "10px",
  }));

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
          <form className={classes.form} noValidate>
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
                  name="email"
                  label="Email"
                  variant="standard"
                  className="form-control"
                  value={userForm.email}
                  onChange={editField}
                  error={formErrors.email.length > 0}
                  helperText={formErrors.email}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type="password"
                  name="password"
                  label="Password"
                  variant="standard"
                  className="form-control"
                  value={userForm.password}
                  onChange={editField}
                />
              </Grid>

              <Grid item xs={12}>
                <ColorButton
                  variant="contained"
                  className="button"
                  onClick={signIn}
                >
                  Sign-in
                </ColorButton>
              </Grid>

              {/*  */}
            </Grid>
          </form>
        </div>
      </Container>
    </Box>
  );
};

export default SignIn;
