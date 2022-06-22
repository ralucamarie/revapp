import * as React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import UserService from "./services/user.service.jsx";
import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import Login from "./routes/login";
import Home from "./routes/home";
import Header from "./components/layouts/header/header.component";
import Users from "./routes/users";
import Signup from "./routes/signup";
import UserProfile from "./routes/user-profile";
import Footer from "./components/layouts/footer/footer.component";

function App() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        {user && user.role === "Administrator" && (
          <Route path="/users" element={<Users />} />
        )}
        {!user && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
        {user && <Route path="/user-profile" element={<UserProfile />} />}
        {/* <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} /> */}
      </Routes>
      <Outlet />
      <Footer></Footer>
    </div>
  );
}

export default App;
