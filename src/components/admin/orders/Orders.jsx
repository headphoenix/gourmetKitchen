import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetchCollection from "../../../customHooks/useFetchCollection";

// import {
//   selectOrderHistory,
//   STORE_ORDERS,
// } from "../../../redux/slice/orderSlice";
import Loader from "../../../img/spinner.gif";
import styles from "./Orders.module.scss";

import { actionType } from "../../../context/reducer";
import { useStateValue } from "../../../context/StateProvider";


const Orders = () => {
  const { data, isLoading } = useFetchCollection("orders");

  const [{orderHistory}, dispatch] = useStateValue();


  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
        type: actionType.SET_ORDER_HISTORY,
        orderHistory: data,
      });
}, [dispatch, data]);

  const handleClick = (id) => {
    navigate(`/admin/order-details/${id}`);
  };

  return (
    <>
      <div className={styles.order}>
        <h2>Your Order History</h2>
        <p>
          Open an order to <b>Change order status</b>
        </p>
        <br />
        <>
          {isLoading && <div>Loading...</div>}
          <div className={styles.table}>
            {orderHistory.length === 0 ? (
              <p>No order found</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Date</th>
                    <th>Order ID</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orderHistory.map((order, index) => {
                    const {
                      id,
                      orderDate,
                      orderTime,
                      orderAmount,
                      orderStatus,
                    } = order;
                    return (
                      <tr key={id} onClick={() => handleClick(id)}>
                        <td>{index + 1}</td>
                        <td>
                          {orderDate} at {orderTime}
                        </td>
                        <td>{id}</td>
                        <td>
                          {"$"}
                          {orderAmount}
                        </td>
                        <td>
                          <p
                            className={
                              orderStatus !== "Delivered"
                                ? `${styles.pending}`
                                : `${styles.delivered}`
                            }
                          >
                            {orderStatus}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </>
  );
};

export default Orders;