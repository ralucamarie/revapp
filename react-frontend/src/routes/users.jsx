import React, { useEffect, useState } from "react";
import UserService from "../services/user.service";
import UserItem from "../components/users/user-item/user-item.component";
import AddUser from "../components/users/add-user/add-user.component";
import Box from "@mui/material/Box";

const ListUserComponent = (props) => {
  const [users, setUsers] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  // const [userToAdd, setUserToAdd] = useState({});
  // const [newUser, setNewUser] = useState([]);

  console.log(users);
  useEffect(() => {
    UserService.getUsers().then((res) => {
      console.log(res.data);
      setUsers(res.data);
    });
  }, []);

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
      UserService.createUser(newUser).then(setUsers([...users, newUser]));
    }

    setEditedUser({});
    setIsEditMode(false);
    alert(`Users updated.`);
  };
  const editUserHandler = (user) => {
    console.log(user);
    setIsEditMode(true);
    setEditedUser(user);
    // UserService.updateUser(user)
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
        />
      ));
    } else {
      return <div>There are no users</div>;
    }
  }

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      sx={{ marginTop: 10 }}
    >
      <h2 className="text-center">Users List</h2>
      <button className="btn btn-primary" onClick={() => addUserOnClick()}>
        {!isEditMode ? "Add User" : " Close "}
      </button>
      {isEditMode && (
        <div className="row">
          <AddUser
            key="addUser"
            onSave={onSaveUserHandler}
            userToEdit={editedUser}
          />
        </div>
      )}
      <br></br>
      <div className="row">
        {users.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            onDelete={() => deleteUserHandler()}
            onEdit={editUserHandler}
          />
        ))}
      </div>
      <div className="row">{displayUsers()}</div>
    </Box>
  );
};

export default ListUserComponent;
