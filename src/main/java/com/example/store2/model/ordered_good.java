package com.example.store2.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity // This tells Hibernate to make a table out of this class

public class ordered_good {
    @Id
    private Integer order_id;

    private String good_id;

    private Integer qty;
}
