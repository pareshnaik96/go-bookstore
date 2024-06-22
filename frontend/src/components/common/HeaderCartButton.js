import { React } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import '../../style/HeaderCartButton.css'
import { useNavigate } from 'react-router-dom';


const HeaderCartButton = () => {
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const navigate = useNavigate();

    const handleViewCartClick = () => {
        navigate(`/cart`);
      };

    return (
         <>
            <button className='button' onClick={handleViewCartClick}>
                <span className='icon'>
                    <FaShoppingCart />
                </span>
                <span>Your Cart</span>
                <span className='badge'>{totalQuantity}</span>
            </button>
        </>
    )
}

export default HeaderCartButton;
