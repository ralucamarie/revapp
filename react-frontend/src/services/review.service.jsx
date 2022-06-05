import axios from "axios";

const REVIEW_API_URL = "//localhost/revapp/php-backend/api/reviews";

class ReviewService {
  getReviews() {
    return axios.get(`${REVIEW_API_URL}/read.php`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      mode: "no-cors",
    });
  }
}

export default new ReviewService();
