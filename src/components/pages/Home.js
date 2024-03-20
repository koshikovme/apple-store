import React from 'react';
import Catalog from "../layouts/Catalog";
import Header from "../layouts/Header";
import Jumbotron from "../layouts/Jumbotron";
import Footer from "../layouts/Footer";

const Home = () => {
    return (
        <div>
            <Jumbotron/>
            <Catalog/>
            <Footer/>
        </div>
    );
};

export default Home;