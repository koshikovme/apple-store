import React, {useEffect, useState} from 'react';
import classes from "../../assets/css/checklist.module.scss";
import storeClasses from "../../assets/css/storelist.module.scss";



const CheckList = ({name, value, onChange}) => {
    function toggle(event) {
        onChange({name: name, checked: event.target.checked});
    }
    return (
        <label className={classes.Label}>
            <input className={classes.CheckBox} type="checkbox" key={name} value={name} onChange={toggle}/>
            {name}
        </label>
    );
};

export default CheckList;