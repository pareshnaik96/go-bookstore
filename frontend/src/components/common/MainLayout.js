import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import '../../style/MainLayout.css'

const MainLayout = () => {
    return (
        <div>
            <Header />
            <Navbar />
            <div className="main-content">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
