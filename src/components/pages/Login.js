import React, { useState } from 'react';
import axios from 'axios';
import classes from "../../assets/css/auth.module.scss";
import {setAuthHeader} from "../axios_helper/AxiosHelper";


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', { username, password });
            console.log("response is ", response);
            const token = response.data.token;
            console.log("Token:", token);
            // Save token to local storage or state
        } catch (error) {
            console.error('Login failed:', error);
            // Handle error, e.g., show error message to user
        }
    };


    return (
        <form className={classes.RegisterForm} onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input className={classes.Input} type="text" value={username}
                   onChange={(e) => setUsername(e.target.value)}
                   placeholder="Enter username..."/>
            <input className={classes.Input} type="password" value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder="Enter password..."/>
            <button className={classes.SubmitBtn} type="submit">Sign Up</button>
        </form>
    );
};

export default Login;
