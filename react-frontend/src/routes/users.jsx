import React, { useEffect, useState } from "react";
import UserService from "../services/user.service";
import UserItem from "../components/users/user-item/user-item.component";
import AddUser from "../components/users/add-user/add-user.component";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    UserService.getUsers().then((res) => {
      setUsers(res.data);
    });
  };

  const onSaveUserHandler = (newUser) => {
    if (editedUser.id) {
      const newUserList = users.map((user) =>
        user.id !== newUser.id ? user : newUser
      );
      UserService.updateUser(newUser).then(setUsers(newUserList));
    } else {
      UserService.createUser(newUser).then(() => fetchData());
    }

    setEditedUser({});
    setIsEditMode(false);
    alert(`Users updated.`);
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

  const onCancelHandler = () => {
    setEditedUser(emptyUser);
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
    <Box sx={{ marginTop: 10 }}>
      <Button
        variant="contained"
        className="button"
        onClick={() => addUserOnClick()}
      >
        {!isEditMode ? "Add User" : " Close "}
      </Button>
      {isEditMode && (
        <Box className="row" sx={{ display: "flex", flexDirection: "column" }}>
          <h2>Add a new user:</h2>
          <AddUser
            key="addUser"
            onSave={onSaveUserHandler}
            userToEdit={editedUser}
          />
        </Box>
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
              onCancel={() => onCancelHandler()}
            />
          ))}
        </Stack>
      </div>
    </Box>
  );
};

export default ListUserComponent;
