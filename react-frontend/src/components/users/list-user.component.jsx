import React, { useEffect, useState } from "react";
import UserService from "../../services/user.service";
import UserItem from "./user-item/user-item.component";

const ListUserComponent = (props) => {
  const [users, setUsers] = useState([]);
  console.log(users);
  useEffect(() => {
    UserService.getUsers().then((res) => {
      console.log(res.data);
      setUsers(res.data);
    });
  }, []);

  // deleteUser(id) {
  //   UserService.deleteUser(id).then((res) => {
  //     this.setState({
  //       users: this.state.users.filter((user) => user.id !== id),
  //     });
  //   });
  // }
  // viewUser(id) {
  //   this.props.history.push(`/view-user/${id}`);
  // }
  // editUser(id) {
  //   this.props.history.push(`/add-user/${id}`);
  // }

  // addUser() {
  //   this.props.history.push("/add-user/_add");
  // }
  // render() {
  return (
    <div>
      <h2 className="text-center">Users List</h2>
      <div className="row">
        <button
          className="btn btn-primary"
          // onClick={this.addUser}
        >
          Add User
        </button>
      </div>
      <br></br>
      <div className="row">
        {/* <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th> User First Name</th>
                <th> User Last Name</th>
                <th> User Email Id</th>
                <th> Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((user) => (
                <tr key={user.id}>
                  <td> {user.first_name} </td>
                  <td> {user.last_name}</td>
                  <td> {user.email_id}</td>
                  <td>
                    <button
                      onClick={() => this.editUser(user.id)}
                      className="btn btn-warning"
                    >
                      Update{" "}
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.deleteUser(user.id)}
                      className="btn btn-danger"
                    >
                      Delete{" "}
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.viewUser(user.id)}
                      className="btn btn-info"
                    >
                      View{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}

        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default ListUserComponent;
