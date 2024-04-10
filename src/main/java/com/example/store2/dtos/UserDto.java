package com.example.store2.dtos;

import com.example.store2.model.Role;
import com.example.store2.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {

    private Long id;
    private String firstName;
    private String lastName;
    private Integer phoneNumber;
    private String login;
    private String password;
    private Role role;
    private String token;
    private Long user_id;

    public UserDto(String firstName, String lastName, Integer phoneNumber, String login, String password, Role role, String token, long user_id) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.login = login;
        this.password = password;
        this.role = role;
        this.token = token;
        this.user_id = user_id;
    }

}
