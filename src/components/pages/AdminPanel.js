import React, {useEffect, useState} from 'react';
import MyBtn from "../UI/MyBtn";
import classes from "../../assets/css/adminpanel.module.scss";
import axios from "axios";
import {setAuthHeader} from "../helpers/AxiosHelper";
import MyModal from "../layouts/MyModal";
import Pagination from "react-js-pagination";
import Orders from "../websocket/Orders";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {useSubscription} from "react-stomp-hooks";


const AdminPanel = () => {
    const [login, setLogin] = useState('');
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [password, setPassword] = useState('');
    const [id, setId] = useState(null);


    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);


    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [itemsCountPerPage, setItemsCountPerPage] = useState(null);
    const [totalItemsCount, setTotalItemsCount] = useState(null);

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = (id) => {
        setId(id);
        setOpen(true);
    };

    useSubscription('/topic/orders', (message) => {
        console.log("HELLO")
        console.log(message)
        setOrders(message.body)
    });


    useEffect(options => {
        const fetchUsers = async () => {
            try {
                const token = window.localStorage.getItem("auth_token");

                // Include JWT token in request headers
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                // Make request to fetch all users
                const response = await axios.get("/api/admin/users", config);

                const totalPages = response.data.totalPages;
                const itemsCountPerPage = response.data.size;
                const totalItemsCount = response.data.totalElements;

                setTotalPages(totalPages);
                setItemsCountPerPage(itemsCountPerPage);
                setTotalItemsCount(totalItemsCount);

                const users = response.data.content;
                console.log("users: ", users)
                setUsers(users);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        const fetchOrders = async () => {
            try {
                const token = window.localStorage.getItem("auth_token");

                // Include JWT token in request headers
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                // Make request to fetch all users
                const response = await axios.get("/orders", {params: {id : window.localStorage.getItem("id")}});

                const totalPages = response.data.totalPages;
                const itemsCountPerPage = response.data.size;
                const totalItemsCount = response.data.totalElements;

                setTotalPages(totalPages);
                setItemsCountPerPage(itemsCountPerPage);
                setTotalItemsCount(totalItemsCount);

                const orders = response.data.content;
                console.log("orders: ", orders)
                setOrders(orders);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };


        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = Stomp.over(socket);

        stompClient.connect({},
            () => {
                console.log('Connected to WebSocket');
                stompClient.subscribe('/topic/orders', (payload) => {
                    console.log('Successfully handled message :' + payload)
                });
            },
            (error) => {
                console.error('WebSocket error:', error);
            }
        );





        fetchOrders();
        fetchUsers();

        console.log("ord", orders)



        // Cleanup function
        // return () => {
        //     stompClient.disconnect();
        // };

    }, []); // Empty dependency array to ensure this effect runs only once


    const deleteUser = async (userId) => {
        try {
            const token = window.localStorage.getItem("auth_token");

            // Include JWT token in request headers
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            // Make DELETE request to delete the user
            await axios.delete(`/api/admin/deleteByUserId/${userId}`, config);

            // Optionally, fetch updated user data after deletion
            const response = await axios.get("/api/admin/users", config);
            const updatedUsers = response.data.content;
            setUsers(updatedUsers);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const editUser = async (
        firstname,
        lastname,
        phone,
        login,
        password,
        userId
    ) => {
        try {
            const token = window.localStorage.getItem("auth_token");

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            await axios.put(
                `/api/admin/editUser/${userId}`,
                {
                        firstName: firstName,
                        lastName: lastName,
                        phoneNumber: phoneNumber,
                        login: login,
                        password: password,
                        user_id: userId
                    }
            );

            const response = await axios.get("/api/admin/users", config);
            const updatedUsers = response.data.content;
            setUsers(updatedUsers);
        } catch (error) {
            console.error("Error editing user:", error);
        }
    };







    return (
        <div>
            <div className={classes.UserManagement}>
                <table>
                    <thead>
                    <tr>
                        <th>Action</th>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Discount points</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>
                                <div className={classes.BtnGroup} style={{position: 'relative', zIndex: 2}}>
                                    <MyBtn type="button" onClick={() => handleOpen(user.user_id)}>Edit user</MyBtn>
                                    <MyModal isOpen={open} onClose={handleClose}>
                                        <>
                                            <form className={classes.Edit} onSubmit={(e) => {
                                                e.preventDefault(); // Prevent default form submission
                                                editUser(firstName, lastName, phoneNumber, login, password, id); // Call editUser function with input data
                                            }}>
                                                <h1>Edit</h1>
                                                <input className={classes.Input}
                                                       type="text"
                                                       value={login}
                                                       onChange={(e) => setLogin(e.target.value)}
                                                       placeholder="Enter username..."
                                                />
                                                <input className={classes.Input}
                                                       type="text"
                                                       value={firstName}
                                                       onChange={(e) => setFirstname(e.target.value)}
                                                       placeholder="Enter first name..."
                                                />
                                                <input className={classes.Input}
                                                       type="text"
                                                       value={lastName}
                                                       onChange={(e) => setLastname(e.target.value)}
                                                       placeholder="Enter last name..."
                                                />
                                                <input className={classes.Input}
                                                       type="number"
                                                       value={phoneNumber}
                                                       onChange={(e) => setPhoneNumber(e.target.value)}
                                                       placeholder="Enter phone number..."
                                                />
                                                <input className={classes.Input}
                                                       type="password"
                                                       value={password}
                                                       onChange={(e) => setPassword(e.target.value)}
                                                       placeholder="Enter password..."
                                                />
                                                <button
                                                    className={classes.SubmitBtn}
                                                    type="submit"
                                                >Edit</button>
                                            </form>
                                        </>
                                    </MyModal>
                                    <MyBtn type="button" onClick={() => deleteUser(user.user_id)}>Delete</MyBtn>
                                </div>
                            </td>
                            <td>{user.user_id}</td>
                            <td>{user.login}</td>
                            <td>1000p</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
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
            </div>
            {/*<Orders/>*/}
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
                    {orders.map((order) => (
                        <tr key={order.order_id}>
                            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                            <td>{order.qty}</td>
                            <td>{order.price}</td>
                            <td>{order.orderId}</td>
                            <td><MyBtn>Details</MyBtn></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
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
            </div>


        </div>
    );
};

export default AdminPanel;