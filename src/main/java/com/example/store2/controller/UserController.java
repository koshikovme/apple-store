package com.example.store2.controller;

import com.example.store2.model.User;
import com.example.store2.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api") // Set base URL for all requests in this controller
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public ResponseEntity<String> tester() {
        return new ResponseEntity<>("You're registered successfully: ", HttpStatus.CREATED);
    }


    @PostMapping("/admin/createUser")
    public ResponseEntity<String> createUser(
            @RequestBody User user
    ) {
        userService.createUser(user);
        return new ResponseEntity<>("User created successfully: ", HttpStatus.CREATED);
    }


    @RequestMapping(
            value = "/admin/editUser",
            method = {RequestMethod.PATCH, RequestMethod.PUT})
    public ResponseEntity<String> editUser(
            @RequestParam(defaultValue = "Alexander") String firstname,
            @RequestParam(defaultValue = "0") String lastname,
            @RequestParam(defaultValue = "1") int id
    ) {
        userService.editUser(firstname, lastname, id);
        return new ResponseEntity<>("User edited successfully: ", HttpStatus.ACCEPTED);
    }

    @RequestMapping(
            value = "/admin/deleteByUserId",
            method = {RequestMethod.DELETE, RequestMethod.PUT})
    public ResponseEntity<String> deleteUserById(
            @RequestParam long id
    ) {
        userService.deleteUserById(id);
        return new ResponseEntity<>("User deleted successfully: ", HttpStatus.ACCEPTED);
    }


    @GetMapping("/admin/users")
    public Page<User> getUsers(
            @RequestParam(defaultValue = "1") int user_id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        log.info("HELLO");
        Pageable pageable = PageRequest.of(page, size);
        return userService.findUsers(pageable);
    }

    @GetMapping("/admin/usersByLogin")
    public Page<User> getUsersByLogin(
            @RequestParam(defaultValue = "") String login,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        log.info("HELLO");
        Pageable pageable = PageRequest.of(page, size);
        return userService.findUsersByLogin(login, pageable);
    }


//
//    @GetMapping("/admin/userByLogin")
//    public Optional<User> getUserByLogin(
//            @RequestParam() String login
//    ) {
//        log.info("HELLO FROM userByLogin" );
//        return userService.findUserByLogin(login);
//    }
//




}