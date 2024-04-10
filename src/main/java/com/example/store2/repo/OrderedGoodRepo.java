package com.example.store2.repo;

import com.example.store2.model.ordered_good;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderedGoodRepo extends JpaRepository<ordered_good, Long> {
    @Query("SELECT og.good_id FROM ordered_good og WHERE og.order_id = :orderId")
    List<Long> findGoodIdsByOrderId(@Param("orderId") Long orderId);

}

