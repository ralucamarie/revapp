import axios from "axios";
import {REVIEW_API_URL} from "./api_ulrs_constants.jsx";

// const REVIEW_API_URL = "//localhost/revapp/php-backend/api/reviews";

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
    console.log("review from api call", review);
    return axios.put(`${REVIEW_API_URL}/update.php`, review);
  }
}

export default new ReviewService();
