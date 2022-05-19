import axios from "axios";

const USER_API_URL = "http://localhost/revapp/php-backend/api";

class UserService {
  getUsers() {
    return axios.get(`${USER_API_URL}/users/read.php`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      mode: "no-cors",
    });
  }

  createUser(user) {
    return axios.post(`${USER_API_URL}/users/create.php`, user, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "no-cors",
    });
  }

  getUserById(id) {
    return axios.get(`${USER_API_URL}/users/single_user.php`, {
      params: { id: id },
    });
  }

  updateUser(user) {
    return axios.put(`${USER_API_URL}/users/update.php`, user);
  }

  deleteUser(id) {
    return axios.delete(`${USER_API_URL}/users/delete.php`, {
      params: { id: id },
    });
  }
}

export default new UserService();
