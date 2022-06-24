import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { ReviewShopCard } from "../components/shops/review-shop-card.component";
import { CategoryListMenu } from "../components/shops/categories-list.component";
import { getShops } from "../services/shop.service";
import { getCategories } from "../services/category.service";
import ReviewService from "../services/review.service";
import { populateShopWithProperties } from "../components/business-logic/shopData";
import AddShop from "../components/shops/add-shop.component";

const Home = () => {
  const [shops, setShops] = useState([]);
  const [categories, setCategories] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [searchCategoryName, setSearchCategoryName] = useState("");
  let shopsToDisplay = [];

  //Am scos functiile in afara useEffectului astfel incat sa am accees la ele si din alte functii
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

  //adaugat metoda pentru a fi apelata de componenta AddShop cand se adauga un shop nou, astfel incat pe home sa se aduca lista actualizata de shopuri
  //baiul e ca intra in bucla infinita.

  // const getShopsDataWhenAddingAShop = async () => {
  //   await getShops().then((response) => {
  //     setShops(response.data);
  //   });
  // };

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

  //when adding a shop the gui list of shops needs to update

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="row"
      alignItems={"top"}
      alignContent={"top"}
      justifyItems={"space-between"}
      m={"15%"}
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
        <AddShop />
        {/* onSaveShop={getShopsDataWhenAddingAShop()} */}
        <ReviewShopCard shopList={shopsToDisplay[0]}></ReviewShopCard>
      </Box>
    </Box>
  );
};

export default Home;
