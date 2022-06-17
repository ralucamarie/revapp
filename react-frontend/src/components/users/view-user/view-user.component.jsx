import UserService from "../../../services/user.service";
import * as React from "react";
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

const ViewUser = () => {
  const user = {
    name: "Johnny",
    surname: "Bravo",
    email: "jb@bravo.com",
    city: "London",
    country: "UK",
  };
  const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
  };
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
              // p: 2,
              // m: 2,
            }}
          >
            <Box
              sx={{
                p: 2,
                m: 2,
              }}
              component="img"
              alt="User Image"
              src="https://www.fillmurray.com/400/200"
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
                <div className="profile-field"> {user.city}</div>
              </div>
              <Divider />
              <div className="row">
                <label>Country: </label>
                <div className="profile-field"> {user.country}</div>
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
