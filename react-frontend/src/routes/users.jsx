import React, { useEffect, useState } from "react";
import UserService from "../services/user.service";
import UserItem from "../components/users/user-item/user-item.component";
import AddUser from "../components/users/add-user/add-user.component";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";

let emptyUser = {
  id: null,
  name: "",
  surname: "",
  email: "",
  password: "",
  city: "",
  country: "",
  role: "",
};

const ListUserComponent = (props) => {
  const [users, setUsers] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(emptyUser);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    UserService.getUsers().then((res) => {
      console.log(res.data);
      setUsers(res.data);
    });
  };

  const onSaveUserHandler = (newUser) => {
    console.log(newUser);
    if (editedUser.id) {
      console.log("Edited user= " + editedUser);
      const newUserList = users.map((user) =>
        user.id !== newUser.id ? user : newUser
      );
      UserService.updateUser(newUser).then(setUsers(newUserList));
    } else {
      console.log("User to add " + newUser);

      UserService.createUser(newUser).then(() => fetchData());
    }

    setEditedUser({});
    // setIsEditMode(false);
    // alert(`Users updated.`);
  };
  const editUserHandler = (user) => {
    setIsEditMode(true);
    setEditedUser(user);
  };

  const deleteUserHandler = () => {
    UserService.getUsers().then((res) => {
      setUsers(res.data);
    });
  };

  const addUserOnClick = () => {
    setIsEditMode(!isEditMode);
  };

  function displayUsers() {
    if (users.length !== 0) {
      return users.map((user) => (
        <UserItem
          key={user.id}
          user={user}
          onDelete={() => deleteUserHandler()}
          onEdit={() => editUserHandler(user)}
        />
      ));
    } else {
      return <div>There are no users</div>;
    }
  }

  return (
    <Box height="100vh" sx={{ marginTop: 10 }}>
      <Button
        variant="contained"
        className="button"
        onClick={() => addUserOnClick()}
      >
        {!isEditMode ? "Add User" : " Close "}
      </Button>
      {isEditMode && (
        <div className="row">
          <h2>Add a new user:</h2>
          <AddUser
            key="addUser"
            onSave={onSaveUserHandler}
            userToEdit={editedUser}
          />
        </div>
      )}
      <br></br>
      <div style={{ height: 400, width: "100%" }}>
        <h2 className="text-center">Users List</h2>
        <Stack spacing={2}>
          {users.map((user) => (
            <UserItem
              key={user.id}
              user={user}
              onDelete={() => deleteUserHandler()}
              onEdit={() => editUserHandler(user)}
            />
          ))}
        </Stack>
      </div>
    </Box>
  );
};

export default ListUserComponent;
