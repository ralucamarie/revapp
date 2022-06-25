import * as React from "react";
import { useEffect, useState } from "react";
import "./shop-view.styles.css";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import defaultShopImage from "../../static/images/defaultShopImage.jpg";
import Divider from "@mui/material/Divider";
import { getCategoryById } from '../../services/category.service';
import { Rating } from '@mui/material';

const ShopView = (props) => {
  const [category, setCategory] = useState([]);
  let raitingCalculation = calculateRaiting(props.reviews)

  useEffect(() => {
      getCategoryById(props.shopDetails.category_ID).then(
        response => {
          setCategory(response.data)
      })
    },[props.shopDetails.category_ID])

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper
        sx={{
          mb: 2,
        }}
      >
        <Container>
          <h2>{props.shopDetails.shop_name}</h2>
          <Container
            sx={{
              display: "flex",
            }}
          >
            <Box
              sx={{
                p: 2,
                m: 2,
              }}
              component="img"
              alt="Shop Image"
              src={defaultShopImage}
            />
            <Box
              sx={{
                p: 2,
                m: 2,
              }}
            >
              <div className="row">
                <label> Category: </label>
                <div className="shop-field"> {category.category_name}</div>
              </div>
              <Divider />
              <div className="row">
                <label> Website URL: </label>
                <div className="shop-field"> {props.shopDetails.website_url}</div>
              </div>
              <Divider />
              <div className="row">
                <label> Raiting: </label>
                <div className="shop-field">
                  <Rating  name={'rating'} value={raitingCalculation.rateValue} size={'small'} sx={{marginRight: 2}} readOnly />
                  {raitingCalculation.rateValue}
                </div>
              </div>
              <Divider />
              <div className="row">
                <label> Reviews </label>
                <div className="shop-field"> {raitingCalculation.numberOfReviews}</div>
              </div>
            </Box>
          </Container>
        </Container>
      </Paper>
    </React.Fragment>
  );
};

function calculateRaiting(reviews){
  let raitingObject = {
    rateValue: 0,
    numberOfReviews: 0,
  }

  let countReview = 0;
  let rateValueSum = 0

  reviews.map((review) => {
    countReview++
    rateValueSum += review.rating
    return {countReview, rateValueSum}
  })

  if(countReview !== 0 || rateValueSum !== 0){
    raitingObject.rateValue = Math.round(((rateValueSum / countReview) + Number.EPSILON) * 100) / 100
  } else {
    raitingObject.rateValue = ""
  }  
  
  raitingObject.numberOfReviews = countReview
  return raitingObject
}

export default ShopView;
