import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import NativeSelect from "@mui/material/NativeSelect";

let emptyUser = {
  id: null,
  name: "",
  surname: "",
  email: "",
  password: "",
  city: "",
  country: "",
  role: "USER",
};
// user => {"email":"d@gmail.com","password":"123456","role":"20","name":"Raluca","surname":"Marie","city":"Cluj-Napoca","country":"Romania"}
const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
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

const AddUser = ({ onSave, userToEdit }) => {
  const [userToAdd, setUserToAdd] = useState(
    userToEdit ? userToEdit : emptyUser
  );
  const classes = useStyles();
  // const [role, setRole] = React.useState("");
  // const [id, setId] = useState(userToEdit ? userToEdit.id : null);

  const editField = (event) => {
    setUserToAdd({ ...userToAdd, [event.target.name]: event.target.value });
  };

  const cancel = () => {
    setUserToAdd(emptyUser);
  };

  const saveUser = (e) => {
    e.preventDefault();

    if (userToEdit) {
      setUserToAdd(userToEdit);
    }

    console.log("user => " + JSON.stringify(userToAdd));
    onSave(userToAdd);
    setUserToAdd(emptyUser);
  };

  // const handleChange = (event) => {
  //   setRole(event.target.value);
  // };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography> */}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  User role
                </InputLabel>
                <NativeSelect
                  defaultValue={userToAdd.role ? userToAdd.role : "USER"}
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
                value={userToAdd.name}
                onChange={editField}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="surname"
                label="Last Name"
                variant="standard"
                name="surname"
                className="form-control"
                value={userToAdd.surname}
                onChange={editField}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                placeholder="Email Address"
                name="email"
                label="Email"
                variant="standard"
                className="form-control"
                value={userToAdd.email}
                onChange={editField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="password"
                name="password"
                label="Password"
                variant="standard"
                className="form-control"
                value={userToAdd.password}
                onChange={editField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="password"
                label="Repeat Password"
                name="repeat-password"
                variant="standard"
                className="form-control"
                value={userToAdd.repeatPassword}
                onChange={editField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                label="City"
                name="city"
                variant="standard"
                className="form-control"
                value={userToAdd.city}
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
                value={userToAdd.country}
                onChange={editField}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button variant="contained" className="button" onClick={saveUser}>
                Save
              </Button>
              <Button variant="contained" className="button" onClick={cancel}>
                Cancel
              </Button>
            </Grid>

            {/*  */}
          </Grid>
        </form>
      </div>
      {/* TODO: This dropdown will be displayed only for the Admin and will get all the values in the DB for roles */}
    </Container>

    // <div className="container">
    //   <div className="row">
    //     <div className="card col-md-6 offset-md-3 offset-md-3">
    //       <div className="card-body">
    //         <form>
    //           <div className="form-group">
    //             <label> First Name: </label>
    //             <input
    //               placeholder="First Name"
    //               name="name"
    //               className="form-control"
    //               value={userToAdd.name}
    //               onChange={editField}
    //             />
    //           </div>
    //           <div className="form-group">
    //             <label> Last Name: </label>
    //             <input
    //               placeholder="Last Name"
    //               name="surname"
    //               className="form-control"
    //               value={userToAdd.surname}
    //               onChange={editField}
    //             />
    //           </div>
    //           <div className="form-group">
    //             <label> Email: </label>
    //             <input
    //               placeholder="Email Address"
    //               name="email"
    //               className="form-control"
    //               value={userToAdd.email}
    //               onChange={editField}
    //             />
    //           </div>
    //           <div className="form-group">
    //             <label> Password: </label>
    //             <input
    //               type="password"
    //               placeholder="Password"
    //               name="password"
    //               className="form-control"
    //               value={userToAdd.password}
    //               onChange={editField}
    //             />
    //           </div>
    //           <div className="form-group">
    //             <label> Repeat Password: </label>
    //             <input
    //               type="password"
    //               placeholder="Password"
    //               name="repeat-password"
    //               className="form-control"
    //               value={userToAdd.repeatPassword}
    //               onChange={editField}
    //             />
    //           </div>
    //           <div className="form-group">
    //             <label> City </label>
    //             <input
    //               type="text"
    //               placeholder="City"
    //               name="city"
    //               className="form-control"
    //               value={userToAdd.city}
    //               onChange={editField}
    //             />
    //           </div>
    //           <div className="form-group">
    //             <label> Country </label>
    //             <input
    //               type="text"
    //               placeholder="Country"
    //               name="country"
    //               className="form-control"
    //               value={userToAdd.country}
    //               onChange={editField}
    //             />
    //           </div>
    //           {/* This dropdown will be displayed only for the Admin and will get all the values in the DB for roles */}
    //           <div className="form-group">
    //             <label> Role </label>
    //             <select
    //               placeholder="Role"
    //               name="role"
    //               className="form-control"
    //               value={userToAdd.role}
    //               onChange={editField}
    //             >
    //               <option value="user">User</option>
    //             </select>
    //           </div>
    //           <button className="btn btn-success" onClick={saveUser}>
    //             Save
    //           </button>
    //           <button
    //             className="btn btn-danger"
    //             onClick={cancel}
    //             style={{ marginLeft: "10px" }}
    //           >
    //             Cancel
    //           </button>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // </div>
  );
};
// }
export default AddUser;
