package com.example.store2.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
@Entity
public class Images {
    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String imageName;

    private String imageData;

    private String url;

    private Long good_id;
}
