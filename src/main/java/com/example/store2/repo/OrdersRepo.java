package com.example.store2.repo;

import com.example.store2.model.Good;
import com.example.store2.model.Orders;
import com.example.store2.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface OrdersRepo extends PagingAndSortingRepository<Orders, Integer> {

//    order_id int PK
//    order_date varchar(255)
//    qty int
//    price int
//            user_id
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO orders (order_date, qty, price, user_id) " +
            "VALUES (:#{#o.orderDate}, :#{#o.qty}, :#{#o.price}, :#{#o.userId})", nativeQuery = true)
    public abstract void createOrder(@Param("o") Orders o);

//    @Modifying
//    @Transactional
//    @Query(value = "INSERT INTO orders (order_date, qty, price, user_id) " +
//            "VALUES (:#{#o.orderDate}, :#{#o.qty}, :#{#o.price}, :#{#o.userId})", nativeQuery = true)
//    public abstract Integer createOrder(@Param("o") Orders o); // Return the generated order ID
//
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO ordered_good (order_id, good_id, qty) VALUES (:orderId, :goodId, :qty)", nativeQuery = true)
    public abstract void addGoodsToOrder(@Param("orderId") Long orderId, @Param("goodId") Long goodId, @Param("qty") Long qty);

//    @Query("SELECT good_id FROM ordered_good WHERE order_id = ")
//    List<Long> goodIds(Long orderId, Pageable pageable);

    @Modifying
    @Transactional
    @Query("DELETE FROM Orders o WHERE o.orderId = ?1")
    void deleteOrderById(Long id);

    @Modifying
    @Transactional
    @Query("update Orders o set o.qty = ?1, o.userId = ?2 where o.orderDate = ?3")
    void editOrder(int qty, long id, Date date);

    @Modifying
    @Transactional
    @Query("DELETE FROM Orders o WHERE o.userId = ?1")
    void deleteOrdersByUserId(Long userId);

    Page<Orders> findAllByPrice(int price, Pageable pageable);

    Page<Orders> findOrdersByUserId(long id, Pageable pageable);

    Orders findOrdersByOrderId(long id);

    Orders findOrdersByOrderDateAndUserIdAndQty(LocalDate date, Long userId, Long qty);
}
