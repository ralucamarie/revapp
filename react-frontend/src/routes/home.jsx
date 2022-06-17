import * as React from "react";
import Box from "@mui/material/Box";
import { Container } from "@material-ui/core";
import { ReviewShopCard } from "../components/shops/review-shop-card.component";
import { CategoryListMenu } from "../components/shops/categories-list.component";

const Home = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="row"
      alignItems={"center"}
      justifyItems={"space-between"}
      mb={1}
      mt={"8%"}
    >
      <CategoryListMenu></CategoryListMenu>
      <ReviewShopCard></ReviewShopCard>
    </Box>
  );
};

export default Home;
