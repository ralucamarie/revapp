import logo from "./logo.svg";
import "./App.css";
import UserService from "./services/user.service.jsx";
import ListUserComponent from "./components/users/list-user.component";

function App() {
  return (
    <div className="App">
      <ListUserComponent />
    </div>
  );
}

export default App;
