import * as React from "react";
import SignIn from "../components/users/sign-in/sign-in.component";
import { Box } from "@mui/material";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const Login = () => {
  const {loginUser, wait, loggedInCheck } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!Object.values(formData).every((val) => val.trim() !== "")) {
      setErrMsg("Please Fill in all Required Fields!");
      return;
    }

    const data = await loginUser(formData);
    if (data.success) {
      e.target.reset();
      setRedirect(true);
      
      await loggedInCheck();
      return;
    }
    setErrMsg(data.message);
  };
  if (redirect) return <Navigate to="/home" replace={true} />
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      sx={{ marginTop: 10 }}
    >
      {/* <SignIn /> */}
      <div className="myform">
        <h2>Login</h2>
        <form onSubmit={submitForm}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            onChange={onChangeInput}
            placeholder="Your email"
            id="email"
            value={formData.email}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            onChange={onChangeInput}
            placeholder="New password"
            id="password"
            value={formData.password}
            required
          />
          {errMsg && <div className="err-msg">{errMsg}</div>}
          {redirect ? (
            redirect
          ) : (
            <button type="submit">
              Login
            </button>
          )}
          <div className="bottom-link">
            <Link to="/user-profile">Sign Up</Link>
          </div>
        </form>
      </div>
    </Box>
  );
};

export default Login;
