import axios from "axios";

const REVIEW_API_URL = "//localhost/revapp/php-backend/api/reviews";

class ReviewService {
  getReviews() {
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
  }

  updateReview(review) {
    console.log("review from api call", review);
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
}

export default new ReviewService();
