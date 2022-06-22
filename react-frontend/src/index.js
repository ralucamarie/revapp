import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Users from "./routes/users";
import Login from "./routes/login";
import Signup from "./routes/signup";
import Footer from "./components/layouts/footer/footer.component";
import Header from "./components/layouts/header/header.component";
import Home from "./routes/home";
import UserProfile from "./routes/user-profile";
import ShopDetails from "./routes/shop-details";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/shop-details/:shopId" element={<ShopDetails/>}/>
        </Routes>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
