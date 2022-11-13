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
import Loader from "../../img/spinner.gif"


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
    location: "",
    deliveryDate: "",
};

const CheckoutDetails = () => {

    const [date, setDate] = useState(new Date());

    const [{ shippingAddress }, dispatch] = useStateValue();


    const [shippingData, setShippingData] = useState({
        ...initialAddressState,
    });
 
    // const location = useLocation();

    // const { tot } = location.state
    

    const navigate = useNavigate();

    const handleShipping = (e) => {
        const { name, value } = e.target;
        setShippingData({
            ...shippingData,
            [name]: value,
        });
        console.log(shippingData);
    };

    

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: actionType.SET_ADDRESS,
            shippingAddress: shippingData,
        });
        navigate("/checkout");
    };


    //   const {isLoaded} = useJsApiLoader({
    //     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    // })

    // if (!isLoaded) {
    //     return <Loader />
    // }

   

    return (
        <section >
            <div className={`container ${styles.checkout}`}>
                <h1>Checkout Details</h1>
                <form onSubmit={handleSubmit}>
                    <div className="rounded-lg drop-shadow-xl rounded-full shadow-lg">
                        <Card cardClass={styles.card}>
                            <h3>Shipping Address</h3>
                            <label>Recipient Name</label>
                            <input
                                type="text"
                                placeholder="Recipient Name"
                                required
                                name="name"
                                value={shippingData.name}
                                onChange={(e) => handleShipping(e)}
                            />
                            <label>Address line 1</label>
                            <input
                                type="text"
                                placeholder="Address line 1"
                                required
                                name="line1"
                                value={shippingData.line1}
                                onChange={(e) => handleShipping(e)}
                            />
                            <label>Address line 2</label>
                            <input
                                type="text"
                                placeholder="Address line 2"
                                name="line2"
                                value={shippingData.line2}
                                onChange={(e) => handleShipping(e)}
                            />
                            <label>City</label>
                            <input
                                type="text"
                                placeholder="City"
                                required
                                name="city"
                                value={shippingData.city}
                                onChange={(e) => handleShipping(e)}
                            />
                            <label>State</label>
                            <input
                                type="text"
                                placeholder="State"
                                required
                                name="state"
                                value={shippingData.state}
                                onChange={(e) => handleShipping(e)}
                            />
                            <label>Postal code</label>
                            <input
                                type="text"
                                placeholder="Postal code"
                                required
                                name="postal_code"
                                value={shippingData.postal_code}
                                onChange={(e) => handleShipping(e)}
                            />
                            {/* COUNTRY INPUT */}
                            <label>Country</label>
                            <CountryDropdown
                                className={styles.select}
                                valueType="short"
                                value={shippingData.country}
                                onChange={(val) =>
                                    handleShipping({
                                        target: {
                                            name: "country",
                                            value: val,
                                        },
                                    })
                                }
                            />
                            <label>Phone</label>
                            <input
                                type="text"
                                placeholder="Phone"
                                required
                                name="phone"
                                value={shippingData.phone}
                                onChange={(e) => handleShipping(e)}
                            />
                            <button onClick={() => navigate('/map')} className="--btn --btn-primary">
                                Choose Location on Map
                            </button>
                            <div className="app">
                                <h1 className="flex items-center justify-center">Delivery Date</h1>
                                <div className="calendar-container">
                                    <Calendar onChange={(e) => handleShipping(e)} name="deliveryDate" value={shippingData.deliveryDate} />
                                </div>
                                <div className="text-center">
                                    Selected date: {date.toDateString()}
                                </div>
                            </div>
                            <button type="submit" className="--btn --btn-primary">
                                Proceed To Checkout
                            </button>
                        </Card>
                    </div>
                    <div>
                        <Card >
                            <CheckoutSummary />
                        </Card>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default CheckoutDetails;