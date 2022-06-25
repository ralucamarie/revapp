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
import { Pagination } from "@material-ui/lab";
import usePagination from "../../src/components/business-logic/pagination";

const UserProfile = () => {
  const [reviews, setReviews] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    ReviewService.getReviews(user.id).then((res) => {
      setReviews(res.data)
    });
  }, [user.id]);

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
      <ViewUser user={user} />
      <Paper
        sx={{
          mb: 2,
        }}
      >
        <Container>
          <h2>My Reviews</h2>
          
          {reviews.length > 0 && !(reviews ==="No Review found or something went wrong") ? (
            _DATA.currentData().map((review) => (
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

export default UserProfile;
