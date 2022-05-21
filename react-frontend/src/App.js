import { Link, Outlet } from "react-router-dom";
import "./App.css";
import UserService from "./services/user.service.jsx";


function App() {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
