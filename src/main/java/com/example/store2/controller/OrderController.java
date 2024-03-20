package com.example.store2.controller;

import com.example.store2.model.Orders;
import com.example.store2.service.GoodService;
import com.example.store2.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;

@Slf4j
@RestController
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/ordersByPrice")
    public Page<Orders> getGoodsByPrice(
            @RequestParam(defaultValue = "400000") int price,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        log.info("HELLO");
        Pageable pageable = PageRequest.of(page, size);
        return orderService.findAllOrdersByPrice(price, pageable);
    }

//    @GetMapping("/")
//    public ResponseEntity<String> getHello () {
//        return ResponseEntity.ok("Hello world");
//    }
}
