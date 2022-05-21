import React, { useEffect, useState } from "react";
import UserService from "../services/user.service";
import UserItem from "../components/users/user-item/user-item.component";
import AddUser from "../components/users/add-user/add-user.component";
import Box from "@mui/material/Box";

const ListUserComponent = (props) => {
  const [users, setUsers] = useState([]);
  // const [newUser, setNewUser] = useState([]);

  console.log(users);
  useEffect(() => {
    UserService.getUsers().then((res) => {
      console.log(res.data);
      setUsers(res.data);
    });
  }, []);

  const onSaveUserHandler = () => {
    UserService.getUsers().then((res) => {
      console.log(res.data);
      setUsers(res.data);
    });
  };

  const deleteUserHandler = () => {
    UserService.getUsers().then((res) => {
      setUsers(res.data);
    });
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
      <div className="row">
        <AddUser onSave={onSaveUserHandler} />

        <button
          className="btn btn-primary"
          // onClick={this.addUser}
        >
          Add User
        </button>
      </div>
      <br></br>
      <div className="row">{displayUsers()}</div>
    </Box>
  );
};

export default ListUserComponent;
