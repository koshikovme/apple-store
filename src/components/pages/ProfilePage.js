import React, { useEffect, useState } from 'react';
import userIcon from '../../assets/images/avatar.png';
import wallpaper from '../../assets/images/wallpaper.jpg';

import axios from "axios";
import classes from "../../assets/css/profile.module.scss";
import MyBtn from "../UI/MyBtn";
import MyModal from "../layouts/MyModal";
import Good from "../layouts/Good";
import macbookAir from "../../assets/images/macbookair.jpg";

const ProfilePage = () => {
    const [username, setUsername] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [password, setPassword] = useState('');
    const [id, setId] = useState(null);
    const [orderId, setOrderId] = useState(null);

    const [open, setOpen] = useState(false);
    const [orderHistory, setOrderHistory] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [itemsCountPerPage, setItemsCountPerPage] = useState(null);
    const [totalItemsCount, setTotalItemsCount] = useState(null);

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };


    const [editModalOpen, setEditModalOpen] = useState(false);
    const [orderDetailsModalOpen, setOrderDetailsModalOpen] = useState(false);

    const handleEditModalOpen = async (id) => {
        setId(id);
        setEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setEditModalOpen(false);
    };

    const handleOrderDetailsModalOpen = async (id) => {
        try {
            setOrderId(id);
            await fetchOrderDetails(id);
            setOrderDetailsModalOpen(true);
        } catch (error) {
            console.error("Error handling order details modal open:", error);
        }
    };

    const handleOrderDetailsModalClose = () => {
        setOrderDetailsModalOpen(false);
    };



    // const handleClose = () => {
    //     setOpen(false);
    // };
    //
    // const handleOpenOrderDetails = async (id) => {
    //     setId(id);
    //     setOpen(true);
    // };
    //
    // const handleOrderDetails = async (id) => {
    //     setId(id);
    //     setOpen(true);
    //     await fetchOrderDetails(id);
    // };

    const editUser = async (firstname, lastname, phone, login, password, userId) => {
        try {
            const token = window.localStorage.getItem("auth_token");
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.put(`/api/admin/editUser/${userId}`, { firstName: fname, lastName: lname, phoneNumber: phoneNumber, login: login, password: password, user_id: userId });
        } catch (error) {
            console.error("Error editing user:", error);
        }
    };

    const fetchOrderDetails = async (id) => {
        alert(id);
        try {
            const response = await axios.get(`/searchByOrderId/${id}`);
            console.log(response)
            setOrderDetails(response.data.content);
        } catch (error) {
            console.error("Error fetching order details:", error);
        }
    };

    const fetchData = () => {
        axios.get(`/fetchUserData?id=${window.localStorage.getItem("id")}`)
            .then((response) => {
                const { login, firstName, lastName, phoneNumber } = response.data;
                setUsername(login);
                setFname(firstName);
                setLname(lastName);
                setPhoneNumber(phoneNumber);
            })
            .catch(error => console.error("Error fetching user data:", error));
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = window.localStorage.getItem("auth_token");
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const response = await axios.get("/ordersByUserId", { params: { id: window.localStorage.getItem("id") } });
                const { totalPages, size, totalElements, content } = response.data;
                setTotalPages(totalPages);
                setItemsCountPerPage(size);
                setTotalItemsCount(totalElements);
                setOrderHistory(content);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
        fetchData();
    }, []);

    return (
        <div>
            <div className={classes.Container}>
                <div className={classes.test}>
                    <img src={wallpaper} className={classes.MainImage} alt="Wallpaper" />
                    <img src={userIcon} className={classes.Avatar} alt="User Avatar" />
                    <h3>Welcome, {fname} {lname}</h3>
                </div>
                <div className={classes.ProfileInfo}>
                    <p>Username: {username}</p>
                    <p>Full name: {fname} {lname}</p>
                    <p>Phone Number: {phoneNumber}</p>
                    <MyBtn type="button" onClick={() => handleEditModalOpen(window.localStorage.getItem("id"))}>Edit user</MyBtn>
                    <MyModal isOpen={editModalOpen} onClose={handleEditModalClose}>
                        <>
                            <form className={classes.Edit} onSubmit={(e) => {
                                e.preventDefault();
                                editUser(fname, lname, phoneNumber, username, password, id);
                            }}>
                                <h1>Edit</h1>
                                <input className={classes.Input} type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username..." />
                                <input className={classes.Input} type="text" value={fname} onChange={(e) => setFname(e.target.value)} placeholder="Enter first name..." />
                                <input className={classes.Input} type="text" value={lname} onChange={(e) => setLname(e.target.value)} placeholder="Enter last name..." />
                                <input className={classes.Input} type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Enter phone number..." />
                                <input className={classes.Input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password..." />
                                <button className={classes.SubmitBtn} type="submit">Edit</button>
                            </form>
                        </>
                    </MyModal>
                </div>

                <div className={classes.OrderHistory}>
                    <h1>Order History</h1>
                    <table>
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>ID</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orderHistory.map((order) => (
                            <tr key={order.order_id}>
                                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                <td>{order.qty}</td>
                                <td>{order.price}</td>
                                <td>{order.orderId}</td>
                                <td>
                                    <MyBtn type="button" onClick={() => handleOrderDetailsModalOpen(order.orderId)}>Details</MyBtn>
                                    {/*<MyBtn type="button" onClick={handleOrderDetailsModalOpen}>Details</MyBtn>*/}
                                    <MyModal isOpen={orderDetailsModalOpen} onClose={handleOrderDetailsModalClose}>
                                        <>
                                            <h2>Order Details</h2>
                                            <table>
                                                <thead>
                                                <tr>
                                                    <th>Order ID</th>
                                                    <th>Product ID</th>
                                                    <th>Quantity</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {orderDetails && orderDetails.map((good) => (
                                                    <tr key={good.good_id}>
                                                        <td>{good.good_id}</td>
                                                        <td>{good.name}</td>
                                                        <td>
                                                            {good.price}
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>

                                            </table>
                                        </>
                                    </MyModal>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    );
};

export default ProfilePage;
