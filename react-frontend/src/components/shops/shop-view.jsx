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
import ReviewService from "../../services/review.service";

const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

const ShopView = (props) => {
  console.log("ShopView id: ", props.shopDetails)
  const [category, setCategory] = useState([]);
  const [reviews, setReviews] = useState([]);
  let shopWithRaitingCalculation = {}

  useEffect(() => {
    const getReviewsData = async () => {
      await ReviewService.getReviews().then(
        response => {
          setReviews(response.data)
        })
      }
    
    const getCategoryNameById = async (categoryId) => {
      await getCategoryById(categoryId).then(
        response => {
          setCategory(response.data)
        })
    }    
    
    getReviewsData()
    getCategoryNameById(props.shopDetails.id)
    // shopWithRaitingCalculation = populateShopDetails(reviews, props.shopDetailsProps.id)
  },[props.shopDetails.id])

  // function findReviewsByShopId(reviewsToSearch, shopId) {
  //   console.log("Reviews: ", reviewsToSearch, shopId)
  //   let reviewsByShopId = [];
  //   reviewsToSearch.map((review) => {
  //       if(review.shop_ID === shopId) {
  //           reviewsByShopId.push(review);
  //       }
  //       return reviewsByShopId
  //       })
  //   return reviewsByShopId
  // }

  // function populateShopDetails(shopId, reviews){
  //   let newShopDetails = {
  //     rateValue: 0,
  //     numberOfReview: 0,
  //   }

  //   let countReview = 0;
  //   let rateValueSum = 0
  
  //   let reviewsBasedOnShopID = findReviewsByShopId(reviews, shopId);
  //   console.log(reviewsBasedOnShopID)
  //   reviewsBasedOnShopID.map((review) => {
  //     countReview++
  //     rateValueSum += review.rating
  //   })

  //   if(countReview !== 0 || rateValueSum !== 0){
  //     newShopDetails.rateValue = Math.round(((rateValueSum / countReview) + Number.EPSILON) * 100) / 100
  //   } else {
  //     newShopDetails.rateValue = ""
  //   }         
  //   newShopDetails.numberOfReview = countReview

  //   let shopDetailsToDisplay = newShopDetails
  //   return shopDetailsToDisplay
  // }

  // // if(props.shopDetailsToDisplay.id !== null) {
  //   shopWithRaitingCalculation = populateShopDetails(reviews, props.shopDetails.id)
  // // }

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
                <div className="shop-field"> {shopWithRaitingCalculation.rateValue}</div>
              </div>
              <Divider />
              <div className="row">
                <label> Reviews </label>
                <div className="shop-field"> {shopWithRaitingCalculation.numberOfReview}</div>
              </div>
            </Box>
          </Container>
        </Container>
      </Paper>
    </React.Fragment>
  );
};

export default ShopView;
