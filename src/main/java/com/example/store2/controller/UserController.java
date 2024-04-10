package com.example.store2.controller;

import com.example.store2.dtos.UserDto;
import com.example.store2.model.User;
import com.example.store2.repo.UserRepo;
import com.example.store2.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.nio.CharBuffer;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api") // Set base URL for all requests in this controller
public class UserController {

    private final PasswordEncoder passwordEncoder;

    private final UserService userService;
    private final UserRepo userRepo;

    public UserController(PasswordEncoder passwordEncoder, UserService userService, UserRepo userRepo) {
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.userRepo = userRepo;
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

//    @PutMapping("/admin/editUser")
//    public ResponseEntity<String> editUser(
//            @RequestParam(defaultValue = "Bill") String firstName,
//            @RequestParam(defaultValue = "Murray") String lastName,
//            @RequestParam(defaultValue = "7777") int phoneNumber,
//            @RequestParam(defaultValue = "bill_murray") String login,
//            @RequestParam(defaultValue = "bill") String password,
//            @RequestParam(defaultValue = "24") long userId
//    ) {
//        log.info("HELLO FROM EDIT");
//        log.info(firstName);
//        userService.editUser(firstName, lastName, phoneNumber, login, password, userId);
//        return new ResponseEntity<>("User edited successfully: ", HttpStatus.ACCEPTED);
//    }

    @PutMapping("/admin/editUser/{id}")
    public ResponseEntity editUser(@PathVariable Long id, @RequestBody UserDto userDto) {
        User currentUser = userRepo.findUserById(id);
        currentUser.setLogin(userDto.getLogin());
        currentUser.setFirstName(userDto.getFirstName());
        currentUser.setLastName(userDto.getLastName());
        currentUser.setPhoneNumber(userDto.getPhoneNumber());
        currentUser.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));


        currentUser = userRepo.save(currentUser);

        return ResponseEntity.ok(currentUser);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @RequestMapping(
            value = "/admin/deleteByUserId/{userId}",
            method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteUserById(
            @PathVariable long userId
    ) {
        log.info("HELLO");
        userService.deleteUserById(userId);
        return new ResponseEntity<>("User deleted successfully: ", HttpStatus.ACCEPTED);
    }


    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin/users")
    public Page<User> getUsers(
            @RequestParam(defaultValue = "1") int user_id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        log.info("HELLO");
        log.info("HELLO");
        Pageable pageable = PageRequest.of(page, size);
        return userService.findUsers(pageable);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
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



    @GetMapping("/admin/userById")
    public UserDto getUserById(
            @RequestParam() long id
    ) {
        log.info("HELLO FROM userByLogin" );
        return userService.findById(id);
    }





}