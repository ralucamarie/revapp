import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { ReviewShopCard } from "../components/shops/review-shop-card.component";
import { CategoryListMenu } from "../components/shops/categories-list.component";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { getShops } from "../services/shop.service";
import { getCategories } from "../services/category.service";
import ReviewService from "../services/review.service";
import { populateShopWithProperties } from "../components/business-logic/shopData";

const Home = () => {
  const { user, logout } = useContext(UserContext);
  const [shops, setShops] = useState([]);
  const [categories, setCategories] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [searchCategoryName, setSearchCategoryName] = useState("");
  let shopsToDisplay = [];

  useEffect(() => {
    const getCategoriesData = async () => {
      await getCategories().then((response) => {
        setCategories(response.data);
      });
    };
    const getShopsData = async () => {
      await getShops().then((response) => {
        setShops(response.data);
      });
    };

    const getReviewsData = async () => {
      await ReviewService.getReviews().then((response) => {
        setReviews(response.data);
      });
    };

    getCategoriesData();
    getShopsData();
    getReviewsData();
  }, []);

  const categoryNameCallBack = (categoryName) => {
    setSearchCategoryName(categoryName);
  };

  let shopsAfterPopulate = populateShopWithProperties(
    shops,
    categories,
    reviews,
    searchCategoryName
  );
  shopsToDisplay.push(...shopsToDisplay, shopsAfterPopulate);

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="row"
      alignItems={"center"}
      justifyItems={"space-between"}
      m={"15%"}
    >
      {console.log(user)}
      <CategoryListMenu
        parentCallback={categoryNameCallBack}
      ></CategoryListMenu>
      <ReviewShopCard shopList={shopsToDisplay[0]}></ReviewShopCard>
    </Box>
  );
};

export default Home;
