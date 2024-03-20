package com.example.store2.service;

import com.example.store2.dtos.CredentialsDto;
import com.example.store2.dtos.SignUpDto;
import com.example.store2.dtos.UserDto;
import com.example.store2.exceptions.AppException;
import com.example.store2.mappers.UserMapper;
import com.example.store2.model.User;
import com.example.store2.repo.UserRepo;
import org.hibernate.id.GUIDGenerator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.Iterator;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepo userRepo;

    private final PasswordEncoder passwordEncoder;

    private final UserMapper userMapper;
    public UserService(UserRepo userRepository, PasswordEncoder passwordEncoder, UserMapper userMapper, UserRepo userRepo) {
        this.userRepo = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
    }

    public UserDto login(CredentialsDto credentialsDto) {
        User user = userRepo.findByLogin(credentialsDto.getUsername())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), user.getPassword())) {
            return userMapper.toUserDto(user);
        }
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public UserDto register(SignUpDto userDto) {
        Optional<User> optionalUser = userRepo.findByLogin(userDto.getLogin());

        if (optionalUser.isPresent()) {
            throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
        }

        User user = userMapper.signUpToUser(userDto);
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));
        user.setSecond_name(userDto.getLastName());
        user.setFirst_name(user.getFirst_name());
        user.setLogin(userDto.getLogin());

        User savedUser = userRepo.save(user);

        return userMapper.toUserDto(savedUser);
    }

    public UserDto findByLogin(String login) {
        User user = userRepo.findByLogin(login)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        return userMapper.toUserDto(user);
    }

    public void createUser(User u) {
        userRepo.createUser(u);
    }

    public void editUser(String firstname, String lastname, Integer userId) {
        userRepo.editUser(firstname, lastname, userId);
    }


    public void deleteUserById(Long id) {
        userRepo.deleteUserById(id);
    }

    public Page<User> findUsers(Pageable pageable) {
        return userRepo.findAll(pageable);
    }

    public Page<User> findUsersByLogin(String login, Pageable pageable) {
        return userRepo.findUsersByLogin(login, pageable);
    }

}