import axios from "axios";

const SHOP_API_URL = "http://localhost/revapp/php-backend/api/shops";

export function getShops() {
  return axios.get(`${SHOP_API_URL}/read.php`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    mode: "no-cors",
  });
}