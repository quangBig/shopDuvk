import React from 'react'
import Header from './Header/Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom';

const Navbar = () => {
    return (

        <div>
            <Header />
            <main>
                <Outlet /> {/* Chỗ render trang con */}
            </main>
            <Footer />
        </div>
    );

}

export default Navbar
