import axios from "axios";

const CATEGORY_API_URL = "http://localhost/revapp/php-backend/api/categories";

export function getCategories() {
  return axios.get(`${CATEGORY_API_URL}/read.php`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
      "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    },
    mode: "no-cors",
  });
}

export function getCategoryById(categoryId) {
  return axios.get(`http://localhost/revapp/php-backend/api/categories/single_category.php?id=${categoryId}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
      "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    },
    mode: "no-cors",
  });
}