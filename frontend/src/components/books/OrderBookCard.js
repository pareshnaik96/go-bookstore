import React from 'react';
import '../../style/OrderBookCard.css';

const OrderBookCard = ({ book }) => {
    return (
        <div className="order-book-card">
            <div className="book-name"><strong>Name:</strong> {book.name}</div>
            <div className="book-author"><strong>Author:</strong> {book.author}</div>
            <div className="book-publication"><strong>Publication:</strong> {book.publication}</div>
            <div className="book-price"><strong>Price:</strong> ₹{book.price}</div>
        </div>
    );
};

export default OrderBookCard;

