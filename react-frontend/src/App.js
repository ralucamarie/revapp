import * as React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import Login from "./routes/login";
import Home from "./routes/home";
import Header from "./components/layouts/header/header.component";
import Users from "./routes/users";
import Signup from "./routes/signup";
import UserProfile from "./routes/user-profile";
import Footer from "./components/layouts/footer/footer.component";
import ShopDetails from "./routes/shop-details";

function App() {
  const { user } = useContext(UserContext);
  return (
    <>
      <div className="page-container">
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          {user && user.role_ID === 3 && (
            <Route path="/users" element={<Users />} />
          )}
          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}
          {user && <Route path="/user-profile" element={<UserProfile />} />}
          <Route path="/shop-details/:shopId" element={<ShopDetails />} />
        </Routes>
        <Outlet />
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
