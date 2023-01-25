import { useState, useEffect } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../../components/card/Card";
import CheckoutSummary from "../../components/checkoutSummary/checkoutSummary.jsx";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
// import {
//   SAVE_BILLING_ADDRESS,
//   SAVE_SHIPPING_ADDRESS,
// } from "../../redux/slice/checkoutSlice";
import styles from "./CheckoutDetails.module.scss";
// import Loader from "../../img/spinner.gif"


import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css'

import { useJsApiLoader, GoogleMap } from "@react-google-maps/api"


const initialAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
  digital: "",
  deliveryDate: "",
};

const CheckoutDetails = () => {
  const [date, setDate] = useState(new Date());

  const [{ shippingAddress }, dispatch] = useStateValue();

  const [shippingData, setShippingData] = useState({
    ...initialAddressState,
  });

  const navigate = useNavigate();

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingData({
      ...shippingData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: actionType.SET_ADDRESS,
      shippingAddress: shippingData,
    });
    navigate("/checkout");
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) {
    return <div>Hello</div>;
  }

  return (
    <div className="container mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg drop-shadow-xl"
      >
        <h1 className="text-lg font-medium mb-4">Checkout Details</h1>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full sm:w-1/2 px-3">
            <label className="block mb-2 text-gray-700 font-medium">
              Recipient Name
            </label>
            <input
              className="border border-gray-400 p-2 w-full"
              type="text"
              placeholder="Recipient Name"
              required
              name="name"
              value={shippingData.name}
              onChange={handleShipping}
            />
          </div>
          <div className="w-full sm:w-1/2 px-3">
            <label className="block mb-2 text-gray-700 font-medium">
              Address line 1
            </label>
            <input
              className="border border-gray-400 p-2 w-full"
              type="text"
              placeholder="Address line 1"
              required
              name="line1"
              value={shippingData.line1}
              onChange={handleShipping}
            />
          </div>
          <div className="w-full sm:w-1/2 px-3">
            <label className="block mb-2 text-gray-700 font-medium">
              Address line 2
            </label>
            <input
              className="border border-gray-400 p-2 w-full"
              type="text"
              placeholder="Address line 2"
              name="line2"
              value={shippingData.line2}
              onChange={handleShipping}
            />
          </div>
          <div className="w-full sm:w-1/2 px-3">
            <label className="block mb-2 text-gray-700 font-medium">City</label>
            <input
              className="border border-gray-400 p-2 w-full"
              type="text"
              placeholder="City"
              required
              name="city"
              value={shippingData.city}
              onChange={handleShipping}
            />
          </div>
          <div className="w-full sm:w-1/2 px-3">
            <label className="block mb-2 text-gray-700 font-medium">
              State
            </label>
            <input
              className="border border-gray-400 p-2 w-full"
              type="text"
              placeholder="State"
              required
              name="state"
              value={shippingData.state}
              onChange={handleShipping}
            />
          </div>
          <div className="w-full sm:w-1/2 px-3">
            <label className="block mb-2 text-gray-700 font-medium">
              Postal Code
            </label>
            <input
              className="border border-gray-400 p-2 w-full"
              type="text"
              placeholder="Postal Code"
              required
              name="postal_code"
              value={shippingData.postal_code}
              onChange={handleShipping}
            />
          </div>
          <div className="w-full sm:w-1/2 px-3">
            <label className="block mb-2 text-gray-700 font-medium">
              Country
            </label>
            <CountryDropdown
              className="border border-gray-400 p-2 w-full"
              value={shippingData.country}
              onChange={(val) =>
                setShippingData({
                  ...shippingData,
                  country: val,
                })
              }
            />
          </div>
          <div className="w-full sm:w-1/2 px-3">
            <label className="block mb-2 text-gray-700 font-medium">
              Phone
            </label>
            <input
              className="border border-gray-400 p-2 w-full"
              type="text"
              placeholder="Phone"
              required
              name="phone"
              value={shippingData.phone}
              onChange={handleShipping}
            />
          </div>
          <div className="w-full sm:w-1/2 px-3">
            <label className="block mb-2 text-gray-700 font-medium">
              Digital Address
            </label>
            <input
              className="border border-gray-400 p-2 w-full"
              type="text"
              placeholder="GN-0000-0000"
              required
              name="digital"
              value={shippingData.digital}
              onChange={handleShipping}
            />
          </div>
          <div className="w-full sm:w-1/2 px-3">
            <label className="block mb-2 text-gray-700 font-medium">
              Delivery Date
            </label>
            <Calendar
              className="w-full"
              onChange={(val) => setDate(val)}
              value={date}
            />
          </div>
        </div>
        <button type="submit" className="bg-indigo-500 text-white mt-6 py-2 px-4 rounded-lg hover:bg-indigo-600">
          Proceed to Checkout
        </button>
      </form>

    </div>
  );
};

export default CheckoutDetails;
