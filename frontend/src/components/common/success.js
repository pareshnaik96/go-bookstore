import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/BuySuccessful.css';
import { useSelector } from 'react-redux';

const BuySuccessful = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    };
    const orders = useSelector(state => state);
    console.log(orders);
    return (
        <div className="buy-successful-container">
            <h1 className="buy-successful-header">Buy Successful</h1>
            <p className="buy-successful-message">Thank you for your purchase! Your order has been successfully placed.</p>
            <button className="buy-successful-button" onClick={handleGoBack}>Go Back to Home</button>
        </div>
    );
};

export default BuySuccessful;
