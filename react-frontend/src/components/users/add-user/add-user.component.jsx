import React, { useEffect, useState } from "react";
import UserService from "../../../services/user.service";

let newUser = {
  id: null,
  name: "",
  surname: "",
  email: "",
  password: "",
};
//TODO: if userToEdit is true then display values

const AddUser = ({ onSave, userToEdit }) => {
  const [userToAdd, setUserToAdd] = useState(userToEdit ? userToEdit : newUser);
  // const [id, setId] = useState(userToEdit ? userToEdit.id : null);

  const changeFirstNameHandler = (event) => {
    setUserToAdd({ ...userToAdd, name: event.target.value });
  };
  const changeLastNameHandler = (event) => {
    setUserToAdd({ ...userToAdd, surname: event.target.value });
  };
  const changeEmailHandler = (event) => {
    setUserToAdd({ ...userToAdd, email: event.target.value });
  };
  const changePasswordHandler = (event) => {
    setUserToAdd({ ...userToAdd, password: event.target.value });
  };
  const cancel = () => {
    setUserToAdd(newUser);
  };

  const saveUser = (e) => {
    e.preventDefault();

    newUser = {
      id: userToEdit ? userToEdit.id : null,
      name: userToAdd.name,
      surname: userToAdd.surname,
      email: userToAdd.email,
      password: userToAdd.password,
    };
    console.log("user => " + JSON.stringify(newUser));
    // UserService.createUser(newUser);
    // userToEdit ? onSave(...userToEdit, ...newUser) : onSave(newUser);
    onSave(newUser);
    newUser = {
      id: null,
      name: "",
      surname: "",
      email: "",
      password: "",
    };
    setUserToAdd(newUser);
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
                    name="name"
                    className="form-control"
                    value={userToAdd.name}
                    onChange={changeFirstNameHandler}
                  />
                </div>
                <div className="form-group">
                  <label> Last Name: </label>
                  <input
                    placeholder="Last Name"
                    name="surname"
                    className="form-control"
                    value={userToAdd.surname}
                    onChange={changeLastNameHandler}
                  />
                </div>
                <div className="form-group">
                  <label> Email Id: </label>
                  <input
                    placeholder="Email Address"
                    name="email"
                    className="form-control"
                    value={userToAdd.email}
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
