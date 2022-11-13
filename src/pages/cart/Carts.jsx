import React, { useEffect, useState } from "react";

import { Container, Wrapper, Title, Top, TopButton, TopTexts, TopText, Bottom, Info, Product, ProductDetail, Image, Details, ProductName, ProductId, ProductColor, ProductSize, PriceDetail, ProductAmountContainer, ProductAmount, ProductPrice, Hr, Summary, SummaryTitle, SummaryItem, SummaryItemText, SummaryItemPrice, Button } from "./Cart.styles";
import { Link, useNavigate } from "react-router-dom"


import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";

import EmptyCart from "../../img/emptyCart.svg"
import CartItems from "./CartItems";

const Carts = () => {
  const [{ cartItems }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);

  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
    console.log(tot);
  }, [tot, flag]);

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  

  // const updateQty = (action, id) => {
  //   if (action == "add") {
  //     setQty(qty + 1);
  //     return cartItems.map((item) => {
  //       if (item.id === id) {
  //         setItems([{ ...item, qty: item.qty + 1 }])
  //         setFlag(flag + 1);
  //       }
  //     });
  //     cartDispatch();
  //     console.log(item)
  //   } else {
  //     // initial state value is one so you need to check if 1 then remove it
  //     if (qty == 1) {
  //       stuff = cartItems.filter((item) => item.id !== id);
  //       setFlag(flag + 1);
  //       cartDispatch();
  //     } else {
  //       setQty(qty - 1);
  //       return cartItems.map((item) => {
  //         if (item.id === id) {
  //           setItems([{ ...item, qty: item.qty - 1 }])
  //           setFlag(flag + 1);
  //         }
  //       });
  //       cartDispatch();
  //     }
  //   }
  // };

  // const quantity = cartItems.map((item) => {
  //   if (item.id === id) {
  //     return item.qty
  //   }
  // })


  return (
    <Container>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/">
            <TopButton className={cartItems && cartItems.length > 0 ? null: "flex items-center justify-center"}>CONTINUE SHOPPING</TopButton>
          </Link>
          {cartItems && cartItems.length > 0 ? (
            <>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled" typeonClick={clearCart}>Clear Cart</TopButton>
            </>
          ) : null}
        </Top>
         {cartItems && cartItems.length > 0 ? (
          <Bottom>
          <Info>
           {cartItems &&
              cartItems.length > 0 &&
              cartItems.map((item) => (
           <CartItems 
            key={item.id}
            item={item}
           />
               ))} 
        </Info>
        <Summary>
        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
        <SummaryItem>
          <SummaryItemText>Subtotal</SummaryItemText>
          <SummaryItemPrice>{tot}</SummaryItemPrice>
        </SummaryItem>
        <SummaryItem>
          <SummaryItemText>Estimated Shipping</SummaryItemText>
          <SummaryItemPrice>$ 5.90</SummaryItemPrice>
        </SummaryItem>
        {/* <SummaryItem>
          <SummaryItemText>Shipping Discount</SummaryItemText>
          <SummaryItemPrice>$ -5.90</SummaryItemPrice>
        </SummaryItem> */}
        <SummaryItem type="total">
          <SummaryItemText>Total</SummaryItemText>
          <SummaryItemPrice>{tot}</SummaryItemPrice>
        </SummaryItem>
        <Link to="/checkout-details" >
        <Button>CHECKOUT NOW</Button>
        </Link>
      </Summary>
    </Bottom>
         ) : 
         
         (
          <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className="w-300" alt="" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
         )} 
          
      </Wrapper>
    </Container>
  );
};

export default Carts;