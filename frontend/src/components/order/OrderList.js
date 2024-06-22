import React, { useState, useEffect } from 'react';
import  OrderBookCard  from '../books/OrderBookCard.js'
import { getOrders } from '../../services/api';
import { useSelector } from 'react-redux';
import '../../style/OrderList.css';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = useSelector(state => state.auth.user?.ID);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            setLoading(true);
            try {
                const response = await getOrders(userId);
                setOrders(response.data);
            } catch (error) {
                setError('Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchOrderDetails();
        }
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="order-list-container">
            <h2 className="order-list-header">Your Orders</h2>
            <div className="order-list">
                {orders.length > 0 ? (
                    orders.map(order => (
                        <div className="order-item" key={order.ID}>
                            <div className="order-info">
                                <div className="order-id">Order ID: {order.ID}</div>
                                <div className="order-date">Date: {new Date(order.CreatedAt).toLocaleString()}</div>
                                <div className="order-books">
                                    <h3>Books:</h3>
                                    {order.books && order.books.length > 0 ? (
                                        order.books.map(book => (
                                            <OrderBookCard  key={book.ID} book={book} />
                                        ))
                                    ) : (
                                        <p>No books found.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default OrderList;
