import axios from "axios";
import {REVIEW_API_URL} from "./api_ulrs_constants.jsx";


class ReviewService {
  getReviews(user_ID = null) {
    if (user_ID === null) 
      return axios.get(`${REVIEW_API_URL}/read.php`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
      },
      mode: "no-cors",
    });
    if (user_ID != null)
      return axios.get(`${REVIEW_API_URL}/read.php?user_ID=${user_ID}`, {
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

  updateReview(review) {
    return axios.put(`${REVIEW_API_URL}/update.php`, review);
  }

  getReviewsByShopId(shopId) {
    return axios.get(`${REVIEW_API_URL}/read.php?shop_ID=${shopId}`, {
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

  addReview(review) {
    return axios.post(`${REVIEW_API_URL}/create.php`, review);
  }
}

export default new ReviewService();
