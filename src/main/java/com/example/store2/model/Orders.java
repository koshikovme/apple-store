package com.example.store2.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@Entity
public class Orders {
    @Id
    private Long orderId;

    private LocalDate orderDate;

    private Long qty;

    private Long price;

    private Long userId;
}