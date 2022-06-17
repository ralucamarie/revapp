import React, {useEffect, useState} from 'react';
import cx from 'clsx';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { getCategories } from '../../services/category.service';

// const categories = ["Animals & Pets",
//     "Beauty & Well-being",
//     "Business Services",
//     "Construction & Manufacturing",
//     "Education & Training",
//     "Electronics & Technology",
//     "Events & Entertainment",
//     "Food, Beverages & Tobacco",
//     "Health & Medical",
//     "Hobbies & Crafts",
//     "Home & Garden",
//     "Home Services",
//     "Legal Services & Government",
//     "Media & Publishing",
//     "Money & Insurance",
//     "Public & Local Services",
//     "Restaurants & Bars",
//     "Shopping & Fashion",
//     "Sports",
//     "Travel & Vacation",
//     "Utilities",
//     "Vehicles & Transportation"]

const useStyles = makeStyles(() => ({
    root: {
      overflow: 'initial',
      maxWidth: 400,
      backgroundColor: 'transparent',
      marginRight: '8%',
    },
    content: {
      position: 'relative',
      padding: 24,
      // margin: '-24% 16px 0',
      backgroundColor: '#fff',
      borderRadius: 4,
    },
  
  }));

export const CategoryListMenu = () => {
    const [categories, setCategories] = useState([]);
    const styles = useStyles();
    const shadowStyles = useFadedShadowStyles();
    const [checked, setChecked] = React.useState([1]);

    React.useEffect(()=> {
      const fetchedCategories = getCategories();
      setShops(fetchedCategories);
    }, [])

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
        newChecked.push(value);
        } else {
        newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

  return (
    <Card elevation={0} className={styles.root}>
    <CardContent className={cx(shadowStyles.root, styles.content)}>
        <h3>Categories</h3>
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        { categories.map((category, index) => {
            const labelId = `checkbox-list-secondary-label-${index}`;
            return (
            <ListItem
                key={index}
                secondaryAction={
                <Checkbox
                    edge="end"
                    onChange={handleToggle(index)}
                    checked={checked.indexOf(index) !== -1}
                    inputProps={{ 'aria-labelledby': labelId }}
                />
                }
                disablePadding
            >
                <ListItemButton>
                    <ListItemText id={labelId}>{category}</ListItemText>
                </ListItemButton>
            </ListItem>
            );
        })}
        </List>
    </CardContent>
    </Card>
  );
} 
