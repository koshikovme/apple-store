package com.example.store2.repo;

import com.example.store2.model.Orders;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface OrdersRepo extends PagingAndSortingRepository<Orders, Integer> {

    Page<Orders> findAllByPrice(int price, Pageable pageable);
}
