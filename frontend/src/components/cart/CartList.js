import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, removeItemFromCart } from '../../features/cart/cartSlice';
import { createOrder } from '../../features/order/orderSlice';
import { useNavigate } from 'react-router-dom';
import '../../style/CartList.css';

const CartList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items = useSelector(state => state.cart.items);
    const userId = useSelector(state => state.auth.user?.ID);
   
    useEffect(() => {
        dispatch(fetchCartItems());
    }, [dispatch]);

    const handleRemove = (event, bookId) => {
        event.preventDefault();
        dispatch(removeItemFromCart(bookId))
            .then(() => dispatch(fetchCartItems()));
    };
    
    const handleBuy = async () => {
        const bookIds = items.map(item => item.book_id);
        const orderData = { user_id: userId, book_id: bookIds };
        if (bookIds.length) {
            await dispatch(createOrder(orderData));
        }
        await Promise.all(items.map(item => dispatch(removeItemFromCart(item.book_id))));
        navigate('/buy-successful');
    };

    return (
        <div className="cart-list">
            <h2 className='cart-header'>Your Cart Details</h2>
            {items.map(item => (
                <ul className='cart-items' key={item.ID}>
                    <li className='cart-item'>
                        <span className='item-name'>{item.name}</span>
                        <span className='item-author'>{item.author}</span>
                        <span className='item-publication'>{item.publication}</span>
                        <span className='item-price'>₹{item.price}</span>
                        <button className='remove-button' onClick={(event) => handleRemove(event, item.book_id)}>Remove</button>
                    </li>
                </ul>
            ))}
             {items.length > 0 && (
                <div className="buy-button-container">
                    <button className='buy-button' onClick={handleBuy}>Buy</button>
                </div>
            )}
        </div>
    );
};

export default CartList;
