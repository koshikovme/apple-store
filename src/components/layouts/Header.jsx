import React, {useState, useEffect} from 'react';
import logo from '../../assets/images/logo.svg';
import classes from '../../assets/css/header.module.scss';
import MyBtn from '../UI/MyBtn';
import { Link } from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {isAdmin} from "../helpers/AxiosHelper";

const Header = ({loggedIn, setLoggedIn}) => {
    const navigate = useNavigate();


    function IsLoggedIn() {
        if (isAdmin() === true) return (<div className={classes.btnGroup}>
            <Link to={"/admin-panel"}><MyBtn>Admin Panel</MyBtn></Link>
            <MyBtn onClick={logout}>Logout</MyBtn>
        </div>)

        return (
            loggedIn === true
                ?
                (<div className={classes.btnGroup}>
                    <Link to="/profile"><MyBtn>Profile</MyBtn></Link>
                    <MyBtn onClick={logout}>Logout</MyBtn>
                </div>)

                :
                (<div className={classes.btnGroup}>
                    <Link to="/signup"><MyBtn>Sign Up</MyBtn></Link>
                    <Link to="/signin"><MyBtn>Sign In</MyBtn></Link>
                </div>)
        );
    }

    function logout() {
        axios.post(`/delete-session?id=${window.localStorage.getItem("id")}`);
        localStorage.clear();
        setLoggedIn(false);
        navigate("/signin");
    }


    return (
        <div className={classes.header}>
            <img src={logo} alt="Logo" className={classes.logo}/>
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
            {IsLoggedIn()}
        </div>
    );
};

export default Header;

