import React, {useState, useEffect} from 'react'
import { Container, Wrapper, Title, Top, TopButton, TopTexts, TopText, Bottom, Info, Product, ProductDetail, Image, Details, ProductName, ProductId, ProductColor, ProductSize, PriceDetail, ProductAmountContainer, ProductAmount, ProductPrice, Hr, Summary, SummaryTitle, SummaryItem, SummaryItemText, SummaryItemPrice, Button } from "./Cart.styles";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";

let items =[];

const CartItems = ({item}) => {
    const [{ cartItems }, dispatch] = useStateValue();
  const [qty, setQty] = useState(item.qty);

    const cartDispatch = () => {
        dispatch({
          type: actionType.SET_CARTITEMS,
          cartItems: items,
        });
        localStorage.setItem("cartItems", JSON.stringify(items));
      };

      const updateQty = (action, id) => {
        if (action == "add") {
          setQty(qty + 1);
          cartItems.map((item) => {
            if (item.id === id) {
              item.qty += 1;
            }
          });
          cartDispatch();
        } else {
          // initial state value is one so you need to check if 1 then remove it
          if (qty == 1) {
            items = cartItems.filter((item) => item.id !== id);
            cartDispatch();
          } else {
            setQty(qty - 1);
            cartItems.map((item) => {
              if (item.id === id) {
                item.qty -= 1;
              }
            });
            cartDispatch();
          }
        }
      };
    
      useEffect(() => {
        items = cartItems;
      }, [qty, items]);
      
  return (
    <>
    <Product>
    <ProductDetail>
      <Image src={item?.imageURL} />
      <Details>
        <ProductName>
          <b>Product:</b> {item?.title}
        </ProductName>
        <ProductId>
          <b>ID:</b> 93813718293
        </ProductId>
        <ProductSize>
          <b>Size:</b> 37.5
        </ProductSize>
      </Details>
    </ProductDetail>
    <PriceDetail>
      <ProductAmountContainer>
      <div className="group flex items-center gap-2 cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("remove", item?.id)}
        >
          <BiMinus className="text-black" />
        </motion.div>

        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {qty}
        </p>

        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("add", item?.id)}
        >
          <BiPlus className="text-black" />
        </motion.div>
      </div>
      </ProductAmountContainer>
      <ProductPrice>{parseFloat(item?.price) * item.qty}</ProductPrice>
    </PriceDetail>
  </Product>
  <Hr />
  </>
  )
}

export default CartItems