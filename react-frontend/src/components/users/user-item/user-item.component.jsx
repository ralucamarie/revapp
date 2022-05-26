import * as React from "react";
import userService from "../../../services/user.service";
import "./user-item.styles.css";
import Button from "@mui/material/Button";

const UserItem = (props) => {
  const user = props.user;
  const { id, name, surname, email, city, country, role } = user;

  const deleteUser = (id) => {
    userService.deleteUser(id);
    props.onDelete();
  };

  return (
    <div className="user-item-container">
      <div className="user-details">
        <div>{id}</div>
        <div>{name}</div>
        <div>{surname}</div>
        <div>{email}</div>
        <div>{city}</div>
        <div>{country}</div>
        <div>{role}</div>
      </div>
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
    </div>
  );
};

export default UserItem;
