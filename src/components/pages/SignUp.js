import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom'; // Import useHistory hook
import axios from 'axios';
import classes from "../../assets/css/auth.module.scss";
import { request, setAuthHeader } from '../helpers/AxiosHelper';


const SignUp = () => {
    const navigate = useNavigate(); // Initialize useHistory hook

    const [login, setLogin] = useState('');
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const id = 50;
            // await axios.post('/login', { username, password });
            await axios.post('/register', { login, firstName , lastName,phoneNumber, password}).then(
                (response) => {
                    console.log("IM HERE")
                    navigate("/signin");
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
                   value={login}
                   onChange={(e) => setLogin(e.target.value)}
                   placeholder="Enter username..."
            />
            <input className={classes.Input}
                   type="text"
                   value={firstName}
                   onChange={(e) => setFirstname(e.target.value)}
                   placeholder="Enter first name..."
            />
            <input className={classes.Input}
                   type="text"
                   value={lastName}
                   onChange={(e) => setLastname(e.target.value)}
                   placeholder="Enter last name..."
            />
            <input className={classes.Input}
                   type="phone"
                   value={phoneNumber}
                   onChange={(e) => setPhoneNumber(e.target.value)}
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
