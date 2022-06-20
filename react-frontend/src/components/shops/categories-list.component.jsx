import React, {useState, useHistory} from 'react';
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

const useStyles = makeStyles(() => ({
  root: {
    overflow: "initial",
    maxWidth: 400,
    backgroundColor: "transparent",
    marginRight: "8%",
  },
  content: {
    position: "relative",
    padding: 24,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
}));

export const CategoryListMenu = ({parentCallback}) => {
    const [categories, setCategories] = useState([]);
    const [shops, setShops] = useState([]);
    const styles = useStyles();
    const shadowStyles = useFadedShadowStyles();
    const [checked, setChecked] = React.useState([]);

    React.useEffect(()=> {
      const getCategoriesData = async() => {
        await getCategories().then(
          response => {
          setCategories(response.data)
        })
      }
      getCategoriesData();
    }, [])

    const handleToggle = (value, categoryName) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = []
        if (currentIndex === -1) {
          newChecked.push(value);
        } else if (currentIndex === 0){
          console.log("aici")
            categoryName = ""
            parentCallback(categoryName)
        } else {
          newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        parentCallback(categoryName)
  };

  return (
    <Card elevation={0} className={styles.root}>
      <CardContent className={cx(shadowStyles.root, styles.content)}>
        <h3>Categories</h3>
        <List
          dense
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {categories.map((category, index) => {
            const labelId = `checkbox-list-secondary-label-${index}`;
            return (
              <ListItem
                key={index}
                secondaryAction={
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(index, category.category_name)}
                    checked={checked.indexOf(index) !== -1}
                    inputProps={{ "aria-labelledby": labelId }}
                    label = {category.category_name}
                  />
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemText id={labelId}>{category.category_name}</ListItemText>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
};
