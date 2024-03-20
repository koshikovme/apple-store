import React from 'react';
import logo from '../../assets/images/logo.svg';
import classes from '../../assets/css/header.module.scss';
import MyBtn from '../UI/MyBtn';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className={classes.header}>
            <img src={logo} alt="Logo" className={classes.logo} />
            <nav className={classes.nav}>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/store">Store</Link>
                    </li>
                    <li>
                        <Link to="/contacts">Contacts</Link>
                    </li>
                    <li>
                        <Link to="/about-us">About us</Link>
                    </li>
                </ul>
            </nav>
            <div className={classes.btnGroup}>
                <Link to="/signup"><MyBtn>Sign Up</MyBtn></Link>
                <Link to="/signin"><MyBtn>Sign In</MyBtn></Link>
            </div>
        </div>
    );
};

export default Header;

