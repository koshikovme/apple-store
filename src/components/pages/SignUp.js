import React, { useState } from 'react';
import axios from 'axios';
import classes from "../../assets/css/auth.module.scss";
import { request, setAuthHeader } from '../axios_helper/AxiosHelper';


const SignUp = () => {
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/register', { firstname, lastname, username, password}).then(
                (response) => {
                    setAuthHeader(response.data.token);
                }).catch(
                (error) => {
                    setAuthHeader(null);
                }
            );
            // Optionally, navigate to the login page or show a success message
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <form className={classes.RegisterForm} onSubmit={handleSubmit}>
            <h1>Register</h1>
            <input className={classes.Input}
                   type="text"
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                   placeholder="Enter username..."
            />
            <input className={classes.Input}
                   type="text"
                   value={firstname}
                   onChange={(e) => setFirstname(e.target.value)}
                   placeholder="Enter first name..."
            />
            <input className={classes.Input}
                   type="text"
                   value={lastname}
                   onChange={(e) => setLastname(e.target.value)}
                   placeholder="Enter last name..."
            />
            <input className={classes.Input}
                   type="phone"
                   value={phone}
                   onChange={(e) => setPhone(e.target.value)}
                   placeholder="Enter phone number..."
            />
            <input className={classes.Input}
                   type="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder="Enter password..."
            />
            <button className={classes.SubmitBtn} type="submit">Login</button>
        </form>
    );
};

export default SignUp;
