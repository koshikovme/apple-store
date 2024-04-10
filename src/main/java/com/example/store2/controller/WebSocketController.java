package com.example.store2.controller;

import com.example.store2.model.Orders;
import com.example.store2.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@Slf4j
@RestController
public class WebSocketController {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    private final OrderService orderService;

    public WebSocketController(OrderService orderService) {
        this.orderService = orderService;
    }

    private final List<String> orders = new ArrayList<>(Arrays.asList("a", "b", "c"));

//    @MessageMapping("/test")
//    @SendTo("/topic/orders")
//    public Page<Orders> getUpdatedOrders() throws Exception {
//
//        log.info("ORDERS");
//        Pageable pageable = PageRequest.of(0, 10);
//        return orderService.orders(pageable);
//    }
    @MessageMapping("/messages") // New mapping for the second method
    @SendTo("/topic/messages")
    public String message() throws Exception {
        return "HELLO FROM WS!";
    }

    @MessageMapping("/orders") // New mapping for the second method
    @SendTo("/topic/orders")
    public List<String> orders() throws Exception {
        return orders;
    }


}
