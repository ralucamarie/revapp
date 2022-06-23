import * as React from "react";
import Box from "@mui/material/Box";
import ShopView from "../components/shops/shop-view";
import ReviewService from "../services/review.service";
import { useState, useEffect } from "react";
import Review from "../components/review/review.component";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { getShopsById } from "../services/shop.service";
import { useParams } from "react-router-dom";

const ShopDetails = (props) => {
  const [shopDetails, setShopDetails] = useState({});
  const [reviews, setReviews] = useState([]);
  const {shopId} = useParams();

  useEffect(() => {
    getShopsById(shopId).then((res) => {
      setShopDetails(res.data);
    });

    ReviewService.getReviewsByShopId(shopId).then(
      response => {
        setReviews(response.data)
    });
  }, [shopId])

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      sx={{ marginTop: 10 }}
    >
      <ShopView 
        shopDetails={shopDetails} 
        reviews = {reviews}
      />
      <Paper
        sx={{
          mb: 2,
        }}
      >
        <Container>
          <h2>My Comments</h2>
          {reviews.map((review) => (
            <Review
              key={review.id}
              propReview={review}
            />
          ))}
        </Container>
      </Paper>
    </Box>
  );
};

export default ShopDetails;
