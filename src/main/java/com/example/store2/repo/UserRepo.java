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
    @Query(value = "INSERT INTO users (user_id, first_name, last_name, phone_number, login, password, role) " +
            "VALUES (:#{#u.id}, :#{#u.firstName}, :#{#u.lastName}, :#{#u.phoneNumber}, :#{#u.login}, :#{#u.password}, :#{#u.role})", nativeQuery = true)
    public abstract void createUser(@Param("u") User u);


    @Modifying
    @Transactional
    @Query("DELETE FROM User u WHERE u.user_id = ?1")
    void deleteUserById(Long id);

    @Modifying
    @Transactional
    @Query("update User u set u.firstName = ?1, u.lastName = ?2, u.phoneNumber = ?3, u.login = ?4, u.password = ?5 where u.user_id = ?6")
    void editUser(
            String firstname,
            String lastname,
            Integer phone,
            String login,
            String password,
            Long userId);
    Page<User> findUsersByLogin(String login, Pageable pageable);

    Page<User> findUsersById(long id, Pageable pageable);

    Optional<User> findByLogin(String login);

    @Query(value = "SELECT * FROM user WHERE user_id = ?1", nativeQuery = true)
    User findUserById(long id);


    @Modifying
    @Transactional
    @Query(value = "INSERT INTO session (user_id) SELECT user_id FROM User WHERE id = :id", nativeQuery = true)
    public abstract void createSession(@Param("id") Long id);


    @Modifying
    @Transactional
    @Query(value = "DELETE FROM session WHERE user_id = ?1", nativeQuery = true)
    public abstract void deleteSession(@Param("id") int user_id);
}
