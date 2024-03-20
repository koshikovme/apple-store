package com.example.store2.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity // This tells Hibernate to make a table out of this class
public class Orders {
    @Id
    private Integer orderId;

    private String orderDate;

    private Integer qty;

    private Integer price;

    private Integer userId;
}