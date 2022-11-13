import styles from "./productDetails.module.scss";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { firestore } from "../../../firebase.config";
import spinnerImg from "../../../img/spinner.gif";
import { useStateValue } from "../../../context/StateProvider";
// import Product from "../Product";
import { actionType } from "../../../context/reducer"
import Card from "../../../components/card/Card"

import useFetchDocument from "../../../customHooks/useFetchDocument";
import useFetchCollection from "../../../customHooks/useFetchCollection";

import {useLocation} from "react-router-dom"

import styled from "styled-components";
import { mobile } from "../../../utils/responsive";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
 import { Container, Wrapper, ImgContainer, Image, InfoContainer, Title, Desc, Price, FilterContainer, Filter, FilterTitle, FilterColor, FilterSize, FilterSizeOption, AddContainer, AmountContainer, Amount, Button } from "./product.styles"

let stuff = [];


const ProductDetails = () => {

  const location = useLocation();
  const {item} = location.state;
  const [flag, setFlag] = useState(1);
  
  const { id } = useParams();

  const [items, setItems] = useState(JSON.parse(localStorage.getItem("cartItems")));
  const [{cartItems}, dispatch] = useStateValue();

  const [product, setProduct] = useState(null);
  

  const { document } = useFetchDocument("foodItems", id);

  console.log(document)
  const [qty, setQty] = useState(item.qty);

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const addtoCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  useEffect(() => {
    addtoCart();
  }, [items]);

  const cartLogic = (cartItems, item) => {
    
    console.log(cartItems);
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === item.id
    );

    if (existingCartItem) {
      return cartItems.map((cartItem) => {
        if (cartItem.id === item.id) {
          setItems([{ ...cartItem, qty: cartItem.qty + 1 }])
        } else {
          setItems([cartItems, ...item])
        }
      }
      );
    }
  
     return setItems([...cartItems, item]);
    
  };


  const cart = cartItems?.find((cart) => cart.id === id);
  
  const isCartAdded = cartItems?.findIndex((cart) => {
    return cart.id === id;
  });

  const cartDispatch = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: stuff,
    });
    localStorage.setItem("cartItems", JSON.stringify(stuff));
  };

   const updateQty = (action, id) => {
    if (action == "add") {
      setQty(qty + 1);
      return cartItems.map((item) => {
        if (item.id === id) {
         setItems([{...item , qty: item.qty + 1}])
          setFlag(flag + 1);
        }
      });
      cartDispatch();
      console.log(item)
    } else {
      // initial state value is one so you need to check if 1 then remove it
      if (qty == 1) {
        stuff = cartItems.filter((item) => item.id !== id);
        setFlag(flag + 1);
        cartDispatch();
      } else {
        setQty(qty - 1);
        return cartItems.map((item) => {
          if (item.id === id) {
            setItems([{...item , qty: item.qty - 1}]) 
            setFlag(flag + 1);
          }
        });
        cartDispatch();
      }
    }
  };

  const quantity = cartItems?.map((item) => {
    if (item.id === id) {
      return item.qty
    }
  })


  useEffect(() => {
    stuff = cartItems;
  }, [qty, stuff]);


 const getProduct = async () => {
    const docRef = doc(firestore, "foodItems", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      const obj = {
        id: id,
        ...docSnap.data(),
      };
      setProduct(obj);
    } else {
      toast.error("Product not found");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Container>
        {!product ? (<img src={spinnerImg} alt="Loading" style={{ width: "50px" }} />) :
          <Wrapper>
           <ImgContainer>
           <Image src={product.imageURL} />
          </ImgContainer>
          <InfoContainer>
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
          {product.title}
        </p>
          <Desc>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            venenatis, dolor in finibus malesuada, lectus ipsum porta nunc, at
            iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget
            tristique tortor pretium ut. Curabitur elit justo, consequat id
            condimentum ac, volutpat ornare.
          </Desc>
          <Price>{product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color="black" />
              <FilterColor color="darkblue" />
              <FilterColor color="gray" />
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
           {!cart ? 
            <button
             type="button"
             className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 ml-24"
             onClick={() => cartLogic(cartItems, item)}
            >
             BUY NOW
           </button>
           : 
             <AmountContainer>
             <div className="group flex items-center gap-2 ml-auto cursor-pointer">
         <motion.div
           whileTap={{ scale: 0.75 }}
           onClick={() => updateQty("remove", item?.id)}
         >
           <BiMinus className="text-black-50 h-96" />
         </motion.div>
 
         <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
           {quantity}
         </p>
 
         <motion.div
           whileTap={{ scale: 0.75 }}
           onClick={() => updateQty("add", item?.id)}
         >
           <BiPlus className="text-black-50 h-96" />
         </motion.div>
       </div>
             </AmountContainer>
           }   
          </AddContainer>
        </InfoContainer>
        
        
          </Wrapper>
        }
    </Container>

  );
};

export default ProductDetails;
