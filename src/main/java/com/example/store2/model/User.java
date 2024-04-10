package com.example.store2.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Setter
@Getter
@Data
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long user_id;

    private String firstName;

    private String lastName;

    private Integer phoneNumber;

    private String login;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;
}
