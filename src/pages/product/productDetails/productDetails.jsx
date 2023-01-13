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

let items = [];


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
   
  const cart = cartItems?.find((cart) => cart.id === id);
  const isCartAdded = cartItems?.findIndex((cart) => {
    return cart.id === id;
  });

  // const cartDispatch = () => {
  //   localStorage.setItem("cartItems", JSON.stringify(items));
  //   dispatch({
  //     type: actionType.SET_CARTITEMS,
  //     cartItems: items,
  //   });
  // };

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
      // cartDispatch();
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
      // cartDispatch();
    }
  };

  const addToCart = () => {
    if (isCartAdded === -1) {
      return dispatch({
        type: actionType.SET_CARTITEMS,
        cartItems: [...cartItems, { ...document, qty }],
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
            <FilterContainer>{/* filters /}*/} </FilterContainer>
            {!cart ? (
              <button
                type="button"
                className="mt-5 bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
                onClick={addToCart}
              >
                BUY NOW
              </button>
            ) : (
              <AddContainer>
                <AmountContainer>
                  <BiMinus onClick={() => updateQty("remove", id)} />
                  <Amount>{qty}</Amount>
                  <BiPlus onClick={() => updateQty("add", id)} />
                </AmountContainer>
                {/* <Button onClick={addToCart}>
    {isCartAdded === -1 ? "Add to Cart" : "Update Cart"}
    </Button> */}
              </AddContainer>
            )}
          </InfoContainer>
        </Wrapper>
      )}
    </Container>
  );
};

export default ProductDetails;