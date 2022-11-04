import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CreateContainer, Header, MainContainer, Product, Cart, Footer } from "./components";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";

const App = () => {
  const [{ foodItems, menuShow, cartShow }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  const menuRemove = () => {
    dispatch({
      type: actionType.SET_MENU,
      menuShow: false,
    });
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: false,
    });
  }

  useEffect(() => {
    fetchData();
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
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
         <Footer />
      </div>
    </AnimatePresence>
  );
};

export default App;
