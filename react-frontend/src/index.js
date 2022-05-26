import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Users from "./routes/users";
import Login from "./routes/login";
import Signup from "./routes/signup";
import Footer from "./components/users/footer/footer.component";
import Header from "./components/users/header/header.component";
import Home from "./routes/home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <div>
      <Header></Header>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/users" element={<Users />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup/>}/>
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
