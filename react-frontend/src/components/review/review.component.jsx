import "./review.styles.css";
import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { Typography } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { Rating } from "@mui/material";

//TODO - afiseaza scorul total al unui shop langa numele lui, apoi ratingul e care l-a dat userul
const Review = ({ propReview }) => {
  const { content, id, rating, review_date, shop_ID, title, user_ID } =
    propReview;
  console.log(propReview);

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper
        sx={{
          mb: 2,
        }}
      >
        <Box sx={{ width: "100%", p: 0.1 }}>
          <Box display="flex" flexDirection="column" sx={{ p: 0.1 }}>
            <Box display="flex" justifyContent="space-between" sx={{}}>
              <Typography gutterBottom component="div">
                {/* To be replaced with shop name */}
                <Box
                  sx={{
                    fontWeight: "bold",
                    pl: 2,
                    pt: 2,
                    fontSize: 16,
                    textTransform: "uppercase",
                  }}
                >
                  {shop_ID} Shop Name
                </Box>
              </Typography>
              <Typography gutterBottom component="div">
                <Box sx={{ fontWeight: "bold", pr: 2, pt: 2 }}>
                  <Rating name={"rating"} value={rating} size={"small"} />
                </Box>
              </Typography>
            </Box>
            <Divider />
          </Box>
          <Typography gutterBottom component="div">
            <Box
              sx={{
                fontWeight: "bold",
                m: 1,
                pl: 1,
                pt: 0.5,
                fontSize: 20,
              }}
            >
              {title}
            </Box>
          </Typography>

          <Typography variant="subtitle1" gutterBottom component="div">
            <Box
              sx={{
                pl: 2,
                pt: 0.5,
                fontSize: 20,
              }}
            >
              {content}
            </Box>
          </Typography>
          <Divider />
          <Box display="flex" justifyContent="space-between" sx={{}}>
            <Typography component="div">
              <Box sx={{ m: 1, pl: 1, fontSize: 16 }}>
                Published on: {review_date}
              </Box>
            </Typography>
            <Typography variant="button" display="block" gutterBottom>
              <Box
                sx={{
                  pr: 2,
                  pt: 0.5,
                  fontSize: 16,
                  color: "#ff7043",
                  fontWeight: "bold",
                }}
              >
                go to shop
              </Box>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </React.Fragment>
  );
};

export default Review;
