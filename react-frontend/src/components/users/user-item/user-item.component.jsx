import * as React from "react";
import userService from "../../../services/user.service";
import "./user-item.styles.css";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: "none ",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "left !important",
// }));

const UserItem = (props) => {
  const user = props.user;
  const { id, name, surname, email, city, country, role } = user;

  const deleteUser = (id) => {
    userService.deleteUser(id);
    props.onDelete();
  };

  return (
    <Grid container spacing={2}>
      {/* <Grid item xs={1}>
        {id}
      </Grid> */}
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
      {/* <div></div>
      <div>{name}</div>
      <div>{surname}</div>
      <div>{email}</div>
      <div>{city}</div>
      <div>{country}</div>
      <div>{role}</div> */}
      {/* <div className="buttons">
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
      </div> */}
    </Grid>
  );
};

export default UserItem;
