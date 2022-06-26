import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import NativeSelect from "@mui/material/NativeSelect";
import Modal from "@material-ui/core/Modal";
import { getCategories } from "../../services/category.service";
import { createShop } from "../../services/shop.service";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 450,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

// const ColorButton = styled(Button)(({ theme }) => ({
//   color: "#fff",
//   backgroundColor: "#FF5D0C",
//   "&:hover": {
//     backgroundColor: "#FF5D0C",
//   },
//   marginRight: "10px",
// }));

const defaultShop = {
  shop_name: "",
  category_ID: "",
  website_url: "",
};

// to add { onSaveShop } in props
export default function AddShop(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [shop, setShop] = useState(defaultShop);
  const [categories, setCategories] = useState([]);
  const [formErrors, setFormErrors] = useState({
    shop_name: "",
    website_url: "",
  });
  const [nameValid, setNameValid] = useState(false);
  const [website_urlValid, setWebsite_urlValid] = useState(false);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const getCategoriesData = async () => {
      await getCategories().then((response) => {
        setCategories(response.data);
      });
    };
    getCategoriesData();
  }, []);

  const editField = (event) => {
    validateField(event.target.name, event.target.value);
    setShop({ ...shop, [event.target.name]: event.target.value });
  };

  const validateField = (fieldName, value) => {
    let fieldValidationErrors = formErrors;
    switch (fieldName) {
      case "shop_name":
        setWebsite_urlValid(value.length > 2);
        fieldValidationErrors.name = nameValid ? "" : "Name is invalid";
        break;
      case "website_url":
        setNameValid(value.length > 2);
        fieldValidationErrors.website_url = website_urlValid
          ? ""
          : "Website_url is invalid";
        break;
      default:
        break;
    }
    setFormErrors(fieldValidationErrors);
    validateForm();
  };

  const validateForm = () => {
    setFormValid(nameValid && website_urlValid);
  };

  const saveShop = (e) => {
    e.preventDefault();

    if (formValid) {
      if (createShop(shop)) {
        setShop(defaultShop);
        handleClose();
      }
    }
    window.location.href ='/';
  };

  ////////////////////////
  const handleOpen = () => {
    if(!props.userId)  {
      window.location.href ="/login";
  } else {
      setOpen(true);
  }
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add SHOP
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>Add a shop</h2>
          <form className={classes.form} noValidate>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="left"
              spacing={2}
            >
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                    Shop Category:
                  </InputLabel>
                  <NativeSelect
                    inputProps={{
                      name: "category_ID",
                      id: "uncontrolled-native",
                    }}
                    onChange={editField}
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.category_name}
                      </option>
                    ))}
                  </NativeSelect>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <TextField
                    id="shop_name"
                    label="Shop Name"
                    variant="outlined"
                    name="shop_name"
                    className="form-control"
                    value={shop.shop_name}
                    onChange={editField}
                    error={formErrors?.shop_name.length > 0}
                    helperText={formErrors?.shop_name}
                    inputProps={{
                      type: "text",
                      autoComplete: "off",
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <TextField
                    id="website_url"
                    label="Website Url"
                    variant="outlined"
                    name="website_url"
                    className="form-control"
                    value={shop.website_url}
                    onChange={editField}
                    error={formErrors?.website_url.length > 0}
                    helperText={formErrors?.website_url}
                    inputProps={{
                      type: "text",
                      autoComplete: "off",
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  variant="contained"
                  className="button"
                  onClick={saveShop}
                  color="primary"
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  className="button"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Modal>
    </div>
  );
}
