package com.example.store2.service;

import com.example.store2.dtos.OrderDto;
import com.example.store2.model.Orders;
import com.example.store2.repo.OrdersRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Date;

@Service
public class OrderService {

    private final OrdersRepo orderRepo;

    public OrderService(OrdersRepo orderRepo) {
        this.orderRepo = orderRepo;
    }

//    public void createOrder(OrderDto orderDto) {
//        Orders order = new Orders();
//        order.setOrderDate(new Date());
//        orderRepo.createOrder(o);
//    }

    public void createOrder(OrderDto orderDto) {
        Orders order = new Orders();
        order.setQty(orderDto.getQty());
        order.setOrderDate(orderDto.getOrderDate());
        order.setPrice(orderDto.getPrice());
        order.setUserId(orderDto.getUserId());

        orderRepo.createOrder(order);

        Long orderId = orderRepo.findOrdersByOrderDateAndUserIdAndQty(
                orderDto.getOrderDate(),
                orderDto.getUserId(),
                orderDto.getQty()).getOrderId();
        // Add associated goods to the order
        for (Long goodId : orderDto.getGoodIds()) {
            orderRepo.addGoodsToOrder(orderId, goodId, orderDto.getQty());
        }
    }

    public void deleteOrderById(long id) {
        orderRepo.deleteOrderById(id);
    }

//    public void editOrder()


    public Page<Orders> findAllOrdersByPrice(int price, Pageable pageable) {
        return orderRepo.findAllByPrice(price, pageable);
    }

    public Page<Orders> findOrdersByUserId(long id, Pageable pageable) {
        return orderRepo.findOrdersByUserId(id, pageable);
    }

    public void deleteOrderByUserId(long id) {
        orderRepo.deleteOrdersByUserId(id);
    }


    public Page<Orders> orders(Pageable pageable) {
        return orderRepo.findAll(pageable);
    }
}