import * as React from "react";
import userService from "../../../services/user.service";
import "./user-item.styles.css";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

const UserItem = (props) => {
  const user = props.user;
  const { id, name, surname, email, city, country, role } = user;

  const deleteUser = (id) => {
    userService.deleteUser(id);
    props.onDelete();
  };

  return (
    <Grid
      container
      spacing={1}
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Grid item xs={2}>
        {name}
      </Grid>
      <Grid item xs={2}>
        {surname}
      </Grid>
      <Grid item xs={2}>
        {email}
      </Grid>
      <Grid item xs={2}>
        {city}
      </Grid>
      <Grid item xs={1}>
        {country}
      </Grid>
      <Grid item xs={1}>
        {role}
      </Grid>
      <Grid item xs={2}>
        <div className="buttons">
          <Button
            variant="contained"
            className="button"
            size="small"
            onClick={() => props.onEdit(user)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            className="button"
            size="small"
            onClick={() => deleteUser(user.id)}
          >
            Delete
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default UserItem;
