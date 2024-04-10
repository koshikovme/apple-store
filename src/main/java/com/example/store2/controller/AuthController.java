package com.example.store2.controller;

import com.example.store2.config.UserAuthenticationProvider;
import com.example.store2.dtos.CredentialsDto;
import com.example.store2.dtos.SignUpDto;
import com.example.store2.dtos.UserDto;
import com.example.store2.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private final UserService userService;
    private final UserAuthenticationProvider userAuthenticationProvider;

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody @Valid CredentialsDto credentialsDto) {
        UserDto userDto = userService.login(credentialsDto);
        userDto.setToken(userAuthenticationProvider.createToken(userDto));

        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/register")
    public void register(@RequestBody SignUpDto user) {
        UserDto createdUser = userService.register(user);
        createdUser.setToken(userAuthenticationProvider.createToken(createdUser));
    }

    @PostMapping("/add-session")
    public ResponseEntity<Integer> addSession(@RequestParam int id) {
        userService.createSession(id);
        return ResponseEntity.ok(id);
    }


    @PostMapping("/delete-session")
    public ResponseEntity<Integer> deleteSession(@RequestParam int id) {
        userService.deleteSession(id);
        return ResponseEntity.ok(id);
    }

    @GetMapping("/fetchUserData")
    public ResponseEntity<UserDto> fetchUserDataFromSession(@RequestParam long id) {
        UserDto userDto = userService.findById(id);
        return ResponseEntity.ok(userDto);
    }

}
