import React, { useState, useEffect } from "react";
import "./view-user.styles.css";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/Divider";
import { getAddressById } from "../../../services/address.service";
import userAvatar from "../../../static/images/avatar.jpg";

const ViewUser = ({ user }) => {
  const [address, setAddress] = useState({})

  const fetchData = async (addressId) => {
    getAddressById(addressId).then((res) => {  
      setAddress(res.data)
    });
  };

  useEffect(() => {
    fetchData(user.address_ID);
  }, [user.address_ID]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper
        sx={{
          mb: 2,
        }}
      >
        <Container>
          <h2>My Profile</h2>
          <Container
            sx={{
              display: "flex",
            }}
          >
            <Box
              sx={{
                p: 2,
                m: 2,
              }}
              component="img"
              alt="User Image"
              src={userAvatar}
              // src="https://www.fillmurray.com/400/200"
            />
            <Box
              sx={{
                p: 2,
                m: 2,
              }}
            >
              <div className="row">
                <label> First Name: </label>
                <div className="profile-field"> {user.name}</div>
              </div>
              <Divider />
              <div className="row">
                <label> User Last Name: </label>
                <div className="profile-field"> {user.surname}</div>
              </div>
              <Divider />
              <div className="row">
                <label> User Email ID: </label>
                <div className="profile-field"> {user.email}</div>
              </div>
              <Divider />
              <div className="row">
                <label> City: </label>
                <div className="profile-field"> {address.city}</div>
              </div>
              <Divider />
              <div className="row">
                <label>Country: </label>
                <div className="profile-field"> {address.country}</div>
              </div>

              <List>
                <ListItem>
                  <ListItemButton component="a" href="#simple-list">
                    <ListItemText primary="Edit my profile" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Container>
        </Container>
      </Paper>
    </React.Fragment>
  );
};

export default ViewUser;
