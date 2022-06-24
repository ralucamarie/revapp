import * as React from "react";
import Box from "@mui/material/Box";
import ViewUser from "../components/users/view-user/view-user.component";
import ReviewService from "../services/review.service";
import { useState, useEffect } from "react";
import Review from "../components/review/review.component";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const UserProfile = () => {
  const [reviews, setReviews] = useState([]);
  const [editedReview, setEditedReview] = useState(null);
  const { user, wait } = useContext(UserContext);

  //TODO: fetch reviews of user from the Context
  const fetchData = async () => {
    ReviewService.getReviews(user.id).then((res) => {
      // console.log(res.data);
      if (setReviews(res.data)) {
        return;
      }
      return;
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleReviewOnSave = (review) => {
    if (reviews.length > 0) {
      setReviews(
        reviews.map((mapReview) =>
          mapReview.id !== review.id ? mapReview : review
        )
      );
      ReviewService.updateReview(review);
    }
  };

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      sx={{ marginTop: 10 }}
    >
      <ViewUser user={user} />
      <Paper
        sx={{
          mb: 2,
        }}
      >
        <Container>
          <h2>My Reviews</h2>
          
          {reviews.length > 0 && !(reviews ==="No Review found or something went wrong") ? (
            reviews.map((review) => (
              <Review
                key={review.id}
                propReview={review}
                onSave={handleReviewOnSave}
              />
            ))
          ) : (
            <h3>"You have no reviews yet"</h3>
          )}
        </Container>
      </Paper>
    </Box>
  );
};

export default UserProfile;
