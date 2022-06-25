import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import ReviewService from "../../services/review.service";
import Box from "@mui/material/Box";
import { Rating } from "@mui/material";
import moment from "moment";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 450,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function AddReview(props) {
    const defaultReview = {
        review_date: moment().format("YYYY-MM-DD"),
        shop_ID: props.shopId,
        user_ID: props.userId,
        rating: 0,
        title: "",
        content: ""
      };

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [review, setReview] = useState(defaultReview);

  const editField = (event) => {
    setReview({ ...review, [event.target.name]: event.target.value });
  };

  const saveReview = (e) => {
    e.preventDefault();
    if(review.user_ID == null) {
        review.user_ID = props.userId
    }

    if (ReviewService.addReview(review)) {
        setReview(defaultReview);
        handleClose();
    }
    window.location.href =`/shop-details/${props.shopId}`;
  };

  const handleOpen = () => {
    if(!props.userId)  {
        window.location.href ="/login";
    } else {
        setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Review
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>Add a review</h2>
          <form className={classes.form} noValidate>
            <Grid
              container
              direction="column"
              justifyContent="center"
              spacing={2}
            >
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                    <Box sx={{ fontWeight: "bold", pr: 2, pt: 2 }}>
                        <div>
                            <Rating 
                                id="rating"
                                label="Rating"
                                variant="outlined"
                                name="rating"
                                className="form-control"
                                value={review.rating}
                                onChange={editField}
                                size={"small"} 
                                sx={{marginRight: 2}}
                                inputprops={{
                                    type: "text",
                                    autoComplete: "off",
                                }}
                            />
                        </div>
                    </Box>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <TextField
                    id="title"
                    label="Review Title"
                    variant="outlined"
                    name="title"
                    className="form-control"
                    value={review.title}
                    onChange={editField}
                    inputprops={{
                      type: "text",
                      autoComplete: "off",
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <TextField
                    id="content"
                    label="Content"
                    variant="outlined"
                    name="content"
                    className="form-control"
                    value={review.content}
                    onChange={editField}
                    inputprops={{
                      type: "text",
                      autoComplete: "off",
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  variant="contained"
                  onClick={saveReview}
                  color = "primary"
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  className="button"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Modal>
    </div>
  );
}
