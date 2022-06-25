import * as React from "react";
import Box from "@mui/material/Box";
import ShopView from "../components/shops/shop-view";
import ReviewService from "../services/review.service";
import { useState, useEffect } from "react";
import ReviewForShop from "../components/review/review-for-shop.component";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { getShopsById } from "../services/shop.service";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../src/context/UserContext";
import AddReview from "../../src/components/review/add-review.component";
import Link from "@mui/material/Link";
import { Pagination } from "@material-ui/lab";
import usePagination from "../../src/components/business-logic/pagination";

const ShopDetails = () => {
  const [shopDetails, setShopDetails] = useState({});
  const [reviews, setReviews] = useState([]);
  const {shopId} = useParams();
  const { user } = useContext(UserContext);
console.log(user)
  useEffect(() => {
    getShopsById(shopId).then((res) => {
      setShopDetails(res.data);
    });

    ReviewService.getReviewsByShopId(shopId).then(
      response => {
        setReviews(response.data)
    });
  }, [shopId])

  let [page, setPage] = useState(1);
  const PER_PAGE = 3;

  const count = Math.ceil(reviews.length / PER_PAGE);
  const _DATA = usePagination(reviews, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      sx={{ marginTop: 10 }}
    >
      {reviews.length > 0 && !(reviews ==="No Review found or something went wrong") ? (
        <ShopView 
          shopDetails={shopDetails} 
          reviews = {reviews}
        />
      ) : (
        <ShopView 
          shopDetails={shopDetails} 
          reviews = {[]}
        />
      )}
  
      <AddReview 
        shopId = {shopId}
        userId = {user !== null ? user.id : null}
      />

      <Paper sx={{mb: 2}}>
        <Container>
          <h2>Reviews</h2>
          {reviews.length > 0 && !(reviews ==="No Review found or something went wrong") ? (
            _DATA.currentData().map((review) => (
              <ReviewForShop
                key={review.id}
                propReview={review}
              />
            ))
          ) : (
            <h3>No Review found or something went wrong</h3>
          )}
        </Container>
        <Container>
          <Pagination
            count={count}
            size="large"
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
          />
        </Container>
      </Paper>
    </Box>
  );
};

export default ShopDetails;