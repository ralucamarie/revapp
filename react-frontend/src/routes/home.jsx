import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { ReviewShopCard } from "../components/shops/review-shop-card.component";
import { CategoryListMenu } from "../components/shops/categories-list.component";
import { getShops } from "../services/shop.service";
import { getCategories } from "../services/category.service";
import ReviewService from "../services/review.service";
import { populateShopWithProperties } from "../components/business-logic/shopData";
import AddShop from "../components/shops/add-shop.component";
import { useContext } from "react";
import { UserContext } from "../../src/context/UserContext";

const Home = () => {
  const [shops, setShops] = useState([]);
  const [categories, setCategories] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [searchCategoryName, setSearchCategoryName] = useState("");
  const { user } = useContext(UserContext);
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
      display="flex"
      flexDirection="row"
      alignItems={"top"}
      alignContent={"top"}
      justifyItems={"space-between"}
      m={"9%"}
      ml={"16%"}
    >
      <CategoryListMenu
        parentCallback={categoryNameCallBack}
      ></CategoryListMenu>
      <Box
        display="flex"
        flexDirection="column"
        alignItems={"top"}
        alignContent={"top"}
        justifyItems={"space-between"}
      >
        <Box ml={"2.5%"}>
          <AddShop userId = {user !== null ? user.id : null}/>
        </Box>
        <ReviewShopCard shopList={shopsToDisplay[0].reverse()}></ReviewShopCard>
      </Box>
    </Box>
  );
};

export default Home;
