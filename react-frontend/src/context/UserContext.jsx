import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const Axios = axios.create({
  baseURL: "http://localhost/revapp2/php-backend/api",
});

export const UserContextProvider = ({ children }) => {
  const [theUser, setUser] = useState(null);
  const [wait, setWait] = useState(false);

  //TODO:replace baseURL and php links with the ones made by Sergiu
  //TODO: add USER role by default
  const signupUser = async ({ name, email, password, city, country }) => {
    setWait(true);
    try {
      const { data } = await Axios.post("users/create.php", {
        name,
        email,
        password,
        city,
        country,
      });
      setWait(false);
      return data;
    } catch (err) {
      setWait(false);
      return { success: 0, message: "Server Error!" };
    }
  };

  const loginUser = async ({ email, password }) => {
    setWait(true);
    try {
      // console.log("Incercam post cu axios");
      const { data } = await Axios.post("token/login.php", {
        email,
        password,
      });
      if (data.success && data.token) {
        localStorage.setItem("loginToken", data.token);
        setWait(false);
        // console.log(data);
        return { success: 1 };
      }
      setWait(false);
      return { success: 0, message: data.message };
    } catch (err) {
      setWait(false);
      return { success: 0, message: "Server Error!" };
    }
  };

  const loggedInCheck = async () => {
    console.log("Am intrat in loginn check");
    const loginToken = localStorage.getItem("loginToken");
    // Axios.defaults.headers.common['Authorization'] = "Bearer " + loginToken;
    Axios.defaults.headers.common = {'Authorization' : "Bearer " + loginToken};
    if (loginToken) {
      const { data } = await Axios.get("token/getUser.php");
      console.log(data.user);
      if (data.success && data.user) {
        setUser(data.user);
        return;
      }
      setUser(null);
    }
  };

  useEffect(() => {
    async function asyncCall() {
      await loggedInCheck();
    }
    asyncCall();
  }, []);

  const logout = () => {
    localStorage.removeItem("loginToken");
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        signupUser,
        loginUser,
        wait,
        user: theUser,
        loggedInCheck,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
