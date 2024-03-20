import React from 'react';
import classes from '../../assets/css/MyBtn.module.scss'

const MyBtn = ({children, ...props}) => {
    return (
        <button {...props} className={classes.MyBtn}>
            {children}
        </button>
    );
};

export default MyBtn;