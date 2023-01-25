import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CreateContainer, Header, MainContainer, Product, Footer, Admin,CartContainer,Carts } from "./components";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";
import ProductDetails from "./pages/product/productDetails/productDetails";
import Cart from "./pages/cart/Cart";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import Map from "./pages/checkout/Maps"
import Checkout from "./pages/checkout/Checkout";
import OrderHistory from "./pages/orderHistory/OrderHistory";
import OrderDetails from "./pages/orderDetails/OrderDetails";
import Menu from "./pages/menu";


const App = () => {
  const [{ foodItems, menuShow, cartShow, user, cartItems }, dispatch] = useStateValue();

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: false,
    });
  };

  const menuRemove = () => {
    dispatch({
      type: actionType.SET_MENU,
      menuShow: false,
    });
  }

  useEffect(() => {
    fetchData();
    showCart();
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-primary" >
        <Header />
        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full" onClick={menuRemove}>
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/product" element={<Product />} />
            {user?.email === "kofiamoodarko@gmail.com" && <Route path="/admin/*" element={<Admin />}/> }
            <Route path="/product-details/:id" element={<ProductDetails />} />
            <Route path="/carts" element={<Carts />} />
            <Route path="/checkout-details" element={<CheckoutDetails />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/order-details/:id" element={<OrderDetails />} />
            <Route path="/map" element={<Map />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/menu" element={<Menu />} />
          </Routes>
        </main> 
        <Footer />
        {cartShow && <CartContainer />}
      </div>
    </AnimatePresence>
  );
};

export default App;
