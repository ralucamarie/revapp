import axios from "axios";
import {SHOP_API_URL} from "./api_ulrs_constants.jsx";
console.log(SHOP_API_URL);
export function getShops() {
  return axios.get(`${SHOP_API_URL}/read.php`, {
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


export function getShopsById(shopId) {
  return axios.get(`http://localhost/revapp/php-backend/api/shops/single_shop.php?id=${shopId}`, {
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

export function createShop(shop) {
    console.log("shop from api call", shop);
    return axios.post(`${SHOP_API_URL}/create.php`, shop, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "no-cors",
    });
  }