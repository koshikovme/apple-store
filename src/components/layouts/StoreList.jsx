import React, {useEffect, useState} from 'react';
import CheckList from "../UI/CheckList";
import Good from "./Good";
import {getAuthToken, setAuthHeader} from "../helpers/AxiosHelper";

import classes from "../../assets/css/storelist.module.scss";
import macbookAir from "../../assets/images/macbookair.jpg";
import axios from "axios";
import Pagination from "react-js-pagination";
import MyInput from "../UI/MyInput";
import MyBtn from "../UI/MyBtn";
import MyModal from "./MyModal";
import {Modal} from "react-bootstrap";
import {image} from "../../assets/images/pods";
import {useNavigate} from "react-router-dom";


// import { fetchURL } from '../services/api';

const devices = ["IPhone", "MacBook", "IPad", "Apple Watch", "iMac"];
const prices = ["300$ to 600$", "600$ to 900$", "900$ to 1200$", "1200$ to 1500$", "1500$ to 3999$"];
const StoreList = (props) => {
    const navigate = useNavigate();


    const [isLoading ,setIsLoading] = useState(false);

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
                    const response = await axios.get("/admin/searchGoods", {
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

        // Add selected filters to the params object
        for (const category in selectedFilters) {
            if (selectedFilters[category].length > 0) {
                if (category === 'price') {
                    let minPrice = Infinity;
                    let maxPrice = -Infinity;

                    selectedFilters.price.forEach(priceRange => {
                        const [minStr, maxStr] = priceRange.split(' to ');

                        // Extract numbers by removing dollar sign and whitespace
                        const minNum = parseInt(minStr.replace(/\$/g, '').trim());
                        const maxNum = parseInt(maxStr.replace(/\$/g, '').trim());

                        if (!isNaN(minNum) && !isNaN(maxNum)) {
                            if (minNum < minPrice) {
                                minPrice = minNum;
                            }
                            if (maxNum > maxPrice) {
                                maxPrice = maxNum;
                            }
                        }
                    });

                    console.log("Min Price:", minPrice);
                    console.log("Max Price:", maxPrice);
                    params.minPrice = minPrice;
                    params.maxPrice = maxPrice;
                }

                if (category === "name") {
                    console.log("Params:", params); // Add this line to check the value of params[category]

                    params[category] = selectedFilters[category].join(",");
                    console.log("params[category] k: ", params[category])


                    if (selectedFilters["name"].length > 1) {
                        setIsLoading(true);
                        setTimeout(() => {
                            axios.get("/goodsByNames",  {params})
                                .then((response) => {
                                    console.log('if (selectedFilters["name"].length > 1) {\n: ', response.data.content);
                                    const totalPages = response.data.totalPages;
                                    const itemsCountPerPage = response.data.size;
                                    const totalItemsCount = response.data.totalElements;

                                    setTotalPages(totalPages);
                                    setItemsCountPerPage(itemsCountPerPage);
                                    setTotalItemsCount(totalItemsCount);

                                    setGoods(response.data.content);

                                    setIsLoading(false)

                                    // setGoods(prevState => [...prevState, ...response.data.content]); // Concatenate arrays correctly
                                    console.log('if (selectedFilters["name"].length > 1) {\n: ', goods);

                                })
                                .catch((error) => {
                                    console.error("Error:", error);
                                });
                        },1000)

                    }


                }
            }
        }

        console.log('selectedFilters: ', selectedFilters)
        console.log('params: ', params)


                axios.get("admin/searchGoods", { params })
                    .then((response) => {
                        const totalPages = response.data.totalPages;
                        const itemsCountPerPage = response.data.size;
                        const totalItemsCount = response.data.totalElements;

                        setTotalPages(totalPages);
                        setItemsCountPerPage(itemsCountPerPage);
                        setTotalItemsCount(totalItemsCount);

                        console.log("new_goodS: ", response.data.content);

                        setGoods(response.data.content);

                        // setGoods(prevState => [...prevState, ...response.data.content]); // Concatenate arrays correctly
                        console.log('goods: ', goods);

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
                updatedFilters[category] = prevState[category].filter(item => item !== filter.name);
            }
            return updatedFilters;
        });
        console.log('selectedFilters ', selectedFilters);
    };


    useEffect(() => {
        fetchURL(activePage);
        console.log(selectedFilters, 'in useeffect')

    }, [activePage, selectedFilters]);

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };




    const [goodsInCart, setGoodsInCart] = useState([])
    const [total, setTotal] = useState(0);
    const [qty, setQty] = useState(0);


    const addToCart = (good) => {
        setGoodsInCart(prevState => [...prevState, good]);
        setTotal(prevState => prevState + good.price);
        setQty(prevState => ++prevState)
    };

    const removeGoodFromCart = (goodToRemove) => {
        setTotal(prevState => prevState - goodToRemove.price)
        setGoodsInCart(prevState => prevState.filter(good => good.good_id !== goodToRemove.good_id));
        setQty(prevState => prevState--)
    }


    const clearCart = () => {
        setTotal(0)
        setGoodsInCart([]);
    };

    const handleOrder = () => {
        if (getAuthToken() == null) {
            alert("You must sign in to buy!")
            navigate("/signin")
        }
        // Prepare the order data
        const orderData = {
            orderDate: new Date(),
            qty: qty,
            price: total,
            userId: window.localStorage.getItem("id"),
            goodIds: goodsInCart.map(good => good.good_id) // Extract IDs of goods in the cart
        };

        // Send a POST request to create the order
        axios.post("/createOrder", orderData)
            .then(response => {
                // Handle success, maybe show a success message to the user
                console.log("Order created successfully:", response.data);
                // Clear the cart after successful order creation
                clearCart();
            })
            .catch(error => {
                // Handle error, maybe show an error message to the user
                console.error("Error creating order:", error);
            });
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
                {isLoading
                    ?
                    <h1>Идет загрузка...</h1>
                    :
                    goods.map((good) => (
                        <Good
                            key={good.good_id}
                            img={good.imageBase64 != null ? `data:image/jpg;base64,${good.imageBase64}` : macbookAir}
                            model={good.name}
                            price={good.price}
                            addToCart={() => addToCart(good)}
                        />

                    ))}

            </div>

            <div className={classes.Navigation} style={{position: 'relative', zIndex: 1}}>
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

            <div className={classes.ShoppingCart} style={{position: 'relative', zIndex: 2}}>
                <MyBtn type="button" onClick={handleOpen}>Shopping Cart</MyBtn>
                <MyModal isOpen={open} onClose={handleClose} goods={goodsInCart}>
                    <h1>Good List:</h1>
                    <table className={classes.Table}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        {goodsInCart.map((good) => (
                            <tr key={good.good_id}>
                                <td>{good.good_id}</td>
                                <td>{good.name}</td>
                                <td>
                                    {good.price}
                                </td>
                                <td>
                                    {qty}
                                </td>
                                <td>
                                    <MyBtn onClick={() => {removeGoodFromCart(good)}}>Delete</MyBtn>
                                </td>

                            </tr>
                        ))}
                    </table>
                    <MyBtn onClick={clearCart}>Clear cart</MyBtn>
                    <p>Total: {total}</p>
                    <MyBtn onClick={handleOrder}>Buy</MyBtn>
                </MyModal>
            </div>

        </div>
    );
};


export default StoreList;