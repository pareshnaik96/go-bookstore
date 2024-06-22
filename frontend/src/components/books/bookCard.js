import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../features/cart/cartSlice';
import '../../style/BookCard.css'; 

const BookCard = ({ book, count }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleViewClick = () => {
        navigate(`/book/${book.ID}`);
      };

      const addToCartHandler = () => {
        const bookDetails = {
            book_id: book.ID,
            name: book.name,
            author: book.author,
            publication: book.publication,
            price: book.price
        };
        dispatch(addItemToCart(bookDetails));
    };

    return (
        <div className="book-card"> 
            {/* <div className="book-count-badge">{count}</div> */}
            
            <h3 className="book-title">{book.name}</h3> 
            <p className="book-author">Author: {book.author}</p> 
            <p className="book-publication">Published by: {book.publication}</p> 
            <p className="book-price">₹{book.price}</p>
            
            <div className="card-buttons"> 
                <button className="view-button" onClick={handleViewClick}>View</button>
                <button className="add-button" onClick={addToCartHandler}>Add</button>
            </div>
        </div>
    );
};

export default BookCard;
