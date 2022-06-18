import React, {useEffect, useState} from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Rating } from '@mui/material';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { getShops } from '../../services/shop.service';
import { getCategories } from '../../services/category.service';
import ReviewService from "../../services/review.service";


const useStyles = makeStyles(() => ({
  root: {
    overflow: 'initial',
    minWidth: 600,
    marginBottom: '1%',
    backgroundColor: 'transparent',
  },
  title: {
    marginBottom: 5,
  },
  rateValue: {
    fontWeight: 'bold',
  },
  content: {
    position: 'relative',
    pading: 24,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  locationIcon: {
    marginRight: 4,
  },
}));

export const ReviewShopCard = () => {
  const styles = useStyles();
  const shadowStyles = useFadedShadowStyles();
  const [shops, setShops] = useState([]);
  const [categories, setCategories] = useState([]);
  const [reviews, setReviews] = useState([]);
  const shopsToDisplay = [];

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

  function populateShopWithProperties(shops, categories) {
    let shopsList = []
    let shopWithProperties = {
      name: "",
      category: "",
      rateValue: 0,
      numberOfReview: 0,
      websiteUrl: "",
    }

    shops.map(shop => {
      let countReview = 0;
      let rateValueSum = 0

      let reviewsBasedOnShopID = findReviewsByShopId(reviews, shop.id);
      reviewsBasedOnShopID.map((review) => {
        countReview++
        rateValueSum += review.rating
      })
        shopWithProperties.rateValue = Math.round(((rateValueSum / countReview) + Number.EPSILON) * 100) / 100
        shopWithProperties.numberOfReview = countReview
        shopWithProperties.category = categories.find(element => element.id == shop.category_ID).category_name
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
    return shopsList
  }

let shopsAfterPopulate =  populateShopWithProperties(shops, categories)
shopsToDisplay.push(...shopsToDisplay, shopsAfterPopulate)

if (shopsToDisplay[0].length !== 0) {
  return (
    <div>
      {shopsToDisplay[0].map((shop) => {
        return (
          <Card key={shop.shopId} elevation={0} className={styles.root}>
            <CardContent className={cx(shadowStyles.root, styles.content)}>
              <h3 className={styles.title}>{shop.name}</h3>
              <Box display={'flex'} alignItems={'center'} mb={3}>
                <span>{shop.category}</span>
                <Typography color={'textSecondary'} variant={'body2'}>
                  {shop.websiteUrl}
              </Typography>
              </Box>
              
              <Box
                display={'flex'}
                flexDirection = {'row'}
                alignItems={'center'}
                mb={1}
              >
                <Rating  name={'rating'} value={shop.rateValue} size={'small'} />
                <Typography variant={'body2'} className={styles.rateValue}>
                  {shop.rateValue}
                </Typography>
              </Box>
              <Box
                mt={2}
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Box
                  display={'flex'}
                  alignItems={'center'}
                >
                  <Typography
                    component={'span'}
                    variant={'body2'}
                    color={'textSecondary'}
                  >
                    {shop.numberOfReview} reviews
                  </Typography>
                </Box>
                <IconButton size={'small'}>
                  <MoreHorizIcon/>
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        )
      })}
    </div>
  );
}
 
}

export default ReviewShopCard