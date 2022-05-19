import { Link, Outlet } from "react-router-dom";
import "./App.css";
import UserService from "./services/user.service.jsx";


function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Homepage</Link>| <Link to="/users">Users</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
