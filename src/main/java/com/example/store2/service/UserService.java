package com.example.store2.service;

import com.example.store2.dtos.CredentialsDto;
import com.example.store2.dtos.SignUpDto;
import com.example.store2.dtos.UserDto;
import com.example.store2.exceptions.AppException;
import com.example.store2.mappers.UserMapper;
import com.example.store2.model.Role;
import com.example.store2.model.User;
import com.example.store2.repo.OrdersRepo;
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

    private final OrdersRepo orderRepo;

    public UserService(UserRepo userRepository, PasswordEncoder passwordEncoder, UserMapper userMapper, UserRepo userRepo, OrdersRepo orderRepo) {
        this.userRepo = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
        this.orderRepo = orderRepo;
    }

    public UserDto login(CredentialsDto credentialsDto) {
        User user = userRepo.findByLogin(credentialsDto.getUsername())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), user.getPassword())) {
            return new UserDto(
                    user.getId(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getPhoneNumber(),
                    user.getLogin(),
                    user.getPassword(),
                    user.getRole(),
                    "",
                    user.getUser_id()
                    );
        }
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public UserDto register(SignUpDto userDto) {
        Optional<User> optionalUser = userRepo.findByLogin(userDto.getLogin());

        if (optionalUser.isPresent()) {
            throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
        }

        User user = new User();
        user.setLogin(userDto.getLogin());
        user.setLastName(userDto.getLastName());
        user.setFirstName(userDto.getFirstName());
        user.setPhoneNumber(Integer.valueOf(userDto.getPhoneNumber()));
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));
        user.setRole(Role.USER);

        User savedUser = userRepo.save(user);

        return new UserDto(
                savedUser.getFirstName(),
                savedUser.getLastName(),
                savedUser.getPhoneNumber(),
                savedUser.getLogin(),
                savedUser.getPassword(),
                savedUser.getRole(),
                "",
                1L);
    }

    public UserDto findByLogin(String login) {
        User user = userRepo.findByLogin(login)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        return userMapper.toUserDto(user);
    }

    public UserDto findById(long id) {
        User user = userRepo.findUserById(id);
        return new UserDto(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getPhoneNumber(),
                user.getLogin(),
                user.getPassword(),
                user.getRole(),
                "",
                1L);
    }


    public void createUser(User u) {
        userRepo.createUser(u);
    }

    public void editUser(String firstname,
                         String lastname,
                         Integer phone,
                         String login,
                         String password,
                         Long userId) {
        userRepo.editUser(firstname, lastname, phone, login, password, userId);
    }


    public void deleteUserById(Long id) {
        orderRepo.deleteOrdersByUserId(id);
        userRepo.deleteUserById(id);
    }

    public Page<User> findUsers(Pageable pageable) {
        return userRepo.findAll(pageable);
    }

    public Page<User> findUsersByLogin(String login, Pageable pageable) {
        return userRepo.findUsersByLogin(login, pageable);
    }

    public void createSession(long id) {
        userRepo.createSession(id);
    }

    public void deleteSession(int id) {
        userRepo.deleteSession(id);
    }

}