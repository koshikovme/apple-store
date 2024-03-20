import React from 'react';
import Good from "./Good";

import classes from "../../assets/css/catalog.module.scss";
import macbook14pro from "../../assets/images/macbook14pro.jpg";
import ipadpro from "../../assets/images/ipadpro.png";
import ipadmini from "../../assets/images/ipadmini.png";
import iphone15 from "../../assets/images/iphone15.jpg";
import iphone15pro from "../../assets/images/iphone15pro.png";

import macbookAir from "../../assets/images/macbookair.jpg";



const Catalog = () => {
    return (
        <div className={classes.Catalog}>
            <Good img={macbook14pro} model={"Macbook 14 Pro M2"} price={1200000}/>
            <Good img={ipadmini} model={"IPad Mini 2021 256GB"} price={500000}/>
            <Good img={iphone15pro} model={"IPhone 15 Pro 256GB"} price={650000}/>


            <Good img={ipadpro} model={"IPad Pro 12.9 2021"} price={700000}/>
            <Good img={macbookAir} model={"Macbook Air 2020"} price={1000000}/>
            <Good img={iphone15} model={"IPhone 15 64GB"} price={400000}/>
        </div>
    );
};

export default Catalog;