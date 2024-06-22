import React from 'react';
import HeaderCartButton from './HeaderCartButton';
import '../../style/Header.css'; 

const Header = () => {
    return (
        <header className="header"> 
            <div className="header-content"> 
                <div className="header-title">
                    <h2>My Bookstore</h2> 
                </div>
                <div className="header-cart"> 
                 <HeaderCartButton /> 
                </div>
            </div>
        </header>
    );
};

export default Header;
