import React from 'react';
import classes from '../../assets/css/myinput.module.scss';

const MyInput = React.forwardRef((props, ref) => {
    return (
        <input ref={ref} className={classes.myInput} {...props}/>
    );
});

export default MyInput;