import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useStateValue } from "../../context/StateProvider";
import CheckoutSummary from "../../components/checkoutSummary/checkoutSummary"

import Card from "../../components/card/Card";

import { addDoc, collection, Timestamp } from "firebase/firestore";
import { firestore } from "../../firebase.config";
import { useNavigate } from "react-router-dom";
import { actionType } from "../../context/reducer";


const Checkout = () => {

  const [{cartItems, user, shippingAddress }, dispatch] = useStateValue()
  const [message, setMessage] = useState("Initializing checkout...");
  
  const navigate = useNavigate();

  const saveOrder = () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const orderConfig = {
      user: user.email,
      orderDate: date,
      orderTime: time,
      orderAmount: [],
      orderStatus: "Order Placed...",
      cartItems,
      shippingAddress,
      createdAt: Timestamp.now().toDate(),
    };
    try {
      addDoc(collection(firestore, "orders"), orderConfig);
      dispatch({
        type: actionType.SET_CARTITEMS,
        cartItems: [],
      });
      toast.success("Order saved");
      navigate("/checkout-success");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <section>
        <div className="container"><h3>{message}</h3></div>
      </section>
      <Card>
          <CheckoutSummary />
      </Card>

      <button onClick={saveOrder}>
        Pay
      </button>
    </>
  );
};

export default Checkout;