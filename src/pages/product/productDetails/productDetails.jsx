import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { firestore } from "../../../firebase.config";
import spinnerImg from "../../../img/spinner.gif";
import { useStateValue } from "../../../context/StateProvider";
import { actionType } from "../../../context/reducer";
import Card from "../../../components/card/Card";

import useFetchDocument from "../../../customHooks/useFetchDocument";
import useFetchCollection from "../../../customHooks/useFetchCollection";

import { useLocation } from "react-router-dom";

import styled from "styled-components";
import { mobile } from "../../../utils/responsive";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import {
  Container,
  Wrapper,
  ImgContainer,
  Image,
  InfoContainer,
  Title,
  Desc,
  Price,
  FilterContainer,
  Filter,
  FilterTitle,
  FilterColor,
  FilterSize,
  FilterSizeOption,
  AddContainer,
  AmountContainer,
  Amount,
  Button,
} from "./product.styles";

import {
  Grid,
  Typography,
  IconButton,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";

import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import AddToCartIcon from "@material-ui/icons/AddShoppingCart";
import RemoveFromCartIcon from "@material-ui/icons/RemoveShoppingCart";

let items = [];

const useStyles = makeStyles({
  extraContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
  },
  extra: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "10px",
    "&:not(:last-of-type)": {
      borderBottom: "1px solid #ccc",
    },
  },
  extraName: {
    flex: 1,
  },
  extraPrice: {
    flex: 1,
    textAlign: "center",
  },
  extraQty: {
    flex: 1,
    textAlign: "center",
  },
});

const ProductDetails = () => {
  const location = useLocation();
  const { item } = location.state || {};
  const { id } = useParams();

  const [{ cartItems }, dispatch] = useStateValue();
  const { document } = useFetchDocument("foodItems", id);

  const [qty, setQty] = useState(
    cartItems?.find((cart) => {
      return cart.id === id;
    })?.qty || 1
  );

  const [selectedExtras, setSelectedExtras] = useState([]);

  const classes = useStyles();
  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  const handleAddExtra = (extra) => {
    setSelectedExtras([...selectedExtras, { ...extra, qty: 1 }]);
  };

  const handleRemoveExtra = (extra) => {
    setSelectedExtras(selectedExtras.filter((e) => e.name !== extra.name));
  };

  const handleChangeExtraQty = (extra, action) => {
    const extraIndex = selectedExtras.findIndex((e) => e.name === extra.name);
    const newSelectedExtras = [...selectedExtras];
    if (action === "add") {
      newSelectedExtras[extraIndex].qty = newSelectedExtras[extraIndex].qty + 1;
    } else if (action === "remove") {
      newSelectedExtras[extraIndex].qty = newSelectedExtras[extraIndex].qty - 1;
    }
    setSelectedExtras(newSelectedExtras);
  };

  const cart = cartItems?.find((cart) => cart.id === id);
  const isCartAdded = cartItems?.findIndex((cart) => {
    return cart.id === id;
  });

  const updateQty = (action, id) => {
    if (action === "add") {
      setQty(qty + 1);
      return dispatch({
        type: actionType.SET_CARTITEMS,
        cartItems: cartItems.map((item) => {
          if (item.id === id) {
            return { ...item, qty: item.qty + 1 };
          } else {
            return item;
          }
        }),
      });
    } else if (action === "remove") {
      if (qty > 1) {
        setQty(qty - 1);
        return dispatch({
          type: actionType.SET_CARTITEMS,
          cartItems: cartItems.map((item) => {
            if (item.id === id) {
              return { ...item, qty: item.qty - 1 };
            } else {
              return item;
            }
          }),
        });
      }
    }
  };

  const addToCart = () => {
    if (isCartAdded === -1) {
      return dispatch({
        type: actionType.SET_CARTITEMS,
        cartItems: [...cartItems, { ...document, qty, selectedExtras }],
      });
    } else {
      return updateQty("add", id);
    }
  };

  return (
    <Container>
      {!document ? (
        <img
          src={spinnerImg}
          alt="Loading"
          style={{ width: "400px", margin: "auto" }}
        />
      ) : (
        <Wrapper>
          <ImgContainer>
            <Image src={document.imageURL} />
          </ImgContainer>
          <InfoContainer>
            <Title>{document.title}</Title>
            <Desc>{document.desc}</Desc>
            <Price>{document.price}</Price>
            <Grid container spacing={3} className={classes.extraContainer}>
              {document.extras?.map((extra) => (
                <Grid item xs={12} key={extra.name} className={classes.extra}>
                   <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    className={classes.extraButtonContainer}
                  >
                    <Grid item>
                  <Typography variant="body2" className={classes.extraName}>
                    {extra.name}
                  </Typography>
                  </Grid>
                  <Grid item>
                  <Typography variant="body2" className={classes.extraPrice}>
                    ${extra.price}
                  </Typography>
                  </Grid>
                 </Grid>
                  <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    className={classes.extraQtyContainer}
                  >
                    <Grid item>
                      <IconButton
                        onClick={() => handleChangeExtraQty(extra, "remove")}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2" className={classes.extraQty}>
                        {selectedExtras.find((e) => e.name === extra.name)
                          ?.qty || 0}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton
                        onClick={() => handleChangeExtraQty(extra, "add")}
                      >
                        <AddIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    className={classes.extraButtonContainer}
                  >
                    <Grid item>
                      <IconButton onClick={() => handleAddExtra(extra)}>
                        <AddToCartIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={() => handleRemoveExtra(extra)}>
                        <RemoveFromCartIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
            {!cart ? (
              <Button
                variant="contained"
                color="primary"
                className="mt-5"
                onClick={addToCart}
              >
                BUY NOW
              </Button>
            ) : (
              <AddContainer>
                <AmountContainer>
                  <IconButton onClick={() => updateQty("remove", id)}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body2">{qty}</Typography>
                  <IconButton onClick={() => updateQty("add", id)}>
                    <AddIcon />
                  </IconButton>
                </AmountContainer>
                <Button variant="contained" color="primary" onClick={addToCart}>
                  UPDATE CART
                </Button>
              </AddContainer>
            )}
          </InfoContainer>
        </Wrapper>
      )}
    </Container>
  );
};

export default ProductDetails;
