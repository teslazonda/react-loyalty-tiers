import React, { useState } from "react";
import axios from "axios";
import TierCalculator from "./TierCalculator";

const HomePage = () => {
  const [customerId, setCustomerId] = useState("");
  const [userData, setUserData] = useState(null);

  const handleInputChange = (event) => {
    setCustomerId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:3000/v1/customers/${customerId}`
      );
      // Handle the response, maybe redirect to the OrdersPage with the customer ID
      //history.push(`/orders/${customerId}`);
      console.log(response.data);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  return (
    <div>
      <h1>Customer Orders App</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Customer ID:
          <input
            type="number"
            value={customerId}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      {userData && (
        <div>
          <h2>User Data:</h2>
          <p>Name: {userData.name}</p>
          <p>Current tier: {userData.current_tier}</p>
          <p>
            Amount spent since least year: {userData.amount_spent_since_last_year}
          </p>
          <p>
            Amount needed for next tier: {userData.amount_needed_for_next_tier}
          </p>
          <p>Tier you'll be in if you don't spend enough money: {userData.downgraded_tier}</p>
          <p>Amount you need to spend this year to stay in your current tier: {userData.current_tier}</p>

          {/* Add additional fields as needed */}
        </div>
      )}
    </div>
  );
};
export default HomePage;
