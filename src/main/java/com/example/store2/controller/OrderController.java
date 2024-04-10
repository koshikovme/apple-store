package com.example.store2.controller;

import com.example.store2.dtos.OrderDto;
import com.example.store2.model.Orders;
import com.example.store2.repo.OrdersRepo;
import com.example.store2.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;

@Slf4j
@RestController
public class OrderController {

    private final OrderService orderService;

    private final OrdersRepo orderRepo;

    public OrderController(OrderService orderService, OrdersRepo orderRepo) {
        this.orderService = orderService;
        this.orderRepo = orderRepo;
    }

    @PostMapping("/createOrder")
    public void createOrder(
            @RequestBody OrderDto order
    ) {
        orderService.createOrder(order);
    }


    @GetMapping("/ordersByPrice")
    public Page<Orders> getOrdersByPrice(
            @RequestParam(defaultValue = "400000") int price,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        log.info("HELLO");
        Pageable pageable = PageRequest.of(page, size);
        return orderService.findAllOrdersByPrice(price, pageable);
    }

    @GetMapping("/ordersByUserId")
    public Page<Orders> getOrdersByUserId(
            @RequestParam long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        log.info("HELLO");
        Pageable pageable = PageRequest.of(page, size);
        return orderService.findOrdersByUserId(id, pageable);
    }

    @GetMapping("/orderById")
    public Orders getOrdersById(
            @RequestParam long id
    ) {
        log.info("HELLO");
        return orderRepo.findOrdersByOrderId(id);
    }



    @GetMapping("/orders")
    public Page<Orders> getOrdersByUserId(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        log.info("HELLO");
        Pageable pageable = PageRequest.of(page, size);
        return orderService.orders(pageable);
    }




}
