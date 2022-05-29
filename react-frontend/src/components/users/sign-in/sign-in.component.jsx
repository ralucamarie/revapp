import React from "react";

const SignIn = () => {
  return (
    <div>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label> Email:</label>
                  <input
                    placeholder="Email Address"
                    name="email"
                    className="form-control"
                    // value={userToSignIn.email}
                    // onChange={changeEmailHandler}
                  />
                </div>
                <div className="form-group">
                  <label> Password: </label>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="form-control"
                    // value={userToSignIn.password}
                    // onChange={changePasswordHandler}
                  />
                </div>
                <button
                  className="btn btn-success"
                  //  onClick={logInUser}
                >
                  <h5>Log-In</h5>
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
export default SignIn;
