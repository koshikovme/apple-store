import React, {useEffect, useState} from 'react';
import CheckList from "../UI/CheckList";
import Good from "./Good";

import classes from "../../assets/css/storelist.module.scss";
import macbookAir from "../../assets/images/macbookair.jpg";
import axios from "axios";
import Pagination from "react-js-pagination";
import MyInput from "../UI/MyInput";
import ShoppingArtModal from "./ShoppingСartModal";
import MyBtn from "../UI/MyBtn";
import ShoppingСartModal from "./ShoppingСartModal";
import {Modal} from "react-bootstrap";


// import { fetchURL } from '../services/api';

const devices = ["IPhone", "MacBook", "IPad"];
const prices = ["300 to 600", "600 to 900", "900 to 1200", "1200 to 1500"];
const StoreList = (props) => {
    const [goods, setGoods] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({name: [], price: []});
    const [searchQuery, setSearchQuery] = useState('');

    // Pagination
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [itemsCountPerPage, setItemsCountPerPage] = useState(null);
    const [totalItemsCount, setTotalItemsCount] = useState(null);


    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const [goodsInCart, setGoodsInCart] = useState([])


    // Searching
    const handleInputChange = async (e) => {
        const searchTerm = e.target.value;
        setSearchQuery(searchTerm);

        if (searchTerm.trim() === "") {
            fetchURL(activePage);
        } else {
            if (selectedFilters.name.length !== 0 || selectedFilters.price.length !== 0) {
                const filteredItems = goods.filter((good) =>
                    good.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setGoods(filteredItems);
            } else {
                try {
                    const response = await axios.get("/searchGoods", {
                        params: { name: searchTerm }
                    });
                    const totalPages = response.data.totalPages;
                    const itemsCountPerPage = response.data.size;
                    const totalItemsCount = response.data.totalElements;

                    setTotalPages(totalPages);
                    setItemsCountPerPage(itemsCountPerPage);
                    setTotalItemsCount(totalItemsCount);

                    const goodsData = response.data.content;
                    setGoods(goodsData);
                } catch (error) {
                    console.error("Error:", error);
                }
            }
        }
    };



    const fetchURL = (page) => {
        const params = { page: page - 1, size: 8 };
        console.log(selectedFilters, 'in fetch')

        // Add selected filters to the params object
        for (const category in selectedFilters) {
            if (selectedFilters[category].length > 0) {
                if (category === 'price') {
                    const [minPrice, maxPrice] = selectedFilters[category][0].split(' to ');
                    params.minPrice = minPrice;
                    params.maxPrice = maxPrice;
                } else {
                    params[category] = selectedFilters[category].join(',');
                }
            }
        }

        console.log(selectedFilters, ' after')

        console.log('params: ', params)


        axios.get("/searchGoods", { params })
            .then((response) => {
                const totalPages = response.data.totalPages;
                const itemsCountPerPage = response.data.size;
                const totalItemsCount = response.data.totalElements;

                setTotalPages(totalPages);
                setItemsCountPerPage(itemsCountPerPage);
                setTotalItemsCount(totalItemsCount);

                setGoods(response.data.content);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };


    const sortGoods = (filter, category) => {
        setSelectedFilters(prevState => {
            const updatedFilters = { ...prevState };
            if (filter.checked) {
                updatedFilters[category] = [...prevState[category], filter.name];
            } else {
                updatedFilters[category] = prevState[category].filter(item => item !== filter.name); // Remove filter
            }
            return updatedFilters;
        });
    };


    useEffect(() => {
        fetchURL(activePage);
        console.log(selectedFilters, 'in useeffect')

    }, [activePage, selectedFilters]);

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };

    const addToCart = (good) => {
        setGoodsInCart(prevState => [...prevState, good]);
    };



    return (
        <div className={classes.Container}>'
            <div className={classes.Input}>
                <MyInput
                    value={searchQuery}
                    onChange={handleInputChange}
                    placeholder="Поиск..."
                />
            </div>

            <div className={classes.CheckList}>
                <h1>Devices</h1>
                {devices.map(value => {
                    return (
                        <CheckList
                            className={classes.CheckList}
                            name={value}
                            value={selectedFilters}
                            onChange={(filter) => sortGoods(filter, 'name')}
                        />
                    );
                })}
                <h1>Prices</h1>
                {prices.map(value => {
                    return (
                        <CheckList
                            className={classes.CheckList}
                            name={value}
                            value={selectedFilters}
                            onChange={(filter) => sortGoods(filter, 'price')}
                        />
                    );
                })}

            </div>

            <div className={classes.Goods}>
                {goods.map((good) => (
                    <Good key={good.good_id} img={macbookAir} model={good.name} price={good.price} addToCart={() => addToCart(good)} />
                ))}
            </div>

            <div className={classes.Navigation} style={{ position: 'relative', zIndex: 1 }}>
                <Pagination
                    hideNavigation
                    activePage={activePage}
                    itemsCountPerPage={itemsCountPerPage}
                    totalItemsCount={totalItemsCount}
                    pageRangeDisplayed={10}
                    onChange={handlePageChange}

                    itemClass="page-item"
                    linkClass="page-link"
                />
            </div>

            <div className={classes.ShoppingCart} style={{ position: 'relative', zIndex: 2 }}>
                <MyBtn type="button" onClick={handleOpen}>Shopping Cart</MyBtn>
                <ShoppingСartModal isOpen={open} onClose={handleClose} goods={goodsInCart}>
                    <>
                        <h1>Good List:</h1>
                        {goods.map((good) => (
                            <p>ID: {good.good_id}, Name: {good.name}, Price: {good.price}</p>

                            // <Good key={good.good_id} img={macbookAir} model={good.name} price={good.price} addToCart={() => addToCart(good)}/>
                        ))}
                    </>
                </ShoppingСartModal>
            </div>

        </div>
    );
};

export default StoreList;