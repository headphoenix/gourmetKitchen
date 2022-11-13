import React from "react";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import {
//   selectCartItems,
//   selectCartTotalAmount,
//   selectCartTotalQuantity,
// } from "../../redux/slice/cartSlice";
import Card from "../card/Card";
import styles from "./checkoutSummary.module.scss";
import { useStateValue } from "../../context/StateProvider";

const CheckoutSummary = () => {
  // const cartItems = useSelector(selectCartItems);
  // const cartTotalAmount = useSelector(selectCartTotalAmount);
  // const cartTotalQuantity = useSelector(selectCartTotalQuantity);
   const [{cartItems}, dispatch]= useStateValue() 
  
   return (
    <div className="pl-2 rounded-lg drop-shadow-xl rounded-full shadow-lg">
      <div className="mb-2">
        {cartItems.length === 0 ? (
          <>
            <p>No item in your cart.</p>
            <button className="--btn">
              <Link to="/#products">Back To Shop</Link>
            </button>
          </>
        ) : (
          <div>
            <h3>Checkout Summary</h3>
            <p>
              <h4>{`Cart item(s): ${cartItems.length}`}</h4>
            </p>
            <div className={styles.text}>
              <b>Subtotal:</b>
              <h3>Hello</h3>
            </div>
            {cartItems.map((item, index) => {
              const { id, title, price, qty } = item;
              return (
                <Card key={id} cardClass={styles.card}>
                  <h4>Product: {title}</h4>
                  <p>Quantity: {qty}</p>
                  <p>Unit price: {price}</p>
                  <p>Set price: {price * qty}</p>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;