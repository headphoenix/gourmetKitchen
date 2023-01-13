import React, { useEffect, useState, useRef } from "react";
import { IoFastFood } from "react-icons/io5";
import { packaged } from "../utils/data";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";
import { MdShoppingBasket, MdChevronRight,MdChevronLeft } from "react-icons/md";

const PackagedContainer = () => {
  const [filter, setFilter] = useState("meal");

  const rowContainer = useRef();

  const [items, setItems] = useState([]);
  const [scrollValue, setScrollValue] = useState(0);

  const [{ foodItems,cartItems }, dispatch] = useStateValue(JSON.parse(localStorage.getItem("cartItems")));

  return (
    <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
            Our Special Meals
          </p>

          <div className="hidden md:flex gap-3 items-center">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer  hover:shadow-lg flex items-center justify-center"
              onClick={() => setScrollValue(-200)}
            >
              <MdChevronLeft className="text-lg text-white" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={() => setScrollValue(200)}
            >
              <MdChevronRight className="text-lg text-white" />
            </motion.div>
          </div>
        </div>
        <RowContainer
          scrollValue={scrollValue}
          flag={true}
          data={foodItems?.filter((n) => n.category === "sauces")}
        />
      </section>
  );

};

export default PackagedContainer;
