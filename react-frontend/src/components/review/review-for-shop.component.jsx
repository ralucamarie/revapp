import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Typography } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { Rating } from "@mui/material";
import Button from "@mui/material/Button";
import "./review.styles.css";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';


const ReviewForShop = ({ propReview }) => {
const {title, content, rating, review_date, user_name, user_surname} = propReview;

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
                <Box
                  sx={{
                    fontWeight: "bold",
                    pl: 2,
                    pt: 2,
                    fontSize: 16,
                    textTransform: "uppercase",
                  }}
                >
                  {user_name} {user_surname}
                </Box>
              </Typography>
              <Typography gutterBottom component="div">
                <Box sx={{ fontWeight: "bold", pr: 2, pt: 2 }}>
                    <div>
                        <Rating name={"rating"} value={rating} size={"small"} sx={{marginRight: 2}} readOnly/>
                        {rating}
                    </div>
                </Box>
              </Typography>
            </Box>
            <Divider />
          </Box>
            <Box>
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
            </Box>
          <Divider />
          <Box display="flex" justifyContent="space-between" sx={{}}>
            <Typography component="div">
              <Box sx={{ m: 1, pl: 1, fontSize: 16 }}>
                Published on: {review_date}
              </Box>
            </Typography>
            <Box>
                <Button>
                    <ThumbUpIcon color="primary"/>
                </Button>
                <Button>
                    <ThumbDownIcon color="primary"/>
                </Button>
            </Box>
            </Box>
        </Box>
      </Paper>
    </React.Fragment>
  );
};

export default ReviewForShop;
