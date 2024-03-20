import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import App from '../App';
import Header from './layouts/Header';
import Store from './pages/Store';
import Contacts from './pages/Contacts';
import About from './pages/About';
import Home from './pages/Home';
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MyBtn from "./UI/MyBtn";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/store" element={<Store />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/about-us" element={<About />} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/signin" element={<Login/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
