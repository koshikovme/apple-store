import React from 'react';
import classes from '../../assets/css/good.module.scss';
import MyBtn from "../UI/MyBtn";

const Good = (props) => {
    const { img, model, price, addToCart } = props;

    return (
        <div className={classes.goodCard}>
            <img src={img} alt="Good" className={classes.Image}/>
            <p className={classes.Text}>{model}</p>
            <h2 className={classes.Text}>{price}</h2>
            <MyBtn onClick={addToCart}>To cart</MyBtn>
        </div>
    );
};


export default Good;
