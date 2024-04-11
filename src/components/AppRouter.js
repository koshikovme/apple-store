import React, {Profiler, useState} from 'react';
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
import AdminPanel from "./pages/AdminPanel";
import ProfilePage from "./pages/ProfilePage";
import {StompSessionProvider} from "react-stomp-hooks";

const AppRouter = () => {
    const [loggedIn, setLoggedIn] = useState(false)

    return (
        <BrowserRouter>
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/store" element={<Store loggedIn={loggedIn}/>} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/about-us" element={<About />} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/signin" element={<Login setLoggedIn={setLoggedIn}/>} />
                <Route path="/admin-panel" element={<StompSessionProvider
                    url={'http://localhost:8080/updated-orders'}>
                    <AdminPanel />
                </StompSessionProvider>} />
                <Route path="/profile" element={<ProfilePage/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
