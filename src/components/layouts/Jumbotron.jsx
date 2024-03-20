import React from 'react';
import jumbotron from '../../assets/images/jumbtron.jpg';
import classes from "../../assets/css/jumbotron.module.scss";

const Jumbotron = () => {
    return (
        <div className={classes.container}>
            <img src={jumbotron} className={classes.Image}/>
            <h1 className={classes.Word}>Macbook 16 Pro</h1>
        </div>
    );
};

export default Jumbotron;