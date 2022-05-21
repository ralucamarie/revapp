import React, { useEffect, useState } from "react";
import UserService from "../../../services/user.service";

const newUser = {
  first_name: "",
  last_name: "",
  email_id: "",
  password: "",
};

const AddUser = ({ onSave }) => {
  const [userToAdd, setUserToAdd] = useState(newUser);

  const changeFirstNameHandler = (event) => {
    setUserToAdd({ ...userToAdd, first_name: event.target.value });
  };
  const changeLastNameHandler = (event) => {
    setUserToAdd({ ...userToAdd, last_name: event.target.value });
  };
  const changeEmailHandler = (event) => {
    setUserToAdd({ ...userToAdd, email_id: event.target.value });
  };
  const changePasswordHandler = (event) => {
    setUserToAdd({ ...userToAdd, password: event.target.value });
  };
  const cancel = () => {
    setUserToAdd(newUser);
  };

  const saveUser = (e) => {
    e.preventDefault();

    let newUser = {
      first_name: userToAdd.first_name,
      last_name: userToAdd.last_name,
      email_id: userToAdd.email_id,
      password: userToAdd.password,
    };
    console.log("user => " + JSON.stringify(newUser));
    UserService.createUser(newUser);
    newUser = {
      first_name: "",
      last_name: "",
      email_id: "",
      password: "",
    };
    setUserToAdd(newUser);
    onSave();
  };

  return (
    <div>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label> First Name: </label>
                  <input
                    placeholder="First Name"
                    name="first_name"
                    className="form-control"
                    value={userToAdd.first_name}
                    onChange={changeFirstNameHandler}
                  />
                </div>
                <div className="form-group">
                  <label> Last Name: </label>
                  <input
                    placeholder="Last Name"
                    name="last_name"
                    className="form-control"
                    value={userToAdd.last_name}
                    onChange={changeLastNameHandler}
                  />
                </div>
                <div className="form-group">
                  <label> Email Id: </label>
                  <input
                    placeholder="Email Address"
                    name="email_id"
                    className="form-control"
                    value={userToAdd.email_id}
                    onChange={changeEmailHandler}
                  />
                </div>
                <div className="form-group">
                  <label> Password: </label>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="form-control"
                    value={userToAdd.password}
                    onChange={changePasswordHandler}
                  />
                </div>
                <button className="btn btn-success" onClick={saveUser}>
                  Save
                </button>
                <button
                  className="btn btn-danger"
                  onClick={cancel}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// }
export default AddUser;
