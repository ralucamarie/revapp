import React, {useEffect, useState} from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Rating } from '@mui/material';
import IconButton from '@material-ui/core/IconButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { getShops } from '../../services/shop.service';

const useStyles = makeStyles(() => ({
  root: {
    overflow: 'initial',
    maxWidth: 600,
    backgroundColor: 'transparent',
  },
  title: {
    marginBottom: 5,
  },
  rateValue: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  content: {
    position: 'relative',
    padding: 24,
    // margin: '-24% 16px 0',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  locationIcon: {
    marginRight: 4,
  },
}));

export const ReviewShopCard = React.memo(function ReviewCard() {
  const styles = useStyles();
  const shadowStyles = useFadedShadowStyles();
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchedShops = getShops();
    setShops(fetchedShops);
  },[])

  return (
    <div>
    {shops.map((shop) => {
      <Card elevation={0} className={styles.root}>
        <CardContent className={cx(shadowStyles.root, styles.content)}>
          <h3 className={styles.title}>{shop.name}</h3>
          <Box display={'flex'} alignItems={'center'} mb={1}>
            <LocationOnIcon className={styles.locationIcon} sx={{fontSize: '1rem'}} />
            <span>Rome</span>
          </Box>
          <Box
            display={'flex'}
            alignItems={'center'}
            mb={1}
          >
            <Rating  name={'rating'} value={2} size={'small'} />
            <Typography variant={'body2'} className={styles.rateValue}>
              4.0
            </Typography>
          </Box>
          <Typography color={'textSecondary'} variant={'body2'}>
            Talking about travelling or new jobs, many people often think of
            change of environment...
          </Typography>
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
                +420
              </Typography>
            </Box>
            <IconButton size={'small'}>
              <MoreHorizIcon/>
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    })}
    </div>
  );
});

export default ReviewShopCard