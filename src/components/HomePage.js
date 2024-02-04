import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TierCalculator from "./TierCalculator";

const HomePage = () => {
  const [customerId, setCustomerId] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setCustomerId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:3000/v1/customers/${customerId}`
      );
      setUserData(response.data);
      setError(null);
    } catch (error) {
      setUserData(null);
      console.error("Error fetching customer data:", error);
      setError("Customer not found");
    }
  };

  const calculateProgressBarWidth = () => {
    const spent = userData.amount_spent_since_last_year || 0;
    const needed = userData.amount_needed_for_next_tier || 1;
    const percentage = (spent / (spent + needed)) * 100;
    return Math.min(100, Math.max(0, percentage));
  };

  return (
    <div>
      <h1>Search for a Customer</h1>
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
      {error && <p style={{ color: "red" }}>{error}</p>}

      {userData && (
        <div>
          <h2>User Data:</h2>
          <p>Name: {userData.name}</p>
          <p>Current tier: {userData.current_tier}</p>
          <p>
            Amount spent this year: $
            {userData.amount_spent_since_last_year / 100.0}
          </p>
          <p>
            Amount needed for next tier: $
            {userData.amount_needed_for_next_tier / 100.0}
          </p>
          <p>
            Tier you'll be in if you don't spend enough money this year:{" "}
            {userData.downgraded_tier}
          </p>

          {/* Progress bar */}
          <p>Progress:</p>
          <div style={{ border: "2px solid black" }}>
            <div
              style={{
                width: `${calculateProgressBarWidth()}%`,
                height: "20px",
                backgroundColor: "green",
              }}
            />
          </div>

          {/* Button for OrderPage */}
          <Link to={`/orders/${customerId}`}>
            <button style={{ marginTop: "10px" }}>View Orders</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
