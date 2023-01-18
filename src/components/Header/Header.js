import React from 'react';
import { Link } from 'react-router-dom';


import './Header.css';
// import logo from '../../images/logo.png'
const Header = ({ user, cart }) => {





    return (
        <nav className='header'>
            <h1>hello world</h1>
            {/* <img src={logo} alt="" className='logo' /> */}
            <div>
                <Link to="/">Home</Link>

                {
                    user.email === "thenaim33@gmail.com" &&

                    <Link to="/create-product">Create Product</Link>

                }
                {
                    user.email === "thenaim33@gmail.com" &&

                    <Link to="/products">Products</Link>

                }

                <Link to="/cart">cart

                    <span className='cart-item-length'>
                        {cart.length}
                    </span>
                </Link>



                <Link to="/orders">Orders</Link>
                {/* <Link to="/cart">cart

                    <span className='cart-item-length'>
                        {cart.length}
                    </span>
                </Link> */}
                {
                    user.displayName ? <Link to="/profile" >{user.displayName}</Link> :

                        <Link to="/login" className='login-btn'>Login</Link>
                }

            </div>
        </nav>
    );
};

export default Header;