import * as React from "react";
import Box from "@mui/material/Box";
import ViewUser from "../components/users/view-user/view-user.component";
import ReviewService from "../services/review.service";
import { useState, useEffect } from "react";
import Review from "../components/review/review.component";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

const UserProfile = () => {
  const [reviews, setReviews] = useState([]);

  const fetchData = () => {
    ReviewService.getReviews().then((res) => {
      console.log(res.data);
      setReviews(res.data);
      console.log(reviews);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      sx={{ marginTop: 10 }}
    >
      <ViewUser />
      <Paper
        sx={{
          mb: 2,
        }}
      >
        <Container>
          <h2>My Comments</h2>
          {reviews.map((review) => (
            <Review key={review.id} propReview={review} />
          ))}
        </Container>
      </Paper>
    </Box>
  );
};

export default UserProfile;
