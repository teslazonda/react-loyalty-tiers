import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OrderItem from "./OrderItem";

const OrderPage = ({ match }) => {
  const path = window.location.pathname; // looks like: order/21
  const extractedNumber = parseInt(path.match(/\d+$/)[0], 10);
  const customerId = extractedNumber;
  const [orders, setOrders] = useState([]);
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/v1/customers/${customerId}/orders`
        );
        setOrders(response.data);
        if (response.data.length > 0) {
          setCustomerName(response.data[0].customerName);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [customerId]);

  return (
    <div>
      <h1>This year's orders for Customer: {customerName}</h1>
      <ul>
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </ul>
      {/* "Return to Customer" button */}
      <Link to={`/`}>
        <button style={{ marginTop: "10px" }}>Return to Customer Search</button>
      </Link>
    </div>
  );
};

export default OrderPage;
