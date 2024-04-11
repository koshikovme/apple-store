import React from 'react';
import StoreList from "../layouts/StoreList";

const Store = ({loggedIn}) => {
    return (
        <div>
            <StoreList loggedIn={loggedIn}/>
        </div>
    );
};

export default Store;