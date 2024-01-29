import React from "react";
import { BrowserRouter , Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import OrderPage from "./components/OrderPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} ></Route>
        <Route path="/orders/:customerId" element={<OrderPage />} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
