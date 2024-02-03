import React from "react";
import "./OrderItem.css"

const OrderItem = ({ order }) => {
  return (
    <li key={order.id} className="order-card">
      <p>orderId: {order.orderId}</p>
      <p>Order Total: ${order.totalInCents / 100.0}</p>
      <p>Customer name: {order.customerName}</p>
      <p>Date: {order.date}</p>
    </li>
  );
};

export default OrderItem;
