import axios from "axios";
import {CATEGORY_API_URL} from "./api_ulrs_constants.jsx";

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
  return axios.get(`${CATEGORY_API_URL}/single_category.php?id=${categoryId}`, {
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