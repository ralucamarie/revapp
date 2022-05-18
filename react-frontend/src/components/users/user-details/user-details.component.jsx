import "./user.styles.scss";
import UserService from "../../../services/user.service";

const User = (user) => {
  return (
    <div>
      <br></br>
      <div className="card col-md-6 offset-md-3">
        <h3 className="text-center"> View User Details</h3>
        <div className="card-body">
          <div className="row">
            <label> User First Name: </label>
            <div> {this.state.user.first_name}</div>
          </div>
          <div className="row">
            <label> User Last Name: </label>
            <div> {this.state.user.last_name}</div>
          </div>
          <div className="row">
            <label> User Email ID: </label>
            <div> {this.state.user.email_id}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
