import React, { useEffect, useState } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import MyBtn from "../UI/MyBtn";
import Pagination from "react-js-pagination";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [itemsCountPerPage, setItemsCountPerPage] = useState(null);
    const [totalItemsCount, setTotalItemsCount] = useState(null);

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };

    useEffect(() => {
        const token = window.localStorage.getItem("auth_token");
        const socket = new SockJS('http://localhost:8080/websocket'); // Replace with your server URL
        const stompClient = Stomp.over(socket);

        const connectWithRetry = () => {
            console.log('Attempting to connect to WebSocket...');
            stompClient.connect({ Authorization: `Bearer ${token}` }, () => {
                console.log('Connected to WebSocket');
                // Subscribe to WebSocket topic for order updates
                stompClient.subscribe('/topic/orders', (message) => {
                    console.log("message: ", message)
                    const updatedOrderData = JSON.parse(message.body);
                    console.log(updatedOrderData)
                    // Update orders state with the received order update
                    setOrders(updatedOrderData.content);
                    // Update pagination state
                    setTotalPages(updatedOrderData.totalPages);
                    setItemsCountPerPage(updatedOrderData.size);
                    setTotalItemsCount(updatedOrderData.totalElements);
                });
            }, (error) => {
                console.error('Error connecting to WebSocket:', error);
                // Retry connection after a delay (e.g., 5 seconds)
                setTimeout(connectWithRetry, 5000);
            });
        };


        return () => {
            // Disconnect from WebSocket when component unmounts
            stompClient.disconnect();
        };
    }, []);



    return (
        <div>
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
                        {/*<td>{new Date(order.orderDate).toLocaleDateString()}</td>*/}
                        <td>{order.qty}</td>
                        <td>{order.price}</td>
                        <td>{order.orderId}</td>
                        <MyBtn>Details</MyBtn>
                    </tr>
                ))}
                </tbody>
            </table>
            <div style={{position: 'relative', zIndex: 1}}>
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
    );
};

export default Orders;
