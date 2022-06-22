import React, {useState} from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {Box, List, ListItem} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Rating } from '@mui/material';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { Pagination } from "@material-ui/lab";
import usePagination from "../business-logic/pagination";
import Link from "@mui/material/Link";


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
  }
}));

export const ReviewShopCard = (props) => {
  const styles = useStyles();
  const shadowStyles = useFadedShadowStyles();
  let [page, setPage] = useState(1);
  const PER_PAGE = 4;

  const count = Math.ceil(props.shopList.length / PER_PAGE);
  const _DATA = usePagination(props.shopList, PER_PAGE);


  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  if (props.shopList.length !== 0) {
    return (
      <Box>
        <List spacing={2}>
        {_DATA.currentData().map((shop) => {
          return (
            <ListItem key={shop.id}>
            <Card elevation={0} className={styles.root}>
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
                    <Link underline="none" href={`/shop-details/${shop.id}`}>
                    <MoreHorizIcon/>
                    </Link>
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
            </ListItem>
          )
        })}
        </List>

        <Pagination
          count={count}
          size="large"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}

        />
      </Box>
    );
  }
}

export default ReviewShopCard