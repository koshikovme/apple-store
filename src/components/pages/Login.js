import React, { useState } from 'react';
import axios from 'axios';
import classes from "../../assets/css/auth.module.scss";
import {setAuthHeader} from "../helpers/AxiosHelper";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
// import { CustomJwtPayload } from "./CustomJwtPayload";




const Login = ({setLoggedIn}) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isAdmin, setIsAdmin] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', { username, password });
            if (response.data.role === "ADMIN") {
                const token = response.data.token;
                setAuthHeader(token);
                window.localStorage.setItem("login", response.data.login);
                window.localStorage.setItem("role", response.data.role);
                navigate("/profile")
            }
            const token = response.data.token;
            setAuthHeader(token);
            window.localStorage.setItem("login", response.data.login);
            console.log("Login installed")

            window.localStorage.setItem("id", response.data.user_id);
            console.log("ID installed")


            const id = response.data.id;
            const newSession = await axios.post(`/add-session?id=${id}`);
            console.log('Session added successfully');
            console.log('Response:', newSession.data);


            setLoggedIn(true);

            navigate("/profile")
        } catch (error) {
            console.error('Login failed:', error);
        }
    };


    return (
        <>
            <form className={classes.RegisterForm} onSubmit={handleSubmit}>
                <h1>Login</h1>
                <input className={classes.Input} type="text" value={username}
                       onChange={(e) => setUsername(e.target.value)}
                       placeholder="Enter username..."/>
                <input className={classes.Input} type="password" value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder="Enter password..."/>
                <button className={classes.SubmitBtn} type="submit">Sign in</button>
            </form>
        </>
    );


};

export default Login;
