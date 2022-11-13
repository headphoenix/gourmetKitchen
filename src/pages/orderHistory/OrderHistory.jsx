import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../img/spinner.gif";
import useFetchCollection from "../../customHooks/useFetchCollection";
// import { selectUserID } from "../../redux/slice/authSlice";
import styles from "./orderHistory.module.scss";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";


const OrderHistory = () => {
    const [{orderHistory, user}, dispatch] = useStateValue();
    const { data, isLoading } = useFetchCollection("orders");

  
    const navigate = useNavigate();
  
    useEffect(() => {
        dispatch({
            type: actionType.SET_ORDER_HISTORY,
            orderHistory: data,
          });
    }, [dispatch, data]);
  
    const handleClick = (id) => {
      navigate(`/order-details/${id}`);
    };
  
    const filteredOrders = orderHistory.filter((order) => order.user.email === user.email);

    console.log(orderHistory)
  
    return (
      <section>
         <div className={`container ${styles.order}`}>
          <h2>Your Order History</h2>
          <br />
          <>
            {isLoading && <div>isLoading...</div>}
            <div className={styles.table}>
              {filteredOrders.length === 0 ? (
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
                    {filteredOrders.map((order, index) => {
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
      </section>
    );
  };
  
  export default OrderHistory;