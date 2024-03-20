package com.example.store2.repo;

import com.example.store2.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface UserRepo extends PagingAndSortingRepository<User, Integer>, JpaRepository<User, Integer> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO User (user_id, gender, first_name, last_name, phone_number, login, email, password) " +
            "VALUES (:#{#u.user_id}, :#{#u.gender}, :#{#u.first_name}, :#{#u.second_name}, :#{#u.phone_number}, :#{#u.login}, :#{#u.email}, :#{#u.password})", nativeQuery = true)
    public abstract void createUser(@Param("u") User u);


    @Modifying
    @Transactional
    @Query("DELETE FROM User u WHERE u.user_id = ?1")
    void deleteUserById(Long id);

    @Modifying
    @Transactional
    @Query("update User u set u.first_name = ?1, u.second_name = ?2 where u.user_id = ?3")
    void editUser(String firstname, String lastname, Integer userId);

    Page<User> findUsersByLogin(String login, Pageable pageable);

    Optional<User> findByLogin(String login);



}
