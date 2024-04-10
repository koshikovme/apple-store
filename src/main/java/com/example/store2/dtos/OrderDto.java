package com.example.store2.dtos;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDto {

    @NotEmpty
    private LocalDate orderDate;

    @NotEmpty
    private Long qty;

    @NotEmpty
    private Long price;

    @NotEmpty
    private Long userId;

    private List<Long> goodIds; // List of IDs of goods in the order

}

