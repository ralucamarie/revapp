import axios from "axios";

const CATEGORY_API_URL = "http://localhost/revapp/php-backend/api/category";

class CategoryService {
  getCategory() {
    return axios.get(`${CATEGORY_API_URL}.php`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      mode: "no-cors",
    });
  }
}