import axios from "axios";
import {ADDRESS_API_URL} from "./api_ulrs_constants.jsx";
console.log(ADDRESS_API_URL);
export function getAddresses() {
  return axios.get(`${ADDRESS_API_URL}/read.php`, {
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


export function getAddressById(addressId) {
  return axios.get(`${ADDRESS_API_URL}/single_address.php?id=${addressId}`, {
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