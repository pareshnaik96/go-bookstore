import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from 'react-redux';
import LoginForm from "./components/user/LoginForm";
import MainLayout from "./components/common/MainLayout";
import FeaturedBooks from "./components/books/FeaturedBooks";
import BookDetails from "./components/books/bookDetails";
import CartList from "./components/cart/CartList";
import BuySuccessful from "./components/common/success";
import SignUpForm from "./components/user/SignUpForm";
import OrderList from "./components/order/OrderList"

const App = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <Router>
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/" element={<LoginForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<SignUpForm />} />
          </>
        ) : (
          <Route path="/" element={<MainLayout />}>
            <Route index element={<FeaturedBooks />} />
            <Route path="dashboard" element={<FeaturedBooks />} />
            <Route path="book/:id" element={<BookDetails />} />
            <Route path="cart" element={<CartList />} />
            <Route path="buy-successful" element={<BuySuccessful />} />
            <Route path="orders" element={<OrderList />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
};

export default App;
