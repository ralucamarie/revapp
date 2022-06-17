import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { Typography } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { Rating } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import "./review.styles.css";

//TODO - afiseaza scorul total al unui shop langa numele lui, apoi ratingul e care l-a dat userul
const Review = ({ propReview, onSave }) => {
  const { content, id, rating, review_date, shop_ID, title, user_ID } =
    propReview;
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedReview, setEditedReview] = useState(propReview);
  console.log(propReview);

  const editReview = () => {
    setIsEditMode(true);
    console.log(editedReview.title);
  };

  const saveReview = () => {
    onSave(editedReview);
    setIsEditMode(false);
  };

  const handleChange = (event) => {
    setEditedReview({
      ...editedReview,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.name + event.target.value);
  };

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

          {/* Content that can be eddited: */}
          {!isEditMode ? (
            <>
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
            </>
          ) : (
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "98%" },
              }}
              noValidate
              autoComplete="off"
            >
              <div className="formContainer">
                <TextField
                  fullWidth
                  id="form-title"
                  label="Title"
                  name="title"
                  multiline
                  maxRows={4}
                  value={editedReview.title}
                  onChange={handleChange}
                />
                <TextField
                  id="form-content"
                  label="Content"
                  name="content"
                  multiline
                  value={editedReview.content}
                  rows={4}
                  onChange={handleChange}
                  fullWidth
                />
              </div>
            </Box>
          )}

          {/* end of edited content */}
          <Divider />
          <Box display="flex" justifyContent="space-between" sx={{}}>
            <Typography component="div">
              <Box sx={{ m: 1, pl: 1, fontSize: 16 }}>
                Published on: {review_date}
              </Box>
            </Typography>
            <Box>
              <Button
                variant="text"
                className="edit"
                onClick={isEditMode ? saveReview : editReview}
              >
                {isEditMode ? "save" : "edit"}
              </Button>
              <Button variant="text" className="goToShop">
                GO TO SHOP
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </React.Fragment>
  );
};

export default Review;
