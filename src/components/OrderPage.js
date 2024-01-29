import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderPage = ({ match }) => {
  const customerId = match.params.customerId;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/customers/${customerId}/orders`
        );
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [customerId]);

  return (
    <div>
      <h1>Orders for Customer {customerId}</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>{order.orderDetails}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrderPage;
