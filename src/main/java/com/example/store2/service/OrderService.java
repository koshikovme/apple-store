package com.example.store2.service;

import com.example.store2.model.Good;
import com.example.store2.model.Orders;
import com.example.store2.repo.GoodRepo;
import com.example.store2.repo.OrdersRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    private final OrdersRepo orderRepo;

    public OrderService(OrdersRepo orderRepo) {
        this.orderRepo = orderRepo;
    }

    public Page<Orders> findAllOrdersByPrice(int price, Pageable pageable) {
        return orderRepo.findAllByPrice(price, pageable);
    }
}