import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import { ReviewShopCard } from "../components/shops/review-shop-card.component";
import { CategoryListMenu } from "../components/shops/categories-list.component";
import { getShops } from '../services/shop.service';
import { getCategories } from '../services/category.service';
import ReviewService from "../services/review.service";

const Home = () => {
  const [shops, setShops] = useState([]);
  const [categories, setCategories] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [searchCategoryName, setSearchCategoryName] = useState("")
  let shopsToDisplay = [];

  useEffect(() => {
    const getCategoriesData = async() => {
      await getCategories().then(
        response => {
        setCategories(response.data)
      })
    }
    const getShopsData = async () => {
      await getShops().then(
        response => {
          setShops(response.data)
        })
      }

    const getReviewsData = async () => {
      await ReviewService.getReviews().then(
        response => {
          setReviews(response.data)
        })
      }

    getCategoriesData()
    getShopsData()
    getReviewsData()

  },[])

  const categoryNameCallBack = (categoryName) => {
    setSearchCategoryName(categoryName)
  }

  function findReviewsByShopId(reviewsToSearch, shopId) {
    let reviewsByShopId = [];
    reviewsToSearch.map((review) => {
        if(review.shop_ID === shopId) {
          reviewsByShopId.push(review);
        }
        return reviewsByShopId
      })
    return reviewsByShopId
  }

  function getShopsByCategory(shops, categories, searchCategoryName) {
    let shopsAfterFilter = []
    if(searchCategoryName !== "") {
      let categoryId = categories.find(element => element.category_name === searchCategoryName).id
      shopsAfterFilter = shops.filter(shop => shop.category_ID === categoryId)
    }
    return shopsAfterFilter
  }

  function populateShopWithProperties(shops, categories, searchCategoryName) {
    let shopsList = []
    let shopWithProperties = {
      name: "",
      category: "",
      rateValue: 0,
      numberOfReview: 0,
      websiteUrl: "",
    }

    if (searchCategoryName !== "") {
      getShopsByCategory(shops, categories, searchCategoryName).map(shop => {
        let countReview = 0;
        let rateValueSum = 0
  
        let reviewsBasedOnShopID = findReviewsByShopId(reviews, shop.id);
        reviewsBasedOnShopID.map((review) => {
          countReview++
          rateValueSum += review.rating
        })

        if(countReview !== 0 || rateValueSum !== 0){
          shopWithProperties.rateValue = Math.round(((rateValueSum / countReview) + Number.EPSILON) * 100) / 100
        } else {
          shopWithProperties.rateValue = ""
        }         
          shopWithProperties.numberOfReview = countReview
          shopWithProperties.category = categories.find(element => element.id === shop.category_ID).category_name
          shopWithProperties.name = shop.shop_name
          shopWithProperties.websiteUrl = shop.website_url
  
          shopsList.push(shopWithProperties);
          shopWithProperties = {
            name: "",
            category: "",
            rateValue: 0,
            numberOfReview: 0,
            websiteUrl: "",
          }
      })
    } else {
        shops.map(shop => {
          let countReview = 0;
          let rateValueSum = 0

          let reviewsBasedOnShopID = findReviewsByShopId(reviews, shop.id);
          reviewsBasedOnShopID.map((review) => {
            countReview++
            rateValueSum += review.rating
          })

          if(countReview !== 0 || rateValueSum !== 0){
            shopWithProperties.rateValue = Math.round(((rateValueSum / countReview) + Number.EPSILON) * 100) / 100
          } else {
            shopWithProperties.rateValue = ""
          }
           
            shopWithProperties.numberOfReview = countReview
            shopWithProperties.category = categories.find(element => element.id === shop.category_ID).category_name
            shopWithProperties.name = shop.shop_name
            shopWithProperties.websiteUrl = shop.website_url

            shopsList.push(shopWithProperties);
            shopWithProperties = {
              name: "",
              category: "",
              rateValue: 0,
              numberOfReview: 0,
              websiteUrl: "",
            }
        })
      }
    return shopsList
  } 

let shopsAfterPopulate =  populateShopWithProperties(shops, categories, searchCategoryName)
shopsToDisplay.push(...shopsToDisplay, shopsAfterPopulate)

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="row"
      alignItems={"center"}
      justifyItems={"space-between"}
      m={"15%"}
    >
      <CategoryListMenu parentCallback={categoryNameCallBack}></CategoryListMenu>
      <ReviewShopCard shopList={shopsToDisplay[0]}></ReviewShopCard>
    </Box>
  );
};

export default Home;
