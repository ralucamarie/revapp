import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import NativeSelect from "@mui/material/NativeSelect";
import Alert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";

let emptyUser = {
  id: null,
  name: "",
  surname: "",
  email: "",
  password: "",
  repeatPassword: "",
  city: "",
  country: "",
  role: "USER",
};

// let dbCreateUser = {
//   name: "",
//   surname: "",
//   email: "",
//   password: "",
//   city: "",
//   country: "",
//   role: "",
// };
// user => {"email":"d@gmail.com","password":"123456","role":"20","name":"Raluca","surname":"Marie","city":"Cluj-Napoca","country":"Romania"}
const useStyles = makeStyles((theme) => ({
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

const AddUser = ({ onSave, userToEdit, onCancel }) => {
  const [formData, setFormData] = useState(
    userToEdit
      ? { ...userToEdit, password: "" }
      : {
          id: null,
          name: "",
          surname: "",
          email: "",
          password: "",
          repeatPassword: "",
          city: "",
          country: "",
          role: "USER",
        }
  );
  console.log("user to edit" + JSON.stringify(userToEdit));
  console.log("form dada:" + JSON.stringify(formData));

  const [formErrors, setFormErrors] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [nameValid, setNameValid] = useState(false);
  const [surnameValid, setSurnameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  // const [passwordsMatch, setPasswordsMatch] = useState(false);

  const [formValid, setFormValid] = useState(false);

  const classes = useStyles();

  const editField = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    validateField(event.target.name, event.target.value);
  };

  const validateField = (fieldName, value) => {
    let fieldValidationErrors = formErrors;

    switch (fieldName) {
      case "name":
        setNameValid(value.length > 2);
        fieldValidationErrors.name = nameValid ? "" : "Name is invalid";
        break;
      case "surname":
        setSurnameValid(value.length > 2);
        fieldValidationErrors.surname = surnameValid
          ? ""
          : "Surname is invalid";
        break;
      case "email":
        const regex =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        setEmailValid(regex.test(value));
        fieldValidationErrors.email = emailValid ? "" : " Email is invalid";
        break;
      case "password":
        setPasswordValid(value.length >= 6);
        fieldValidationErrors.password = passwordValid
          ? ""
          : "Password is too short";
        break;
      // case "repeatPassword":
      //   console.log(
      //     "Passw: ",
      //     formData.password,
      //     "repeat pass :",
      //     formData.repeatPassword
      //   );
      //   if (formData.password === formData.repeatPassword)
      //     setPasswordsMatch(true);

      //   console.log(passwordsMatch);
      //   fieldValidationErrors.repeatPassword = passwordsMatch
      //     ? ""
      //     : "Passwords don't match";
      //   break;
      default:
        break;
    }
    setFormErrors(fieldValidationErrors);
    validateForm();
  };

  const validateForm = () => {
    setFormValid(nameValid && surnameValid && emailValid && passwordValid);
  };

  const cancel = () => {
    setFormData(emptyUser);
    onCancel();
  };

  const saveUser = (e) => {
    e.preventDefault();

    console.log("user => " + JSON.stringify(formData));

    if (!userToEdit && formValid) {
      onSave(formData);
      setFormData(emptyUser);
      window.location.reload();
    }
    if (userToEdit) {
      onSave(formData);
      setFormData(emptyUser);
      window.location.reload();
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  User role
                </InputLabel>
                <NativeSelect
                  inputProps={{
                    name: "role",
                    id: "uncontrolled-native",
                  }}
                  onChange={editField}
                >
                  <option value="USER">User</option>
                  <option value="ADMINISTRATOR">Administrator</option>
                  <option value="MODERATOR">Moderator</option>
                </NativeSelect>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="name"
                label="First Name"
                variant="standard"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={editField}
                error={formErrors?.name.length > 0}
                helperText={formErrors?.name}
                autoComplete="given-name"
                inputProps={{
                  type: "text",
                  autoComplete: "off",
                }}
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
                onChange={editField}
                error={formErrors.surname.length > 0}
                helperText={formErrors.surname}
                autoComplete="family-name"
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
                onChange={editField}
                error={formErrors.email.length > 0}
                helperText={formErrors.email}
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
                onChange={editField}
                error={formErrors.password.length > 0}
                helperText={formErrors.password}
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
                onChange={editField}
                error={formErrors.repeatPassword.length > 0}
                helperText={formErrors.repeatPassword}
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
                onChange={editField}
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
                onChange={editField}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <ColorButton
                variant="contained"
                className="button"
                onClick={saveUser}
              >
                Save
              </ColorButton>
              <Button variant="contained" className="button" onClick={cancel}>
                Cancel
              </Button>
            </Grid>

            {/*  */}
          </Grid>
        </form>
      </div>
    </Container>
  );
};
// }
export default AddUser;
